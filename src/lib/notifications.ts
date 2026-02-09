import { supabase } from './supabase';

// Verificar se o navegador suporta push notifications
export const isPushNotificationSupported = () => {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
};

// Registrar o Service Worker
export const registerServiceWorker = async () => {
  if (!isPushNotificationSupported()) {
    console.log('Push notifications não são suportadas neste navegador');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });
    console.log('Service Worker registrado com sucesso:', registration);
    return registration;
  } catch (error) {
    console.error('Erro ao registrar Service Worker:', error);
    return null;
  }
};

// Solicitar permissão de notificações
export const requestNotificationPermission = async () => {
  if (!isPushNotificationSupported()) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  }

  return false;
};

// Inscrever-se em notificações push
export const subscribeToPushNotifications = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Verificar se já existe uma inscrição
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      console.log('Já inscrito em push notifications');
      return subscription;
    }

    // Criar nova inscrição
    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.VITE_VAPID_PUBLIC_KEY,
    });

    // Salvar a inscrição no Supabase
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (userId) {
      const { error } = await supabase.from('push_subscriptions').upsert({
        user_id: userId,
        subscription: JSON.stringify(newSubscription),
        updated_at: new Date(),
      });

      if (error) {
        console.error('Erro ao salvar inscrição:', error);
      }
    }

    return newSubscription;
  } catch (error) {
    console.error('Erro ao inscrever em push notifications:', error);
    return null;
  }
};

// Enviar notificação local (fallback)
export const sendLocalNotification = (title: string, options?: NotificationOptions) => {
  if (!isPushNotificationSupported()) return;

  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Memo/3D/memo_3d.png',
      ...options,
    });
  }
};
