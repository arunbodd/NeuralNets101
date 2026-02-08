import React from 'react';
import NeuralNetwork from './NeuralNetwork';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, ComposedChart, Legend, BarChart, Bar, AreaChart, Area, ReferenceLine
} from 'recharts';

/* --- Generic Viz Wrapper --- */
const VizRow = ({ left, right, titleLeft, titleRight }) => (
  <div style={{ display: 'flex', gap: '10px', height: 210, marginBottom: 10 }}>
    <div style={{ flex: 1, border: '1px solid #eee', borderRadius: 4, background: '#fff', padding: '5px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>{left}</div>
        <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#666', marginTop: 2 }}>{titleLeft}</div>
    </div>
    <div style={{ flex: 1, border: '1px solid #eee', borderRadius: 4, background: '#fff', padding: '5px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>{right}</div>
        <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#666', marginTop: 2 }}>{titleRight}</div>
    </div>
  </div>
);

/* --- Comparison / Insight Box --- */
const ComparisonBox = ({ title, text, bestFor }) => (
  <div style={{ marginTop: '10px', padding: '12px', background: '#f9fbe7', borderRadius: '4px', fontSize: '0.85rem', borderLeft: '4px solid #cddc39' }}>
    <div style={{ fontWeight: '700', marginBottom: '4px', color: '#33691e' }}>{title}</div>
    <p style={{ margin: '0 0 6px 0', lineHeight: '1.4', color: '#444' }}>{text}</p>
    <div style={{ fontStyle: 'italic', color: '#558b2f' }}><strong>Use Case:</strong> {bestFor}</div>
  </div>
);

/* --- Loss Function Plots --- */
const LossPlotMSE = () => {
    const data = Array.from({length: 21}, (_, i) => {
        const x = i - 10;
        return { x, y: x * x };
    });
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" fontSize={8} tick={false} />
                <YAxis fontSize={8} width={30} />
                <Tooltip wrapperStyle={{fontSize: '10px'}} labelFormatter={() => ''} />
                <ReferenceLine x={0} stroke="#ccc" />
                <Line type="monotone" dataKey="y" stroke="#e91e63" dot={false} strokeWidth={2} name="Loss" />
            </LineChart>
        </ResponsiveContainer>
    );
};

const LossPlotMAE = () => {
    const data = Array.from({length: 21}, (_, i) => {
        const x = i - 10;
        return { x, y: Math.abs(x) };
    });
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" fontSize={8} tick={false} />
                <YAxis fontSize={8} width={30} />
                <Tooltip wrapperStyle={{fontSize: '10px'}} labelFormatter={() => ''} />
                <ReferenceLine x={0} stroke="#ccc" />
                <Line type="linear" dataKey="y" stroke="#e91e63" dot={false} strokeWidth={2} name="Loss" />
            </LineChart>
        </ResponsiveContainer>
    );
};

const LossPlotCrossEntropy = () => {
    const data = Array.from({length: 20}, (_, i) => {
        const x = (i + 1) / 20; // 0.05 to 1.0
        return { x, y: -Math.log(x) };
    });
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" domain={[0, 1]} fontSize={8} />
                <YAxis fontSize={8} width={30} />
                <Tooltip wrapperStyle={{fontSize: '10px'}} labelFormatter={(val) => `Prob: ${val}`} />
                <Line type="monotone" dataKey="y" stroke="#e91e63" dot={false} strokeWidth={2} name="Loss" />
            </LineChart>
        </ResponsiveContainer>
    );
};

const LossPlotInertia = () => {
    // Distance squared roughly
    const data = Array.from({length: 21}, (_, i) => {
       const x = i; 
       return { x, y: 100 / (x + 1) }; // 'Elbow' curve shape
    });
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" fontSize={8} tick={false} />
                <YAxis fontSize={8} width={30} />
                <Tooltip wrapperStyle={{fontSize: '10px'}} labelFormatter={() => ''} />
                <Line type="monotone" dataKey="y" stroke="#e91e63" dot={false} strokeWidth={2} name="Inertia" />
            </LineChart>
        </ResponsiveContainer>
    );
};

