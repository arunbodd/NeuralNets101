import './MLTable.css';

export default function MLTable({ data, onSelectMethod, selectedId }) {
  return (
    <div className="table-wrapper">
      <table className="ml-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Loss Functions</th>
            <th>Activation Functions</th>
            <th>Optimizers</th>
            <th>Datasets</th>
            <th>Hidden Layer Act.</th>
            <th>Output Layer Act.</th>
            <th>Eval Metrics</th>
            <th>Regularization</th>
            <th>Architectures</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              style={{ backgroundColor: row.rowColor }}
              className={`table-row${row.id === selectedId ? ' table-row-active' : ''}`}
              onClick={() => onSelectMethod(row.id)}
            >
              <td className="method-cell">{row.method}</td>
              <td>
                <ul className="cell-list loss">
                  {row.lossFunctions.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="cell-list activation">
                  {row.activationFunctions.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="cell-list optimizer">
                  {row.optimizers.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="cell-list dataset">
                  {row.datasets.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="cell-list activation">
                  {row.hiddenActivations.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="cell-list activation">
                  {row.outputActivations.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="cell-list metric">
                  {row.evaluationMetrics.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="cell-list regularization">
                  {row.regularization.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="cell-list architecture">
                  {row.architectures.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
