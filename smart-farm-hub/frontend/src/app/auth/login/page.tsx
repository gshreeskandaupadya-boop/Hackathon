'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { authAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { useAppStore as store } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const { setFarmer, setToken } = useAppStore();
  const { language } = store();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError(
        language === 'en'
          ? 'Please fill in all fields'
          : language === 'ka'
          ? 'ದಯಕೊರೆ ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ'
          : 'कृपया सभी फील्ड भरें'
      );
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      // Store token and farmer data
      setToken(response.data.token);
      setFarmer(response.data.farmer);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = language === 'en' ? 'Login' : language === 'ka' ? 'ಲಾಗಿನ್' : 'लॉगिन';
  const subtitle =
    language === 'en'
      ? 'Welcome back to Smart Farm Hub'
      : language === 'ka'
      ? 'ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮ್ ಹಬ್‌ಗೆ ಮರುಳಿ ಸ್ವಾಗತ'
      : 'स्मार्ट फार्म हब में वापस स्वागत है';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navigation />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌾</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-gray-600 mt-2">{subtitle}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === 'en' ? 'Email' : language === 'ka' ? 'ಇಮೇಲ್' : 'ईमेल'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'your@email.com' : language === 'ka' ? 'ನಿಮ್ಮ@ಇಮೇಲ್.com' : 'आपका@email.com'}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === 'en' ? 'Password' : language === 'ka' ? 'ಪಾಸ್‌ವರ್ಡ್' : 'पासवर्ड'}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading
                  ? language === 'en'
                    ? 'Logging in...'
                    : language === 'ka'
                    ? 'ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ...'
                    : 'लॉगिन हो रहा है...'
                  : language === 'en'
                  ? 'Login'
                  : language === 'ka'
                  ? 'ಲಾಗಿನ್'
                  : 'लॉगिन'}
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {language === 'en'
                  ? "Don't have an account? "
                  : language === 'ka'
                  ? 'ಖಾತೆ ಹೊಂದಿಲ್ಲ? '
                  : 'खाता नहीं है? '}
                <Link
                  href="/auth/signup"
                  className="text-green-600 font-bold hover:text-green-700"
                >
                  {language === 'en' ? 'Sign up' : language === 'ka' ? 'ಸೈನ್ ಅಪ್' : 'साइन अप'}
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-semibold text-blue-900 mb-2">
                {language === 'en' ? 'Demo Credentials' : language === 'ka' ? 'ಡೆಮೋ ಪ್ರಮಾಣಪತ್ರಗಳು' : 'डेमो क्रेडेंशियल्स'}
              </p>
              <p className="text-xs text-blue-800">
                Email: <span className="font-mono font-bold">demo@farm.com</span>
              </p>
              <p className="text-xs text-blue-800">
                Password: <span className="font-mono font-bold">demo123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
