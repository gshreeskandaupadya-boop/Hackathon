'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
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
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
      {/* Main Navigation Bar */}
      <div className="w-full px-2 sm:px-4">
        <div className="flex justify-between items-center h-16 gap-2">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">🌾</span>
            </div>
            <span className="font-bold text-base sm:text-lg hidden sm:inline whitespace-nowrap">STAR-d</span>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex space-x-1 flex-1 justify-center overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:bg-green-700 px-2 xl:px-3 py-2 rounded text-xs xl:text-sm transition-colors whitespace-nowrap flex-shrink-0"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - Language and Auth */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-auto">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="bg-green-700 text-white px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-medium border border-green-500 hover:bg-green-800 transition-colors whitespace-nowrap"
              >
                {language === 'en' ? '🌐 EN' : language === 'ka' ? '🌐 KA' : '🌐 HI'}
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLangOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 text-sm"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ka');
                      setIsLangOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 text-sm"
                  >
                    ಕನ್ನಡ
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('hi');
                      setIsLangOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 text-sm"
                  >
                    हिंदी
                  </button>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {!farmer ? (
              <Link
                href="/auth/login"
                className="bg-white text-green-600 px-2 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                {language === 'en' ? 'Login' : language === 'ka' ? 'ಲಾಗಿನ್' : 'लॉगिन'}
              </Link>
            ) : (
              <button
                onClick={() => clearFarmer()}
                className="bg-red-500 text-white px-2 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors whitespace-nowrap"
              >
                {language === 'en' ? 'Logout' : language === 'ka' ? 'ಲಾಗೌಟ್' : 'लॉगआउट'}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden bg-green-700 p-2 rounded hover:bg-green-800 transition-colors flex-shrink-0"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-1 max-h-96 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block hover:bg-green-700 px-3 py-2 rounded transition-colors text-sm"
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
