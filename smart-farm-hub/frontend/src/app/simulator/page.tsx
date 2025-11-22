'use client';

import { useState, useEffect } from 'react';
import { recommendAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface SimulationResult {
  name: string;
  expectedProfit: number;
  costOfCultivation: number;
  yield: number;
  waterRequirement: number;
  bestSowingDate: string;
  bestHarvestingDate: string;
  riskScore: number;
}

export default function SimulatorPage() {
  const [landSize, setLandSize] = useState<number>(1);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['sugarcane', 'cotton', 'groundnut']);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useAppStore();

  const availableCrops = [
    { value: 'sugarcane', label: 'Sugarcane (ಸೆಳೆ / गन्ना)' },
    { value: 'cotton', label: 'Cotton (ಹೆಂಪೆ / कपास)' },
    { value: 'groundnut', label: 'Groundnut (ಕಡಲೆ / मूंगफली)' },
    { value: 'maize', label: 'Maize (ಜೋಳ / मक्का)' },
  ];

  const handleSimulate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await recommendAPI.simulate({
        crop1: selectedCrops[0] || 'sugarcane',
        crop2: selectedCrops[1] || 'cotton',
        crop3: selectedCrops[2] || 'groundnut',
        landSizeHectares: landSize,
      });

      setResults(response.data.simulation);
    } catch (err: any) {
      setError(err.message || 'Failed to run simulation');
    } finally {
      setLoading(false);
    }
  };

  const handleCropToggle = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter(c => c !== crop));
    } else if (selectedCrops.length < 3) {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const pageTitle = language === 'en' ? 'What-If Simulator' : language === 'ka' ? 'ಎದುರಾಳಿ ಸಿಮ್ಯುಲೇಟರ್' : 'क्या-अगर सिमुलेटर';
  const subtitle =
    language === 'en'
      ? 'Compare up to 3 crops with your land size to maximize profit'
      : language === 'ka'
      ? 'ನಿಮ್ಮ ಭೂಮಿಯ ಗಾತ್ರದೊಂದಿಗೆ 3 ಬೆಳೆಗಳನ್ನು ಹೋಲಿಸಿ ಲಾಭವನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಿ'
      : 'अपनी भूमि के आकार के साथ 3 फसलों की तुलना करें';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Land Size Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                {language === 'en'
                  ? 'Your Land Size (Hectares)'
                  : language === 'ka'
                  ? 'ನಿಮ್ಮ ಭೂಮಿಯ ಗಾತ್ರ (ಹೆಕ್ಟೇರ್‌)'
                  : 'आपकी भूमि का आकार (हेक्टेयर)'}
              </label>
              <input
                type="number"
                min="0.5"
                max="100"
                step="0.5"
                value={landSize}
                onChange={(e) => setLandSize(parseFloat(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-lg focus:outline-none focus:border-green-600"
              />
              <p className="text-sm text-gray-600 mt-2">
                {language === 'en'
                  ? 'Min: 0.5 hectares, Max: 100 hectares'
                  : language === 'ka'
                  ? 'ಕನಿಷ್ಠ: 0.5 ಹೆಕ್ಟೇರ್‌, ಗರಿಷ್ಠ: 100 ಹೆಕ್ಟೇರ್‌'
                  : 'न्यूनतम: 0.5 हेक्टेयर, अधिकतम: 100 हेक्टेयर'}
              </p>
            </div>

            {/* Selected Crops Summary */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                {language === 'en'
                  ? 'Selected Crops (Choose up to 3)'
                  : language === 'ka'
                  ? 'ಆಯ್ಕೆ ಮಾಡಿದ ಬೆಳೆಗಳು (3 ಗೆ ಮೇಲೆ)'
                  : 'चयनित फसलें (3 तक चुनें)'}
              </label>
              <div className="space-y-2">
                {selectedCrops.map((crop) => (
                  <div
                    key={crop}
                    className="flex items-center justify-between bg-green-100 rounded-lg p-3"
                  >
                    <span className="font-semibold text-green-900">{crop.charAt(0).toUpperCase() + crop.slice(1)}</span>
                    <button
                      onClick={() => handleCropToggle(crop)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crop Selection */}
          <div className="mt-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              {language === 'en' ? 'Add Crops to Compare' : language === 'ka' ? 'ಹೋಲಿಸಲು ಬೆಳೆಗಳನ್ನು ಸೇರಿಸಿ' : 'तुलना के लिए फसलें जोड़ें'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableCrops.map((crop) => (
                <button
                  key={crop.value}
                  onClick={() => handleCropToggle(crop.value)}
                  disabled={selectedCrops.length >= 3 && !selectedCrops.includes(crop.value)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    selectedCrops.includes(crop.value)
                      ? 'bg-green-600 text-white'
                      : selectedCrops.length >= 3
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-600'
                  }`}
                >
                  {crop.label.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Simulate Button */}
          <button
            onClick={handleSimulate}
            disabled={loading || selectedCrops.length === 0}
            className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⌛</span>
                {language === 'en' ? 'Simulating...' : language === 'ka' ? 'ಸಿಮ್ಯುಲೇಟ ಮಾಡುತ್ತಿರುವೆ...' : 'सिमुलेट किया जा रहा है...'}
              </span>
            ) : (
              language === 'en'
                ? 'Run Simulation'
                : language === 'ka'
                ? 'ಸಿಮ್ಯುಲೇಶನ್ ರನ್ ಮಾಡಿ'
                : 'सिमुलेशन चलाएं'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Simulation Results' : language === 'ka' ? 'ಸಿಮ್ಯುಲೇಶನ್ ಫಲಿತಾಂಶಗಳು' : 'सिमुलेशन परिणाम'}
            </h2>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(results).map((cropKey) => {
                const crop = results[cropKey];
                const netProfit = crop.expectedProfit - crop.costOfCultivation;
                const roi = ((netProfit / crop.costOfCultivation) * 100).toFixed(1);

                return (
                  <div key={cropKey} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                      <h3 className="text-2xl font-bold">{crop.name}</h3>
                      <p className="text-green-100 text-sm mt-1">{cropKey}</p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Profit */}
                      <div className="border-b pb-4">
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? 'Net Profit'
                            : language === 'ka'
                            ? 'ನಿವ್ವಳ ಲಾಭ'
                            : 'शुद्ध लाभ'}
                        </p>
                        <p className="text-3xl font-bold text-green-600">₹{(netProfit / 100000).toFixed(2)}L</p>
                        <p className="text-xs text-gray-500 mt-1">ROI: {roi}%</p>
                      </div>

                      {/* Cost */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 uppercase">
                            {language === 'en' ? 'Cost' : language === 'ka' ? 'ವೆಚ್ಚ' : 'लागत'}
                          </p>
                          <p className="text-lg font-bold text-gray-900">₹{(crop.costOfCultivation / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase">
                            {language === 'en' ? 'Revenue' : language === 'ka' ? 'ರಾಜಸ್ವ' : 'राजस्व'}
                          </p>
                          <p className="text-lg font-bold text-gray-900">₹{(crop.expectedProfit / 1000).toFixed(0)}K</p>
                        </div>
                      </div>

                      {/* Yield & Water */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-blue-700 font-semibold">
                            {language === 'en' ? 'Yield' : language === 'ka' ? 'ಇಳುವರಿ' : 'उपज'}
                          </p>
                          <p className="text-lg font-bold text-blue-900">{crop.yield} tons</p>
                        </div>
                        <div className="bg-cyan-50 rounded-lg p-3">
                          <p className="text-xs text-cyan-700 font-semibold">
                            {language === 'en' ? 'Water' : language === 'ka' ? 'ನೀರು' : 'पानी'}
                          </p>
                          <p className="text-lg font-bold text-cyan-900">{crop.waterRequirement} mm</p>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="bg-amber-50 rounded-lg p-3">
                        <p className="text-xs text-amber-700 font-semibold mb-2">
                          {language === 'en' ? 'Sowing to Harvest' : language === 'ka' ? 'ಬಿತ್ತುವುದರಿಂದ ಸುಗ್ಗಿ' : 'बुवाई से कटाई'}
                        </p>
                        <p className="text-sm text-gray-800">
                          {crop.bestSowingDate.split('T')[0]} → {crop.bestHarvestingDate.split('T')[0]}
                        </p>
                      </div>

                      {/* Risk */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">
                          {language === 'en' ? 'Risk Score' : language === 'ka' ? 'ಅಪಾಯ ಸ್ಕೋರ್' : 'जोखिम स्कोर'}
                        </span>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                            <div
                              className={`h-full ${
                                crop.riskScore < 30
                                  ? 'bg-green-500'
                                  : crop.riskScore < 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${crop.riskScore}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-gray-900">{crop.riskScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Profit Difference */}
            {results.profitDifference && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'en' ? 'Profit Comparison' : language === 'ka' ? 'ಲಾಭ ಹೋಲಿಕೆ' : 'लाभ तुलना'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(results.profitDifference).map(([key, value]: [string, any]) => (
                    <div key={key} className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className={`text-2xl font-bold ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{(value / 100000).toFixed(2)}L
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
