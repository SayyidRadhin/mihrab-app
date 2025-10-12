// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/12.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
 apiKey: "AIzaSyCTcKutWNHEreqE6q1mm3AgAkDUcn6x_go",
  authDomain: "mehrabstudy.firebaseapp.com",
  projectId: "mehrabstudy",
  storageBucket: "mehrabstudy.firebasestorage.app",
  messagingSenderId: "991598494491",
  appId: "1:991598494491:web:b36000f44a756f464509be",
  measurementId: "G-NCLES6G3CX"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[Service Worker] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: '/mihrabLogo.png',
    badge: '/apple-logo.png',
    tag: 'admin-notification',
    data: payload.data,
    requireInteraction: true, // Notification stays until user dismisses
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event.notification);
  
  event.notification.close();

  const clickAction = event.notification.data?.click_action || '/admin/dashboard';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url.includes(clickAction) && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if no existing window found
        if (clients.openWindow) {
          return clients.openWindow(clickAction);
        }
      })
  );
});