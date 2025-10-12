// app/api/send-notification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminMessaging } from '@/app/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    // Get registration data from request
    const { studentName, studentClass, course } = await request.json();

    // Validate input
    if (!studentName || !studentClass || !course) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`📚 New registration: ${studentName}`);

    // Fetch all admin FCM tokens from Firestore
    const adminsSnapshot = await adminDb
      .collection('admins')
      .where('fcmToken', '!=', null)
      .get();

    const tokens: string[] = [];
    adminsSnapshot.forEach((doc) => {
      const fcmToken = doc.data().fcmToken;
      if (fcmToken && typeof fcmToken === 'string') {
        console.log("tokens"+fcmToken);
        
        tokens.push(fcmToken);
      }
    });

    if (tokens.length === 0) {
      console.log('⚠️ No admin tokens available');
      return NextResponse.json({
        success: true,
        message: 'No admins to notify',
      });
    }

    console.log(`📱 Sending to ${tokens.length} admin(s)`);

    // Send notification to all admins
    const response = await adminMessaging.sendEachForMulticast({
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
      android: {
        priority: 'high' as const,
        notification: {
          sound: 'default',
          channelId: 'registrations',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
      tokens: tokens,
    });

    console.log(`✅ Success: ${response.successCount}/${tokens.length}`);

    // Clean up invalid tokens
    if (response.failureCount > 0) {
      const invalidTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          invalidTokens.push(tokens[idx]);
          console.error(`❌ Token ${idx + 1} failed:`, resp.error?.code);
        }
      });

      // Remove invalid tokens from Firestore (async, don't wait)
      removeInvalidTokens(invalidTokens).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      totalAdmins: tokens.length,
    });

  } catch (error: any) {
    console.error('❌ Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send notification',
        message: error.message,
      },
      { status: 200 } // Return 200 so registration isn't blocked
    );
  }
}

// Helper: Remove invalid tokens from Firestore
async function removeInvalidTokens(tokens: string[]) {
  console.log(`🧹 Removing ${tokens.length} invalid token(s)`);
  
  const promises = tokens.map(async (token) => {
    const adminQuery = await adminDb
      .collection('admins')
      .where('fcmToken', '==', token)
      .limit(1)
      .get();
    
    if (!adminQuery.empty) {
      await adminQuery.docs[0].ref.update({
        fcmToken: null,
        tokenInvalidatedAt: new Date(),
      });
    }
  });

  await Promise.all(promises);
  console.log('✅ Invalid tokens removed');
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ status: 'healthy' });
}