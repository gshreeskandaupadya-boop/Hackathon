'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, farmer, clearFarmer } = useAppStore();

  const navItems = [
    { label: language === 'en' ? 'Home' : language === 'ka' ? 'ಮುಖ್ಯ ಪುಟ' : 'होम', href: '/' },
    { label: language === 'en' ? 'Dashboard' : language === 'ka' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್' : 'डैशबोर्ड', href: '/dashboard' },
    { label: language === 'en' ? 'Crops' : language === 'ka' ? 'ಬೆಳೆಗಳು' : 'फसलें', href: '/crops' },
    { label: language === 'en' ? 'Simulator' : language === 'ka' ? 'ಸಿಮ್ಯುಲೇಟರ್' : 'सिमुलेटर', href: '/simulator' },
    { label: language === 'en' ? 'Schemes' : language === 'ka' ? 'ಯೋಜನೆಗಳು' : 'योजनाएँ', href: '/schemes' },
    { label: language === 'en' ? 'Market' : language === 'ka' ? 'ಮಾರುಕಟ್ಟೆ' : 'बाजार', href: '/market' },
    { label: language === 'en' ? 'Pests' : language === 'ka' ? 'ಕೀಟಗಳು' : 'कीट', href: '/pests' },
    { label: language === 'en' ? 'Inputs' : language === 'ka' ? 'ಅಂಶಗಳು' : 'इनपुट', href: '/inputs' },
    { label: language === 'en' ? 'Irrigation' : language === 'ka' ? 'ನೀರಾವರಣ' : 'सिंचाई', href: '/irrigation' },
    { label: language === 'en' ? 'Finance' : language === 'ka' ? 'ಹಣಕಟ್ಟೆ' : 'वित्त', href: '/finance' },
    { label: language === 'en' ? 'Learn' : language === 'ka' ? 'ಕಲಿತ' : 'सीखें', href: '/learn' },
    { label: language === 'en' ? 'Chat' : language === 'ka' ? 'ಚಾಟ್' : 'चैट', href: '/chat' },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">🌾</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">SmartFarm</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:bg-green-700 px-3 py-2 rounded transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - Language selector and Auth */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ka' | 'hi')}
              className="bg-green-700 text-white px-3 py-2 rounded text-sm font-medium border border-green-500 hover:bg-green-800 transition-colors"
            >
              <option value="en">English</option>
              <option value="ka">ಕನ್ನಡ</option>
              <option value="hi">हिंदी</option>
            </select>

            {/* Auth Buttons */}
            {!farmer ? (
              <Link
                href="/auth/login"
                className="bg-white text-green-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
              >
                {language === 'en' ? 'Login' : language === 'ka' ? 'ಲಾಗಿನ್' : 'लॉगिन'}
              </Link>
            ) : (
              <button
                onClick={() => clearFarmer()}
                className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition-colors"
              >
                {language === 'en' ? 'Logout' : language === 'ka' ? 'ಲಾಗೌಟ್' : 'लॉगआउट'}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-green-700 p-2 rounded hover:bg-green-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block hover:bg-green-700 px-3 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
