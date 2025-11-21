'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { authAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

export default function SignupPage() {
  const router = useRouter();
  const { setFarmer, setToken, language } = useAppStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    state: '',
    district: '',
    landSize: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    setError(null);

    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        setError(
          language === 'en'
            ? 'Please fill in all fields'
            : language === 'ka'
            ? 'ದಯಕೊರೆ ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ'
            : 'कृपया सभी फील्ड भरें'
        );
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        setError(
          language === 'en'
            ? 'Please enter password'
            : language === 'ka'
            ? 'ದಯಕೊರೆ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ'
            : 'कृपया पासवर्ड दर्ज करें'
        );
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError(
          language === 'en'
            ? 'Passwords do not match'
            : language === 'ka'
            ? 'ಪಾಸ್‌ವರ್ಡ್ಗಳು ಹೊಂದಿಕೆ ಆಗುವುದಿಲ್ಲ'
            : 'पासवर्ड मेल नहीं खाते'
        );
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.state || !formData.district || !formData.landSize) {
      setError(
        language === 'en'
          ? 'Please fill in all farm details'
          : language === 'ka'
          ? 'ದಯಕೊರೆ ಎಲ್ಲಾ ಕೃಷಿ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ'
          : 'कृपया सभी खेत विवरण भरें'
      );
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        state: formData.state,
        district: formData.district,
        landSize: parseFloat(formData.landSize),
      });

      // Store token and farmer data
      setToken(response.data.token);
      setFarmer(response.data.farmer);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = language === 'en' ? 'Create Account' : language === 'ka' ? 'ಖಾತೆ ರಚಿಸಿ' : 'खाता बनाएँ';
  const subtitle =
    language === 'en'
      ? 'Join Smart Farm Hub today'
      : language === 'ka'
      ? 'ಇಂದು ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮ್ ಹಬ್‌ಗೆ ಸೇರಿ'
      : 'आज ही स्मार्ट फार्म हब में शामिल हों';

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ];

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
              
              {/* Progress Bar */}
              <div className="flex space-x-2 mt-6">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      s <= step ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'en' ? 'Personal Information' : language === 'ka' ? 'ವ್যಕ್ತಿಗತ ಮಾಹಿತಿ' : 'व्यक्तिगत जानकारी'}
                  </h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'en' ? 'Full Name' : language === 'ka' ? 'ಪೂರ್ಣ ಹೆಸರು' : 'पूरा नाम'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Your Name' : language === 'ka' ? 'ನಿಮ್ಮ ಹೆಸರು' : 'आपका नाम'}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'en' ? 'Email' : language === 'ka' ? 'ಇಮೇಲ್' : 'ईमेल'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'en' ? 'Phone' : language === 'ka' ? 'ಫೋನ್' : 'फोन'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 mt-6"
                  >
                    {language === 'en' ? 'Next' : language === 'ka' ? 'ಮುಂದಿನ' : 'अगला'}
                  </button>
                </>
              )}

              {/* Step 2: Password */}
              {step === 2 && (
                <>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'en' ? 'Set Password' : language === 'ka' ? 'ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಿ' : 'पासवर्ड सेट करें'}
                  </h2>

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
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'en' ? 'Confirm Password' : language === 'ka' ? 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ' : 'पासवर्ड की पुष्टि करें'}
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400"
                    >
                      {language === 'en' ? 'Back' : language === 'ka' ? 'ಹಿಂದೆ' : 'पीछे'}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700"
                    >
                      {language === 'en' ? 'Next' : language === 'ka' ? 'ಮುಂದಿನ' : 'अगला'}
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Farm Details */}
              {step === 3 && (
                <>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'en' ? 'Farm Details' : language === 'ka' ? 'ಪ್ರವೇಶ ವಿವರಗಳು' : 'खेत का विवरण'}
                  </h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'en' ? 'State' : language === 'ka' ? 'ರಾಜ್ಯ' : 'राज्य'}
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    >
                      <option value="">
                        {language === 'en' ? 'Select State' : language === 'ka' ? 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ' : 'राज्य चुनें'}
                      </option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'en' ? 'District' : language === 'ka' ? 'ಜಿಲ್ಲೆ' : 'जिला'}
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Your District' : language === 'ka' ? 'ನಿಮ್ಮ ಜಿಲ್ಲೆ' : 'आपका जिला'}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'en' ? 'Land Size (Hectares)' : language === 'ka' ? 'ಭೂಮಿಯ ಗಾತ್ರ (ಹೆ)' : 'भूमि का आकार (हे)'}
                    </label>
                    <input
                      type="number"
                      name="landSize"
                      value={formData.landSize}
                      onChange={handleChange}
                      placeholder="0.5"
                      min="0.5"
                      step="0.5"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400"
                    >
                      {language === 'en' ? 'Back' : language === 'ka' ? 'ಹಿಂದೆ' : 'पीछे'}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {loading
                        ? language === 'en'
                          ? 'Creating...'
                          : language === 'ka'
                          ? 'ರಚನೆಯಾಗುತ್ತಿದೆ...'
                          : 'बनाया जा रहा है...'
                        : language === 'en'
                        ? 'Create Account'
                        : language === 'ka'
                        ? 'ಖಾತೆ ರಚಿಸಿ'
                        : 'खाता बनाएँ'}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {language === 'en'
                  ? 'Already have an account? '
                  : language === 'ka'
                  ? 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ? '
                  : 'पहले से खाता है? '}
                <Link
                  href="/auth/login"
                  className="text-green-600 font-bold hover:text-green-700"
                >
                  {language === 'en' ? 'Login' : language === 'ka' ? 'ಲಾಗಿನ್' : 'लॉगिन'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
