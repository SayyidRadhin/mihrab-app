// app/hooks/useFCM.ts
import { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebaseconfig';

export const useFCM = () => {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenSaved, setTokenSaved] = useState(false);

  useEffect(() => {
    const initFCM = async () => {
      try {
        // Step 1: Request notification permission
        const perm = await Notification.requestPermission();
        setPermission(perm);
        
        if (perm !== 'granted') {
          setError('Notification permission denied');
          return;
        }

        // Step 2: Register service worker
        const registration = await navigator.serviceWorker.register(
          '/firebase-messaging-sw.js',
          { scope: '/' }
        );
        
        // Wait for service worker to be ready
        await navigator.serviceWorker.ready;
        console.log('✅ Service worker ready');

        // Step 3: Get FCM token
        const messaging = getMessaging();
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (!token) {
          setError('Failed to get FCM token');
          return;
        }

        console.log('✅ FCM Token obtained');

        // Step 4: Wait for authenticated user
        const user = await new Promise<any>((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((u) => {
            unsubscribe();
            resolve(u);
          });
        });

        if (!user) {
          setError('User not authenticated');
          return;
        }

        // Step 5: Save token to Firestore
        await setDoc(doc(db, 'admins', user.uid), {
          fcmToken: token,
          email: user.email,
          uid: user.uid,
          updatedAt: new Date().toISOString(),
        }, { merge: true });

        console.log('✅ Token saved to Firestore');
        setTokenSaved(true);

        // Step 6: Listen for foreground messages
        onMessage(messaging, (payload) => {
          console.log('📬 Notification received:', payload);
          
          if (payload.notification) {
            const notification = new Notification(
              payload.notification.title || 'New Notification',
              {
                body: payload.notification.body,
                icon: payload.notification.icon || '/mihrabLogo.png',
                tag: 'admin-notification',
                requireInteraction: true,
              }
            );

            notification.onclick = () => {
              window.focus();
              const url = payload.data?.click_action || '/admin/dashboard';
              window.location.href = url;
              notification.close();
            };
          }
        });

      } catch (err: any) {
        console.error('❌ FCM setup error:', err);
        setError(err.message || 'Failed to setup notifications');
      }
    };

    if (typeof window !== 'undefined') {
      initFCM();
    }
  }, []);

  return { permission, error, tokenSaved };
};