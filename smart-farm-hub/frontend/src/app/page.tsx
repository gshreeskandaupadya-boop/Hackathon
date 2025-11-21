'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { healthCheck } from '@/lib/api';
import { PWAStatus } from '@/components/PWAStatus';

export default function Home() {
  const [status, setStatus] = useState('Checking backend...');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await healthCheck();
        setStatus('✅ Backend Connected!');
        setIsConnected(true);
      } catch (error) {
        setStatus('❌ Backend Not Connected');
        setIsConnected(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <PWAStatus />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-600">🌾 Smart Farm Hub</h1>
            <nav className="flex gap-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600">
                Dashboard
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-green-600">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-gray-900">
              Maximize Your Farming Profit
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Make smarter decisions with real-time crop recommendations, market prices, 
              government schemes, and weather alerts—all in one intelligent platform.
            </p>
          </div>

          {/* Status */}
          <div className={`p-6 rounded-lg border-2 ${
            isConnected 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <p className={`text-lg font-semibold ${
              isConnected ? 'text-green-800' : 'text-red-800'
            }`}>
              {status}
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
          <p>Built with 💚 for Indian Farmers | Smart Farm Hub 2024</p>
        </div>
      </footer>
    </div>
  );
}
