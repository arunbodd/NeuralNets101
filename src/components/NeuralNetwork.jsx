import { useState, useRef, useCallback } from 'react';
import './NeuralNetwork.css';

/* ---------- Draggable SVG circle ---------- */
function DraggableCircle({ cx, cy, r, fill, label, svgRef }) {
  const [pos, setPos] = useState({ x: cx, y: cy });
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
    offset.current = { x: p.x - pos.x, y: p.y - pos.y };
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const p = toSVG(e.clientX, e.clientY);
    setPos({ x: p.x - offset.current.x, y: p.y - offset.current.y });
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <g>
      <circle
        cx={pos.x}
        cy={pos.y}
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
        x={pos.x}
        y={pos.y + 4}
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

/* ---------- Single network diagram ---------- */
function NetworkDiagram({ combo, index, svgRef }) {
  const inputNodes = [
    { x: 60, y: 50, label: 'I1' },
    { x: 60, y: 110, label: 'I2' },
  ];
  const hiddenNodes = [
    { x: 180, y: 30, label: 'H1' },
    { x: 180, y: 80, label: 'H2' },
    { x: 180, y: 130, label: 'H3' },
  ];
  const outputNodes = [{ x: 300, y: 80, label: 'O1' }];

  const allConnections = [];
  inputNodes.forEach((inp) =>
    hiddenNodes.forEach((hid) =>
      allConnections.push({ x1: inp.x, y1: inp.y, x2: hid.x, y2: hid.y }),
    ),
  );
  hiddenNodes.forEach((hid) =>
    outputNodes.forEach((out) =>
      allConnections.push({ x1: hid.x, y1: hid.y, x2: out.x, y2: out.y }),
    ),
  );

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

        {allConnections.map((c, i) => (
          <line
            key={i}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke="#bbb"
            strokeWidth={1.5}
            markerEnd="url(#arrow)"
          />
        ))}

        {inputNodes.map((n) => (
          <DraggableCircle
            key={n.label}
            cx={n.x}
            cy={n.y}
            r={18}
            fill="#64b5f6"
            label={n.label}
            svgRef={svgRef}
          />
        ))}
        {hiddenNodes.map((n) => (
          <DraggableCircle
            key={n.label}
            cx={n.x}
            cy={n.y}
            r={18}
            fill="#81c784"
            label={n.label}
            svgRef={svgRef}
          />
        ))}
        {outputNodes.map((n) => (
          <DraggableCircle
            key={n.label}
            cx={n.x}
            cy={n.y}
            r={18}
            fill="#e57373"
            label={n.label}
            svgRef={svgRef}
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
      <p className="bio-example">{combo.biologicalExample}</p>
    </div>
  );
}

/* ---------- Main NeuralNetwork component ---------- */
export default function NeuralNetwork({ method }) {
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
          />
        );
      })}
    </div>
  );
}
