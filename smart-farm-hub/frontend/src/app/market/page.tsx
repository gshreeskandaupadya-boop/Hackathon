'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { marketAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface MarketPrice {
  mandi: string;
  state: string;
  pricePerKg: number;
  trend: 'up' | 'down' | 'stable';
  priceChange24h: number;
  distance: number;
  transportCost: number;
  profitIfSoldToday: number;
}

export default function MarketPage() {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('sugarcane');
  const [prediction, setPrediction] = useState<any>(null);
  const { language } = useAppStore();

  const crops = ['sugarcane', 'cotton', 'groundnut', 'maize'];

  useEffect(() => {
    const loadPrices = async () => {
      try {
        setLoading(true);
        const response = await marketAPI.getPrices({ crop: selectedCrop });
        setPrices(response.data.prices);

        // Load prediction
        const predRes = await marketAPI.predictPrice({ crop: selectedCrop, days: 14 });
        setPrediction(predRes.data.prediction);
      } catch (err: any) {
        setError(err.message || 'Failed to load market data');
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, [selectedCrop]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const pageTitle = language === 'en' ? 'Market Prices' : language === 'ka' ? 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು' : 'बाजार कीमतें';
  const subtitle =
    language === 'en'
      ? 'Check current mandi prices and price predictions'
      : language === 'ka'
      ? 'ಪ್ರಸ್ತುತ ಮಂಡಿ ಬೆಲೆಗಳು ಮತ್ತು ಬೆಲೆ ಮುನ್ನಡೆ ಪರಿಶೀಲಿಸಿ'
      : 'वर्तमान मंडी कीमतें और मूल्य पूर्वानुमान जांचें';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Crop Selector */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            {language === 'en' ? 'Select Crop' : language === 'ka' ? 'ಬೆಳೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ' : 'फसल चुनें'}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {crops.map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`px-4 py-2 rounded font-medium transition-colors capitalize ${
                  selectedCrop === crop
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Card */}
        {prediction && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Price Prediction' : language === 'ka' ? 'ಬೆಲೆ ಮುನ್ನಡೆ' : 'मूल्य पूर्वानुमान'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-20 rounded p-4">
                <p className="text-sm opacity-90">
                  {language === 'en' ? 'Current Price' : language === 'ka' ? 'ಪ್ರಸ್ತುತ ಬೆಲೆ' : 'वर्तमान कीमत'}
                </p>
                <p className="text-2xl font-bold mt-1">₹{prediction.currentPrice}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-4">
                <p className="text-sm opacity-90">
                  {language === 'en' ? '7-Day Forecast' : language === 'ka' ? '7-ದಿನ ಮುನ್ನಡೆ' : '7-दिन पूर्वानुमान'}
                </p>
                <p className="text-2xl font-bold mt-1">₹{prediction.predictedPrice7Days}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-4">
                <p className="text-sm opacity-90">
                  {language === 'en' ? '14-Day Forecast' : language === 'ka' ? '14-ದಿನ ಮುನ್ನಡೆ' : '14-दिन पूर्वानुमान'}
                </p>
                <p className="text-2xl font-bold mt-1">₹{prediction.predictedPrice14Days}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-4">
                <p className="text-sm opacity-90">
                  {language === 'en' ? 'Confidence' : language === 'ka' ? 'ಆತ್ಮವಿಶ್ವಾಸ' : 'विश्वास'}
                </p>
                <p className="text-2xl font-bold mt-1">{prediction.confidence}%</p>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-90 font-semibold">{prediction.recommendation}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Mandi Prices */}
        {!loading && !error && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'en'
                ? 'Current Mandi Prices'
                : language === 'ka'
                ? 'ಪ್ರಸ್ತುತ ಮಂಡಿ ಬೆಲೆಗಳು'
                : 'वर्तमान मंडी कीमतें'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prices.map((price, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{price.mandi}</h4>
                      <p className="text-sm text-gray-600">{price.state}</p>
                    </div>
                    <div className={`text-3xl ${getTrendColor(price.trend)}`}>
                      {getTrendIcon(price.trend)}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Price per Kg' : language === 'ka' ? 'ಪ್ರತಿ ಕೆಜಿ ಬೆಲೆ' : 'प्रति किग्रा कीमत'}
                    </p>
                    <p className="text-3xl font-bold text-green-600">₹{price.pricePerKg}</p>
                    <p className={`text-sm mt-1 ${price.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {price.priceChange24h >= 0 ? '+' : ''}{price.priceChange24h}% {language === 'en' ? 'in 24h' : language === 'ka' ? '24h ರಲ್ಲಿ' : '24h में'}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-600">
                        {language === 'en' ? 'Distance' : language === 'ka' ? 'ದೂರ' : 'दूरी'}
                      </p>
                      <p className="font-semibold text-gray-900">{price.distance} km</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-600">
                        {language === 'en' ? 'Transport' : language === 'ka' ? 'ಸಾರಿಗೆ' : 'परिवहन'}
                      </p>
                      <p className="font-semibold text-gray-900">₹{price.transportCost}</p>
                    </div>
                  </div>

                  {/* Profit */}
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <p className="text-xs text-green-700">
                      {language === 'en'
                        ? 'Profit if sold today'
                        : language === 'ka'
                        ? 'ಇಂದು ಮಾರುತ್ತಿದ್ದರೆ ಲಾಭ'
                        : 'आज बेचने पर लाभ'}
                    </p>
                    <p className="text-2xl font-bold text-green-700 mt-1">
                      ₹{price.profitIfSoldToday.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && prices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {language === 'en'
                ? 'No market data available'
                : language === 'ka'
                ? 'ಯಾವುದೇ ಮಾರುಕಟ್ಟೆ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ'
                : 'कोई बाजार डेटा उपलब्ध नहीं है'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
