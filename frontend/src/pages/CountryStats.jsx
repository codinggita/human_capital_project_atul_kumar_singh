import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CountryStats() {
  const { code } = useParams();
  const { data: stats, loading: statsLoading } = useFetch(() => api.getCountryStats(code), [code]);
  const { data: prices, loading: pricesLoading } = useFetch(() => api.getCountryPrices(code), [code]);

  if (statsLoading || pricesLoading) {
    return (
      <div className="fade-in">
        <div className="skeleton mb-4" style={{ height: 40, width: 200 }}></div>
        <div className="grid grid-cols-4 mb-8">
          <div className="skeleton" style={{ height: 100 }}></div>
          <div className="skeleton" style={{ height: 100 }}></div>
          <div className="skeleton" style={{ height: 100 }}></div>
          <div className="skeleton" style={{ height: 100 }}></div>
        </div>
        <div className="skeleton" style={{ height: 400 }}></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/countries" className="btn btn-secondary">← Back</Link>
        <h2 style={{ margin: 0 }}>Country Statistics: {code}</h2>
      </div>

      <div className="grid grid-cols-4 mb-8">
        <div className="card">
          <span className="text-mono text-muted">TOTAL RECORDS</span>
          <h2 style={{ marginTop: 8 }}>{stats?.totalRecords?.toLocaleString() || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted">AVERAGE PRICE</span>
          <h2 style={{ marginTop: 8 }}>{stats?.avgPrice?.toFixed(2) || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted">HIGHEST</span>
          <h2 style={{ marginTop: 8 }}>{stats?.maxPrice?.toFixed(2) || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted">LOWEST</span>
          <h2 style={{ marginTop: 8 }}>{stats?.minPrice?.toFixed(2) || 0}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="card card-lg" style={{ gridColumn: 'span 2' }}>
          <h3 className="mb-4">Recent Prices Trend (Latest 50 records)</h3>
          <div style={{ width: '100%', height: 350 }}>
            {prices ? (
              <ResponsiveContainer>
                <LineChart data={[...prices].reverse()} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis 
                    dataKey={(row) => `${row.year}-${row.month}`} 
                    stroke="var(--color-text-secondary)" 
                    tickLine={false} 
                    axisLine={false} 
                    minTickGap={30}
                  />
                  <YAxis stroke="var(--color-text-secondary)" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }} 
                    itemStyle={{ color: 'var(--color-accent)' }}
                  />
                  <Line type="monotone" dataKey="value" name="Value" stroke="var(--color-accent)" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted text-center" style={{ paddingTop: 100 }}>No trend data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
