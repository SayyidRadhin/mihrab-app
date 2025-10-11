// app/hooks/useFCM.ts
import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/app/lib/firebaseconfig';

export const useFCM = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        // Check if notifications are supported
        if (!('Notification' in window)) {
          console.log('This browser does not support notifications');
          return;
        }

        // Request permission
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          console.log('Notification permission granted');
          
          // Get FCM token
          const messaging = getMessaging();
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });

          if (token) {
            console.log('FCM Token:', token);
            
            // Save token to Firestore under admin's document
            const user = auth.currentUser;
            if (user) {
              await setDoc(
                doc(db, 'admins', user.uid),
                {
                  fcmToken: token,
                  email: user.email,
                  updatedAt: new Date(),
                },
                { merge: true }
              );
            }
          }
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    // Request permission when component mounts
    requestPermission();

    // Listen for foreground messages
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      
      // Show notification
      if (payload.notification) {
        new Notification(payload.notification.title || 'New Notification', {
          body: payload.notification.body,
          icon: '/logo.png', // Add your logo path
          badge: '/badge.png', // Add your badge path
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
};