const fs = require('fs');
const path = require('path');

const filesToCreate = {
  'frontend/src/services/api.js': `
const BASE_URL = 'https://human-capital-api.onrender.com/api/v1';

export const api = {
  async get(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    const json = await res.json();
    return json.data;
  },
  getPrices: () => api.get('/prices?limit=50'),
  getStats: () => api.get('/stats/prices'),
  getTopCountries: () => api.get('/stats/top-countries'),
  getCountries: () => api.get('/countries'),
  search: (query) => api.get(`/search/prices?q=${query}`),
};
  `,
  'frontend/src/hooks/useFetch.js': `
import { useState, useEffect } from 'react';

export function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchFn()
      .then(res => {
        if (mounted) {
          setData(res);
          setError(null);
        }
      })
      .catch(err => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, dependencies);

  return { data, loading, error };
}
  `,
  'frontend/src/styles/layout.css': `
.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-bg);
}

.sidebar {
  width: 260px;
  background-color: var(--color-bg);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.sidebar-nav {
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.nav-item {
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background-color: var(--color-border);
  color: var(--color-text-primary);
}

.nav-item.active {
  background-color: var(--color-border);
  color: var(--color-primary);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* allows truncation */
}

.topbar {
  height: 64px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.content-area {
  padding: 32px;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.topbar-search {
  width: 300px;
}
  `,
  'frontend/src/components/layout/Sidebar.jsx': `
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = [
    { path: '/', label: 'Overview' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/prices', label: 'Prices Directory' },
    { path: '/countries', label: 'Countries' },
    { path: '/stats', label: 'Global Stats' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="mesh-gradient-bg" style={{ fontSize: '16px' }}>Human Capital</span>
      </div>
      <nav className="sidebar-nav">
        {links.map(l => (
          <NavLink 
            key={l.path} 
            to={l.path} 
            className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '24px' }}>
        <div className="badge badge-secondary" style={{ width: '100%', justifyContent: 'center' }}>v1.0.0</div>
      </div>
    </aside>
  );
}
  `,
  'frontend/src/components/layout/Topbar.jsx': `
export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <input type="text" className="form-control" placeholder="Search indicator or country..." />
      </div>
      <div className="flex items-center gap-4">
        <span className="badge badge-secondary" style={{ border: '1px solid var(--color-success)', color: 'var(--color-success)', background: 'transparent' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', marginRight: 6, display: 'inline-block' }}></span>
          API Online
        </span>
        <button className="btn btn-primary">Deploy</button>
      </div>
    </header>
  );
}
  `,
  'frontend/src/components/layout/Layout.jsx': `
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="content-area fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
  `,
  'frontend/src/pages/Home.jsx': `
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '64px 0', textAlign: 'center', maxWidth: 800, margin: '0 auto' }} className="slide-up">
      <div className="badge badge-secondary mb-4">Vercel-Inspired UI</div>
      <h1 style={{ fontSize: '64px', letterSpacing: '-3.2px', marginBottom: '24px' }}>
        Explore global <br/><span className="mesh-gradient-bg">human capital</span> data.
      </h1>
      <p style={{ fontSize: '20px', color: 'var(--color-text-secondary)', marginBottom: '48px', textWrap: 'balance' }}>
        An ultra-fast, premium dashboard to monitor consumer prices, economic indicators, and global analytics in real-time.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/dashboard" className="btn btn-primary btn-lg">View Dashboard</Link>
        <Link to="/prices" className="btn btn-secondary btn-lg">Explore Directory</Link>
      </div>
      
      <div className="grid grid-cols-3" style={{ marginTop: '96px', textAlign: 'left' }}>
        <div className="card">
          <h4 className="text-mono mb-2" style={{color: 'var(--color-text-secondary)'}}>Real-time</h4>
          <p>Instant access to over 100,000+ data points across 190 countries.</p>
        </div>
        <div className="card">
          <h4 className="text-mono mb-2" style={{color: 'var(--color-text-secondary)'}}>Analytics</h4>
          <p>Deep dive into multi-year trends with beautiful, responsive charts.</p>
        </div>
        <div className="card">
          <h4 className="text-mono mb-2" style={{color: 'var(--color-text-secondary)'}}>API First</h4>
          <p>Built on a robust Node.js backend. Connect your apps in seconds.</p>
        </div>
      </div>
    </div>
  );
}
  `,
  'frontend/src/pages/Dashboard.jsx': `
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';

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
      <h2 className="mb-8">Analytics Overview</h2>
      
      <div className="grid grid-cols-4 mb-8">
        <div className="card">
          <span className="text-mono text-muted">TOTAL RECORDS</span>
          <h2 style={{marginTop: 8}}>{stats?.totalCount?.toLocaleString() || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted">AVERAGE PRICE</span>
          <h2 style={{marginTop: 8}}>{stats?.average?.toFixed(2) || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted">HIGHEST</span>
          <h2 style={{marginTop: 8}}>{stats?.highest?.value || 0}</h2>
        </div>
        <div className="card">
          <span className="text-mono text-muted">LOWEST</span>
          <h2 style={{marginTop: 8}}>{stats?.lowest?.value || 0}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="card card-lg">
          <h3 className="mb-4">Top Countries</h3>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>Country</th><th>Records</th></tr></thead>
              <tbody>
                {topCountries?.slice(0, 5).map((c, i) => (
                  <tr key={i}>
                    <td>{c._id}</td>
                    <td>{c.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card card-lg" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div className="text-center">
            <div className="badge badge-secondary mb-4">Chart coming soon</div>
            <p className="text-muted">Recharts integration pending in feature update.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
  `,
  'frontend/src/pages/Prices.jsx': `
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';

export default function Prices() {
  const { data: prices, loading } = useFetch(api.getPrices);

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-8">
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
                {prices?.docs?.map((p, i) => (
                  <tr key={i}>
                    <td style={{fontWeight: 500}}>{p.countryLabel} ({p.country})</td>
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
  `,
  'frontend/src/App.jsx': `
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Prices from './pages/Prices';

// Placeholders for other routes
const Placeholder = ({title}) => (<div className="fade-in"><h2>{title}</h2><p className="text-muted mt-4">This module is part of the full suite.</p></div>);

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/countries" element={<Placeholder title="Countries" />} />
          <Route path="/stats" element={<Placeholder title="Global Stats" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
  `
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
  console.log(`Updated ${filePath}`);
}
