import './ColorKey.css';

const textColors = [
  { label: 'Loss Functions', color: '#d32f2f' },
  { label: 'Activation Functions', color: '#1565c0' },
  { label: 'Optimizers', color: '#2e7d32' },
  { label: 'Datasets', color: '#7b1fa2' },
  { label: 'Evaluation Metrics', color: '#e65100' },
  { label: 'Regularization', color: '#00695c' },
  { label: 'Architectures', color: '#4e342e' },
];

const layerColors = [
  { label: 'Input Layer', color: '#64b5f6' },
  { label: 'Hidden Layer', color: '#81c784' },
  { label: 'Output Layer', color: '#e57373' },
];

export default function ColorKey() {
  return (
    <div className="color-key">
      <div className="color-key-section">
        <h3>Table Text Colors</h3>
        <div className="color-key-items">
          {textColors.map((c) => (
            <span key={c.label} className="color-key-item">
              <span className="swatch" style={{ backgroundColor: c.color }} />
              {c.label}
            </span>
          ))}
        </div>
      </div>
      <div className="color-key-section">
        <h3>Neural Network Layers</h3>
        <div className="color-key-items">
          {layerColors.map((c) => (
            <span key={c.label} className="color-key-item">
              <span className="swatch" style={{ backgroundColor: c.color }} />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
