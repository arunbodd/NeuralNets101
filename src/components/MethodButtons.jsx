import './MethodButtons.css';

export default function MethodButtons({ data, selectedId, onSelect }) {
  return (
    <div className="method-buttons">
      {data.map((m) => (
        <button
          key={m.id}
          className={`method-btn ${selectedId === m.id ? 'active' : ''}`}
          style={{
            backgroundColor: selectedId === m.id ? m.rowColor : undefined,
          }}
          onClick={() => onSelect(m.id)}
        >
          {m.method}
        </button>
      ))}
    </div>
  );
}
