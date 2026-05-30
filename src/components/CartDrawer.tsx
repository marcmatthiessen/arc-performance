import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../stores/cartStore';
import { useIsMobile } from '../hooks/useIsMobile';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const FREE_SHIPPING_THRESHOLD = 350;

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const shippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Sign in to continue');
      closeCart();
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 149,
            }}
          />

          <motion.div
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              width: isMobile ? '100vw' : 420,
              background: '#0A0A0A',
              borderLeft: '1px solid #222222',
              zIndex: 150,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                padding: '24px',
                borderBottom: '1px solid #222222',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 24,
                  letterSpacing: 2,
                  color: '#F0EDE6',
                }}
              >
                CART ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
              <button
                onClick={closeCart}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#787068',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0 24px',
              }}
            >
              {items.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: 16,
                    paddingTop: 48,
                    paddingBottom: 48,
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    style={{ color: '#787068' }}
                  >
                    <path
                      d="M6 8h4l5.5 22h17l5-16H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="19" cy="36" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="32" cy="36" r="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: 28,
                      color: '#F0EDE6',
                      letterSpacing: 1,
                    }}
                  >
                    Your cart is empty
                  </span>
                  <span
                    style={{
                      fontFamily: '"Barlow", sans-serif',
                      fontSize: 13,
                      color: '#787068',
                    }}
                  >
                    Discover our collection
                  </span>
                  <Link
                    to="/collections/triathlon"
                    onClick={closeCart}
                    style={{
                      fontFamily: '"Barlow", sans-serif',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#E8642A',
                      textDecoration: 'none',
                      border: '1px solid #E8642A',
                      padding: '10px 24px',
                      letterSpacing: 1,
                      marginTop: 8,
                    }}
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onRemove={removeItem}
                      onQty={updateQuantity}
                      fmt={fmt}
                    />
                  ))}

                  {shippingRemaining > 0 && (
                    <div style={{ paddingTop: 16, paddingBottom: 8 }}>
                      <span
                        style={{
                          fontFamily: '"Barlow", sans-serif',
                          fontSize: 12,
                          color: '#787068',
                          display: 'block',
                          marginBottom: 8,
                        }}
                      >
                        R$ {fmt(shippingRemaining)} away from free shipping
                      </span>
                      <div
                        style={{
                          width: '100%',
                          height: 4,
                          background: '#222222',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${shippingProgress}%`,
                            background: '#E8642A',
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {items.length > 0 && (
              <div
                style={{
                  padding: '24px',
                  borderTop: '1px solid #222222',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Barlow", sans-serif',
                      fontWeight: 600,
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: 3,
                      color: '#787068',
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: 28,
                      color: '#F0EDE6',
                    }}
                  >
                    R$ {fmt(totalPrice)}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: '"Barlow", sans-serif',
                    fontWeight: 300,
                    fontSize: 12,
                    color: '#787068',
                    marginBottom: 16,
                    marginTop: 0,
                  }}
                >
                  Shipping and discounts calculated at checkout
                </p>

                <button
                  onClick={handleCheckout}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                  style={{
                    width: '100%',
                    height: 56,
                    background: '#E8642A',
                    color: '#000',
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 20,
                    letterSpacing: 3,
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: 12,
                    transition: 'opacity 0.2s',
                  }}
                >
                  Checkout
                </button>

                <button
                  onClick={closeCart}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: '"Barlow", sans-serif',
                    fontSize: 13,
                    color: '#787068',
                    padding: '8px 0',
                  }}
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TrashButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: hovered ? '#ff4444' : '#787068',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        transition: 'color 0.15s ease',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 4h12M5.333 4V2.667a.667.667 0 0 1 .667-.667h4a.667.667 0 0 1 .667.667V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333A.667.667 0 0 0 4.667 14h6.666a.667.667 0 0 0 .667-.667L12.667 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function CartItemRow({
  item,
  onRemove,
  onQty,
  fmt,
}: {
  item: any;
  onRemove: (id: string) => void;
  onQty: (id: string, q: number) => void;
  fmt: (n: number) => string;
}) {
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleDecrement = () => {
    if (item.quantity === 1) {
      setConfirmRemove(true);
    } else {
      onQty(item.variant.id, item.quantity - 1);
    }
  };

  const img = item.product.images?.[0] ?? item.product.product_images?.[0]?.url ?? '';

  return (
    <div
      style={{
        borderBottom: '1px solid #222222',
        padding: '16px 0',
        display: 'flex',
        gap: 16,
      }}
    >
      <img
        src={img}
        alt={item.product.name}
        style={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          background: '#111111',
          border: '1px solid #222222',
          flexShrink: 0,
        }}
      />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span
          style={{
            fontFamily: '"Barlow", sans-serif',
            fontWeight: 600,
            fontSize: 14,
            color: '#F0EDE6',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.product.name}
        </span>
        <span
          style={{
            fontFamily: '"Barlow", sans-serif',
            fontSize: 12,
            color: '#787068',
          }}
        >
          {item.variant.color ?? 'Knight Black'} · {item.variant.size ?? 'M'}
        </span>
        <span
          style={{
            fontFamily: '"Barlow", sans-serif',
            fontWeight: 500,
            fontSize: 14,
            color: '#F0EDE6',
          }}
        >
          R$ {fmt(item.product.price)}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={handleDecrement}
            style={{
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: '1px solid #222222',
              borderRight: 'none',
              color: '#F0EDE6',
              fontFamily: '"Barlow", sans-serif',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            −
          </button>
          <span
            style={{
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Barlow", sans-serif',
              fontSize: 14,
              color: '#F0EDE6',
              borderTop: '1px solid #222222',
              borderBottom: '1px solid #222222',
            }}
          >
            {item.quantity}
          </span>
          <button
            onClick={() => onQty(item.variant.id, item.quantity + 1)}
            style={{
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: '1px solid #222222',
              borderLeft: 'none',
              color: '#F0EDE6',
              fontFamily: '"Barlow", sans-serif',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            +
          </button>
        </div>

        {confirmRemove ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span
              style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: 12,
                color: '#787068',
              }}
            >
              Remove?
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  onRemove(item.variant.id);
                  setConfirmRemove(false);
                }}
                style={{
                  fontFamily: '"Barlow", sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#ff4444',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px 0',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmRemove(false)}
                style={{
                  fontFamily: '"Barlow", sans-serif',
                  fontSize: 12,
                  color: '#787068',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px 0',
                }}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <TrashButton onClick={() => setConfirmRemove(true)} />
        )}
      </div>
    </div>
  );
}
