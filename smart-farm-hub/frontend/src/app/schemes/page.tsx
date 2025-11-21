'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { schemeAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface Scheme {
  id: string;
  name: string;
  nameInKannada?: string;
  description: string;
  subsidy: number;
  applicationDeadline: string;
  requiredDocuments: string[];
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [missedBenefits, setMissedBenefits] = useState<any>(null);
  const { language } = useAppStore();

  useEffect(() => {
    const loadSchemes = async () => {
      try {
        setLoading(true);
        const response = await schemeAPI.getEligible();
        setSchemes(response.data.schemes);

        // Load missed benefits
        const missedRes = await schemeAPI.getMissedBenefits();
        setMissedBenefits(missedRes.data.missedBenefits);
      } catch (err: any) {
        setError(err.message || 'Failed to load schemes');
      } finally {
        setLoading(false);
      }
    };

    loadSchemes();
  }, []);

  const handleApply = async (schemeId: string) => {
    try {
      await schemeAPI.apply(schemeId);
      alert('Application submitted successfully!');
    } catch (err: any) {
      alert('Failed to submit application: ' + err.message);
    }
  };

  const pageTitle = language === 'en' ? 'Government Schemes' : language === 'ka' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' : 'सरकारी योजनाएँ';
  const subtitle =
    language === 'en'
      ? 'Check eligible schemes and apply for subsidies'
      : language === 'ka'
      ? 'ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸಬ್ಸಿಡಿಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ'
      : 'पात्र योजनाएँ देखें और अनुदान के लिए आवेदन करें';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Missed Benefits Alert */}
        {missedBenefits && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800">
                  {language === 'en' ? 'Missed Benefits' : language === 'ka' ? 'ತಪ್ಪಿಸಿದ ಪ್ರಯೋಜನಗಳು' : 'मिसेड लाभ'}
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  {language === 'en'
                    ? `You have missed ₹${missedBenefits.totalMissedSubsidy.toLocaleString()} in subsidies. Review the schemes below to apply now.`
                    : language === 'ka'
                    ? `ನೀವು ₹${missedBenefits.totalMissedSubsidy.toLocaleString()} ಅನುದಾನವನ್ನು ತಪ್ಪಿಸಿದ್ದೀರಿ. ಈಗ ಬರಹಿಸಲು ಕೆಳಗಿನ ಯೋಜನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.`
                    : `आपने ₹${missedBenefits.totalMissedSubsidy.toLocaleString()} अनुदान को मिस किया है। अभी आवेदन करने के लिए नीचे दी गई योजनाओं की समीक्षा करें।`}
                </p>
              </div>
            </div>
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

        {/* Schemes List */}
        {!loading && !error && (
          <div className="space-y-6">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div
                  onClick={() => setExpandedId(expandedId === scheme.id ? null : scheme.id)}
                  className="cursor-pointer p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{scheme.name}</h3>
                      {scheme.nameInKannada && (
                        <p className="text-sm text-gray-600 mt-1">{scheme.nameInKannada}</p>
                      )}
                      <p className="text-gray-700 mt-2">{scheme.description}</p>

                      {/* Key Info */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Subsidy Amount' : language === 'ka' ? 'ಅನುದಾನ ಮೊತ್ತ' : 'अनुदान राशि'}
                          </p>
                          <p className="text-2xl font-bold text-green-600">₹{scheme.subsidy.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Application Deadline' : language === 'ka' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಅವಧಿ' : 'आवेदन की अंतिम तारीख'}
                          </p>
                          <p className="font-semibold text-gray-900">{new Date(scheme.applicationDeadline).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <div className="ml-4">
                      <svg
                        className={`w-6 h-6 text-gray-500 transition-transform ${
                          expandedId === scheme.id ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === scheme.id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {language === 'en'
                        ? 'Required Documents'
                        : language === 'ka'
                        ? 'ಅಗತ್ಯವಾದ ದಾಖಲೆಗಳು'
                        : 'आवश्यक दस्तावेज़'}
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {scheme.requiredDocuments.map((doc, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                          {doc}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleApply(scheme.id)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                    >
                      {language === 'en' ? 'Apply Now' : language === 'ka' ? 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : 'अभी आवेदन करें'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && schemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {language === 'en'
                ? 'No schemes found'
                : language === 'ka'
                ? 'ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ'
                : 'कोई योजना नहीं मिली'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
