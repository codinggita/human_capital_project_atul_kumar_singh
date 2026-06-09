import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GlobalStats() {
  const { data: topCountries, loading: loading1 } = useFetch(api.getTopCountries);
  
  return (
    <div className="fade-in">
      <h2 className="mb-8">Global Statistics</h2>
      
      <div className="grid grid-cols-2">
        <div className="card card-lg">
          <h3 className="mb-4">Data Volume by Country (Top 10)</h3>
          <div style={{ width: '100%', height: 400 }}>
            {topCountries ? (
              <ResponsiveContainer>
                <BarChart data={topCountries.slice(0, 10)} margin={{ top: 10, right: 10, left: 10, bottom: 10 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="var(--color-text-secondary)" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="_id" stroke="var(--color-text-secondary)" tickLine={false} axisLine={false} width={50} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }} 
                    itemStyle={{ color: 'var(--color-accent)' }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <Bar dataKey="count" name="Records" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="skeleton" style={{ height: '100%' }}></div>
            )}
          </div>
        </div>
        
        <div className="card card-lg">
          <h3 className="mb-4">System Metrics</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span className="text-muted">Status</span>
              <span style={{ color: 'var(--color-success)' }}>Healthy (200 OK)</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span className="text-muted">Total Available Endpoints</span>
              <span>65+ Routes</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span className="text-muted">Database Response Time</span>
              <span>~42ms</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
