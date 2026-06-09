import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="fade-in" style={{ padding: 'var(--spacing-5xl) var(--spacing-lg)', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
      <div className="badge badge-secondary mb-8" style={{ padding: 'var(--spacing-xs) var(--spacing-sm)' }}>
        Introducing Human Capital
      </div>
      <h1 className="mesh-gradient-bg" style={{ 
        fontSize: '48px', 
        fontWeight: 600, 
        letterSpacing: '-2.4px', 
        marginBottom: '24px',
        lineHeight: '48px',
        textWrap: 'balance'
      }}>
        Analyze and explore the Data Platform.
      </h1>
      <p style={{ 
        fontSize: '18px', 
        color: 'var(--color-text-secondary)', 
        marginBottom: '48px', 
        textWrap: 'balance',
        maxWidth: 600,
        margin: '0 auto 48px'
      }}>
        An ultra-fast, premium dashboard to monitor consumer prices, economic indicators, and global analytics in real-time.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/dashboard" className="btn btn-primary btn-lg" style={{ borderRadius: 'var(--radius-full)' }}>View Dashboard</Link>
        <Link to="/prices" className="btn btn-secondary btn-lg" style={{ borderRadius: 'var(--radius-full)' }}>Explore Directory</Link>
      </div>
      
      <div className="grid grid-cols-3" style={{ marginTop: '128px', textAlign: 'left' }}>
        <div className="card">
          <h4 className="text-mono" style={{color: 'var(--color-text-primary)', marginBottom: '8px'}}>Real-time.</h4>
          <p className="text-sm">Instant access to over 100,000+ data points across 190 countries.</p>
        </div>
        <div className="card">
          <h4 className="text-mono" style={{color: 'var(--color-text-primary)', marginBottom: '8px'}}>Analytics.</h4>
          <p className="text-sm">Deep dive into multi-year trends with beautiful, responsive charts.</p>
        </div>
        <div className="card">
          <h4 className="text-mono" style={{color: 'var(--color-text-primary)', marginBottom: '8px'}}>Data First.</h4>
          <p className="text-sm">Built on a robust data platform. Access insights in seconds.</p>
        </div>
      </div>
    </div>
  );
}