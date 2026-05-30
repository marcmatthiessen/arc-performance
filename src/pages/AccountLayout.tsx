import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const NAV_ITEMS = [
  { label: 'Overview',   to: '/account',            icon: '◈' },
  { label: 'Orders',     to: '/account/orders',     icon: '◫' },
  { label: 'Addresses',  to: '/account/addresses',  icon: '◌' },
  { label: 'ARC Club',   to: '/account/club',       icon: '◎' },
  { label: 'Support',    to: '/contact',            icon: '◉' },
]

export default function AccountLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? 'A'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'grid', gridTemplateColumns: '280px 1fr' }}>

      {/* Sidebar */}
      <div style={{ borderRight: '1px solid var(--stroke)', padding: '80px 0 48px', display: 'flex', flexDirection: 'column' }}>

        {/* Avatar + info */}
        <div style={{ padding: '0 32px 32px', borderBottom: '1px solid var(--stroke)', marginBottom: '8px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff',
            marginBottom: '14px',
          }}>
            {initials}
          </div>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '20px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {user?.user_metadata?.full_name || 'Athlete'}
          </p>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
            {user?.email}
          </p>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '8px 0' }}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/account'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 32px',
                fontFamily: 'Barlow, sans-serif', fontWeight: isActive ? 600 : 400, fontSize: '13px',
                color: isActive ? 'var(--text)' : 'var(--muted)',
                textDecoration: 'none',
                background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--orange)' : '2px solid transparent',
                transition: 'all 0.15s',
                letterSpacing: '0.5px',
              })}
            >
              <span style={{ fontSize: '14px', color: 'var(--orange)' }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 32px', borderTop: '1px solid var(--stroke)' }}>
          <button onClick={handleSignOut} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'var(--muted)',
            padding: 0, transition: 'color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <span style={{ fontSize: '14px', color: 'var(--orange)' }}>↗</span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: '80px 64px 80px' }}>
        <Outlet />
      </div>
    </div>
  )
}
