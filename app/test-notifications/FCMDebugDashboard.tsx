import React, { useState, useEffect } from 'react';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { messaging } from '../lib/firebaseconfig';

export default function FCMDebugDashboard() {
  const [status, setStatus] = useState({
    notificationPermission: 'checking',
    fcmSupported: 'checking',
    serviceWorker: 'checking',
    fcmToken: 'checking',
    listening: false,
  });
  const [logs, setLogs] = useState([]);
  const [token, setToken] = useState('');

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
    console.log(`[${timestamp}] ${message}`);
  };

  useEffect(() => {
    checkEverything();
  }, []);

  const checkEverything = async () => {
    addLog('🔍 Starting FCM diagnostics...', 'info');

    // 1. Check Notification Permission
    if (!('Notification' in window)) {
      setStatus(prev => ({ ...prev, notificationPermission: 'unsupported' }));
      addLog('❌ Notifications not supported in this browser', 'error');
      return;
    }

    const permission = Notification.permission;
    setStatus(prev => ({ ...prev, notificationPermission: permission }));
    addLog(`🔔 Notification permission: ${permission}`, permission === 'granted' ? 'success' : 'warning');

    // 2. Check FCM Support
    try {
      const supported = await isSupported();
      setStatus(prev => ({ ...prev, fcmSupported: supported ? 'yes' : 'no' }));
      addLog(`📱 FCM supported: ${supported}`, supported ? 'success' : 'error');

      if (!supported) return;
    } catch (err) {
      setStatus(prev => ({ ...prev, fcmSupported: 'error' }));
      addLog(`❌ FCM support check failed: ${err.message}`, 'error');
      return;
    }

    // 3. Check Service Worker
    if (!('serviceWorker' in navigator)) {
      setStatus(prev => ({ ...prev, serviceWorker: 'unsupported' }));
      addLog('❌ Service Worker not supported', 'error');
      return;
    }

    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      const firebaseReg = regs.find(reg => 
        reg.active?.scriptURL.includes('firebase-messaging-sw.js')
      );

      if (firebaseReg && firebaseReg.active) {
        setStatus(prev => ({ ...prev, serviceWorker: 'active' }));
        addLog(`✅ Service Worker active: ${firebaseReg.active.scriptURL}`, 'success');
      } else if (regs.length > 0) {
        setStatus(prev => ({ ...prev, serviceWorker: 'wrong' }));
        addLog(`⚠️ Service Worker found but not firebase-messaging-sw.js`, 'warning');
        regs.forEach(reg => addLog(`   Found: ${reg.active?.scriptURL || 'inactive'}`, 'info'));
      } else {
        setStatus(prev => ({ ...prev, serviceWorker: 'none' }));
        addLog('❌ No Service Worker registered', 'error');
      }
    } catch (err) {
      setStatus(prev => ({ ...prev, serviceWorker: 'error' }));
      addLog(`❌ Service Worker check failed: ${err.message}`, 'error');
    }

    // 4. Get FCM Token
    if (permission === 'granted') {
      try {
        addLog('🔑 Attempting to get FCM token...', 'info');
        
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/',
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (fcmToken) {
          setToken(fcmToken);
          setStatus(prev => ({ ...prev, fcmToken: 'received' }));
          addLog(`✅ FCM Token received: ${fcmToken.substring(0, 30)}...`, 'success');
          
          // Start listening for messages
          setupMessageListener(messaging);
        } else {
          setStatus(prev => ({ ...prev, fcmToken: 'none' }));
          addLog('❌ No FCM token received', 'error');
        }
      } catch (err) {
        setStatus(prev => ({ ...prev, fcmToken: 'error' }));
        addLog(`❌ FCM token error: ${err.message}`, 'error');
        addLog(`   Error code: ${err.code}`, 'error');
      }
    } else {
      setStatus(prev => ({ ...prev, fcmToken: 'no-permission' }));
      addLog('⚠️ Cannot get token - permission not granted', 'warning');
    }
  };

  const setupMessageListener = (messaging) => {
    addLog('👂 Setting up foreground message listener...', 'info');
    
    const unsubscribe = onMessage(messaging, (payload) => {
      addLog('📬 FOREGROUND MESSAGE RECEIVED!', 'success');
      addLog(`   Title: ${payload.notification?.title}`, 'info');
      addLog(`   Body: ${payload.notification?.body}`, 'info');
      
      // Show browser notification
      if (payload.notification) {
        new Notification(payload.notification.title || 'New Message', {
          body: payload.notification.body,
          icon: '/mihrabLogo.png',
          badge: '/apple-logo.png',
        });
        addLog('✅ Notification displayed', 'success');
      }
    });

    setStatus(prev => ({ ...prev, listening: true }));
    addLog('✅ Foreground listener active', 'success');
  };

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      addLog(`🔔 Permission result: ${permission}`, permission === 'granted' ? 'success' : 'error');
      checkEverything();
    } catch (err) {
      addLog(`❌ Permission request failed: ${err.message}`, 'error');
    }
  };

  const sendTestNotification = async () => {
    addLog('📤 Sending test notification...', 'info');
    try {
      const response = await fetch('/api/send-notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: 'Test Student',
          studentClass: '10th',
          course: 'Test Course',
        }),
      });

      const data = await response.json();
      if (data.success) {
        addLog(`✅ Test sent! Success: ${data.successCount}/${data.totalAdmins}`, 'success');
      } else {
        addLog(`❌ Test failed: ${data.error}`, 'error');
      }
    } catch (err) {
      addLog(`❌ Request failed: ${err.message}`, 'error');
    }
  };

  const StatusIndicator = ({ value }) => {
    if (value === 'checking') return <Loader2 className="animate-spin text-gray-400" size={20} />;
    if (value === 'granted' || value === 'active' || value === 'received' || value === 'yes' || value === true) 
      return <CheckCircle2 className="text-green-500" size={20} />;
    if (value === 'denied' || value === 'unsupported' || value === 'none' || value === 'error' || value === 'no')
      return <XCircle className="text-red-500" size={20} />;
    return <AlertCircle className="text-yellow-500" size={20} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🔍 FCM Diagnostics Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Notification Permission</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{status.notificationPermission}</span>
                  <StatusIndicator value={status.notificationPermission} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">FCM Supported</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{status.fcmSupported}</span>
                  <StatusIndicator value={status.fcmSupported} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Service Worker</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{status.serviceWorker}</span>
                  <StatusIndicator value={status.serviceWorker} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">FCM Token</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{status.fcmToken}</span>
                  <StatusIndicator value={status.fcmToken} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded col-span-full">
                <span className="font-medium">Listening for Messages</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{status.listening ? 'Active' : 'Inactive'}</span>
                  <StatusIndicator value={status.listening} />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={checkEverything} variant="outline">
                🔄 Re-check All
              </Button>
              {status.notificationPermission !== 'granted' && (
                <Button onClick={requestPermission}>
                  🔔 Request Permission
                </Button>
              )}
              {status.listening && (
                <Button onClick={sendTestNotification} className="bg-green-600 hover:bg-green-700">
                  📤 Send Test Notification
                </Button>
              )}
            </div>

            {token && (
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-sm font-medium text-blue-900 mb-1">Your FCM Token:</p>
                <p className="text-xs text-blue-700 break-all font-mono">{token}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📋 Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 rounded p-4 font-mono text-sm h-96 overflow-y-auto">
              {logs.length === 0 && (
                <div className="text-gray-500">Waiting for activity...</div>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className={`mb-1 ${
                  log.type === 'error' ? 'text-red-400' : 
                  log.type === 'warning' ? 'text-yellow-400' : 
                  log.type === 'success' ? 'text-green-400' : 
                  'text-blue-300'
                }`}>
                  <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>💡 Troubleshooting Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-3 bg-yellow-50 rounded">
              <p className="font-semibold text-yellow-900">⚠️ Common Issues:</p>
              <ul className="list-disc list-inside mt-2 text-yellow-800 space-y-1">
                <li>Service Worker not active → Check if firebase-messaging-sw.js exists in /public</li>
                <li>Permission denied → Click browser's lock icon → Reset permissions</li>
                <li>No token received → Check VAPID key in .env.local</li>
                <li>Listening inactive → Refresh page after granting permission</li>
              </ul>
            </div>
            
            <div className="p-3 bg-green-50 rounded">
              <p className="font-semibold text-green-900">✅ When everything works:</p>
              <ul className="list-disc list-inside mt-2 text-green-800 space-y-1">
                <li>All status indicators should be green</li>
                <li>"Listening for Messages" should show "Active"</li>
                <li>Clicking "Send Test" should show notification within 3 seconds</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}