import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { Product, ProductVariant } from '../types/product'
import { useCartStore } from '../stores/cartStore'

interface ProductCardProps {
  product: Product
  onAddToCart?: (variant: ProductVariant) => void
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate()
  const addItem = useCartStore((s: any) => s.addItem)
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const primaryImage = product.product_images?.[0]
  const secondImage = product.product_images?.[1]
  const isOutOfStock = product.tags?.includes('out_of_stock') || false
  const isNew = product.tags?.includes('new')
  const isBestseller = product.tags?.includes('bestseller')

  const handleCardClick = () => {
    navigate(`/products/${product.slug}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    const variant = selectedSize
      ? product.product_variants?.find((v: ProductVariant) => v.size === selectedSize)
      : product.product_variants?.[0]
    if (!variant) return
    addItem(product, variant)
    if (onAddToCart) onAddToCart(variant)
    toast.success('Added to cart ✓')
  }

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.stopPropagation()
    setSelectedSize(prev => (prev === size ? null : size))
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setWishlisted(prev => !prev)
  }

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        background: 'var(--surface)',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        {primaryImage && (
          <img
            src={primaryImage?.url}
            alt={product.name}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: hovered && secondImage ? 0 : 1,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}

        {secondImage && (
          <img
            src={secondImage?.url}
            alt={product.name}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}

        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {isOutOfStock && (
            <span style={{
              fontFamily: 'Barlow, sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              background: 'rgba(10,10,10,0.85)',
              padding: '3px 8px',
              border: '1px solid var(--stroke)',
            }}>
              ESGOTADO
            </span>
          )}
          {!isOutOfStock && isNew && (
            <span style={{
              fontFamily: 'Barlow, sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#fff',
              background: 'var(--orange)',
              padding: '3px 8px',
            }}>
              NEW
            </span>
          )}
          {!isOutOfStock && isBestseller && (
            <span style={{
              fontFamily: 'Barlow, sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#0A0A0A',
              background: 'var(--text)',
              padding: '3px 8px',
            }}>
              BESTSELLER
            </span>
          )}
        </div>

        <button
          onClick={handleWishlistClick}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(10,10,10,0.7)',
            border: '1px solid var(--stroke)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? 'var(--orange)' : 'none'} stroke={wishlisted ? 'var(--orange)' : 'var(--text)'} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '56px',
            background: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0 10px',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: 'default',
          }}
        >
          {SIZES.map(size => (
            <button
              key={size}
              onClick={e => handleSizeClick(e, size)}
              style={{
                width: '28px',
                height: '28px',
                background: selectedSize === size ? 'var(--orange)' : 'transparent',
                border: `1px solid ${selectedSize === size ? 'var(--orange)' : 'var(--stroke)'}`,
                color: selectedSize === size ? '#fff' : 'var(--muted)',
                fontFamily: 'Barlow, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
            >
              {size}
            </button>
          ))}

          <button
            onClick={handleAddToCart}
            style={{
              marginLeft: 'auto',
              height: '28px',
              padding: '0 14px',
              background: 'var(--orange)',
              border: 'none',
              color: '#fff',
              fontFamily: 'Barlow, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            ADD
          </button>
        </div>
      </div>

      <div style={{
        padding: '12px 14px 14px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--stroke)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <p style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '18px',
          color: 'var(--text)',
          textTransform: 'uppercase',
          lineHeight: 1,
          margin: 0,
        }}>
          {product.name}
        </p>

        {product.subtitle && (
          <p style={{
            fontFamily: 'Barlow, sans-serif',
            fontSize: '11px',
            color: 'var(--muted)',
            letterSpacing: '0.5px',
            margin: 0,
          }}>
            {product.subtitle}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
          {product.compare_at_price && (
            <span style={{
              fontFamily: 'Barlow, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              color: 'var(--muted)',
              textDecoration: 'line-through',
            }}>
              {formatPrice(product.compare_at_price)}
            </span>
          )}
          <span style={{
            fontFamily: 'Barlow, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: product.compare_at_price ? 'var(--orange)' : 'var(--text)',
          }}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  )
}
