import React from 'react';

const DataTable = ({ title, columns, data, maxHeight = 400, renderRow, rightAction }) => {
  return (
    <div className="data-table-wrapper">
      <div className="data-table-header">
        <span className="data-table-title">{title}</span>
        {rightAction && rightAction}
      </div>
      <div className="data-table-scroll" style={{ maxHeight }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} style={col.align ? { textAlign: col.align } : {}}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-tertiary)' }}>
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, idx) => renderRow(row, idx))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
