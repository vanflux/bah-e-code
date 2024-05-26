import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from './features/toast';
import { Router } from './router';
import { queryClient } from './services/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { PushNotifications } from '@capacitor/push-notifications';
import { Clipboard } from '@capacitor/clipboard';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { AuthProvider } from './features/auth';
import { CurrentLocationProvider } from './features/current-location';

export function App() {
  useEffect(() => {
    if (!['android', 'ios'].includes(Capacitor.getPlatform())) return;

    async function run() {
      // Listeners

      await PushNotifications.addListener('registration', (token) => {
        console.info('Registration token: ', token.value);
        Clipboard.write({ string: token.value });
      });

      await PushNotifications.addListener('registrationError', (err) => {
        console.error('Registration error: ', err.error);
      });

      await PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received: ', notification);
      });

      await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });

      // Register notifications

      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    }

    run();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CurrentLocationProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Router />
          <ToastContainer />
        </CurrentLocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
