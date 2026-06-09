import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { Link, useSearchParams } from 'react-router-dom';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('prices');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== query) {
      setQuery(q);
    }
  }, [searchParams]);
  
  // Create a deferred query to avoid spamming the API on every keystroke
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query) {
        setSearchParams({ q: query });
      } else {
        setSearchParams({});
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, setSearchParams]);

  // Fetch results based on active tab
  const fetchFn = () => {
    if (!debouncedQuery) return Promise.resolve([]);
    if (activeTab === 'prices') return api.search(debouncedQuery);
    if (activeTab === 'countries') return api.get('/countries').then(res => res.filter(c => c.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || c.code.toLowerCase().includes(debouncedQuery.toLowerCase())));
    return Promise.resolve([]);
  };

  const { data: results, loading } = useFetch(fetchFn, [debouncedQuery, activeTab]);

  return (
    <div className="fade-in">
      <h2 className="mb-8" style={{ marginBottom: '32px' }}>Search Engine</h2>
      
      <div className="card mb-8" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search for countries, indicators, or prices..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, height: '48px', fontSize: '16px' }}
            autoFocus
            aria-label="Search across the dataset"
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--color-border)' }}>
        <button 
          className="btn" 
          style={{ 
            background: 'transparent', 
            color: activeTab === 'prices' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            borderBottom: activeTab === 'prices' ? '2px solid var(--color-primary)' : '2px solid transparent',
            borderRadius: '0',
            paddingBottom: '12px'
          }}
          onClick={() => setActiveTab('prices')}
        >
          Prices Data
        </button>
        <button 
          className="btn" 
          style={{ 
            background: 'transparent', 
            color: activeTab === 'countries' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            borderBottom: activeTab === 'countries' ? '2px solid var(--color-primary)' : '2px solid transparent',
            borderRadius: '0',
            paddingBottom: '12px'
          }}
          onClick={() => setActiveTab('countries')}
        >
          Countries List
        </button>
      </div>

      <div className="card p-0" style={{ padding: 0 }}>
        {!debouncedQuery ? (
          <div style={{ padding: '64px', textAlign: 'center' }} className="text-muted">
            Start typing above to see results instantly.
          </div>
        ) : loading ? (
          <div style={{padding: 24}}>
            <div className="skeleton mb-2" style={{height: 40}}></div>
            <div className="skeleton mb-2" style={{height: 40}}></div>
            <div className="skeleton mb-2" style={{height: 40}}></div>
          </div>
        ) : results?.length > 0 ? (
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              {activeTab === 'prices' && (
                <>
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>Indicator</th>
                      <th>Year/Month</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.slice(0, 50).map((p, i) => (
                      <tr key={i}>
                        <td style={{fontWeight: 500}}>{p.countryLabel} <span className="text-muted text-mono text-sm">({p.country})</span></td>
                        <td>{p.indicator}</td>
                        <td>{p.year} - {p.month}</td>
                        <td style={{fontFamily: 'var(--font-mono)'}}>{p.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
              {activeTab === 'countries' && (
                <>
                  <thead>
                    <tr>
                      <th style={{ width: '100px' }}>Code</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((c, i) => (
                      <tr key={i}>
                        <td className="text-mono text-muted">{c.code}</td>
                        <td style={{fontWeight: 500}}>{c.name}</td>
                        <td>
                          <Link to={`/countries/${c.code}`} className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }}>View Stats</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        ) : (
          <div style={{ padding: '64px', textAlign: 'center' }} className="text-muted">
            No results found for "{debouncedQuery}".
          </div>
        )}
      </div>
    </div>
  );
}