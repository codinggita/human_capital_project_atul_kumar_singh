import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Prices from './pages/Prices';
import Countries from './pages/Countries';
import CountryStats from './pages/CountryStats';
import GlobalStats from './pages/GlobalStats';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:code" element={<CountryStats />} />
          <Route path="/stats" element={<GlobalStats />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
