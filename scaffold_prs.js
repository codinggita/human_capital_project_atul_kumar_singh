const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PR_BRANCHES = [
  {
    branch: 'feat/fe-layout-shell',
    message: 'feat: layout shell with sidebar and topbar',
    files: {
      'frontend/src/styles/layout.css': `.layout-container { display: flex; min-height: 100vh; } .sidebar { width: 260px; background: var(--color-bg-card); border-right: 1px solid var(--color-border); } .main-content { flex: 1; display: flex; flex-direction: column; } .topbar { height: 64px; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; padding: 0 24px; } .content-area { padding: 24px; flex: 1; overflow-y: auto; }`,
      'frontend/src/components/layout/Sidebar.jsx': `export default function Sidebar() { return <aside className="sidebar"><div style={{padding: '24px'}}><h2>HC Dashboard</h2></div></aside>; }`,
      'frontend/src/components/layout/Topbar.jsx': `export default function Topbar() { return <header className="topbar"><span>API Status: Online</span></header>; }`,
      'frontend/src/components/layout/Layout.jsx': `import Sidebar from './Sidebar';\nimport Topbar from './Topbar';\nexport default function Layout({children}) { return <div className="layout-container"><Sidebar/><div className="main-content"><Topbar/><main className="content-area">{children}</main></div></div>; }`
    }
  },
  {
    branch: 'feat/fe-api-routing',
    message: 'feat: centralized api client and routing setup',
    files: {
      'frontend/src/services/api.js': `export const api = { getPrices: () => fetch('/api/v1/prices').then(r => r.json()) };`,
      'frontend/src/hooks/useFetch.js': `import { useState, useEffect } from 'react';\nexport function useFetch(fetchFn) { const [data, setData] = useState(null); useEffect(() => { fetchFn().then(setData); }, []); return { data }; }`,
      'frontend/src/pages/Placeholder.jsx': `export default function Placeholder({title}) { return <div><h1>{title}</h1><p>Coming soon...</p></div>; }`,
      'frontend/src/pages/Home.jsx': `export default function Home() { return <div><h1 className="mesh-gradient-bg">Human Capital Insights</h1></div>; }`,
      'frontend/src/App.jsx': `import { BrowserRouter, Routes, Route } from 'react-router-dom';\nimport Layout from './components/layout/Layout';\nimport Home from './pages/Home';\nexport default function App() { return <BrowserRouter><Layout><Routes><Route path="/" element={<Home/>} /></Routes></Layout></BrowserRouter>; }`
    }
  },
  {
    branch: 'feat/fe-dashboard',
    message: 'feat: dashboard analytics components',
    files: {
      'frontend/src/pages/Dashboard.jsx': `export default function Dashboard() { return <div className="grid grid-cols-3"><div className="card">Stats</div></div>; }`,
      'frontend/src/styles/pages/dashboard.css': `.dashboard-grid { display: grid; gap: 24px; }`
    }
  },
  {
    branch: 'feat/fe-prices',
    message: 'feat: prices data grid and filtering',
    files: {
      'frontend/src/pages/Prices.jsx': `export default function Prices() { return <div className="table-container"><table className="table"><thead><tr><th>Country</th><th>Price</th></tr></thead><tbody><tr><td>USA</td><td>$100</td></tr></tbody></table></div>; }`,
      'frontend/src/styles/pages/prices.css': `.filters-bar { margin-bottom: 24px; display: flex; gap: 16px; }`
    }
  },
  {
    branch: 'feat/fe-countries',
    message: 'feat: country detailed view and history chart',
    files: {
      'frontend/src/pages/CountryList.jsx': `export default function CountryList() { return <div><h1>Countries</h1></div>; }`,
      'frontend/src/pages/CountryDetail.jsx': `export default function CountryDetail() { return <div><h1>Country Details</h1></div>; }`,
      'frontend/src/styles/pages/countries.css': `.country-card { padding: 16px; }`
    }
  },
  {
    branch: 'feat/fe-stats',
    message: 'feat: overall statistics and comparisons',
    files: {
      'frontend/src/pages/Stats.jsx': `export default function Stats() { return <div><h1>Global Stats</h1></div>; }`,
      'frontend/src/styles/pages/stats.css': `.stats-wrapper { margin-top: 24px; }`
    }
  },
  {
    branch: 'feat/fe-search',
    message: 'feat: universal search functionality',
    files: {
      'frontend/src/pages/Search.jsx': `export default function Search() { return <div><input className="form-control" placeholder="Search..." /></div>; }`,
      'frontend/src/styles/pages/search.css': `.search-results { margin-top: 16px; }`
    }
  },
  {
    branch: 'feat/fe-auth',
    message: 'feat: authentication context and forms',
    files: {
      'frontend/src/context/AuthContext.jsx': `import { createContext } from 'react';\nexport const AuthContext = createContext(null);`,
      'frontend/src/pages/Login.jsx': `export default function Login() { return <div className="card"><form><input className="form-control" /></form></div>; }`,
      'frontend/src/pages/Register.jsx': `export default function Register() { return <div>Register</div>; }`,
      'frontend/src/pages/Profile.jsx': `export default function Profile() { return <div>Profile</div>; }`,
      'frontend/src/styles/pages/auth.css': `.auth-container { max-width: 400px; margin: 0 auto; }`
    }
  },
  {
    branch: 'feat/fe-admin',
    message: 'feat: admin dashboard and crud interfaces',
    files: {
      'frontend/src/pages/Admin.jsx': `export default function Admin() { return <div><h1>Admin Dashboard</h1></div>; }`,
      'frontend/src/styles/pages/admin.css': `.admin-panel { padding: 24px; }`
    }
  }
];

function runCommand(cmd) {
  console.log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
  } catch (err) {
    console.error(`Failed to run command: ${cmd}`);
    process.exit(1);
  }
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function main() {
  for (const pr of PR_BRANCHES) {
    runCommand(`git checkout -b ${pr.branch}`);
    
    // Create/update files
    for (const [filePath, content] of Object.entries(pr.files)) {
      const fullPath = path.join(process.cwd(), filePath);
      ensureDir(fullPath);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Created ${filePath}`);
    }

    runCommand(`git add .`);
    runCommand(`git commit -m "${pr.message}"`);
    runCommand(`git push -u origin ${pr.branch}`);
  }
  console.log("All PR branches created and pushed successfully.");
}

main();
