import { useState, useRef } from 'react';
import { mlData } from './data/mlData';
import ColorKey from './components/ColorKey';
import MLTable from './components/MLTable';
import MethodButtons from './components/MethodButtons';
import NeuralNetwork from './components/NeuralNetwork';
import './App.css';

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const diagramRef = useRef(null);

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

  return (
    <div className="app">
      <h1>Machine Learning Functions Overview</h1>
      <p className="subtitle">
        An interactive dashboard covering loss functions, activation functions,
        optimizers, evaluation metrics, regularization, and architectures across
        ML paradigms.
      </p>

      <ColorKey />

      <h2>Overview Table</h2>
      <p className="hint">
        Click any row to view its neural network diagrams below.
      </p>
      <MLTable data={mlData} onSelectMethod={handleSelect} selectedId={selectedId} />

      <h2 ref={diagramRef}>Interactive Neural Network Diagrams</h2>
      <p className="hint">
        Select a method to see activation function combinations. Drag the nodes!
      </p>
      <MethodButtons
        data={mlData}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      <NeuralNetwork method={selectedMethod} />
    </div>
  );
}

export default App;
