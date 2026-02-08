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

/* ---------- Initial node layout ---------- */
function createInitialNodes() {
  return {
    I1: { x: 60, y: 50 },
    I2: { x: 60, y: 110 },
    H1: { x: 180, y: 30 },
    H2: { x: 180, y: 80 },
    H3: { x: 180, y: 130 },
    O1: { x: 300, y: 80 },
  };
}

const connectionDefs = [
  ['I1', 'H1'], ['I1', 'H2'], ['I1', 'H3'],
  ['I2', 'H1'], ['I2', 'H2'], ['I2', 'H3'],
  ['H1', 'O1'], ['H2', 'O1'], ['H3', 'O1'],
];

const nodeMeta = {
  I1: { fill: '#64b5f6', r: 18 },
  I2: { fill: '#64b5f6', r: 18 },
  H1: { fill: '#81c784', r: 18 },
  H2: { fill: '#81c784', r: 18 },
  H3: { fill: '#81c784', r: 18 },
  O1: { fill: '#e57373', r: 18 },
};

/* ---------- Single network diagram ---------- */
function NetworkDiagram({ combo, index, svgRef, renderVisualization }) {
  const [nodes, setNodes] = useState(createInitialNodes);

  const handleDrag = useCallback((id, x, y) => {
    setNodes((prev) => ({ ...prev, [id]: { x, y } }));
  }, []);

  return (
    <div className="network-card">
      <h4>
        Combination {index + 1}: Hidden={combo.hidden}, Output={combo.output}
      </h4>
      <svg
        ref={svgRef}
        viewBox="0 0 360 160"
        className="network-svg"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#999" />
          </marker>
        </defs>

        {connectionDefs.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="#bbb"
            strokeWidth={1.5}
            markerEnd="url(#arrow)"
          />
        ))}

        {Object.entries(nodeMeta).map(([id, meta]) => (
          <DraggableCircle
            key={id}
            id={id}
            cx={nodes[id].x}
            cy={nodes[id].y}
            r={meta.r}
            fill={meta.fill}
            label={id}
            svgRef={svgRef}
            onDrag={handleDrag}
          />
        ))}

        {/* Layer labels */}
        <text x={60} y={155} textAnchor="middle" fontSize={10} fill="#666">
          Input
        </text>
        <text x={180} y={155} textAnchor="middle" fontSize={10} fill="#666">
          Hidden ({combo.hidden})
        </text>
        <text x={300} y={155} textAnchor="middle" fontSize={10} fill="#666">
          Output ({combo.output})
        </text>
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

  return (
    <div className="network-grid">
      {method.networkCombinations.map((combo, i) => {
        if (!svgRefs.current[i]) {
          svgRefs.current[i] = { current: null };
        }
        return (
          <NetworkDiagram
            key={`${method.id}-${i}`}
            combo={combo}
            index={i}
            svgRef={svgRefs.current[i]}
            renderVisualization={renderVisualization}
          />
        );
      })}
    </div>
  );
}
