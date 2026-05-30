import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const STATUS_COLORS: Record<string, string> = {
  pending: 'rgba(255,255,255,0.35)', confirmed: '#60A5FA',
  shipped: '#E8642A', delivered: '#4ADE80', cancelled: '#F87171',
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      .then(({ data }) => { setOrders(data ?? []); setLoading(false) })
  }, [user])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--stroke)', borderTopColor: 'var(--orange)', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div>
      <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '48px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '8px' }}>MY ORDERS</h1>
      <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginBottom: '40px' }}>
        {orders.length} {orders.length === 1 ? 'order' : 'orders'} in your history.
      </p>

      {orders.length === 0 ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '64px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '26px', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '12px' }}>
            No Orders Yet
          </p>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginBottom: '28px' }}>
            You haven't placed any orders yet. Explore our collection.
          </p>
          <Link to="/" style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '14px 28px', textDecoration: 'none' }}>
            SHOP NOW
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)' }}>
              <div
                style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div>
                  <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '17px', color: 'var(--text)', textTransform: 'uppercase' }}>
                    #{order.order_number}
                  </p>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                    {new Date(order.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', fontWeight: 600, color: STATUS_COLORS[order.status] || 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.04)', padding: '4px 10px', border: `1px solid ${STATUS_COLORS[order.status] || 'var(--stroke)'}` }}>
                    {order.status}
                  </span>
                  <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--text)' }}>
                    R$ {order.total_amount?.toFixed(2)}
                  </p>
                  <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{expanded === order.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === order.id && order.items && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--stroke)' }}>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', margin: '16px 0 12px' }}>Items</p>
                  {(order.items as any[]).map((item: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'var(--text)' }}>{item.name} × {item.qty}</span>
                      <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'var(--muted)' }}>R$ {item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
