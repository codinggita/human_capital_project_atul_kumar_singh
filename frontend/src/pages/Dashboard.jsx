import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { data: stats, loading } = useFetch(api.getStats);
  const { data: topCountries } = useFetch(api.getTopCountries);

  if (loading) return (
    <div className="grid grid-cols-4">
      <div className="skeleton" style={{height: 120}}></div>
      <div className="skeleton" style={{height: 120}}></div>
      <div className="skeleton" style={{height: 120}}></div>
      <div className="skeleton" style={{height: 120}}></div>
    </div>
  );

  return (
    <div className="fade-in">
      <h2 className="mb-8" style={{ marginBottom: '32px' }}>Analytics Overview</h2>
      
      <div className="grid grid-cols-4 mb-8" style={{ marginBottom: '32px' }}>
        <div className="card">
          <span className="text-mono text-muted" style={{ fontSize: '12px' }}>TOTAL RECORDS</span>
          <h2 style={{marginTop: 8, fontSize: '32px'}}>{stats?.totalRecords?.toLocaleString() || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted" style={{ fontSize: '12px' }}>AVERAGE PRICE</span>
          <h2 style={{marginTop: 8, fontSize: '32px'}}>{stats?.avgPrice?.toFixed(2) || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted" style={{ fontSize: '12px' }}>HIGHEST</span>
          <h2 style={{marginTop: 8, fontSize: '32px'}}>{stats?.maxPrice?.toFixed(2) || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted" style={{ fontSize: '12px' }}>LOWEST</span>
          <h2 style={{marginTop: 8, fontSize: '32px'}}>{stats?.minPrice?.toFixed(2) || 0}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="card card-lg">
          <h3 className="mb-4" style={{ marginBottom: '16px' }}>Top Countries</h3>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>Country</th><th>Records</th></tr></thead>
              <tbody>
                {topCountries?.slice(0, 5).map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{c._id}</td>
                    <td className="text-mono text-muted">{c.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card card-lg" style={{ minHeight: '300px' }}>
          <h3 className="mb-4" style={{ marginBottom: '16px' }}>Records by Country</h3>
          {topCountries && topCountries.length > 0 ? (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={topCountries.slice(0, 5)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="_id" stroke="var(--color-text-secondary)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-text-secondary)" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }} 
                    itemStyle={{ color: 'var(--color-accent)' }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <Bar dataKey="count" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center" style={{ height: '300px' }}>
              <span className="text-muted">Loading chart data…</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}