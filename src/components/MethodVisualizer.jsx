import React from 'react';
import NeuralNetwork from './NeuralNetwork';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, Legend } from 'recharts';

/* --- Regression Plots --- */
// Linear fit (Simple)
const RegressionPlotLinear = () => {
  const data = [
    { x: 10, y: 30, fit: 32 }, { x: 30, y: 95, fit: 95 }, { x: 45, y: 100, fit: 120 },
    { x: 50, y: 160, fit: 135 }, { x: 70, y: 170, fit: 190 }, { x: 90, y: 240, fit: 245 },
  ];
  return (
    <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" fontSize={10} domain={[0, 100]} />
          <YAxis fontSize={10} />
          <Tooltip wrapperStyle={{ fontSize: '12px' }} />
          <Scatter dataKey="y" fill="#8884d8" r={3} />
          <Line dataKey="fit" stroke="#ff7300" dot={false} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
        Piecewise / Linear approximation
      </div>
    </div>
  );
};

// Smooth fit (Complex)
const RegressionPlotSmooth = () => {
  const data = [
    { x: 10, y: 30, fit: 30 }, { x: 30, y: 90, fit: 85 }, { x: 45, y: 100, fit: 110 },
    { x: 50, y: 150, fit: 140 }, { x: 70, y: 180, fit: 200 }, { x: 90, y: 250, fit: 250 },
  ];
  return (
    <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" fontSize={10} domain={[0, 100]} />
          <YAxis fontSize={10} />
          <Tooltip wrapperStyle={{ fontSize: '12px' }} />
          <Scatter dataKey="y" fill="#8884d8" r={3} />
          <Line type="monotone" dataKey="fit" stroke="#4caf50" dot={false} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
        Smooth non-linear curve (Tanh)
      </div>
    </div>
  );
};

/* --- Clustering Plots --- */
// Distinct Separation
const ClusteringPlotDistinct = () => {
  const c1 = [{ x: 20, y: 80 }, { x: 25, y: 85 }, { x: 30, y: 75 }];
  const c2 = [{ x: 70, y: 20 }, { x: 75, y: 25 }, { x: 80, y: 15 }];
  return (
    <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
           <CartesianGrid />
           <XAxis type="number" dataKey="x" fontSize={10} domain={[0, 100]} />
           <YAxis type="number" dataKey="y" fontSize={10} domain={[0, 100]} />
           <Scatter data={c1} fill="#8884d8" name="A" />
           <Scatter data={c2} fill="#82ca9d" name="B" />
        </ScatterChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
        Sharp separation (ReLU/Sigmoid)
      </div>
    </div>
  );
}

// Overlapping / Soft
const ClusteringPlotSoft = () => {
    const c1 = [{ x: 30, y: 60 }, { x: 35, y: 65 }, { x: 40, y: 55 }, { x: 50, y: 50 }];
    const c2 = [{ x: 55, y: 45 }, { x: 60, y: 35 }, { x: 65, y: 40 }, { x: 45, y: 45 }];
    return (
      <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
             <CartesianGrid />
             <XAxis type="number" dataKey="x" fontSize={10} domain={[0, 100]} />
             <YAxis type="number" dataKey="y" fontSize={10} domain={[0, 100]} />
             <Scatter data={c1} fill="#ff7300" opacity={0.6} name="A" />
             <Scatter data={c2} fill="#0088fe" opacity={0.6} name="B" />
          </ScatterChart>
        </ResponsiveContainer>
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
            Fuzzy/Overlapping boundaries (Tanh)
        </div>
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

  // Define render callback for specific types
  const renderVisual = (combo, index) => {
      if (methodId === 'regression') {
          // 0 = ReLU (Linear-ish), 1 = Tanh (Smooth)
          return index === 0 ? <RegressionPlotLinear /> : <RegressionPlotSmooth />;
      }
      if (methodId === 'clustering') {
          // 0 = ReLU (Distinct), 1 = Tanh (Soft)
          return index === 0 ? <ClusteringPlotDistinct /> : <ClusteringPlotSoft />;
      }
      return null;
  };

  return (
    <NeuralNetwork method={selectedMethod} renderVisualization={renderVisual} />
  );
};

export default MethodVisualizer;
