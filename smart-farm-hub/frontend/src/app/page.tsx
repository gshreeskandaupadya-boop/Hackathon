'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { healthCheck } from '@/lib/api';
import { PWAStatus } from '@/components/PWAStatus';

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await healthCheck();
        setNotificationMessage('✅ Backend Connected!');
        setIsConnected(true);
        setShowNotification(true);
        
        // Hide notification after 10 seconds
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 10000);
        
        return () => clearTimeout(timer);
      } catch (error) {
        setNotificationMessage('❌ Backend Not Connected');
        setIsConnected(false);
        setShowNotification(true);
        
        // Hide notification after 10 seconds
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 10000);
        
        return () => clearTimeout(timer);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <PWAStatus />
      
      {/* Toast Notification */}
      {showNotification && (
        <div className={`fixed top-20 right-4 px-6 py-4 rounded-lg shadow-lg text-white font-semibold flex items-center gap-2 transition-opacity duration-300 z-50 ${
          isConnected 
            ? 'bg-green-600' 
            : 'bg-red-600'
        }`}>
          <span className="text-lg">{notificationMessage}</span>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-gray-900">
              Smart Techniques for Agriculture & Rural Development (STAR-D)
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Make smarter decisions with real-time crop recommendations, market prices, 
              government schemes, and weather alerts—all in one intelligent platform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/dashboard"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition"
            >
              Go to Dashboard →
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              Sign Up Now
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="font-bold text-lg mb-2">Crop Selection</h3>
              <p className="text-gray-600">
                Get personalized recommendations for the most profitable crops based on your soil and land.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-2">Government Schemes</h3>
              <p className="text-gray-600">
                Auto-discover eligible subsidies and schemes. Never miss a benefit again.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-bold text-lg mb-2">Market Intelligence</h3>
              <p className="text-gray-600">
                Real-time prices across mandis and AI-powered predictions for best selling time.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Built with 💚 for Indian Farmers | STAR-D 2025</p>
        </div>
      </footer>
    </div>
  );
}