/* --- Regression Plots --- */
// Linear fit (Simple)
const RegressionPlotLinear = () => {
  const data = [
    { x: 10, y: 30, fit: 32 }, { x: 30, y: 95, fit: 95 }, { x: 45, y: 100, fit: 120 },
    { x: 50, y: 160, fit: 135 }, { x: 70, y: 170, fit: 190 }, { x: 90, y: 240, fit: 245 },
  ];
  return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" fontSize={10} domain={[0, 100]} />
          <YAxis fontSize={10} />
          <Tooltip wrapperStyle={{ fontSize: '10px' }} />
          <Scatter dataKey="y" fill="#8884d8" r={3} />
          <Line dataKey="fit" stroke="#ff7300" dot={false} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
  );
};


// Smooth fit (Complex)
const RegressionPlotSmooth = () => {
  const data = [
    { x: 10, y: 30, fit: 30 }, { x: 30, y: 90, fit: 85 }, { x: 45, y: 100, fit: 110 },
    { x: 50, y: 150, fit: 140 }, { x: 70, y: 180, fit: 200 }, { x: 90, y: 250, fit: 250 },
  ];
  return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" fontSize={10} domain={[0, 100]} />
          <YAxis fontSize={10} />
          <Tooltip wrapperStyle={{ fontSize: '10px' }} />
          <Scatter dataKey="y" fill="#8884d8" r={3} />
          <Line type="monotone" dataKey="fit" stroke="#4caf50" dot={false} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
  );
};

/* --- Clustering Plots --- */
// Distinct Separation
const ClusteringPlotDistinct = () => {
  const c1 = [{ x: 20, y: 80 }, { x: 25, y: 85 }, { x: 30, y: 75 }];
  const c2 = [{ x: 70, y: 20 }, { x: 75, y: 25 }, { x: 80, y: 15 }];
  return (
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
           <CartesianGrid />
           <XAxis type="number" dataKey="x" fontSize={10} domain={[0, 100]} />
           <YAxis type="number" dataKey="y" fontSize={10} domain={[0, 100]} />
           <Scatter data={c1} fill="#8884d8" name="A" />
           <Scatter data={c2} fill="#82ca9d" name="B" />
        </ScatterChart>
      </ResponsiveContainer>
  );
}

// Overlapping / Soft
const ClusteringPlotSoft = () => {
    const c1 = [{ x: 30, y: 60 }, { x: 35, y: 65 }, { x: 40, y: 55 }, { x: 50, y: 50 }];
    const c2 = [{ x: 55, y: 45 }, { x: 60, y: 35 }, { x: 65, y: 40 }, { x: 45, y: 45 }];
    return (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
             <CartesianGrid />
             <XAxis type="number" dataKey="x" fontSize={10} domain={[0, 100]} />
             <YAxis type="number" dataKey="y" fontSize={10} domain={[0, 100]} />
             <Scatter data={c1} fill="#ff7300" opacity={0.6} name="A" />
             <Scatter data={c2} fill="#0088fe" opacity={0.6} name="B" />
          </ScatterChart>
        </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} domain={[0, 1]} />
                    <Tooltip wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="prob" fill="#8884d8" name="Probability" />
                </BarChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} domain={[0, 1]} />
                    <Tooltip wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="prob" fill="#82ca9d" name="Probability" />
                </BarChart>
            </ResponsiveContainer>
    );
}

/* --- Dimensionality Reduction Plots --- */
// Manifold (Linear/PCA-like)
const DimPlotManifold = () => {
    const data = [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 30}, {x: 40, y: 35}, {x: 50, y: 40}, {x: 60, y: 38}, {x: 70, y: 30}]; 
    return (
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" fontSize={10} name="Component 1" domain={[0, 80]} />
                    <YAxis type="number" dataKey="y" fontSize={10} name="Component 2" domain={[0, 50]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
    )
}

