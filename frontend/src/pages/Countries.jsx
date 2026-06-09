import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

export default function Countries() {
  const { data: countries, loading } = useFetch(api.getCountries);

  return (
    <div className="fade-in">
      <h2 className="mb-8">Global Countries</h2>
      
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
                  <th style={{ width: '100px' }}>Code</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {countries?.map((c, i) => (
                  <tr key={i}>
                    <td className="text-mono text-muted">{c.code}</td>
                    <td style={{fontWeight: 500}}>{c.name}</td>
                    <td>
                      <Link to={`/countries/${c.code}`} className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }}>View Stats</Link>
                    </td>
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
