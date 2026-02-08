import { useState, useRef } from 'react';
import { mlData } from './data/mlData';
import ColorKey from './components/ColorKey';
import MLTable from './components/MLTable';
import MethodButtons from './components/MethodButtons';
import MethodVisualizer from './components/MethodVisualizer';
import './App.css';

// Set current chapter to control visibility
// 1: Regression, Classification, Clustering
// 2: + Dimensionality Reduction, Semi-Supervised
// 3: + Generative, RL
const RELEASED_CHAPTER = 1;

const CHAPTERS = [
  { id: 1, title: 'I: Foundations', subtitle: 'Regression, Classification & Clustering' },
  { id: 2, title: 'II: Structure', subtitle: 'Dim. Reduction & Semi-Supervised', locked: true },
  { id: 3, title: 'III: Frontiers', subtitle: 'Generative Models & RL', locked: true },
];

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const diagramRef = useRef(null);

  // Filter available methods based on the active tab
  const visibleData = mlData.filter((m) => (m.chapter || 1) === activeTab);
  
  const selectedMethod = mlData.find((m) => m.id === selectedId) || null;

  const handleSelect = (id) => {
    const newId = selectedId === id ? null : id;
    setSelectedId(newId);
    if (newId && diagramRef.current) {
      setTimeout(() => {
        diagramRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleTabChange = (chapterId) => {
    if (chapterId <= RELEASED_CHAPTER) {
      setActiveTab(chapterId);
      setSelectedId(null);
    }
  };

  return (
    <div className="app">
      <h1>Machine Learning Functions Overview</h1>
      <p className="subtitle">
        An interactive dashboard covering loss functions, activation functions,
        optimizers, evaluation metrics, regularization, and architectures across
        different ML paradigms.
      </p>

      {/* Chapter Tabs */}
      <div className="chapter-tabs">
        {CHAPTERS.map((ch) => {
          const isLocked = ch.id > RELEASED_CHAPTER;
          return (
            <button
              key={ch.id}
              className={`tab-button ${activeTab === ch.id ? 'active' : ''}`}
              onClick={() => handleTabChange(ch.id)}
              disabled={isLocked}
              title={isLocked ? "Coming Soon" : ch.subtitle}
            >
              {ch.title}
              {isLocked && <span className="lock-icon">🔒</span>}
            </button>
          );
        })}
      </div>

      <div className="tab-content">
        <ColorKey />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 10px' }}>
           <h3 style={{ margin: 0, color: '#444' }}>{CHAPTERS.find(c => c.id === activeTab)?.subtitle}</h3>
           <p className="hint" style={{ margin: 0 }}>Click row for details &darr;</p>
        </div>

        <MLTable 
          data={visibleData} 
          onSelectMethod={handleSelect} 
          selectedId={selectedId} 
        />
      </div>

      <h2 ref={diagramRef}>Interactive Visualizations</h2>
      <p className="hint">
        Select a method above to see its visualization (Neural Network, Loss Function, and Output). Drag the nodes!
      </p>
      
      {/* 
         We don't strictly need MethodButtons anymore as the table acts as the selector, 
         but we'll keep it for mobile friendliness if requested. 
         However, let's just rely on the table click as per design.
      */}
      
      <MethodVisualizer selectedMethod={selectedMethod} />
    </div>
  );
}

export default App;
