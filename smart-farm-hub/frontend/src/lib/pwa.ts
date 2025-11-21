// frontend/src/lib/pwa.ts
// PWA utilities for offline support and service worker management

export const registerServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const unregisterServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      console.log('Service Worker unregistered successfully');
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
    }
  }
};

export const checkOnlineStatus = () => {
  if (typeof window !== 'undefined') {
    return navigator.onLine;
  }
  return true;
};

export const isInstallable = () => {
  if (typeof window !== 'undefined') {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }
  return false;
};

export const requestNotificationPermission = async () => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Notification permission request failed:', error);
      return false;
    }
  }
  return false;
};

export const sendNotification = (title: string, options?: NotificationOptions) => {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        title,
        options,
      });
    } else {
      new Notification(title, options);
    }
  }
};

// Cache management
export const cacheData = async (cacheName: string, key: string, data: any) => {
  if ('caches' in window) {
    try {
      const cache = await caches.open(cacheName);
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      await cache.put(key, response);
    } catch (error) {
      console.error('Cache operation failed:', error);
    }
  }
};

export const getCachedData = async (cacheName: string, key: string) => {
  if ('caches' in window) {
    try {
      const cache = await caches.open(cacheName);
      const response = await cache.match(key);
      if (response) {
        return await response.json();
      }
    } catch (error) {
      console.error('Cache retrieval failed:', error);
    }
  }
  return null;
};

export const clearCache = async (cacheName?: string) => {
  if ('caches' in window) {
    try {
      if (cacheName) {
        await caches.delete(cacheName);
      } else {
        const names = await caches.keys();
        await Promise.all(names.map(name => caches.delete(name)));
      }
    } catch (error) {
      console.error('Cache clearing failed:', error);
    }
  }
};

// Sync data when back online
export const syncDataWhenOnline = async (callback: () => Promise<void>) => {
  if (typeof window !== 'undefined') {
    if (navigator.onLine) {
      await callback();
    } else {
      window.addEventListener('online', async () => {
        await callback();
      }, { once: true });
    }
  }
};
