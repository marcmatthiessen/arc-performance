import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function AccountPage() {
  const { user } = useAuth()
  const [orderCount, setOrderCount] = useState(0)
  const [addressCount, setAddressCount] = useState(0)
  const [recentOrders, setRecentOrders] = useState<any[]>([])

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Athlete'
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '—'

  useEffect(() => {
    if (!user) return
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setOrderCount(count ?? 0))
    supabase.from('addresses').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setAddressCount(count ?? 0))
    supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3)
      .then(({ data }) => setRecentOrders(data ?? []))
  }, [user])

  const STATUS_COLORS: Record<string, string> = {
    pending: 'rgba(255,255,255,0.3)', confirmed: '#60A5FA',
    shipped: 'var(--orange)', delivered: '#4ADE80', cancelled: '#F87171',
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '56px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '8px' }}>
        HELLO, {firstName.toUpperCase()}.
      </h1>
      <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginBottom: '48px' }}>
        Welcome to your ARC account.
      </p>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '56px' }}>
        {[
          { label: 'Orders', value: orderCount, link: '/account/orders' },
          { label: 'Addresses', value: addressCount, link: '/account/addresses' },
          { label: 'Member Since', value: memberSince, link: '' },
        ].map(card => (
          <div key={card.label} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '28px 24px' }}>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
              {card.label}
            </p>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '36px', color: 'var(--text)', lineHeight: 1 }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '24px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Recent Orders
          </h2>
          <Link to="/account/orders" style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
            View All →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '48px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '22px', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '8px' }}>
              No Orders Yet
            </p>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginBottom: '24px' }}>
              Explore our collection and place your first order.
            </p>
            <Link to="/" style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '14px 28px', textDecoration: 'none' }}>
              SHOP NOW
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {recentOrders.map(order => (
              <div key={order.id} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '16px', color: 'var(--text)', textTransform: 'uppercase' }}>
                    #{order.order_number}
                  </p>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                    {new Date(order.created_at).toLocaleDateString('en-US')}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', fontWeight: 600, color: STATUS_COLORS[order.status] || 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.04)', padding: '4px 10px' }}>
                    {order.status}
                  </span>
                  <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--text)' }}>
                    R$ {order.total_amount?.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
