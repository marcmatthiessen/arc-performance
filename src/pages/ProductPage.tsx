import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { Product, ProductVariant } from '../types/product';
import { useCartStore } from '../stores/cartStore';
import ProductCard from '../components/ProductCard';

const css = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-6px)}
  40%{transform:translateX(6px)}
  60%{transform:translateX(-4px)}
  80%{transform:translateX(4px)}
}
.shake { animation: shake 0.4s ease; }
`;

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
}

function SkeletonBlock({ width, height, style }: { width?: string; height?: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      width: width ?? '100%',
      height: height ?? '16px',
      background: 'linear-gradient(90deg,#1a1a1a 25%,#252525 50%,#1a1a1a 75%)',
      backgroundSize: '400% 100%',
      animation: 'shimmer 1.4s ease infinite',
      borderRadius: 2,
      ...style,
    }} />
  );
}

function LoadingSkeleton() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 48px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:100% 0} 100%{background-position:-100% 0} }
      `}</style>
      <div>
        <div style={{ aspectRatio: '4/5', background: '#1a1a1a', marginBottom: 12 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[0,1,2,3].map(i => <div key={i} style={{ width: 80, height: 80, background: '#1a1a1a' }} />)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
        <SkeletonBlock width="40%" height="12px" />
        <SkeletonBlock width="70%" height="56px" />
        <SkeletonBlock width="50%" height="14px" />
        <SkeletonBlock width="30%" height="40px" />
        <SkeletonBlock height="1px" />
        <SkeletonBlock width="60%" height="12px" />
        <div style={{ display: 'flex', gap: 8 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a1a' }} />)}
        </div>
        <SkeletonBlock width="40%" height="12px" style={{ marginTop: 8 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[0,1,2,3,4].map(i => <div key={i} style={{ width: 44, height: 44, background: '#1a1a1a' }} />)}
        </div>
        <SkeletonBlock height="56px" style={{ marginTop: 8 }} />
        <SkeletonBlock height="56px" />
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, openCart } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [wishlisted, setWishlisted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [shakeBtn, setShakeBtn] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(*), product_variants(*)')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const prod = data as Product;
      setProduct(prod);

      const colors = [...new Set(prod.product_variants.map((v) => v.color))];
      if (colors.length > 0) setSelectedColor(colors[0]);

      setSelectedImageIndex(0);
      setSelectedSize('');
      setLoading(false);

      const { data: relData } = await supabase
        .from('products')
        .select('*, product_images(*), product_variants(*)')
        .eq('category', prod.category)
        .eq('is_active', true)
        .neq('id', prod.id)
        .limit(4);

      if (relData) setRelated(relData as Product[]);
    })();
  }, [slug]);

  const filteredImages = product
    ? product.product_images
        .filter((img) => !selectedColor || img.color_variant === selectedColor || img.color_variant === '')
        .sort((a, b) => a.sort_order - b.sort_order)
    : [];

  const allImages = filteredImages.length > 0 ? filteredImages : (product?.product_images ?? []);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedColor]);

  const uniqueColors = product
    ? [...new Map(product.product_variants.map((v) => [v.color, { color: v.color, hex: v.color_hex }])).values()]
    : [];

  const sizesForColor = product
    ? product.product_variants.filter((v) => v.color === selectedColor)
    : [];

  const selectedVariant: ProductVariant | undefined = product
    ? product.product_variants.find((v) => v.color === selectedColor && v.size === selectedSize)
    : undefined;


  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleEsc);
    } else {
      document.removeEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen, handleEsc]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (!selectedSize) {
      setShakeBtn(true);
      toast.error('Select a size first');
      setTimeout(() => setShakeBtn(false), 500);
      return;
    }
    if (!selectedVariant || selectedVariant.stock === 0) {
      toast.error('This variant is out of stock');
      return;
    }
    setAddingToCart(true);
    await new Promise((r) => setTimeout(r, 600));
    addItem(product, selectedVariant, 1);
    setAddingToCart(false);
    setAddedToCart(true);
    openCart();
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product || !selectedVariant) {
      setShakeBtn(true);
      toast.error('Select a size first');
      setTimeout(() => setShakeBtn(false), 500);
      return;
    }
    addItem(product, selectedVariant, 1);
    navigate('/checkout');
  };

  const savePercent = product?.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : 0;


  const pixPrice = product ? formatBRL(product.price * 0.95 / 100) : '';

  const accordions = [
    { id: 'description', label: 'Descrição', content: product?.description ?? '' },
    { id: 'materials', label: 'Materials & Technology', content: product?.materials ?? '' },
    { id: 'care', label: 'Care Instructions', content: product?.care_instructions ?? '' },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: 'Free shipping on orders over R$ 350. Standard delivery in 5–10 business days. Express available at checkout. 30-day hassle-free returns on unworn items with original tags.',
    },
  ];

  if (loading) return <LoadingSkeleton />;

  if (notFound) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '120px 48px' }}>
        <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 96, color: 'var(--stroke)', lineHeight: 1, margin: 0 }}>404</p>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: 16, color: 'var(--muted)', margin: 0 }}>Product not found</p>
        <Link to="/shop" style={{ fontFamily: 'Barlow, sans-serif', fontSize: 13, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none' }}>
          Back to Shop →
        </Link>
      </div>
    );
  }

  if (!product) return null;

  const currentImage = allImages[selectedImageIndex];

  return (
    <>
      <style>{css}</style>
      <Helmet>
        <title>{product.name} — ARC Performance</title>
        <meta name="description" content={product.subtitle} />
      </Helmet>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setLightboxOpen(false)}
          >
            <img
              src={allImages[lightboxIndex]?.url}
              alt={allImages[lightboxIndex]?.alt}
              style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length); }}
              style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer', lineHeight: 1, padding: '8px 16px' }}
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % allImages.length); }}
              style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer', lineHeight: 1, padding: '8px 16px' }}
            >
              ›
            </button>
            <button
              onClick={() => setLightboxOpen(false)}
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', lineHeight: 1, padding: 8 }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 48px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

          <div style={{ position: 'sticky', top: 100 }}>
            <div
              style={{ aspectRatio: '4/5', overflow: 'hidden', cursor: 'zoom-in', background: 'var(--surface)' }}
              onClick={() => { setLightboxIndex(selectedImageIndex); setLightboxOpen(true); }}
            >
              {currentImage ? (
                <img
                  src={currentImage.url}
                  alt={currentImage.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'var(--surface)' }} />
              )}
            </div>

            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                {allImages.map((img, i) => (
                  <div
                    key={img.id}
                    onClick={() => setSelectedImageIndex(i)}
                    style={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      cursor: 'pointer',
                      border: `1px solid ${i === selectedImageIndex ? 'var(--orange)' : 'var(--stroke)'}`,
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: 'sticky', top: 100, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: 4 }}>

            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: 11, color: 'var(--muted)', margin: '0 0 16px', letterSpacing: 0.5 }}>
              <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
              {' / '}
              <Link to="/shop" style={{ color: 'var(--muted)', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category}</Link>
              {' / '}
              <span style={{ color: 'var(--text)' }}>{product.name}</span>
            </p>

            {(product.tags?.includes('new') || product.tags?.includes('bestseller')) && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {product.tags.includes('new') && (
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', background: 'var(--orange)', color: '#000', padding: '3px 8px' }}>NEW</span>
                )}
                {product.tags.includes('bestseller') && (
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', background: 'var(--text)', color: '#0A0A0A', padding: '3px 8px' }}>BESTSELLER</span>
                )}
              </div>
            )}

            <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 52, lineHeight: 0.9, letterSpacing: 2, color: 'var(--text)', margin: '0 0 4px', textTransform: 'uppercase' }}>
              {product.name}
            </h1>

            {product.subtitle && (
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 14, color: 'var(--muted)', margin: '0 0 16px' }}>
                {product.subtitle}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[0,1,2,3,4].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--orange)" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 12, color: 'var(--muted)' }}>(47 reviews)</span>
            </div>

            <div style={{ marginBottom: 20 }}>
              {product.compare_at_price && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 16, color: 'var(--muted)', textDecoration: 'line-through' }}>
                    {formatBRL(product.compare_at_price / 100)}
                  </span>
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', background: 'var(--orange)', color: '#000', padding: '2px 6px' }}>
                    SAVE {savePercent}%
                  </span>
                </div>
              )}
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 40, color: 'var(--text)', margin: '0 0 4px', letterSpacing: 1 }}>
                {formatBRL(product.price / 100)}
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 13, color: 'var(--muted)', margin: '0 0 4px' }}>
                or 6x of {formatBRL(product.price / 6 / 100)} without interest
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: 13, color: '#4ADE80', margin: 0 }}>
                PIX: {pixPrice} (5% off)
              </p>
            </div>

            <div style={{ height: 1, background: 'var(--stroke)', marginBottom: 20 }} />

            {uniqueColors.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text)', margin: '0 0 10px' }}>
                  COLOR — {selectedColor}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {uniqueColors.map(({ color, hex }) => (
                    <button
                      key={color}
                      title={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: hex || '#888',
                        border: `2px solid ${selectedColor === color ? 'var(--orange)' : 'transparent'}`,
                        cursor: 'pointer',
                        outline: `1px solid ${selectedColor === color ? 'var(--orange)' : 'var(--stroke)'}`,
                        transition: 'border-color 0.2s ease',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text)', margin: 0 }}>SIZE</p>
                <Link to="/size-chart" style={{ fontFamily: 'Barlow, sans-serif', fontSize: 11, color: 'var(--orange)', textDecoration: 'none' }}>Size Guide →</Link>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {sizesForColor.map((v) => {
                  const outOfStock = v.stock === 0;
                  const isSelected = selectedSize === v.size;
                  return (
                    <button
                      key={v.id}
                      disabled={outOfStock}
                      onClick={() => !outOfStock && setSelectedSize(v.size)}
                      style={{
                        minWidth: 44,
                        height: 44,
                        padding: '0 12px',
                        fontFamily: 'Barlow, sans-serif',
                        fontWeight: 600,
                        fontSize: 12,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: outOfStock ? 'var(--muted)' : isSelected ? 'var(--orange)' : 'var(--text)',
                        background: 'var(--surface)',
                        border: `1px solid ${isSelected ? 'var(--orange)' : 'var(--stroke)'}`,
                        cursor: outOfStock ? 'not-allowed' : 'pointer',
                        opacity: outOfStock ? 0.3 : 1,
                        textDecoration: outOfStock ? 'line-through' : 'none',
                        transition: 'border-color 0.2s ease, color 0.2s ease',
                      }}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedVariant && selectedVariant.stock <= 3 && selectedVariant.stock > 0 && (
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: 13, color: 'var(--orange)', margin: '0 0 16px' }}>
                ⚠ Only {selectedVariant.stock} units left
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              <button
                className={shakeBtn ? 'shake' : ''}
                onClick={handleAddToCart}
                disabled={addingToCart}
                style={{
                  width: '100%',
                  height: 56,
                  background: 'var(--orange)',
                  border: 'none',
                  color: '#000',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 20,
                  letterSpacing: 3,
                  cursor: addingToCart ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  transition: 'opacity 0.2s ease',
                }}
              >
                {addingToCart ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" stroke="#000" strokeWidth="2" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                ) : addedToCart ? '✓ ADDED' : 'ADD TO CART'}
              </button>

              <button
                onClick={handleBuyNow}
                style={{
                  width: '100%',
                  height: 56,
                  background: 'transparent',
                  border: '1px solid var(--orange)',
                  color: 'var(--text)',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 20,
                  letterSpacing: 3,
                  cursor: 'pointer',
                }}
              >
                BUY NOW
              </button>
            </div>

            <button
              onClick={() => setWishlisted((w) => !w)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: 0, marginBottom: 24 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? 'var(--orange)' : 'none'} stroke={wishlisted ? 'var(--orange)' : 'var(--muted)'} strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 13, color: 'var(--muted)' }}>
                {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </span>
            </button>

            <div style={{ height: 1, background: 'var(--stroke)', marginBottom: 20 }} />

            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                {product.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: 'var(--orange)', fontSize: 13, lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--stroke)' }}>
              {accordions.map((acc) => (
                <div key={acc.id}>
                  <button
                    onClick={() => setOpenAccordion((prev) => (prev === acc.id ? null : acc.id))}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      borderBottom: '1px solid var(--stroke)',
                      padding: '16px 0',
                      cursor: 'pointer',
                      color: 'var(--text)',
                    }}
                  >
                    <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>
                      {acc.label}
                    </span>
                    <span style={{ fontSize: 18, color: 'var(--muted)', transform: openAccordion === acc.id ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', lineHeight: 1 }}>+</span>
                  </button>
                  <div
                    style={{
                      maxHeight: openAccordion === acc.id ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, padding: '16px 0 24px', margin: 0 }}>
                      {acc.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 32, padding: '20px 0', borderTop: '1px solid var(--stroke)' }}>
              {[
                { icon: '🚚', label: 'Free shipping R$350+' },
                { icon: '🔄', label: '30-day returns' },
                { icon: '🔒', label: 'Secure payment' },
                { icon: '✅', label: 'Certified' },
              ].map((badge) => (
                <div key={badge.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
                  <span style={{ fontSize: 20 }}>{badge.icon}</span>
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 11, color: 'var(--muted)', lineHeight: 1.3 }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 96 }}>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 36, color: 'var(--text)', letterSpacing: 2, marginBottom: 32 }}>
              FROM THE SAME COLLECTION
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
