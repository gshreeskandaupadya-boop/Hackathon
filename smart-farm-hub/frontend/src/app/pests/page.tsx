'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { pestAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface Pest {
  id: string;
  name: string;
  location: { district: string };
  affectedCrops: string[];
  severity: 'low' | 'medium' | 'high';
  reportedCases: number;
  riskProbability: number;
  preventiveMeasures: string[];
}

export default function PestsPage() {
  const [pests, setPests] = useState<Pest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { language } = useAppStore();

  useEffect(() => {
    const loadPests = async () => {
      try {
        setLoading(true);
        
        // Get user's current location or use default coordinates
        let latitude = 15.3173; // Default: India center
        let longitude = 75.7139;
        let radius = 50;

        if (typeof window !== 'undefined' && navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
          } catch (err) {
            // Use default coordinates if geolocation fails
            console.log('Using default location for pest map');
          }
        }

        const response = await pestAPI.getMap(latitude, longitude, radius);
        setPests(response.data.pests);
      } catch (err: any) {
        setError(err.message || 'Failed to load pest data');
      } finally {
        setLoading(false);
      }
    };

    loadPests();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return '✓';
      case 'medium':
        return '⚠';
      case 'high':
        return '⛔';
      default:
        return '?';
    }
  };

  const pageTitle = language === 'en' ? 'Pest & Disease Map' : language === 'ka' ? 'ಕೀಟ ಮತ್ತು ರೋಗ ನಕ್ಷೆ' : 'कीट और रोग मानचित्र';
  const subtitle =
    language === 'en'
      ? 'Real-time pest and disease alerts for your area'
      : language === 'ka'
      ? 'ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಸಮಯೋಚಿತ ಕೀಟ ಮತ್ತು ರೋಗ ಎಚ್ಚರಿಕೆಗಳು'
      : 'आपके क्षेत्र के लिए वास्तविक समय के कीट और रोग अलर्ट';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Pests List */}
        {!loading && !error && (
          <div className="space-y-6">
            {pests.map((pest) => (
              <div
                key={pest.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedId(expandedId === pest.id ? null : pest.id)}
                  className="cursor-pointer p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{pest.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(pest.severity)}`}>
                          {getSeverityIcon(pest.severity)} {pest.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {language === 'en' ? 'Location: ' : language === 'ka' ? 'ಸ್ಥಳ: ' : 'स्थान: '}
                        <span className="font-semibold">{pest.location.district}</span>
                      </p>
                    </div>

                    {/* Risk Probability */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">
                        {language === 'en' ? 'Risk' : language === 'ka' ? 'ಅಪಾಯ' : 'जोखिम'}
                      </p>
                      <p className="text-3xl font-bold text-red-600">{pest.riskProbability}%</p>
                    </div>
                  </div>

                  {/* Affected Crops */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      {language === 'en'
                        ? 'Affected Crops'
                        : language === 'ka'
                        ? 'ಪ್ರಭಾವಿತ ಬೆಳೆಗಳು'
                        : 'प्रभावित फसलें'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pest.affectedCrops.map((crop, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cases */}
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-gray-600">
                      {language === 'en'
                        ? 'Reported Cases'
                        : language === 'ka'
                        ? 'ವರದಿ ಮಾಡಲಾದ ಕೇಸುಗಳು'
                        : 'रिपोर्ट किए गए मामले'}
                    </span>
                    <span className="ml-auto font-bold text-lg text-gray-900">{pest.reportedCases}</span>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === pest.id && (
                  <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
                    <h4 className="font-bold text-lg text-gray-900 mb-4">
                      {language === 'en'
                        ? 'Prevention & Control Measures'
                        : language === 'ka'
                        ? 'ತಡೆಗಟ್ಟು ಮತ್ತು ನಿಯಂತ್ರಣ ಕ್ರಮಗಳು'
                        : 'रोकथाम और नियंत्रण उपाय'}
                    </h4>

                    <ul className="space-y-2">
                      {pest.preventiveMeasures.map((measure, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <span className="text-green-600 font-bold mr-3">✓</span>
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        {language === 'en' ? 'Get Help' : language === 'ka' ? 'ಸಹಾಯ ಪಡೆಯಿರಿ' : 'मदद लें'}
                      </button>
                      <button className="bg-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        {language === 'en' ? 'Report Sighting' : language === 'ka' ? 'ವೀಕ್ಷಣೆ ವರದಿ ಮಾಡಿ' : 'देखना रिपोर्ट करें'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && pests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {language === 'en'
                ? 'No active pest alerts in your area'
                : language === 'ka'
                ? 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಯಾವುದೇ ಸಕ್ರಿಯ ಕೀಟ ಎಚ್ಚರಿಕೆಗಳು ಇಲ್ಲ'
                : 'आपके क्षेत्र में कोई सक्रिय कीट चेतावनी नहीं'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
