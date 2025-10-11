// app/hooks/useFCM.ts
import { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebaseconfig';

export const useFCM = () => {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenSaved, setTokenSaved] = useState(false);

  useEffect(() => {
    let unsubscribeAuth: () => void;

    const requestPermissionAndSetup = async () => {
      try {
        // Check browser support for notifications
        if (!('Notification' in window)) {
          console.warn('⚠️ This browser does not support notifications');
          setError('Notifications not supported');
          return;
        }

        // Check Firebase Messaging support
        const messagingSupported = await isSupported();
        if (!messagingSupported) {
          console.warn('⚠️ Firebase Messaging is not supported in this browser');
          setError('Firebase Messaging not supported');
          return;
        }

        // Request permission if in default state
        let currentPermission = Notification.permission;
        if (currentPermission === 'default') {
          console.log('🔔 Requesting notification permission...');
          currentPermission = await Notification.requestPermission();
        }
        setPermission(currentPermission);
        console.log('🔔 Notification permission:', currentPermission);

        if (currentPermission === 'granted') {
          await setupFCM();
        } else if (currentPermission === 'denied') {
          console.log('❌ Notification permission denied');
          setError('Notification permission denied');
        }
      } catch (err: any) {
        console.error('Error in notification setup:', err);
        if (err.code === 'messaging/unsupported-browser') {
          setError('Browser not supported for notifications');
        } else if (err.message?.includes('indexedDB')) {
          setError('Storage blocked - please enable cookies/storage');
        } else if (err.code === 'messaging/invalid-sw-registration') {
          setError('Invalid service worker registration');
        } else if (err.code === 'messaging/failed-service-worker-registration') {
          setError('Failed to register service worker');
        } else if (err.name === 'AbortError') {
          setError('No active service worker');
        } else {
          setError('Failed to setup notifications: ' + err.message);
        }
      }
    };

    const waitForServiceWorkerActivation = async (
      registration: ServiceWorkerRegistration
    ): Promise<void> => {
      if (registration.active) {
        console.log('✅ Service worker already active:', registration.active.scriptURL);
        return;
      }

      console.log('⏳ Waiting for service worker to activate...');
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Service worker activation timed out after 20s'));
        }, 20000);

        const checkActivation = () => {
          if (registration.active) {
            clearTimeout(timeout);
            console.log('✅ Service worker activated:', registration.active.scriptURL);
            resolve();
          } else {
            registration.update().then(() => {
              if (registration.active) {
                clearTimeout(timeout);
                console.log('✅ Service worker activated after update:', registration.active.scriptURL);
                resolve();
              }
            }).catch((err) => {
              clearTimeout(timeout);
              reject(new Error('Failed to update service worker: ' + err.message));
            });
          }
        };

        if (registration.installing) {
          console.log('🔄 Service worker installing...');
          registration.installing.addEventListener('statechange', checkActivation);
        } else if (registration.waiting) {
          console.log('🔄 Service worker waiting...');
          registration.waiting.addEventListener('statechange', checkActivation);
        } else {
          checkActivation();
        }
      });
    };

    const setupFCM = async () => {
      try {
        const messaging = getMessaging();

        // Verify VAPID key
        if (!process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
          console.error('❌ VAPID key not configured');
          setError('Notification configuration missing');
          return;
        }

        // Register service worker
        if (!('serviceWorker' in navigator)) {
          console.warn('⚠️ Service worker not supported');
          setError('Service worker not supported');
          return;
        }

        // Unregister conflicting service workers
        const existingRegistrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of existingRegistrations) {
          if (reg.active && reg.scope !== window.location.origin + '/') {
            await reg.unregister();
            console.log('🗑️ Unregistered conflicting service worker:', reg.scope);
          }
        }

        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/',
        });
        console.log('✅ Service worker registered:', registration);

        // Wait for service worker to activate
        await waitForServiceWorkerActivation(registration);

        // Retry token generation
        let token: string | null = null;
        let attempts = 0;
        const maxAttempts = 3;
        while (!token && attempts < maxAttempts) {
          try {
            console.log(`🔄 Attempting to get FCM token (attempt ${attempts + 1})...`);
            token = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
              serviceWorkerRegistration: registration,
            });
          } catch (err: any) {
            console.warn(`Token attempt ${attempts + 1} failed:`, err);
            attempts++;
            if (attempts < maxAttempts) {
              await new Promise(resolve => setTimeout(resolve, 1000));
              await registration.update();
            }
          }
        }

        if (!token) {
          console.warn('⚠️ No FCM token received after retries');
          setError('No token received');
          return;
        }

        console.log('✅ FCM Token:', token.substring(0, 20) + '...');

        // Wait for auth state
        const currentUser = await new Promise<import('firebase/auth').User | null>((resolve) => {
          unsubscribeAuth = auth.onAuthStateChanged((user) => {
            console.log('🔍 Auth state resolved:', user ? user.uid : 'null');
            resolve(user);
          });
        });

        if (!currentUser) {
          console.warn('⚠️ No authenticated user');
          setError('No authenticated user');
          return;
        }

        console.log('✅ Current user:', currentUser.uid);

        const adminRef = doc(db, 'admins', currentUser.uid);
        await setDoc(adminRef, {
          fcmToken: token,
          email: currentUser.email || 'unknown',
          uid: currentUser.uid,
          updatedAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        }, { merge: true });

        console.log('✅ Token saved to Firestore for admin:', currentUser.uid);
        setTokenSaved(true);

        // Setup foreground handler
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log('📬 Foreground message received:', payload);
          if (payload.notification) {
            console.log('🔔 Displaying notification:', payload.notification.title);
            new Notification(payload.notification.title || 'Notification', {
              body: payload.notification.body || 'No body',
              icon: '/mihrabLogo.png',
              badge: '/apple-logo.png',
              tag: 'admin-notification',
            });
            
          } else {
            console.warn('⚠️ No notification data in payload');
          }
        });

        return () => {
          console.log('🧹 Cleaning up FCM listeners');
          unsubscribe();
          if (unsubscribeAuth) unsubscribeAuth();
        };
      } catch (err: any) {
        console.error('FCM setup error:', err);
        if (err.name === 'AbortError') {
          setError('No active service worker');
        } else if (err.code === 'messaging/invalid-sw-registration') {
          setError('Invalid service worker registration');
        } else if (err.code === 'messaging/failed-service-worker-registration') {
          setError('Failed to register service worker');
        } else if (err.code === 'messaging/token-subscribe-failed') {
          setError('Failed to subscribe');
        } else if (err.message?.includes('indexedDB')) {
          setError('Browser storage blocked');
        } else {
          setError('Setup failed: ' + err.message);
        }
      }
    };

    if (typeof window !== 'undefined') {
      console.log('🚀 Initializing FCM setup');
      requestPermissionAndSetup();
    }

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, []);

  return { permission, error, tokenSaved };
};