// app/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  try {
    console.log('🔥 Initializing Firebase Admin SDK...');
    
    // Validate environment variables
    if (!process.env.FIREBASE_PROJECT_ID || 
        !process.env.FIREBASE_CLIENT_EMAIL || 
        !process.env.FIREBASE_PRIVATE_KEY) {
      throw new Error('Missing Firebase Admin credentials in environment variables');
    }

    admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
    });
    
    console.log('✅ Firebase Admin initialized successfully');
    console.log('   Project ID:', process.env.FIREBASE_PROJECT_ID);
    console.log('   Client Email:', process.env.FIREBASE_CLIENT_EMAIL?.substring(0, 20) + '...');
  } catch (error: any) {
    console.error('❌ Firebase Admin initialization error:', error.message);
    throw error;
  }
} else {
  console.log('ℹ️  Firebase Admin already initialized');
}

// Export Firestore instance
export const adminDb = admin.firestore();

// Export messaging for FCM
export const adminMessaging = admin.messaging();

// Export admin app
export const adminApp = admin;

const db = admin.firestore();
db.collection('admins')   
  .where('fcmToken', '!=', null)
  .get()
  .then((snapshot) => {
    console.log('Found', snapshot.size, 'admins with tokens');
    snapshot.forEach((doc) => {
      console.log('Admin:', doc.id, doc.data());
    });
  })
  .catch((err) => console.error('Error:', err));