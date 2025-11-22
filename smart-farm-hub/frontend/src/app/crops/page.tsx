'use client';

import { useEffect, useState } from 'react';
import CropCard from '@/components/CropCard';
import { cropAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface Crop {
  id: string;
  name: string;
  nameInKannada?: string;
  estimatedProfit: number;
  estimatedYield: number;
  costOfCultivation: number;
  marketPrice: number;
  waterRequirement: number;
  risk: 'Low' | 'Medium' | 'High';
  soilTypes: string[];
  seasonality: string[];
  sowingDate: string;
  harvestingDate: string;
  pests?: string[];
  diseases?: string[];
}

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [filteredCrops, setFilteredCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [sortBy, setSortBy] = useState<'profit' | 'risk' | 'yield'>('profit');
  const { language } = useAppStore();

  useEffect(() => {
    const loadCrops = async () => {
      try {
        setLoading(true);
        const response = await cropAPI.getAll();
        setCrops(response.data.crops);
      } catch (err: any) {
        setError(err.message || 'Failed to load crops');
      } finally {
        setLoading(false);
      }
    };

    loadCrops();
  }, []);

  useEffect(() => {
    let filtered = crops;

    // Filter by risk
    if (selectedRisk !== 'All') {
      filtered = filtered.filter(c => c.risk === selectedRisk);
    }

    // Sort
    if (sortBy === 'profit') {
      filtered.sort((a, b) => (b.estimatedProfit - a.estimatedProfit));
    } else if (sortBy === 'risk') {
      const riskOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };
      filtered.sort((a, b) => riskOrder[a.risk as keyof typeof riskOrder] - riskOrder[b.risk as keyof typeof riskOrder]);
    } else if (sortBy === 'yield') {
      filtered.sort((a, b) => (b.estimatedYield - a.estimatedYield));
    }

    setFilteredCrops(filtered);
  }, [crops, selectedRisk, sortBy]);

  const pageTitle = language === 'en' ? 'Crops' : language === 'ka' ? 'ಬೆಳೆಗಳು' : 'फसलें';
  const subtitle =
    language === 'en'
      ? 'Compare crops and find the best option for your farm'
      : language === 'ka'
      ? 'ಬೆಳೆಗಳನ್ನು ಹೋಲಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಪ್ರವೇಶದ ಸಿದ್ಧ ಆಯ್ಕೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ'
      : 'फसलों की तुलना करें और अपने खेत के लिए सर्वश्रेष्ठ विकल्प खोजें';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risk Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Filter by Risk' : language === 'ka' ? 'ಅಪಾಯದಿಂದ ಸೋಸುವಿ' : 'जोखिम से फ़िल्टर करें'}
              </label>
              <div className="flex space-x-2">
                {['All', 'Low', 'Medium', 'High'].map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setSelectedRisk(risk as any)}
                    className={`px-4 py-2 rounded font-medium transition-colors ${
                      selectedRisk === risk
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {risk}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Sort By' : language === 'ka' ? 'ವಿಂಗಡಿಸಿ' : 'द्वारा क्रमबद्ध करें'}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="profit">
                  {language === 'en' ? 'Highest Profit' : language === 'ka' ? 'ಅತ್ಯಧಿಕ ಲಾಭ' : 'उच्चतम लाभ'}
                </option>
                <option value="yield">
                  {language === 'en' ? 'Highest Yield' : language === 'ka' ? 'ಅತ್ಯಧಿಕ ಇಳುವರಿ' : 'उच्चतम उपज'}
                </option>
                <option value="risk">
                  {language === 'en' ? 'Lowest Risk' : language === 'ka' ? 'ಕಡಿಮೆ ಅಪಾಯ' : 'कम जोखिम'}
                </option>
              </select>
            </div>
          </div>
        </div>

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

        {/* Crops Grid */}
        {!loading && !error && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {language === 'en'
                ? `Showing ${filteredCrops.length} of ${crops.length} crops`
                : language === 'ka'
                ? `${crops.length} ಬೆಳೆಗಳಲ್ಲಿ ${filteredCrops.length} ತೋರಿಸುತ್ತಿದೆ`
                : `${crops.length} फसलों में से ${filteredCrops.length} दिखा रहे हैं`}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCrops.map((crop) => (
                <CropCard
                  key={crop.id}
                  name={crop.name}
                  nameInKannada={crop.nameInKannada}
                  estimatedProfit={crop.estimatedProfit}
                  estimatedYield={crop.estimatedYield}
                  costOfCultivation={crop.costOfCultivation}
                  marketPrice={crop.marketPrice}
                  waterRequirement={crop.waterRequirement}
                  risk={crop.risk}
                  sowingDate={crop.sowingDate}
                  harvestingDate={crop.harvestingDate}
                  onClick={() => {
                    // TODO: Navigate to crop details page
                    console.log(`Clicked on ${crop.name}`);
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {language === 'en'
                ? 'No crops match your filters'
                : language === 'ka'
                ? 'ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಬೆಳೆಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತವೆ ಬೆಳೆಗಳೇ ಇಲ್ಲ'
                : 'आपके फ़िल्टर से कोई फसल मेल नहीं खाती'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
