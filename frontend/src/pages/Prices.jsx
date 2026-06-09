import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';

export default function Prices() {
  const { data: prices, loading } = useFetch(api.getPrices);

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-8" style={{ marginBottom: '32px' }}>
        <h2>Prices Directory</h2>
        <button className="btn btn-secondary">Export CSV</button>
      </div>

      <div className="card p-0" style={{ padding: 0 }}>
        {loading ? (
          <div style={{padding: 24}}>
            <div className="skeleton mb-2" style={{height: 40}}></div>
            <div className="skeleton mb-2" style={{height: 40}}></div>
            <div className="skeleton mb-2" style={{height: 40}}></div>
          </div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Indicator</th>
                  <th>Year/Month</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {prices?.map((p, i) => (
                  <tr key={i}>
                    <td style={{fontWeight: 500}}>{p.countryLabel} <span className="text-muted text-mono text-sm">({p.country})</span></td>
                    <td>{p.indicator}</td>
                    <td>{p.year} - {p.month}</td>
                    <td style={{fontFamily: 'var(--font-mono)'}}>{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}