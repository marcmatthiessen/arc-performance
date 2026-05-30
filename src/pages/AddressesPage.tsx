import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const INPUT: React.CSSProperties = {
  width: '100%', background: 'var(--surface)', border: '1px solid var(--stroke)',
  color: 'var(--text)', fontFamily: 'Barlow, sans-serif', fontSize: '14px',
  padding: '12px 14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
}
const LABEL: React.CSSProperties = {
  display: 'block', fontFamily: 'Barlow, sans-serif', fontSize: '10px',
  color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px',
}

type Address = { id: string; label: string; full_name: string; street: string; number: string; complement: string; neighborhood: string; city: string; state: string; zip_code: string; is_default: boolean }
const EMPTY: Omit<Address, 'id' | 'is_default'> = { label: '', full_name: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zip_code: '' }

export default function AddressesPage() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Address | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)
  const [loadingCep, setLoadingCep] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const load = async () => {
    if (!user) return
    const { data } = await supabase.from('addresses').select('*').eq('user_id', user.id).order('is_default', { ascending: false })
    setAddresses(data ?? [])
  }

  useEffect(() => { load() }, [user])

  const fetchCep = async (cep: string) => {
    const clean = cep.replace(/\D/g, '')
    if (clean.length !== 8) return
    setLoadingCep(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setForm(f => ({ ...f, street: data.logradouro || f.street, neighborhood: data.bairro || f.neighborhood, city: data.localidade || f.city, state: data.uf || f.state }))
      }
    } catch { /* ignore */ } finally { setLoadingCep(false) }
  }

  const openAdd = () => { setEditing(null); setForm({ ...EMPTY }); setShowModal(true) }
  const openEdit = (a: Address) => { setEditing(a); setForm({ label: a.label, full_name: a.full_name, street: a.street, number: a.number, complement: a.complement, neighborhood: a.neighborhood, city: a.city, state: a.state, zip_code: a.zip_code }); setShowModal(true) }

  const save = async () => {
    if (!user) return
    setSaving(true)
    if (editing) {
      await supabase.from('addresses').update(form).eq('id', editing.id)
    } else {
      await supabase.from('addresses').insert({ ...form, user_id: user.id })
    }
    setSaving(false)
    setShowModal(false)
    load()
  }

  const setDefault = async (id: string) => {
    if (!user) return
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id)
    await supabase.from('addresses').update({ is_default: true }).eq('id', id)
    load()
  }

  const del = async (id: string) => {
    await supabase.from('addresses').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '48px', color: 'var(--text)', letterSpacing: '3px' }}>MY ADDRESSES</h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>{addresses.length} saved {addresses.length === 1 ? 'address' : 'addresses'}</p>
        </div>
        <button onClick={openAdd} style={{ background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '14px 24px' }}>
          + ADD ADDRESS
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px' }}>
        {addresses.map(a => (
          <div key={a.id} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px' }}>{a.label || 'Address'}</p>
                {a.is_default && <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'var(--orange)', letterSpacing: '2px', textTransform: 'uppercase' }}>DEFAULT</span>}
              </div>
            </div>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
              {a.full_name}<br />
              {a.street}, {a.number}{a.complement ? `, ${a.complement}` : ''}<br />
              {a.neighborhood} · {a.city}/{a.state}<br />
              CEP {a.zip_code}
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button onClick={() => openEdit(a)} style={{ background: 'none', border: '1px solid var(--stroke)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 14px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--stroke)' }}>
                Edit
              </button>
              {!a.is_default && (
                <button onClick={() => setDefault(a.id)} style={{ background: 'none', border: '1px solid var(--stroke)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 14px', transition: 'all 0.2s' }}>
                  Set Default
                </button>
              )}
              <button onClick={() => del(a.id)} style={{ background: 'none', border: 'none', color: 'rgba(248,113,113,0.6)', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 0', marginLeft: 'auto' }}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Add card */}
        <div onClick={openAdd} style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.12)', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '180px', transition: 'border-color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}>
          <span style={{ fontSize: '28px', color: 'var(--orange)', marginBottom: '10px' }}>+</span>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Add Address</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', border: '1px solid var(--stroke)', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', padding: '40px' }}>
            <h2 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '32px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '28px' }}>
              {editing ? 'EDIT ADDRESS' : 'ADD ADDRESS'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { k: 'label', label: 'Label', placeholder: 'Home, Work...', col: 2 },
                { k: 'full_name', label: 'Full Name', placeholder: 'Recipient name', col: 2 },
                { k: 'zip_code', label: 'CEP', placeholder: '00000-000', col: 1 },
                { k: 'street', label: 'Street', placeholder: 'Street name', col: 2 },
                { k: 'number', label: 'Number', placeholder: '123', col: 1 },
                { k: 'complement', label: 'Complement', placeholder: 'Apt, Suite...', col: 1 },
                { k: 'neighborhood', label: 'Neighborhood', placeholder: 'Neighborhood', col: 2 },
                { k: 'city', label: 'City', placeholder: 'City', col: 1 },
                { k: 'state', label: 'State', placeholder: 'SP', col: 1 },
              ].map(f => (
                <div key={f.k} style={{ gridColumn: `span ${f.col}` }}>
                  <label style={LABEL}>{f.label} {f.k === 'zip_code' && loadingCep ? '(searching...)' : ''}</label>
                  <input
                    type="text" placeholder={f.placeholder}
                    value={form[f.k as keyof typeof form]}
                    onChange={e => {
                      set(f.k, e.target.value)
                      if (f.k === 'zip_code') fetchCep(e.target.value)
                    }}
                    style={INPUT}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <button onClick={save} disabled={saving} style={{ flex: 1, background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {saving && <span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />}
                SAVE
              </button>
              <button onClick={() => setShowModal(false)} style={{ padding: '0 24px', background: 'none', border: '1px solid var(--stroke)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
