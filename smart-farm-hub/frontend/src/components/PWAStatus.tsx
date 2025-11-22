// frontend/src/components/PWAStatus.tsx
'use client';

import { useEffect, useState } from 'react';

export const PWAStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    }
  };

  return (
    <>
      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071l3.534-3.534a5.5 5.5 0 017.072 0l3.534 3.534m-9.172-9.172l3.534-3.534a5.5 5.5 0 017.072 0l3.534 3.534"
            />
          </svg>
          <span className="text-sm font-medium">You are offline. Some features may be limited.</span>
        </div>
      )}

      {/* Online Status Banner */}
      {isOnline && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-xs font-medium z-50 opacity-0 animate-pulse">
          ✓ Back online
        </div>
      )}

      {/* Install App Prompt */}
      {showInstallPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Install STAR-D</h3>
            <p className="text-gray-600 text-sm mb-4">
              Install our app on your home screen for quick access and offline support.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Not now
              </button>
              <button
                onClick={handleInstallClick}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
