'use client';

import { useState, useEffect } from 'react';

export default function BackendStatus() {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setShowTick(true);
          
          // Hide tick after 2 seconds
          const timer = setTimeout(() => {
            setShowTick(false);
          }, 2000);
          
          return () => clearTimeout(timer);
        }
      } catch (error) {
        setShowTick(false);
      }
    };

    checkBackendConnection();
  }, []);

  if (!showTick) return null;

  return (
    <div className="fixed top-4 right-4 text-green-600 text-3xl z-50 animate-fade-in">
      ✓
    </div>
  );
}
