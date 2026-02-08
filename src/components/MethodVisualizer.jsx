import React from 'react';
import NeuralNetwork from './NeuralNetwork';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, Legend } from 'recharts';

const RegressionPlot = () => {
  const data = [
    { x: 10, y: 30, fit: 32 }, { x: 30, y: 90, fit: 95 }, { x: 45, y: 100, fit: 120 },
    { x: 50, y: 150, fit: 135 }, { x: 70, y: 180, fit: 190 }, { x: 90, y: 250, fit: 245 },
  ];
  return (
    <div style={{ width: '100%', height: 400, background: '#fafafa', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Linear Regression Fit</h4>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" name="Input (X)" domain={[0, 100]} />
          <YAxis dataKey="y" name="Output (Y)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Actual Data" dataKey="y" fill="#8884d8" />
          <Line name="Best Fit Line" dataKey="fit" stroke="#ff7300" dot={false} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
        Regression minimizes the distance (loss) between the actual data points (blue dots) and the predicted values (orange line).
      </p>
    </div>
  );
};

const ClusteringPlot = () => {
  const cluster1 = [{ x: 10, y: 30 }, { x: 15, y: 40 }, { x: 20, y: 35 }, { x: 25, y: 45 }, { x: 12, y: 38 }];
  const cluster2 = [{ x: 80, y: 80 }, { x: 85, y: 90 }, { x: 90, y: 85 }, { x: 75, y: 88 }, { x: 82, y: 95 }];
  const cluster3 = [{ x: 70, y: 20 }, { x: 75, y: 15 }, { x: 80, y: 25 }, { x: 65, y: 22 }, { x: 72, y: 18 }];
  
  return (
    <div style={{ width: '100%', height: 400, background: '#fafafa', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>K-Means Clustering (k=3)</h4>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Feature 1" domain={[0, 100]} />
          <YAxis type="number" dataKey="y" name="Feature 2" domain={[0, 100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Cluster A" data={cluster1} fill="#8884d8" />
          <Scatter name="Cluster B" data={cluster2} fill="#82ca9d" />
          <Scatter name="Cluster C" data={cluster3} fill="#ffc658" />
        </ScatterChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
        Clustering groups similar data points together based on their features (distance in this 2D space).
      </p>
    </div>
  );
}

const MethodVisualizer = ({ selectedMethod }) => {
  if (!selectedMethod) {
      return (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888', fontStyle: 'italic', background: '#fafafa', borderRadius: '8px', border: '1px solid #ddd' }}>
          Select a method from the table above to view its visualization.
        </div>
      );
  }

  const methodId = selectedMethod.id;

  // Render different components based on method type
  if (methodId === 'regression') {
    return <RegressionPlot />;
  } 
  
  if (methodId === 'clustering') {
    return <ClusteringPlot />;
  }

  // Default fallback to the Neural Network for other types
  return (
    <NeuralNetwork method={selectedMethod} />
  );
};

export default MethodVisualizer;
