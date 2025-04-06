import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SavingsLineChart = ({ data, timeframe = 'monthly' }) => {
  // Sample data if none provided
  const sampleData = [
    { date: '2024-01', savings: 5000 },
    { date: '2024-02', savings: 7500 },
    { date: '2024-03', savings: 6800 },
    { date: '2024-04', savings: 9200 },
    { date: '2024-05', savings: 8500 },
    { date: '2024-06', savings: 12000 }
  ];

  const chartData = data || sampleData;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return timeframe === 'weekly' 
      ? `Week ${date.getDate()}`
      : date.toLocaleDateString('en-IN', { month: 'short' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border">
          <p className="font-medium">{formatDate(label)}</p>
          <p className="text-blue-600">₹{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Savings Trend
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            tick={{ fill: '#666' }}
          />
          <YAxis 
            tickFormatter={(value) => `₹${value}`}
            tick={{ fill: '#666' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="savings"
            name="Savings"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={{ fill: '#4F46E5', strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SavingsLineChart;