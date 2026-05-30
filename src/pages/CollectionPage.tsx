import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'
import type { Product } from '../types/product'
import ProductCard from '../components/ProductCard'
import { useCartStore } from '../stores/cartStore'

const CATEGORY_IMAGES: Record<string, string> = {
  triathlon: '/ironman%20start.jpeg',
  cycling: '/cycle.jpeg',
  running: '/pumar-2.jpeg',
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const COLORS = [
  { name: 'Knight Black', hex: '#1A1A1A' },
  { name: 'Coral Orange', hex: '#E8642A' },
  { name: 'Navy Storm', hex: '#1A2E4A' },
  { name: 'Sage Green', hex: '#8A9E8C' },
  { name: 'Arctic White', hex: '#F0EDE6' },
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_asc', label: 'Lowest price' },
  { value: 'price_desc', label: 'Highest price' },
  { value: 'newest', label: 'Newest' },
  { value: 'bestsellers', label: 'Bestsellers' },
]

const shimmerKeyframes = `
@keyframes arc-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`

function SkeletonCard() {
  return (
    <div style={{
      aspectRatio: '3/4',
      background: 'linear-gradient(90deg, #111111 25%, #1c1c1c 50%, #111111 75%)',
      backgroundSize: '200% 100%',
      animation: 'arc-shimmer 1.5s infinite',
    }} />
  )
}

export default function CollectionPage() {
  const { category } = useParams<{ category: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  useCartStore()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [colorTooltip, setColorTooltip] = useState<string | null>(null)

  const [genderFilter, setGenderFilter] = useState<string[]>(() => {
    const g = searchParams.get('gender')
    return g ? g.split(',') : []
  })
  const [sizeFilter, setSizeFilter] = useState<string[]>(() => {
    const s = searchParams.get('size')
    return s ? s.split(',') : []
  })
  const [colorFilter, setColorFilter] = useState<string>(() => searchParams.get('color') || '')
  const [minPrice, setMinPrice] = useState<string>(() => searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState<string>(() => searchParams.get('maxPrice') || '')
  const [sort, setSort] = useState<string>(() => searchParams.get('sort') || 'relevance')
  const [cols, setCols] = useState<number>(() => Number(searchParams.get('cols')) || 3)

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Collection'

  useEffect(() => {
    if (!category) return
    setLoading(true)
    supabase
      .from('products')
      .select('*, product_images(*), product_variants(*)')
      .eq('category', category)
      .eq('is_active', true)
      .then(({ data }) => {
        setProducts((data as unknown as Product[]) || [])
        setLoading(false)
      })
  }, [category])

  const filtered = useMemo(() => {
    let result = [...products]

    if (genderFilter.length > 0) {
      result = result.filter(p => genderFilter.includes(p.gender) || p.gender === 'unisex')
    }

    if (sizeFilter.length > 0) {
      result = result.filter(p =>
        p.product_variants?.some(v => sizeFilter.includes(v.size))
      )
    }

    if (colorFilter) {
      result = result.filter(p =>
        p.product_variants?.some(v =>
          v.color_hex?.toLowerCase() === colorFilter.toLowerCase()
        )
      )
    }

    if (minPrice !== '') {
      result = result.filter(p => p.price >= Number(minPrice) * 100)
    }

    if (maxPrice !== '') {
      result = result.filter(p => p.price <= Number(maxPrice) * 100)
    }

    if (sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sort === 'newest') {
      result.sort((a, b) => a.sort_order - b.sort_order)
    } else if (sort === 'bestsellers') {
      result.sort((a, b) => {
        const aB = a.tags?.includes('bestseller') ? -1 : 0
        const bB = b.tags?.includes('bestseller') ? -1 : 0
        return aB - bB
      })
    }

    return result
  }, [products, genderFilter, sizeFilter, colorFilter, minPrice, maxPrice, sort])

  const hasFilters =
    genderFilter.length > 0 ||
    sizeFilter.length > 0 ||
    colorFilter !== '' ||
    minPrice !== '' ||
    maxPrice !== ''

  const clearFilters = useCallback(() => {
    setGenderFilter([])
    setSizeFilter([])
    setColorFilter('')
    setMinPrice('')
    setMaxPrice('')
    setSort('relevance')
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const params: Record<string, string> = {}
      if (genderFilter.length > 0) params.gender = genderFilter.join(',')
      if (sizeFilter.length > 0) params.size = sizeFilter.join(',')
      if (colorFilter) params.color = colorFilter
      if (minPrice) params.minPrice = minPrice
      if (maxPrice) params.maxPrice = maxPrice
      if (sort && sort !== 'relevance') params.sort = sort
      if (cols !== 3) params.cols = String(cols)
      setSearchParams(params, { replace: true })
    }, 300)
    return () => clearTimeout(timer)
  }, [genderFilter, sizeFilter, colorFilter, minPrice, maxPrice, sort, cols, setSearchParams])

  const toggleGender = (g: string) => {
    setGenderFilter(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    )
  }

  const toggleSize = (s: string) => {
    setSizeFilter(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <Helmet>
        <title>{categoryName} — ARC Performance</title>
        <meta name="description" content={`Shop ARC Performance ${categoryName} gear. Engineered for speed.`} />
      </Helmet>

      <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '80px' }}>

        <div style={{
          height: '40vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img
            src={CATEGORY_IMAGES[category || ''] || '/cycle.jpeg'}
            alt={categoryName}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
          }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <p style={{
              fontFamily: '"Barlow", sans-serif',
              fontSize: '11px',
              color: '#787068',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}>
              <span
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0EDE6' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#787068' }}
              >
                Home
              </span>
              {' / '}
              <span
                onClick={() => navigate('/collection')}
                style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0EDE6' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#787068' }}
              >
                Collection
              </span>
              {' / '}
              <span style={{ color: '#F0EDE6' }}>{categoryName}</span>
            </p>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '80px',
              color: '#F0EDE6',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              lineHeight: 1,
              margin: 0,
            }}>
              {categoryName}
            </h1>
            <p style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '16px',
              color: '#787068',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginTop: '12px',
            }}>
              Engineered for speed
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: 0,
        }}>

          <aside style={{
            position: 'sticky',
            top: '80px',
            height: 'calc(100vh - 80px)',
            overflowY: 'auto',
            padding: '32px 24px',
            background: '#0A0A0A',
            borderRight: '1px solid #222222',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '20px',
                color: '#F0EDE6',
                letterSpacing: '2px',
              }}>
                FILTERS
              </span>
              <span style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: '11px',
                color: '#787068',
              }}>
                {loading ? '...' : `${filtered.length} products`}
              </span>
            </div>

            <div style={{ borderBottom: '1px solid #222222', paddingBottom: '24px' }}>
              <p style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#787068',
                marginBottom: '14px',
              }}>
                Gender
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Men', 'Women'].map(g => {
                  const val = g.toLowerCase()
                  const checked = genderFilter.includes(val)
                  return (
                    <div
                      key={g}
                      onClick={() => toggleGender(val)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                    >
                      <span style={{
                        width: '16px',
                        height: '16px',
                        border: `1px solid ${checked ? '#E8642A' : '#222222'}`,
                        background: checked ? '#E8642A' : 'transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                      }}>
                        {checked && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3L3.5 5.5L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span style={{
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '13px',
                        color: checked ? '#F0EDE6' : '#787068',
                        transition: 'color 0.2s',
                      }}>
                        {g}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ borderBottom: '1px solid #222222', paddingBottom: '24px' }}>
              <p style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#787068',
                marginBottom: '14px',
              }}>
                Size
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '6px',
              }}>
                {SIZES.map(s => {
                  const selected = sizeFilter.includes(s)
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      style={{
                        padding: '8px 4px',
                        background: selected ? 'rgba(232,100,42,0.1)' : 'transparent',
                        border: `1px solid ${selected ? '#E8642A' : '#222222'}`,
                        color: selected ? '#E8642A' : '#787068',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ borderBottom: '1px solid #222222', paddingBottom: '24px' }}>
              <p style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#787068',
                marginBottom: '14px',
              }}>
                Color
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {COLORS.map(c => {
                  const selected = colorFilter === c.hex
                  return (
                    <div
                      key={c.hex}
                      style={{ position: 'relative' }}
                      onMouseEnter={() => setColorTooltip(c.name)}
                      onMouseLeave={() => setColorTooltip(null)}
                    >
                      <button
                        onClick={() => setColorFilter(selected ? '' : c.hex)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: c.hex,
                          border: `2px solid ${selected ? '#E8642A' : c.hex === '#F0EDE6' ? '#222222' : 'transparent'}`,
                          outline: selected ? '2px solid #E8642A' : 'none',
                          outlineOffset: '2px',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          padding: 0,
                        }}
                      />
                      {colorTooltip === c.name && (
                        <div style={{
                          position: 'absolute',
                          bottom: 'calc(100% + 6px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#111111',
                          border: '1px solid #222222',
                          padding: '4px 8px',
                          fontFamily: '"Barlow", sans-serif',
                          fontSize: '10px',
                          color: '#F0EDE6',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                          zIndex: 10,
                        }}>
                          {c.name}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ borderBottom: hasFilters ? '1px solid #222222' : 'none', paddingBottom: hasFilters ? '24px' : 0 }}>
              <p style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#787068',
                marginBottom: '14px',
              }}>
                Price (R$)
              </p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#111111',
                    border: '1px solid #222222',
                    color: '#F0EDE6',
                    fontFamily: '"Barlow", sans-serif',
                    fontSize: '13px',
                    padding: '8px 10px',
                    outline: 'none',
                    width: '100%',
                  }}
                />
                <span style={{ color: '#222222', fontSize: '16px', flexShrink: 0 }}>–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#111111',
                    border: '1px solid #222222',
                    color: '#F0EDE6',
                    fontFamily: '"Barlow", sans-serif',
                    fontSize: '13px',
                    padding: '8px 10px',
                    outline: 'none',
                    width: '100%',
                  }}
                />
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#E8642A',
                  fontFamily: '"Barlow", sans-serif',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Clear filters
              </button>
            )}
          </aside>

          <main>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 32px',
              borderBottom: '1px solid #222222',
            }}>
              <span style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: '12px',
                color: '#787068',
              }}>
                {loading ? 'Loading...' : `${filtered.length} products found`}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  style={{
                    background: '#111111',
                    border: '1px solid #222222',
                    color: '#F0EDE6',
                    fontFamily: '"Barlow", sans-serif',
                    fontSize: '12px',
                    padding: '8px 32px 8px 12px',
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23787068' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                  }}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                <div style={{ display: 'flex', gap: '4px' }}>
                  {[2, 3].map(n => (
                    <button
                      key={n}
                      onClick={() => setCols(n)}
                      style={{
                        width: '32px',
                        height: '32px',
                        background: cols === n ? '#111111' : 'transparent',
                        border: `1px solid ${cols === n ? '#E8642A' : '#222222'}`,
                        color: cols === n ? '#E8642A' : '#787068',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: '2px',
              padding: '32px',
            }}>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              ) : filtered.length === 0 ? (
                <div style={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '80px 0',
                  gap: '16px',
                }}>
                  <p style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '28px',
                    color: '#F0EDE6',
                    letterSpacing: '2px',
                    margin: 0,
                  }}>
                    No products found.
                  </p>
                  <p style={{
                    fontFamily: '"Barlow", sans-serif',
                    fontSize: '13px',
                    color: '#787068',
                    margin: 0,
                  }}>
                    Try adjusting your filters
                  </p>
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      style={{
                        background: 'none',
                        border: '1px solid #E8642A',
                        color: '#E8642A',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        padding: '10px 24px',
                        cursor: 'pointer',
                        marginTop: '8px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#E8642A'
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'none'
                        e.currentTarget.style.color = '#E8642A'
                      }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
