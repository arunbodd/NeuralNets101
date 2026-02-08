import { useState, useRef, useCallback } from 'react';
import './NeuralNetwork.css';

/* ---------- Draggable SVG circle ---------- */
function DraggableCircle({ id, cx, cy, r, fill, label, svgRef, onDrag }) {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const toSVG = useCallback(
    (clientX, clientY) => {
      const svg = svgRef.current;
      if (!svg) return { x: clientX, y: clientY };
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      return { x: svgP.x, y: svgP.y };
    },
    [svgRef],
  );

  const onPointerDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    const p = toSVG(e.clientX, e.clientY);
    offset.current = { x: p.x - cx, y: p.y - cy };
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const p = toSVG(e.clientX, e.clientY);
    onDrag(id, p.x - offset.current.x, p.y - offset.current.y);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke="#333"
        strokeWidth={2}
        style={{ cursor: 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill="#fff"
        pointerEvents="none"
      >
        {label}
      </text>
    </g>
  );
}

/* ---------- Layout Factories ---------- */
// 1. Standard MLP (2 Input -> 3 Hidden -> 1 Output)
function createLayoutMLP() {
  const n = {
    I1: { x: 60, y: 50, fill: '#64b5f6' },
    I2: { x: 60, y: 110, fill: '#64b5f6' },
    H1: { x: 180, y: 30, fill: '#81c784' },
    H2: { x: 180, y: 80, fill: '#81c784' },
    H3: { x: 180, y: 130, fill: '#81c784' },
    O1: { x: 300, y: 80, fill: '#e57373' },
  };
  const c = [
    ['I1', 'H1'], ['I1', 'H2'], ['I1', 'H3'],
    ['I2', 'H1'], ['I2', 'H2'], ['I2', 'H3'],
    ['H1', 'O1'], ['H2', 'O1'], ['H3', 'O1'],
  ];
  return { nodes: n, connections: c, type: 'Standard MLP' };
}

// 2. Autoencoder (4 Input -> 2 Latent -> 4 Output) - Hourglass
function createLayoutAutoencoder() {
  const n = {
    I1: { x: 50, y: 30, fill: '#64b5f6' },
    I2: { x: 50, y: 60, fill: '#64b5f6' },
    I3: { x: 50, y: 90, fill: '#64b5f6' },
    I4: { x: 50, y: 120, fill: '#64b5f6' },
    
    H1: { x: 180, y: 55, fill: '#ffca28' }, // Bottleneck
    H2: { x: 180, y: 95, fill: '#ffca28' },

    O1: { x: 310, y: 30, fill: '#e57373' },
    O2: { x: 310, y: 60, fill: '#e57373' },
    O3: { x: 310, y: 90, fill: '#e57373' },
    O4: { x: 310, y: 120, fill: '#e57373' },
  };
  const c = [];
  // Fully connected Input -> Hidden
  ['I1','I2','I3','I4'].forEach(i => ['H1','H2'].forEach(h => c.push([i, h])));
  // Fully connected Hidden -> Output
  ['H1','H2'].forEach(h => ['O1','O2','O3','O4'].forEach(o => c.push([h, o])));
  
  return { nodes: n, connections: c, type: 'Autoencoder (Bottleneck)' };
}

// 3. CNN-ish (Grid inputs) 
// Visualizing a 2x2 Filter convolution might be too complex for SVG nodes, 
// so we'll stick to a "Deep" Stack look for Classification/Deep Learning
function createLayoutDeep() {
  const n = {
    I1: { x: 40, y: 40, fill: '#64b5f6' },
    I2: { x: 40, y: 80, fill: '#64b5f6' },
    I3: { x: 40, y: 120, fill: '#64b5f6' },

    H1_1: { x: 120, y: 40, fill: '#81c784' },
    H1_2: { x: 120, y: 80, fill: '#81c784' },
    H1_3: { x: 120, y: 120, fill: '#81c784' },

    H2_1: { x: 200, y: 60, fill: '#4caf50' },
    H2_2: { x: 200, y: 100, fill: '#4caf50' },

    O1: { x: 280, y: 50, fill: '#e57373' },
    O2: { x: 280, y: 110, fill: '#e57373' },
  };

  const c = [];
  // Layer 1
  ['I1','I2','I3'].forEach(i => ['H1_1','H1_2','H1_3'].forEach(h => c.push([i,h])));
  // Layer 2
  ['H1_1','H1_2','H1_3'].forEach(h1 => ['H2_1','H2_2'].forEach(h2 => c.push([h1,h2])));
  // Output
  ['H2_1','H2_2'].forEach(h2 => ['O1','O2'].forEach(o => c.push([h2,o])));

  return { nodes: n, connections: c, type: 'Deep / CNN Structure' };
}

// 4. RL / Recurrent (Feedback Loop)
// Visualized as Output looping back or explicit Agent-Env loop
function createLayoutRL() {
  const n = {
    S1: { x: 60, y: 50, fill: '#64b5f6' }, // State
    S2: { x: 60, y: 100, fill: '#64b5f6' }, 
    
    H1: { x: 160, y: 50, fill: '#81c784' },
    H2: { x: 160, y: 100, fill: '#81c784' },

    A1: { x: 260, y: 75, fill: '#ffb74d' }, // Action
    
    // Reward Node (Environment feedback)
    R: { x: 160, y: 140, fill: '#ba68c8' },
  };
  const c = [
    ['S1','H1'], ['S1','H2'], ['S2','H1'], ['S2','H2'],
    ['H1','A1'], ['H2','A1'],
    ['R', 'S2'], // Feedback loop implied
  ];
  return { nodes: n, connections: c, type: 'Reinforcement (Agent-Env)' };
}

/* ---------- Dispatcher ---------- */
function getLayoutForMethod(methodId) {
  switch (methodId) {
    case 'dimensionality':
    case 'generative': // VAEs are generative
      return createLayoutAutoencoder();
    case 'classification':
    case 'semisupervised':
      return createLayoutDeep(); // Show deeper net
    case 'rl':
      return createLayoutRL();
    default:
      return createLayoutMLP(); // Regression, Clustering
  }
}

/* ---------- Single network diagram ---------- */
function NetworkDiagram({ combo, index, svgRef, renderVisualization, methodId }) {
  // Get initial layout based on Method ID
  const initialLayout = getLayoutForMethod(methodId);
  const [nodes, setNodes] = useState(initialLayout.nodes);

  const handleDrag = useCallback((id, x, y) => {
    setNodes((prev) => ({ ...prev, [id]: { ...prev[id], x, y } }));
  }, []);

  return (
    <div className="network-card">
      <h4>
        Combination {index + 1}: {initialLayout.type}
      </h4>
      <svg
        ref={svgRef}
        viewBox="0 0 360 170"
        className="network-svg"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#999" />
          </marker>
        </defs>

        {initialLayout.connections.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke={from === 'R' ? '#ba68c8' : '#bbb'} 
            strokeDasharray={from === 'R' ? "4" : "0"} // Dashed for feedback
            strokeWidth={1.5}
            markerEnd="url(#arrow)"
          />
        ))}

        {Object.entries(nodes).map(([id, meta]) => (
          <DraggableCircle
            key={id}
            id={id}
            cx={meta.x}
            cy={meta.y}
            r={16}
            fill={meta.fill}
            label={id.substring(0, 2)}
            svgRef={svgRef}
            onDrag={handleDrag}
          />
        ))}

         {/* Dynamic labels based on Architecture Type */}
         {methodId === 'dimensionality' ? (
           <>
              <text x={50} y={160} textAnchor="middle" fontSize={10} fill="#666">Input</text>
              <text x={180} y={160} textAnchor="middle" fontSize={10} fill="#666">Bottleneck</text>
              <text x={310} y={160} textAnchor="middle" fontSize={10} fill="#666">Reconstruction</text>
           </>
         ) : methodId === 'rl' ? (
           <>
              <text x={60} y={160} textAnchor="middle" fontSize={10} fill="#666">State</text>
              <text x={160} y={160} textAnchor="middle" fontSize={10} fill="#666">Policy</text>
              <text x={260} y={160} textAnchor="middle" fontSize={10} fill="#666">Action</text>
           </>
         ) : (
           <>
            <text x={60} y={160} textAnchor="middle" fontSize={10} fill="#666">Input</text>
            <text x={180} y={160} textAnchor="middle" fontSize={10} fill="#666">Hidden Layer(s)</text>
            <text x={300} y={160} textAnchor="middle" fontSize={10} fill="#666">Output</text>
           </>
         )}

      </svg>
      {renderVisualization && (
        <div className="network-viz-container">
          {renderVisualization(combo, index)}
        </div>
      )}
      <p className="bio-example">{combo.biologicalExample}</p>
    </div>
  );
}

/* ---------- Main NeuralNetwork component ---------- */
export default function NeuralNetwork({ method, renderVisualization }) {
  const svgRefs = useRef([]);

  if (!method) {
    return (
      <p className="no-selection">Select a method above to view its neural network diagrams.</p>
    );
  }

  // Force re-render when method changes to reset node positions for new layout
  // We use key={method.id} on the wrapper or individual components
  return (
    <div className="network-grid">
      {method.networkCombinations.map((combo, i) => {
        if (!svgRefs.current[i]) {
          svgRefs.current[i] = { current: null };
        }
        return (
          <NetworkDiagram
            key={`${method.id}-${i}`} // Critical: Forces remount on method change
            combo={combo}
            index={i}
            methodId={method.id}
            svgRef={svgRefs.current[i]}
            renderVisualization={renderVisualization}
          />
        );
      })}
    </div>
  );
}
