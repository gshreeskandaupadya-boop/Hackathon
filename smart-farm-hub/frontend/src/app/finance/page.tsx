'use client';

import { useEffect, useState } from 'react';
import { cropsAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface FinancialAnalysis {
  cropName: string;
  initialCost: number;
  maintenanceCost: number;
  harvestCost: number;
  totalCost: number;
  expectedRevenue: number;
  profit: number;
  roi: number;
  loanAmount: number;
  interestRate: number;
  monthlyInstallment: number;
  totalRepayment: number;
  profitAfterLoan: number;
}

export default function FinancePage() {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [landSize, setLandSize] = useState<number>(1);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [analysis, setAnalysis] = useState<FinancialAnalysis | null>(null);
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useAppStore();

  const labels = {
    en: {
      title: 'Farm Finance Calculator',
      subtitle: 'Plan your farming finances and analyze returns',
      selectCrop: 'Select Crop',
      landSize: 'Land Size (hectares)',
      loanAmount: 'Loan Amount Needed (₹)',
      interestRate: 'Interest Rate (% per annum)',
      loanTerm: 'Loan Term (months)',
      calculate: 'Calculate Returns',
      analysis: 'Financial Analysis',
      costs: 'Cost Breakdown',
      initialCost: 'Initial Cost',
      maintenanceCost: 'Maintenance Cost',
      harvestCost: 'Harvest & Transport Cost',
      totalCost: 'Total Cost',
      revenue: 'Expected Revenue',
      profit: 'Profit',
      roi: 'Return on Investment',
      loanAnalysis: 'Loan Analysis',
      monthlyInstallment: 'Monthly Installment',
      totalRepayment: 'Total Repayment',
      profitAfterLoan: 'Profit After Loan',
      government: 'Government Subsidies',
      subsidyAvailable: 'Subsidy Available (40%)',
      netCost: 'Net Cost After Subsidy',
      breakEven: 'Break-Even Point',
      months: 'months',
      noData: 'Select a crop to analyze',
      error: 'Failed to calculate',
    },
    ka: {
      title: 'ಕೃಷಿ ಹಣಕಟ್ಟೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      subtitle: 'ನಿಮ್ಮ ಕೃಷಿ ಹಣಕಟ್ಟೆ ಯೋಜನೆ ಮಾಡಿ ಮತ್ತು ರಿಟರ್ನ್ ವಿಶ್ಲೇಷಣೆ ಮಾಡಿ',
      selectCrop: 'ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ',
      landSize: 'ಭೂಮಿ ಗಾತ್ರ (ಹೆಕ್ಟೇರ್)',
      loanAmount: 'ಅಗತ್ಯವಿರುವ ಸಾಲ (₹)',
      interestRate: 'ಬಡ್ಡಿ ದರ (% ವಾರ್ಷಿಕ)',
      loanTerm: 'ಸಾಲ ಅವಧಿ (ತಿಂಗಳು)',
      calculate: 'ರಿಟರ್ನ್ ಲೆಕ್ಕಹಾಕಿ',
      analysis: 'ಹಣಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ',
      costs: 'ವೆಚ್ಚ ವಿಭಜನೆ',
      initialCost: 'ಆರಂಭಿಕ ವೆಚ್ಚ',
      maintenanceCost: 'ನಿರ್ವಹಣೆ ವೆಚ್ಚ',
      harvestCost: 'ಸುಗ್ರಹಣೆ ಮತ್ತು ಸಾರಿಗೆ ವೆಚ್ಚ',
      totalCost: 'ಒಟ್ಟು ವೆಚ್ಚ',
      revenue: 'ನಿರೀಕ್ಷಿತ ಆದಾಯ',
      profit: 'ಲಾಭ',
      roi: 'ಮೂಲಧನ ರಿಟರ್ನ್',
      loanAnalysis: 'ಸಾಲ ವಿಶ್ಲೇಷಣೆ',
      monthlyInstallment: 'ಮಾಸಿಕ ಕಂತಿ',
      totalRepayment: 'ಒಟ್ಟು ಮರುಪಾವತಿ',
      profitAfterLoan: 'ಸಾಲದ ನಂತರ ಲಾಭ',
      government: 'ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳು',
      subsidyAvailable: 'ಲಭ್ಯವಿರುವ ಸಬ್ಸಿಡಿ (40%)',
      netCost: 'ಸಬ್ಸಿಡಿದ ನಂತರ ನಿವ್ವಳ ವೆಚ್ಚ',
      breakEven: 'ಬ್ರೇಕ್-ಇವೆನ್ ಪಾಯಿಂಟ್',
      months: 'ತಿಂಗಳುಗಳು',
      noData: 'ವಿಶ್ಲೇಷಣೆ ಮಾಡಲು ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ',
      error: 'ಲೆಕ್ಕಹಾಕಲು ವಿಫಲ',
    },
    hi: {
      title: 'खेत वित्त कैलकुलेटर',
      subtitle: 'अपनी कृषि वित्त की योजना बनाएं और रिटर्न का विश्लेषण करें',
      selectCrop: 'फसल का चयन करें',
      landSize: 'भूमि का आकार (हेक्टेयर)',
      loanAmount: 'आवश्यक ऋण (₹)',
      interestRate: 'ब्याज दर (% प्रति वर्ष)',
      loanTerm: 'ऋण अवधि (महीने)',
      calculate: 'रिटर्न की गणना करें',
      analysis: 'वित्तीय विश्लेषण',
      costs: 'लागत विभाजन',
      initialCost: 'प्रारंभिक लागत',
      maintenanceCost: 'रखरखाव लागत',
      harvestCost: 'कटाई और परिवहन लागत',
      totalCost: 'कुल लागत',
      revenue: 'अपेक्षित राजस्व',
      profit: 'लाभ',
      roi: 'निवेश पर रिटर्न',
      loanAnalysis: 'ऋण विश्लेषण',
      monthlyInstallment: 'मासिक किश्त',
      totalRepayment: 'कुल चुकौती',
      profitAfterLoan: 'ऋण के बाद लाभ',
      government: 'सरकारी सब्सिडी',
      subsidyAvailable: 'उपलब्ध सब्सिडी (40%)',
      netCost: 'सब्सिडी के बाद शुद्ध लागत',
      breakEven: 'ब्रेक-ईवन बिंदु',
      months: 'महीने',
      noData: 'विश्लेषण के लिए फसल चुनें',
      error: 'गणना करने में विफल',
    },
  };

  const t = labels[language as keyof typeof labels] || labels.en;

  useEffect(() => {
    const loadCrops = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await cropsAPI.getAll();
        const cropsData = response.data.items || response.data.crops || [];
        setCrops(cropsData);
        if (cropsData.length > 0) {
          setSelectedCrop(cropsData[0].id);
        }
      } catch (err: any) {
        console.error('Error loading crops:', err);
        setError(err.message || 'Failed to load crops');
        // Use default crop if API fails
        setCrops([{ id: '1', name: 'Rice' }]);
        setSelectedCrop('1');
      } finally {
        setLoading(false);
      }
    };
    loadCrops();
  }, [language]);

  const handleCalculate = async () => {
    if (!selectedCrop) return;

    try {
      setLoading(true);
      setError(null);
      const response = await cropsAPI.getById(selectedCrop);
      const crop = response.data.item || response.data.crops?.[0] || { name: 'Selected Crop', costOfCultivation: 30000, yield: 50, marketPrice: 2500 };

      // Calculate costs per hectare
      const costPerHectare = crop.costOfCultivation || 30000;
      const totalCost = costPerHectare * landSize;
      const initialCost = totalCost * 0.3;
      const maintenanceCost = totalCost * 0.4;
      const harvestCost = totalCost * 0.3;

      // Calculate revenue
      const yieldPerHectare = crop.yield || 50;
      const pricePerUnit = crop.marketPrice || 2500;
      const expectedRevenue = (yieldPerHectare * landSize * pricePerUnit);

      // Calculate profit and ROI
      const profit = expectedRevenue - totalCost;
      const roi = (profit / totalCost) * 100;

      // Calculate loan details
      const monthlyRate = interestRate / 100 / 12;
      const monthlyInstallment =
        loanAmount > 0
          ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
            (Math.pow(1 + monthlyRate, loanTerm) - 1)
          : 0;
      const totalRepayment = monthlyInstallment * loanTerm;
      const profitAfterLoan = profit - totalRepayment;

      setAnalysis({
        cropName: crop.name,
        initialCost,
        maintenanceCost,
        harvestCost,
        totalCost,
        expectedRevenue,
        profit,
        roi,
        loanAmount,
        interestRate,
        monthlyInstallment,
        totalRepayment,
        profitAfterLoan,
      });
    } catch (err: any) {
      console.error('Error calculating returns:', err);
      setError(err.message || 'Failed to calculate returns');
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

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Crop Selection */}
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

          {/* Land Size */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.landSize}
            </label>
            <input
              type="number"
              value={landSize}
              onChange={(e) => setLandSize(Number(e.target.value))}
              min="0.1"
              step="0.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Loan Amount */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.loanAmount}
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              min="0"
              step="10000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Interest Rate */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.interestRate}
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min="0"
              step="0.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Loan Term */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.loanTerm}
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              min="1"
              step="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={!selectedCrop || loading}
          className="w-full md:w-auto bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 mb-8"
        >
          {loading ? 'Calculating...' : t.calculate}
        </button>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Cost Summary */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.analysis}</h2>

              {/* Cost Breakdown */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.costs}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">{t.initialCost}</p>
                    <p className="text-2xl font-bold text-blue-600">₹{analysis.initialCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">{t.maintenanceCost}</p>
                    <p className="text-2xl font-bold text-blue-600">₹{analysis.maintenanceCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">{t.harvestCost}</p>
                    <p className="text-2xl font-bold text-blue-600">₹{analysis.harvestCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">{t.totalCost}</p>
                    <p className="text-2xl font-bold text-green-600">₹{analysis.totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>

              {/* Profit Analysis */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Profit & Returns</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">{t.revenue}</p>
                    <p className="text-2xl font-bold text-amber-600">₹{analysis.expectedRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className={`rounded-lg p-4 ${analysis.profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-sm text-gray-600">{t.profit}</p>
                    <p className={`text-2xl font-bold ${analysis.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{analysis.profit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">{t.roi}</p>
                    <p className="text-2xl font-bold text-purple-600">{analysis.roi.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              {/* Loan Analysis */}
              {loanAmount > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.loanAnalysis}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">{t.monthlyInstallment}</p>
                      <p className="text-2xl font-bold text-indigo-600">₹{analysis.monthlyInstallment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">{t.totalRepayment}</p>
                      <p className="text-2xl font-bold text-indigo-600">₹{analysis.totalRepayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div className={`rounded-lg p-4 ${analysis.profitAfterLoan >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                      <p className="text-sm text-gray-600">{t.profitAfterLoan}</p>
                      <p className={`text-2xl font-bold ${analysis.profitAfterLoan >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{analysis.profitAfterLoan.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
