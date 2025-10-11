// app/api/send-notification/route.ts
// RENAME THIS FOLDER TO: send-notifications (plural)
import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminMessaging } from '@/app/lib/firebaseAdmin';

// Cache with version tracking
let tokenCache: { 
  tokens: string[], 
  timestamp: number,
  version: number 
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes



async function getAdminTokens() {
  const now = Date.now();
  
  // Check if cache is still valid
  // if (tokenCache && (now - tokenCache.timestamp) < CACHE_DURATION) {
  //   console.log(`Using cached tokens (v${tokenCache.version}):`, tokenCache.tokens);
  //   return tokenCache.tokens;
  // }

  // Fetch fresh tokens from Firestore
  console.log('Fetching fresh admin tokens from Firestore...');
  const adminsSnapshot = await adminDb
    .collection('admins')
    .where('fcmToken', '!=', null) // Only get admins with tokens
    .get();
  
  const tokens: string[] = [];
  const adminEmails: string[] = [];

  adminsSnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(data);
    
    if (data.fcmToken && typeof data.fcmToken === 'string') {
      tokens.push(data.fcmToken);
      adminEmails.push(data.email || 'Unknown');
    }
  });

  console.log(`Found ${tokens.length} admin token(s):`, adminEmails);

  // Update cache with new version
  // const newVersion = tokenCache ? tokenCache.version + 1 : 1;
  // tokenCache = { 
  //   tokens, 
  //   timestamp: now,
  //   version: newVersion
  // };
  
  return tokens;
}

// function invalidateCache() {
//   console.log('Cache invalidated due to token failures');
//   tokenCache = null;
// }

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { studentName, studentClass, course } = await request.json();

    // Validate input
    if (!studentName || !studentClass || !course) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`\n📚 New registration: ${studentName} (Class ${studentClass}, ${course})`);

    // Get admin tokens (with caching)
    const tokens = await getAdminTokens();

    if (tokens.length === 0) {
      console.log('⚠️  No admin tokens available - skipping notification');
      return NextResponse.json(
        { 
          success: true,
          message: 'Student registered but no admins to notify',
          adminCount: 0
        },
        { status: 200 }
      );
    }

    console.log(`📱 Sending notifications to ${tokens.length} admin(s)...`);

    // Send notification to all admin tokens using adminMessaging
    const message = {
      notification: {
        title: '🎓 New Student Registration',
        body: `${studentName} (Class ${studentClass}) joined ${course}`,
      },
      data: {
        type: 'NEW_REGISTRATION',
        studentName,
        studentClass,
        course,
        timestamp: new Date().toISOString(),
        click_action: '/admin/dashboard',
      },
      // Android specific config
      android: {
        priority: 'high' as const,
        notification: {
          sound: 'default',
          channelId: 'registrations',
        },
      },
      // Apple specific config  
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
      tokens: tokens,
    };

    // Use adminMessaging directly (already initialized in firebaseAdmin.ts)
    const response = await adminMessaging.sendEachForMulticast(message);

    const duration = Date.now() - startTime;
    console.log(`✅ Notifications sent in ${duration}ms`);
    console.log(`   Success: ${response.successCount}/${tokens.length}`);
    
    if (response.failureCount > 0) {
      console.log(`   Failed: ${response.failureCount}`);
    }

    // Handle invalid tokens
    if (response.failureCount > 0) {
      const invalidTokens: string[] = [];
      
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          invalidTokens.push(tokens[idx]);
          console.error(`   ❌ Token ${idx + 1} failed:`, resp.error?.code);
        }
      });

      // Clear cache immediately since we have invalid tokens
      // invalidateCache();

      // Remove invalid tokens asynchronously (don't wait)
      // removeInvalidTokens(invalidTokens).catch(err => 
      //   console.error('Error removing invalid tokens:', err)
      // );
    }

    return NextResponse.json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      totalAdmins: tokens.length,
      duration: `${duration}ms`,
    });

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error sending notification (${duration}ms):`, error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack?.split('\n').slice(0, 3)
    });
    
    // Even if notification fails, don't block the registration
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to send notification',
        errorDetails: error.message,
        message: 'Student registered successfully despite notification failure'
      },
      { status: 200 } // Return 200 so registration isn't blocked
    );
  }
}

// Helper function to remove invalid tokens
async function removeInvalidTokens(tokens: string[]) {
  console.log(`🧹 Removing ${tokens.length} invalid token(s)...`);
  
  const promises = tokens.map(async (token) => {
    try {
      const adminQuery = await adminDb
        .collection('admins')
        .where('fcmToken', '==', token)
        .limit(1)
        .get();
      
      if (!adminQuery.empty) {
        const doc = adminQuery.docs[0];
        await doc.ref.update({ 
          fcmToken: null,
          tokenInvalidatedAt: new Date()
        });
        console.log(`   Removed token for admin: ${doc.data().email}`);
      }
    } catch (err) {
      console.error('   Error removing token:', err);
    }
  });

  await Promise.all(promises);
  console.log('✅ Invalid tokens removed');
}

// Optional: Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    cache: tokenCache ? {
      tokenCount: tokenCache.tokens.length,
      version: tokenCache.version,
      age: `${Math.round((Date.now() - tokenCache.timestamp) / 1000)}s`,
    } : 'empty'
  });
}