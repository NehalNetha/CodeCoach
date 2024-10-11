import React from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

const generateData = (n) => {
  const data = [];
  for (let i = 1; i <= n; i++) {
    data.push({
      n: i,
      constant: 1,
      logarithmic: Math.log2(i),
      linear: i,
      linearithmic: i * Math.log2(i),
      quadratic: i * i,
      exponential: Math.min(Math.pow(2, i), 1000) // Capped to prevent overshadowing other lines
    });
  }
  return data;
};

const TimeComplexityChart = ({ complexity }) => {
  const data = generateData(50);

  const complexityToDataKey = {
    'O(1)': 'constant',
    'O(log n)': 'logarithmic',
    'O(n)': 'linear',
    'O(n log n)': 'linearithmic',
    'O(n^2)': 'quadratic',
    'O(2^n)': 'exponential'
  };

  const isValidComplexity = complexity && complexityToDataKey[complexity];
  const highlightedComplexity = isValidComplexity ? complexityToDataKey[complexity] : null;

  return (
    <div style={{ width: '100%', height: '300px', backgroundColor: '#EDFAE4', padding: '20px', borderRadius: '10px' }} className='border border-gray-950'>
      <h2 style={{ color: 'black', marginBottom: '10px', textAlign: 'center' }}>
        {isValidComplexity ? complexity : 'Try to solve the problem'}
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <YAxis 
            axisLine={{ stroke: '#555' }} 
            tick={false} 
            label={{ value: 'Time', angle: -90, position: 'insideLeft', style: { fill: '#555', fontSize: 12 } }} 
          />
          {Object.entries(complexityToDataKey).map(([key, value]) => (
            <Line 
              key={key}
              type="monotone" 
              dataKey={value} 
              stroke={highlightedComplexity ? (value === highlightedComplexity ? '#8A2BE2' : '#555') : '#999'} 
              strokeWidth={highlightedComplexity ? (value === highlightedComplexity ? 2 : 1) : 1} 
              dot={false} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeComplexityChart;
