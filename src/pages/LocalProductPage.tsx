import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductBySlug, LOCAL_PRODUCTS } from '../data/localProducts'
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../types/product'
import Navbar from '../components/Navbar'
import { useIsMobile } from '../hooks/useIsMobile'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import toast from 'react-hot-toast'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function LocalProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { addItem, openCart } = useCartStore()

  const product = getProductBySlug(slug ?? '')
  const [selectedSize, setSelectedSize] = useState('')
  const [sizeError, setSizeError] = useState(false)
  const [adding, setAdding] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('features')

  if (!product) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '40px', color: 'var(--text)', letterSpacing: '3px' }}>PRODUCT NOT FOUND</p>
      <button onClick={() => navigate('/')} style={{ background: 'var(--orange)', color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '14px 28px' }}>
        BACK TO SHOP
      </button>
    </div>
  )

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 600)
      toast.error('Select a size first')
      return
    }
    setAdding(true)

    // Build a minimal Product-compatible object for the cart
    const cartProduct = {
      id: product.slug,
      slug: product.slug,
      name: `${product.name} — ${product.colorway}`,
      subtitle: product.colorway,
      description: product.description,
      price: product.price,
      compare_at_price: null,
      category: product.category.toLowerCase() as 'triathlon' | 'cycling' | 'running',
      gender: 'unisex' as const,
      tags: [],
      features: product.features,
      materials: product.materials,
      care_instructions: product.care,
      is_active: true,
      sort_order: 0,
      product_images: [{ id: '1', url: product.file, alt: product.colorway, color_variant: '', is_primary: true, sort_order: 0 }],
      product_variants: [],
    } satisfies Product

    const cartVariant = {
      id: `${product.slug}-${selectedSize}`,
      product_id: product.slug,
      size: selectedSize,
      color: product.colorway,
      color_hex: '#000',
      stock: 99,
      sku: `${product.slug}-${selectedSize}`,
    }

    await new Promise(r => setTimeout(r, 600))
    addItem(cartProduct, cartVariant)
    setAdding(false)
    openCart()
    toast.success('Added to cart ✓')
  }

  // Related products (same type, different slug)
  const related = LOCAL_PRODUCTS.filter(p => p.type === product.type && p.slug !== product.slug).slice(0, 4)

  const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2 })

  const accordions = [
    { id: 'features', label: 'Features', content: null },
    { id: 'description', label: 'Description', content: product.description },
    { id: 'materials', label: 'Materials', content: product.materials },
    { id: 'care', label: 'Care Instructions', content: product.care },
    { id: 'shipping', label: 'Shipping & Returns', content: 'Free shipping on orders over R$ 350. Delivery in 3–7 business days. Free returns within 30 days.' },
  ]

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '80px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: isMobile ? '24px 16px 60px' : '40px 48px 80px' }}>

          {/* Breadcrumb */}
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'var(--muted)', marginBottom: '40px' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <button onClick={() => { window.history.back() }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>
              Collection
            </button>
            {' / '}{product.name}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '80px' }}>

            {/* LEFT — Image */}
            <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', overflow: 'hidden', aspectRatio: '1' }}>
                <img src={product.file} alt={product.colorway} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>

            {/* RIGHT — Info */}
            <div>
              {/* Category badge */}
              <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(232,100,42,0.12)', color: 'var(--orange)', marginBottom: '16px', display: 'inline-block' }}>
                {product.category}
              </span>

              <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '56px', color: 'var(--text)', lineHeight: 0.9, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
                {product.name}
              </h1>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '15px', color: 'var(--muted)', marginBottom: '24px' }}>
                {product.colorway}
              </p>

              {/* Price */}
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '44px', color: 'var(--text)', letterSpacing: '1px', lineHeight: 1 }}>
                  R$ {fmt(product.price)}
                </p>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                  or 6x of R$ {fmt(product.price / 6)} interest-free
                </p>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: '#4ADE80', marginTop: '2px' }}>
                  PIX: R$ {fmt(product.price * 0.95)} (5% off)
                </p>
              </div>

              <div style={{ height: '1px', background: 'var(--stroke)', marginBottom: '24px' }} />

              {/* Size selector */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '11px', color: sizeError ? 'var(--orange)' : 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {sizeError ? '⚠ SELECT A SIZE' : `SIZE${selectedSize ? ` — ${selectedSize}` : ''}`}
                  </p>
                  <Link to="/size-chart" style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'var(--orange)', textDecoration: 'none' }}>
                    Size Guide →
                  </Link>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {SIZES.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} style={{
                      width: '56px', height: '44px',
                      fontFamily: 'Barlow, sans-serif', fontSize: '13px', fontWeight: 500,
                      color: selectedSize === size ? 'var(--text)' : 'var(--muted)',
                      background: selectedSize === size ? 'var(--surface)' : 'none',
                      border: `1px solid ${selectedSize === size ? 'var(--orange)' : 'var(--stroke)'}`,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { if (selectedSize !== size) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                      onMouseLeave={e => { if (selectedSize !== size) e.currentTarget.style.borderColor = 'var(--stroke)' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <button
                  onClick={handleAddToCart}
                  style={{ width: '100%', height: '56px', background: 'var(--orange)', color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '20px', letterSpacing: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'opacity 0.2s', opacity: adding ? 0.7 : 1 }}
                  onMouseEnter={e => { if (!adding) e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = adding ? '0.7' : '1' }}
                >
                  {adding && <span style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />}
                  {adding ? 'ADDING...' : 'ADD TO CART'}
                </button>
                <button style={{ width: '100%', height: '56px', background: 'transparent', color: 'var(--text)', border: '1px solid var(--orange)', cursor: 'pointer', fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '20px', letterSpacing: '3px', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(232,100,42,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  BUY NOW
                </button>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '8px', marginBottom: '32px', padding: '16px 0', borderTop: '1px solid var(--stroke)', borderBottom: '1px solid var(--stroke)' }}>
                {[['🚚', 'Free shipping R$350+'], ['🔄', '30-day returns'], ['🔒', 'Secure payment'], ['✅', 'Certified']].map(([icon, label]) => (
                  <div key={label as string} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>{icon}</div>
                    <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.4 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              {accordions.map(acc => (
                <div key={acc.id} style={{ borderBottom: '1px solid var(--stroke)' }}>
                  <button onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 0', textAlign: 'left' }}>
                    <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '11px', color: 'var(--text)', letterSpacing: '2px', textTransform: 'uppercase' }}>{acc.label}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '18px', transform: openAccordion === acc.id ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s' }}>+</span>
                  </button>
                  {openAccordion === acc.id && (
                    <div style={{ paddingBottom: '20px' }}>
                      {acc.id === 'features' ? (
                        <ul style={{ listStyle: 'none' }}>
                          {product.features.map((f, i) => (
                            <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                              <span style={{ color: 'var(--orange)', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                              <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{f}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8 }}>{acc.content}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div style={{ marginTop: '80px', paddingTop: '48px', borderTop: '1px solid var(--stroke)' }}>
              <h2 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '36px', color: 'var(--text)', letterSpacing: '3px', marginBottom: '32px' }}>MORE FROM THIS LINE</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '2px' }}>
                {related.map(p => (
                  <div key={p.slug} onClick={() => navigate(`/product/${p.slug}`)} style={{ cursor: 'pointer', background: '#0D0D0D' }}>
                    <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#111' }}>
                      <img src={p.file} alt={p.colorway} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                    </div>
                    <div style={{ padding: '12px 14px 16px' }}>
                      <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontStyle: 'italic', fontSize: '14px', color: '#fff', textTransform: 'uppercase' }}>{p.name}</p>
                      <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginTop: '3px' }}>{p.colorway}</p>
                      <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: '13px', color: '#fff', marginTop: '6px' }}>{p.priceStr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </>
  )
}
