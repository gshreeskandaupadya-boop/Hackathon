import React from 'react';

interface CropCardProps {
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
  onClick?: () => void;
}

export default function CropCard({
  name,
  nameInKannada,
  estimatedProfit,
  estimatedYield,
  costOfCultivation,
  marketPrice,
  waterRequirement,
  risk,
  sowingDate,
  harvestingDate,
  onClick,
}: CropCardProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const netProfit = estimatedProfit - costOfCultivation;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer border border-gray-200"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          {nameInKannada && (
            <p className="text-sm text-gray-600">{nameInKannada}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(risk)}`}>
          {risk} Risk
        </span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Net Profit</p>
          <p className="text-2xl font-bold text-green-700">
            ₹{(netProfit / 100000).toFixed(1)}L
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Estimated Yield</p>
          <p className="text-2xl font-bold text-blue-700">{estimatedYield} tons</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Market Price:</span>
          <span className="font-semibold text-green-600">₹{marketPrice}/kg</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Water Needed:</span>
          <span>{waterRequirement} mm</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Cost of Cultivation:</span>
          <span>₹{costOfCultivation.toLocaleString()}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-600">
          <div>
            <p className="font-semibold">Sowing</p>
            <p>{sowingDate}</p>
          </div>
          <div>
            <p className="font-semibold">Harvesting</p>
            <p>{harvestingDate}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all">
        View Details
      </button>
    </div>
  );
}
