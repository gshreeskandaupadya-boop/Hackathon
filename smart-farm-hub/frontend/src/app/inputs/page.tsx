'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { cropsAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface InputOptimizer {
  crop: string;
  currentCost: number;
  optimizedCost: number;
  savings: number;
  savingsPercent: number;
  recommendations: {
    input: string;
    currentQty: number;
    optimizedQty: number;
    savings: number;
  }[];
}

export default function InputsPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [currentCost, setCurrentCost] = useState<number>(100);
  const [results, setResults] = useState<InputOptimizer | null>(null);
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useAppStore();

  const labels = {
    en: {
      title: 'Input Cost Optimizer',
      subtitle: 'Minimize input costs while maintaining yield',
      selectCrop: 'Select Crop',
      currentCost: 'Current Input Cost (₹/hectare)',
      optimize: 'Optimize Inputs',
      results: 'Optimization Results',
      savings: 'Potential Savings',
      recommendation: 'Recommendations',
      input: 'Input Type',
      current: 'Current Qty',
      optimized: 'Optimized Qty',
      perHectare: 'per hectare',
      noData: 'No data available',
      error: 'Failed to load crops',
    },
    ka: {
      title: 'ಇನ್ಪುಟ್ ವೆಚ್ಚ ಆಪ್ಟಿಮೈজರ್',
      subtitle: 'ವರ್ಣನೆಯ ಪ್ರಮಾಣವನ್ನು ಕಾಪಾಡುವ ಮೂಲಕ ಇನ್ಪುಟ್ ವೆಚ್ಚ ಕಡಿಮೆ ಮಾಡಿ',
      selectCrop: 'ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ',
      currentCost: 'ಪ್ರಸ್ತುತ ಇನ್ಪುಟ್ ವೆಚ್ಚ (₹/ಹೆಕ್ಟೇರ್)',
      optimize: 'ಇನ್ಪುಟ್‌ಗಳನ್ನು ಆಪ್ಟಿಮೈಜ್ ಮಾಡಿ',
      results: 'ಆಪ್ಟಿಮೈজೇಶನ್ ಫಲಿತಾಂಶಗಳು',
      savings: 'ಸಂಭವ್ಯ ಬಿತ್ತಲೆ',
      recommendation: 'ಶಿಫಾರಿಶುಗಳು',
      input: 'ಇನ್ಪುಟ್ ಪ್ರಕಾರ',
      current: 'ಪ್ರಸ್ತುತ ಪ್ರಮಾಣ',
      optimized: 'ಆಪ್ಟಿಮೈಜ್ಡ್ ಪ್ರಮಾಣ',
      perHectare: 'ಪ್ರತಿ ಹೆಕ್ಟೇರ್',
      noData: 'ಯಾವುದೇ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ',
      error: 'ಬೆಳೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲ',
    },
    hi: {
      title: 'इनपुट लागत ऑप्टिमाइज़र',
      subtitle: 'पैदावार को बनाए रखते हुए इनपुट लागत को कम करें',
      selectCrop: 'फसल का चयन करें',
      currentCost: 'वर्तमान इनपुट लागत (₹/हेक्टेयर)',
      optimize: 'इनपुट को ऑप्टिमाइज़ करें',
      results: 'अनुकूलन परिणाम',
      savings: 'संभावित बचत',
      recommendation: 'सिफारिशें',
      input: 'इनपुट प्रकार',
      current: 'वर्तमान मात्रा',
      optimized: 'अनुकूलित मात्रा',
      perHectare: 'प्रति हेक्टेयर',
      noData: 'कोई डेटा उपलब्ध नहीं',
      error: 'फसलों को लोड करने में विफल',
    },
  };

  const t = labels[language as keyof typeof labels] || labels.en;

  useEffect(() => {
    const loadCrops = async () => {
      try {
        setLoading(true);
        const response = await cropsAPI.getAll();
        setCrops(response.data.items);
        if (response.data.items.length > 0) {
          setSelectedCrop(response.data.items[0].id);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCrops();
  }, []);

  const handleOptimize = async () => {
    if (!selectedCrop) return;

    try {
      setLoading(true);
      const response = await cropsAPI.getById(selectedCrop);
      const crop = response.data.item;

      // Calculate optimized inputs (simulated)
      const optimizedCost = currentCost * 0.75; // 25% reduction
      const savings = currentCost - optimizedCost;

      const recommendations = [
        {
          input: 'Nitrogen Fertilizer',
          currentQty: currentCost * 0.3,
          optimizedQty: currentCost * 0.25,
          savings: currentCost * 0.05,
        },
        {
          input: 'Phosphorus Fertilizer',
          currentQty: currentCost * 0.2,
          optimizedQty: currentCost * 0.18,
          savings: currentCost * 0.02,
        },
        {
          input: 'Potassium Fertilizer',
          currentQty: currentCost * 0.15,
          optimizedQty: currentCost * 0.14,
          savings: currentCost * 0.01,
        },
        {
          input: 'Pesticides',
          currentQty: currentCost * 0.25,
          optimizedQty: currentCost * 0.18,
          savings: currentCost * 0.07,
        },
      ];

      setResults({
        crop: crop.name,
        currentCost,
        optimizedCost,
        savings,
        savingsPercent: (savings / currentCost) * 100,
        recommendations,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && crops.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{t.error}: {error}</p>
          </div>
        )}

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.selectCrop}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a crop...</option>
              {crops.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.currentCost}
            </label>
            <input
              type="number"
              value={currentCost}
              onChange={(e) => setCurrentCost(Number(e.target.value))}
              min="0"
              step="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Optimize Button */}
        <button
          onClick={handleOptimize}
          disabled={!selectedCrop || loading}
          className="w-full md:w-auto bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 mb-8"
        >
          {loading ? 'Optimizing...' : t.optimize}
        </button>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.results}</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Current Cost</p>
                <p className="text-3xl font-bold text-blue-600">₹{results.currentCost.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Optimized Cost</p>
                <p className="text-3xl font-bold text-green-600">₹{Math.round(results.optimizedCost).toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">{t.savings}</p>
                <p className="text-3xl font-bold text-emerald-600">₹{Math.round(results.savings).toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-2">{results.savingsPercent.toFixed(1)}% reduction</p>
              </div>
            </div>

            {/* Recommendations Table */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.recommendation}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.input}</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.current} ({t.perHectare})</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.optimized} ({t.perHectare})</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.savings}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.recommendations.map((rec, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{rec.input}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹{rec.currentQty.toFixed(0)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹{rec.optimizedQty.toFixed(0)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-green-600">₹{rec.savings.toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>Tip:</strong> These recommendations are based on optimal input usage patterns. Apply changes gradually and monitor crop health closely.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
