'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
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
  sowingDate: string;
  harvestingDate: string;
}

export default function Dashboard() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const pageTitle = language === 'en' ? 'Dashboard' : language === 'ka' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್' : 'डैशबोर्ड';
  const subtitle =
    language === 'en'
      ? 'Explore crops and their profitability'
      : language === 'ka'
      ? 'ಬೆಳೆಗಳು ಮತ್ತು ಅವುಗಳ ಲಾಭ ಅನ್ವೇಷಿಸಿ'
      : 'फसलें और उनकी लाभप्रदता का अन्वेषण करें';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <p className="text-xl text-gray-600">{subtitle}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops.map((crop) => (
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
                onClick={() => console.log(`Clicked on ${crop.name}`)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && crops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {language === 'en'
                ? 'No crops found'
                : language === 'ka'
                ? 'ಬೆಳೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ'
                : 'कोई फसल नहीं मिली'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
