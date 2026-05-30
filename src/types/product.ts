export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  color_variant: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  color_hex: string;
  stock: number;
  sku: string;
  product_id: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  category: 'triathlon' | 'cycling' | 'running';
  gender: 'men' | 'women' | 'unisex';
  tags: string[];
  features: string[];
  materials: string;
  care_instructions: string;
  is_active: boolean;
  sort_order: number;
  product_images: ProductImage[];
  product_variants: ProductVariant[];
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}