// Bounded (Sigmoid/Tanh)
const DimPlotBounded = () => {
    const data = [{x: 0.1, y: 0.1}, {x: 0.2, y: 0.8}, {x: 0.8, y: 0.2}, {x: 0.9, y: 0.9}, {x: 0.5, y: 0.5}, {x: 0.3, y: 0.1}];
    return (
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" fontSize={10} name="Latent 1" domain={[0, 1]} />
                    <YAxis type="number" dataKey="y" fontSize={10} name="Latent 2" domain={[0, 1]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={data} fill="#ff7300" />
                </ScatterChart>
            </ResponsiveContainer>
    )
}

/* --- Semi-Supervised Plots --- */
const SemiSupPlot = () => {
    const labeled = [{x: 20, y: 80, fill: "blue"}, {x: 80, y: 20, fill: "red"}];
    const unlabeled = [{x: 22, y: 78}, {x: 25, y: 82}, {x: 78, y: 22}, {x: 82, y: 18}, {x: 50, y: 50}, {x: 45, y: 55}];
    
    return (
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
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="step" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip wrapperStyle={{ fontSize: '10px' }} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="D" stroke="#8884d8" name="Discriminator" dot={false} strokeWidth={2} />
                    <Line type="monotone" dataKey="G" stroke="#82ca9d" name="Generator" dot={false} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
    );
}

// Latent Space (VAE)
const GenPlotLatent = () => {
     const data = Array.from({ length: 40 }).map(() => ({ x: Math.random() * 10, y: Math.random() * 10 }));
     return (
           <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" fontSize={10} hide />
                    <YAxis type="number" dataKey="y" fontSize={10} hide />
                    <Scatter data={data} fill="#ff7300" opacity={0.6} />
                </ScatterChart>
           </ResponsiveContainer>
     )
}

/* --- RL Plots --- */
// Reward Curve
const RLPlotReward = () => {
    const data = [{ep: 0, r: -10}, {ep: 10, r: -5}, {ep: 20, r: 0}, {ep: 30, r: 5}, {ep: 40, r: 8}, {ep: 50, r: 10}];
    return (
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ep" fontSize={10} name="Episode" />
                    <YAxis fontSize={10} name="Reward" />
                    <Tooltip wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="step" dataKey="r" stroke="#4caf50" strokeWidth={2} dot={false} name="Reward" />
                </LineChart>
             </ResponsiveContainer>
    )
}

// Action Probabilities
const RLPlotPolicy = () => {
    const data = [{name: 'Left', p: 0.1}, {name: 'Stay', p: 0.1}, {name: 'Right', p: 0.8}];
    return (
            <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} domain={[0, 1]} />
                    <Tooltip wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="p" fill="#ffc107" name="Action Prob" />
                 </BarChart>
            </ResponsiveContainer>
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
          if (index === 0) {
            return (
              <>
                <VizRow left={<LossPlotMSE />} right={<RegressionPlotLinear />} titleLeft="Loss: Squared Error (MSE)" titleRight="Fit: Linear Regression" />
                <ComparisonBox 
                  title="Linear (Mean Squared Error)"
                  text="Heavily penalizes large errors because they are squared. Creates the standard 'best fit' line."
                  bestFor="Clean data with simple relationships; avoided if outliers are present."
                />
              </>
            );
          }
          return (
            <>
              <VizRow left={<LossPlotMAE />} right={<RegressionPlotSmooth />} titleLeft="Loss: Absolute Error (MAE)" titleRight="Fit: Smooth Curve" />
              <ComparisonBox 
                  title="Non-Linear (Mean Absolute Error)"
                  text="Treats all errors linearly (fewer penalties for outliers). Enables fitting complex, curvy patterns."
                  bestFor="Noisy data with outliers or non-linear relationships."
                />
            </>
          );
      }
      // Clustering
      if (methodId === 'clustering') {
          if (index === 0) {
            return (
              <>
                <VizRow left={<LossPlotInertia />} right={<ClusteringPlotDistinct />} titleLeft="Metric: Inertia (Distance)" titleRight="Result: Hard Clusters" />
                <ComparisonBox 
                  title="Hard Clustering (K-Means)"
                  text="Assigns every point to exactly one group. Minimizes distance to group centers."
                  bestFor="Distinct, well-separated groups (e.g. Customer Segments)."
                />
              </>
            );
          }
          return (
            <>
              <VizRow left={<LossPlotCrossEntropy />} right={<ClusteringPlotSoft />} titleLeft="Metric: Likelihood" titleRight="Result: Soft Clusters" />
              <ComparisonBox 
                  title="Soft Clustering (GMM)"
                  text="Assigns probabilities. A point can be 60% Group A and 40% Group B."
                  bestFor="Overlapping, ambiguous data or fuzzy boundaries."
                />
            </>
          );
      }
      // Classification
      if (methodId === 'classification') {
          // Combo 0, 2 (Softmax) vs Combo 1 (Sigmoid)
          if (index === 1) {
            return (
              <>
               <VizRow left={<LossPlotCrossEntropy />} right={<ClassPlotSigmoid />} titleLeft="Loss: Binary Cross-Entropy" titleRight="Out: Independent Probs" />
               <ComparisonBox 
                  title="Sigmoid (Multi-Label)"
                  text="Each output neuron makes an independent decision (Yes/No). Probabilities don't sum to 1."
                  bestFor="Tagging tasks (e.g. An image can contain BOTH a 'Cat' and a 'Tree')."
                />
              </>
            );
          }
          return (
            <>
              <VizRow left={<LossPlotCrossEntropy />} right={<ClassPlotSoftmax />} titleLeft="Loss: Cat. Cross-Entropy" titleRight="Out: Class Distribution" />
              <ComparisonBox 
                  title="Softmax (Multi-Class)"
                  text="Forces all output probabilities to sum to 100%. Makes classes mutually exclusive."
                  bestFor="Categorization (e.g. An image is EITHER a 'Cat' OR a 'Dog' - not both)."
                />
            </>
          );
      }
      // Dimensionality Reduction
      if (methodId === 'dimensionality') {
          // Combo 0 (Linear) vs Combo 1 (Sigmoid/Bounded)
          if (index === 0) {
            return (
              <>
                <VizRow left={<LossPlotMSE />} right={<DimPlotManifold />} titleLeft="Loss: Reconstruction Error" titleRight="Map: Linear Projection" />
                <ComparisonBox 
                  title="Linear Projection (PCA-like)"
                  text="Finds the 'best angle' to view the data. Preserves global structure but can't unroll curves."
                  bestFor="Compressing simple data while keeping the main variance."
                />
              </>
            );
          } 
          return (
            <>
              <VizRow left={<LossPlotCrossEntropy />} right={<DimPlotBounded />} titleLeft="Loss: KL Divergence" titleRight="Map: Bounded Latents" />
              <ComparisonBox 
                  title="Manifold Learning (Autoencoder)"
                  text="Warps space to squash data into a box (0 to 1). Learns complex non-linear mappings."
                  bestFor="Visualizing complex, high-dimensional datasets (e.g. t-SNE)."
                />
            </>
          );
      }
      // Semi-Supervised
      if (methodId === 'semisupervised') {
          return (
            <>
              <VizRow left={<LossPlotCrossEntropy />} right={<SemiSupPlot />} titleLeft="Loss: Sup. + Consistency" titleRight="Result: Label Prop." />
               <ComparisonBox 
                  title="Label Propagation"
                  text="Uses the few known (colored) points to guess the labels of nearby grey points."
                  bestFor="Scenarios with lots of data but few expensive labels (e.g. Medical Imaging)."
                />
            </>
          );
      }
      // Generative
      if (methodId === 'generative') {
          // Combo 0 (GAN), Combo 1 (VAE)
          if (index === 1) {
            return (
              <>
                <VizRow left={<LossPlotMSE />} right={<GenPlotLatent />} titleLeft="Loss: Reconstruction + KL" titleRight="Sample: Latent Space" />
                <ComparisonBox 
                  title="Variational Autoencoder (VAE)"
                  text="Forces the internal representation to be a smooth cloud (Gaussian). Good for interpolation."
                  bestFor="Changing attributes smoothly (e.g. turning a frown into a smile)."
                />
              </>
            );
          }
          return (
            <>
              <VizRow left={<GenPlotGAN />} right={<GenPlotLatent />} titleLeft="Training: Min-Max Game" titleRight="Result: Generated Manifold" />
              <ComparisonBox 
                  title="Generative Adversarial Net (GAN)"
                  text="A Generator tries to fool a Discriminator. This competition creates sharper results."
                  bestFor="Creating realistic, high-fidelity images."
                />
            </>
          );
      }
      // RL
      if (methodId === 'rl') {
           // Combo 0 (Softmax Policy), Combo 1 (Value - Reward Curve)
           if (index === 0) {
             return (
               <>
                  <VizRow left={<RLPlotReward />} right={<RLPlotPolicy />} titleLeft="Signal: Reward Curve" titleRight="Policy: Action Probs" />
                  <ComparisonBox 
                    title="Policy Gradient"
                    text="Directly learns which action to take. Output is a probability distribution."
                    bestFor="Robotics and continuous control tasks."
                  />
               </>
             );
           }
           return (
             <>
                <VizRow left={<RLPlotReward />} right={<RLPlotPolicy />} titleLeft="Signal: Bellman Error" titleRight="Value: V(s) Estimate" />
                <ComparisonBox 
                  title="Value-Based (DQN)"
                  text="Learns to predict the future score of a state. Actions are chosen to maximize this score."
                  bestFor="Games with discrete moves (Chess, Atari)."
                />
             </>
           );
      }

      return null;
  };

  return (
    <NeuralNetwork method={selectedMethod} renderVisualization={renderVisual} />
  );
};

export default MethodVisualizer;
