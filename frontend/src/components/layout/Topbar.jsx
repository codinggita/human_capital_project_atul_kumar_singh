import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`);
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-search" style={{ position: 'relative' }}>
        <input 
          type="text" 
          name="globalSearch"
          className="form-control" 
          placeholder="Search country, prices..." 
          value={query}
          aria-label="Search"
          autoComplete="off"
          spellCheck={false}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex items-center gap-4">
        {/* Actions can go here in future */}
      </div>
    </header>
  );
}