'use client';

import { useEffect, useState } from 'react';
import { weatherAPI, cropsAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface IrrigationSchedule {
  month: string;
  waterNeeded: number;
  rainfall: number;
  irrigationRequired: number;
  frequency: number;
  timing: string;
}

export default function IrrigationPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [weather, setWeather] = useState<any>(null);
  const [schedule, setSchedule] = useState<IrrigationSchedule[]>([]);
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, farmer } = useAppStore();

  const labels = {
    en: {
      title: 'Irrigation Assistant',
      subtitle: 'Smart watering schedule for your crops',
      selectCrop: 'Select Crop',
      waterNeed: 'Water Requirement',
      rainfall: 'Expected Rainfall',
      irrigation: 'Irrigation Needed',
      frequency: 'Frequency (days)',
      timing: 'Best Time to Irrigate',
      schedule: 'Monthly Irrigation Schedule',
      month: 'Month',
      waterNeeded: 'Water Needed (mm)',
      generateSchedule: 'Generate Schedule',
      noData: 'Select a crop to generate schedule',
      morning: 'Early Morning (5-7 AM)',
      evening: 'Late Evening (5-7 PM)',
      efficient: 'Efficient water usage',
      saveWater: 'Save water & money',
      error: 'Failed to load data',
    },
    ka: {
      title: 'ನೀರಾವರಣ ಸಹಾಯಕ',
      subtitle: 'ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಸ್ಮಾರ್ಟ್ ಪಾನೀಯ ವೇಳಾಪಟ್ಟಿ',
      selectCrop: 'ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ',
      waterNeed: 'ನೀರಿನ ಅವಶ್ಯಕತೆ',
      rainfall: 'ನಿರೀಕ್ಷಿತ ಮಳೆ',
      irrigation: 'ನೀರಾವರಣ ಅಗತ್ಯ',
      frequency: 'ಆವರ್ತನ (ದಿನಗಳು)',
      timing: 'ನೀರಾವರಣಕ್ಕೆ ಉತ್ತಮ ಸಮಯ',
      schedule: 'ಮಾಸಿಕ ನೀರಾವರಣ ವೇಳಾಪಟ್ಟಿ',
      month: 'ತಿಂಗಳು',
      waterNeeded: 'ಅಗತ್ಯವಿರುವ ನೀರು (ಮಿಮೀ)',
      generateSchedule: 'ವೇಳಾಪಟ್ಟಿ ರಚಿಸಿ',
      noData: 'ವೇಳಾಪಟ್ಟಿ ರಚಿಸಲು ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ',
      morning: 'ಮುಂಜಾನೆ (5-7 ಪೂರ್ವಾಹ್ನ)',
      evening: 'ಸಂಜೆ (5-7 ಸಂಜೆ)',
      efficient: 'ದಕ್ಷ ನೀರಿನ ಬಳಕೆ',
      saveWater: 'ನೀರು ಮತ್ತು ಹಣ ಉಳಿತಾಯ',
      error: 'ಡೇಟಾ ಲೋಡ್ ಮಾಡಲು ವಿಫಲ',
    },
    hi: {
      title: 'सिंचाई सहायक',
      subtitle: 'आपकी फसलों के लिए स्मार्ट सिंचाई समय सारणी',
      selectCrop: 'फसल का चयन करें',
      waterNeed: 'पानी की आवश्यकता',
      rainfall: 'अपेक्षित वर्षा',
      irrigation: 'सिंचाई आवश्यक',
      frequency: 'आवृत्ति (दिन)',
      timing: 'सिंचाई का सर्वोत्तम समय',
      schedule: 'मासिक सिंचाई समय सारणी',
      month: 'महीना',
      waterNeeded: 'आवश्यक जल (मिमी)',
      generateSchedule: 'समय सारणी बनाएं',
      noData: 'समय सारणी बनाने के लिए फसल चुनें',
      morning: 'जल्दी सुबह (5-7 पूर्वाह्न)',
      evening: 'देर शाम (5-7 शाम)',
      efficient: 'कुशल जल उपयोग',
      saveWater: 'पानी और पैसे बचाएं',
      error: 'डेटा लोड करने में विफल',
    },
  };

  const t = labels[language as keyof typeof labels] || labels.en;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const cropsResponse = await cropsAPI.getAll();
        const cropsData = cropsResponse.data.items || cropsResponse.data.crops || [];
        setCrops(cropsData);
        if (cropsData.length > 0) {
          setSelectedCrop(cropsData[0].id);
        }

        // Get weather data with state and district from farmer profile or defaults
        const state = farmer?.state || 'Karnataka';
        const district = farmer?.district || 'Bangalore';
        const weatherResponse = await weatherAPI.getCurrent(state, district);
        const weatherData = weatherResponse.data.item || weatherResponse.data || { temperature: 28, humidity: 65 };
        setWeather(weatherData);
      } catch (err: any) {
        console.error('Error loading irrigation data:', err);
        setError(err.message || 'Failed to load data');
        // Use default values if API fails
        setCrops([{ id: '1', name: 'Rice' }]);
        setSelectedCrop('1');
        setWeather({ temperature: 28, humidity: 65, rainfall: 0 });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [farmer, language]);

  const generateSchedule = async () => {
    if (!selectedCrop) return;

    try {
      setLoading(true);
      setError(null);
      const response = await cropsAPI.getById(selectedCrop);
      const crop = response.data.item || response.data.crops?.[0] || { name: 'Selected Crop' };

      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];

      const monthlyRainfall = [15, 20, 30, 50, 80, 150, 200, 180, 150, 60, 30, 15]; // Average rainfall in mm
      const waterRequirement = crop.waterRequirement || 600; // mm per season

      const scheduleData: IrrigationSchedule[] = months.map((month, idx) => {
        const rainfall = monthlyRainfall[idx];
        const monthlyWater = waterRequirement / 12;
        const irrigationNeeded = Math.max(0, monthlyWater - rainfall);
        const frequency = irrigationNeeded > 0 ? Math.ceil(irrigationNeeded / 25) : 0; // Assuming 25mm per irrigation
        const timing = idx % 2 === 0 ? t.morning : t.evening;

        return {
          month,
          waterNeeded: monthlyWater,
          rainfall,
          irrigationRequired: irrigationNeeded,
          frequency,
          timing,
        };
      });

      setSchedule(scheduleData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && crops.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

        {/* Current Weather */}
        {weather && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-blue-100">Temperature</p>
                <p className="text-3xl font-bold">{weather.temp}°C</p>
              </div>
              <div>
                <p className="text-blue-100">Rainfall</p>
                <p className="text-3xl font-bold">{weather.rainfall}mm</p>
              </div>
              <div>
                <p className="text-blue-100">Humidity</p>
                <p className="text-3xl font-bold">{weather.humidity}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Crop Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t.selectCrop}
          </label>
          <div className="flex gap-4 flex-wrap">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCrop === crop.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {crop.name}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Schedule Button */}
        <button
          onClick={generateSchedule}
          disabled={!selectedCrop || loading}
          className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 mb-8"
        >
          {loading ? 'Generating...' : t.generateSchedule}
        </button>

        {/* Schedule */}
        {schedule.length > 0 ? (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.schedule}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {schedule.map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.month}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.waterNeeded}:</span>
                      <span className="font-medium">{item.waterNeeded.toFixed(0)} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.rainfall}:</span>
                      <span className="font-medium">{item.rainfall.toFixed(0)} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.irrigation}:</span>
                      <span className="font-medium text-blue-600">{item.irrigationRequired.toFixed(0)} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.frequency}:</span>
                      <span className="font-medium">{item.frequency} times</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.timing}:</span>
                      <span className="font-medium">{item.timing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-900">
                  💧 <strong>{t.efficient}:</strong> Water in early morning or late evening to reduce evaporation.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  💰 <strong>{t.saveWater}:</strong> Use drip irrigation for better water efficiency.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">{t.noData}</p>
          </div>
        )}
      </div>
    </div>
  );
}
