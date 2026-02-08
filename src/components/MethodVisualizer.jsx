import React from 'react';
import NeuralNetwork from './NeuralNetwork';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, ComposedChart, Legend, BarChart, Bar, AreaChart, Area 
} from 'recharts';

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

/* --- Classification Plots --- */
// Softmax (Confident Single Class)
const ClassPlotSoftmax = () => {
    const data = [
        { name: 'Cat', prob: 0.05 },
        { name: 'Dog', prob: 0.90 },
        { name: 'Bird', prob: 0.05 },
    ];
    return (
        <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} domain={[0, 1]} />
                    <Tooltip wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="prob" fill="#8884d8" name="Probability" />
                </BarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Softmax: Competitive (Sum = 1.0)
            </div>
        </div>
    );
}

// Sigmoid (Multi-label / Independent)
const ClassPlotSigmoid = () => {
    const data = [
        { name: 'Cat', prob: 0.8 },
        { name: 'Dog', prob: 0.9 },
        { name: 'Bird', prob: 0.1 },
    ];
    return (
        <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} domain={[0, 1]} />
                    <Tooltip wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="prob" fill="#82ca9d" name="Probability" />
                </BarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Sigmoid: Independent (Sum ≠ 1.0)
            </div>
        </div>
    );
}

/* --- Dimensionality Reduction Plots --- */
// Manifold (Linear/PCA-like)
const DimPlotManifold = () => {
    const data = [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 30}, {x: 40, y: 35}, {x: 50, y: 40}, {x: 60, y: 38}, {x: 70, y: 30}]; 
    return (
        <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" fontSize={10} name="Component 1" domain={[0, 80]} />
                    <YAxis type="number" dataKey="y" fontSize={10} name="Component 2" domain={[0, 50]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
             <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Subspace Projection (Linear)
            </div>
        </div>
    )
}

// Bounded (Sigmoid/Tanh)
const DimPlotBounded = () => {
    const data = [{x: 0.1, y: 0.1}, {x: 0.2, y: 0.8}, {x: 0.8, y: 0.2}, {x: 0.9, y: 0.9}, {x: 0.5, y: 0.5}, {x: 0.3, y: 0.1}];
    return (
         <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" fontSize={10} name="Latent 1" domain={[0, 1]} />
                    <YAxis type="number" dataKey="y" fontSize={10} name="Latent 2" domain={[0, 1]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={data} fill="#ff7300" />
                </ScatterChart>
            </ResponsiveContainer>
              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Bounded Latent Space [0,1]
            </div>
        </div>
    )
}

/* --- Semi-Supervised Plots --- */
const SemiSupPlot = () => {
    const labeled = [{x: 20, y: 80, fill: "blue"}, {x: 80, y: 20, fill: "red"}];
    const unlabeled = [{x: 22, y: 78}, {x: 25, y: 82}, {x: 78, y: 22}, {x: 82, y: 18}, {x: 50, y: 50}, {x: 45, y: 55}];
    
    return (
         <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
             <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" fontSize={10} name="Feature 1" domain={[0, 100]} />
                    <YAxis type="number" dataKey="y" fontSize={10} name="Feature 2" domain={[0, 100]} />
                    <Scatter data={labeled} fill="#8884d8">
                         {labeled.map((entry, index) => <cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Scatter>
                    <Scatter data={unlabeled} fill="#ccc" />
                </ScatterChart>
             </ResponsiveContainer>
             <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Labeled (Color) vs Unlabeled (Gray)
            </div>
         </div>
    )
}

/* --- Generative Plots --- */
// GAN Training (Losses)
const GenPlotGAN = () => {
    const data = [
        { step: 1, D: 0.1, G: 2.0 }, { step: 2, D: 0.3, G: 1.5 }, { step: 3, D: 0.5, G: 0.7 },
        { step: 4, D: 0.5, G: 0.8 }, { step: 5, D: 0.45, G: 0.6 },
    ];
    return (
        <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="step" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip wrapperStyle={{ fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="D" stroke="#8884d8" name="Discriminator" dot={false} strokeWidth={2} />
                    <Line type="monotone" dataKey="G" stroke="#82ca9d" name="Generator" dot={false} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Adversarial Training Curves
            </div>
        </div>
    );
}

// Latent Space (VAE)
const GenPlotLatent = () => {
     const data = Array.from({ length: 40 }).map(() => ({ x: Math.random() * 10, y: Math.random() * 10 }));
     return (
        <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
           <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" fontSize={10} hide />
                    <YAxis type="number" dataKey="y" fontSize={10} hide />
                    <Scatter data={data} fill="#ff7300" opacity={0.6} />
                </ScatterChart>
           </ResponsiveContainer>
           <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Latent Code Sampling (Normal Dist)
            </div>
       </div>
     )
}

/* --- RL Plots --- */
// Reward Curve
const RLPlotReward = () => {
    const data = [{ep: 0, r: -10}, {ep: 10, r: -5}, {ep: 20, r: 0}, {ep: 30, r: 5}, {ep: 40, r: 8}, {ep: 50, r: 10}];
    return (
        <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ep" fontSize={10} name="Episode" />
                    <YAxis fontSize={10} name="Reward" />
                    <Tooltip wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="step" dataKey="r" stroke="#4caf50" strokeWidth={2} dot={false} name="Reward" />
                </LineChart>
             </ResponsiveContainer>
             <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Cumulative Reward (Learning)
            </div>
        </div>
    )
}

// Action Probabilities
const RLPlotPolicy = () => {
    const data = [{name: 'Left', p: 0.1}, {name: 'Stay', p: 0.1}, {name: 'Right', p: 0.8}];
    return (
         <div style={{ height: 200, marginBottom: 10, border: '1px solid #eee', borderRadius: 4, background: '#fff' }}>
            <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} domain={[0, 1]} />
                    <Tooltip wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="p" fill="#ffc107" name="Action Prob" />
                 </BarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: -5 }}>
                Learned Policy (Action Dist)
            </div>
         </div>
    )
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
      // Regression
      if (methodId === 'regression') {
          return index === 0 ? <RegressionPlotLinear /> : <RegressionPlotSmooth />;
      }
      // Clustering
      if (methodId === 'clustering') {
          return index === 0 ? <ClusteringPlotDistinct /> : <ClusteringPlotSoft />;
      }
      // Classification
      if (methodId === 'classification') {
          // Combo 0, 2 (Softmax) vs Combo 1 (Sigmoid)
          if (index === 1) return <ClassPlotSigmoid />; // Sigmoid
          return <ClassPlotSoftmax />; // Softmax
      }
      // Dimensionality Reduction
      if (methodId === 'dimensionality') {
          // Combo 0 (Linear) vs Combo 1 (Sigmoid/Bounded)
          return index === 0 ? <DimPlotManifold /> : <DimPlotBounded />;
      }
      // Semi-Supervised
      if (methodId === 'semisupervised') {
          return <SemiSupPlot />;
      }
      // Generative
      if (methodId === 'generative') {
          // Combo 0 (GAN), Combo 1 (VAE), Combo 2 (Diffusion - use GAN plot for now as placeholder for training)
          if (index === 1) return <GenPlotLatent />;
          return <GenPlotGAN />;
      }
      // RL
      if (methodId === 'rl') {
           // Combo 0 (Softmax Policy), Combo 1 (Value - Reward Curve)
           if (index === 0) return <RLPlotPolicy />;
           return <RLPlotReward />;
      }

      return null;
  };

  return (
    <NeuralNetwork method={selectedMethod} renderVisualization={renderVisual} />
  );
};

export default MethodVisualizer;
