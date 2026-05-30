-- ============================================================
-- ARC Performance Shop — Schema & Seed Data
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ============================================================

-- ─────────────────────────────────────────
-- 1. PRODUCTS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               text UNIQUE NOT NULL,
  name               text NOT NULL,
  subtitle           text,
  description        text,
  price              decimal(10, 2) NOT NULL,
  compare_at_price   decimal(10, 2),
  category           text NOT NULL,
  gender             text NOT NULL CHECK (gender IN ('men', 'women', 'unisex')),
  tags               text[],
  features           text[],
  materials          text,
  care_instructions  text,
  is_active          boolean NOT NULL DEFAULT true,
  sort_order         integer NOT NULL DEFAULT 0,
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────
-- 2. PRODUCT IMAGES
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_images (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     uuid NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  url            text NOT NULL,
  alt            text,
  color_variant  text,
  is_primary     boolean NOT NULL DEFAULT false,
  sort_order     integer NOT NULL DEFAULT 0
);

-- ─────────────────────────────────────────
-- 3. PRODUCT VARIANTS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_variants (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  uuid NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  size        text NOT NULL,
  color       text NOT NULL,
  color_hex   text NOT NULL,
  stock       integer NOT NULL DEFAULT 0,
  sku         text UNIQUE NOT NULL
);

-- ─────────────────────────────────────────
-- 4. CART ITEMS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cart_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  variant_id  uuid NOT NULL REFERENCES product_variants (id) ON DELETE CASCADE,
  quantity    integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  added_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, variant_id)
);

-- ─────────────────────────────────────────
-- 5. WISHLIST
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  product_id  uuid NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  added_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

-- ─────────────────────────────────────────
-- 6. ROW-LEVEL SECURITY
-- ─────────────────────────────────────────

-- products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_public_read"
  ON products FOR SELECT
  USING (is_active = true);

-- product_images
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "product_images_public_read"
  ON product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_images.product_id
        AND p.is_active = true
    )
  );

-- product_variants
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "product_variants_public_read"
  ON product_variants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_variants.product_id
        AND p.is_active = true
    )
  );

-- cart_items
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cart_items_owner_select"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "cart_items_owner_insert"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cart_items_owner_update"
  ON cart_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cart_items_owner_delete"
  ON cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- wishlist
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wishlist_owner_select"
  ON wishlist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "wishlist_owner_insert"
  ON wishlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wishlist_owner_delete"
  ON wishlist FOR DELETE
  USING (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- 7. SEED DATA — PRODUCTS
-- ─────────────────────────────────────────

WITH inserted_products AS (
  INSERT INTO products
    (slug, name, subtitle, description, price, compare_at_price, category, gender,
     tags, features, materials, care_instructions, is_active, sort_order)
  VALUES
    (
      'arc-pro-trisuit-men',
      'ARC Pro Trisuit — Masculino',
      'Velocidade sem compromisso',
      'O ARC Pro Trisuit masculino foi desenvolvido para atletas que exigem o máximo em cada etapa da prova. Aerodinâmica de ponta, conforto na natação, estabilidade no ciclismo e leveza na corrida — tudo em uma única peça. O painel frontal em mesh compressivo oferece suporte muscular sem restringir a respiração, enquanto o forro de selim de 6 mm garante conforto durante centenas de quilômetros de bicicleta. Costuras ultrassônicas eliminam pontos de atrito, e o tratamento DWR mantém a peça leve mesmo após a saída da água.',
      899.90,
      1199.90,
      'trisuit',
      'men',
      ARRAY['triathlon', 'competição', 'aerodinâmico', 'compressão', 'wetsuit-friendly'],
      ARRAY[
        'Tecido principal em Lycra® Power com 4-way stretch',
        'Forro de selim de 6 mm removível — conforto no ciclismo sem peso extra na corrida',
        'Costuras ultrassônicas — zero atrito em provas longas',
        'Tratamento DWR de secagem rápida após a natação',
        'Zíper frontal YKK 20 cm para ventilação',
        'Bolso traseiro de corrida com fechamento por zipper',
        'Painéis laterais em mesh para ventilação máxima',
        'Aprovado para provas ITU e Ironman'
      ],
      '82% Poliamida / 18% Elastano — Lycra® Power certificada',
      'Lavar à mão com água fria. Não usar amaciante. Não torcer. Secar à sombra. Não passar ferro. Enxaguar imediatamente após a prova para preservar o tecido.',
      true,
      10
    ),
    (
      'arc-pro-trisuit-women',
      'ARC Pro Trisuit — Feminino',
      'Performance que abraça cada curva',
      'O ARC Pro Trisuit feminino une performance de elite ao design pensado para o corpo feminino. Corte anatômico com elástico na cintura e decote ergonômico oferecem segurança total durante a natação, enquanto o painel compressivo frontal em X proporciona suporte de corrida sem necessidade de sutiã adicional. O selim feminino de 5 mm é especialmente mapeado para a anatomia da mulher atleta, garantindo conforto em provas sprint até Ironman. Acabamentos em flatlock e tratamento antibacteriano completam a peça ideal para quem não aceita meio-termo.',
      949.90,
      1249.90,
      'trisuit',
      'women',
      ARRAY['triathlon', 'competição', 'feminino', 'compressão', 'suporte', 'wetsuit-friendly'],
      ARRAY[
        'Corte anatômico feminino com elástico embutido na cintura',
        'Painel compressivo em X com suporte de busto integrado — sem necessidade de sutiã',
        'Selim feminino de 5 mm com mapeamento anatômico específico',
        'Costuras flatlock — máximo conforto sem atrito',
        'Tratamento antibacteriano Aegis® permanente',
        'Zíper frontal YKK 20 cm com protetor de queixo',
        'Duas bolsas traseiras de corrida',
        'Tratamento DWR de secagem ultrarrápida'
      ],
      '80% Poliamida / 20% Elastano — Lycra® Sport com tecnologia Xtra Life',
      'Lavar à mão com água fria. Não usar amaciante ou alvejante. Não torcer. Secar à sombra em posição horizontal. Não passar ferro. Enxaguar após cada uso.',
      true,
      20
    ),
    (
      'arc-aero-cycling-jersey-men',
      'ARC Aero Cycling Jersey — Masculino',
      'Cada segundo importa no pelotão',
      'Desenvolvida em parceria com ciclistas profissionais e testada em túnel de vento, a ARC Aero Cycling Jersey entrega vantagem aerodinâmica mensurável sem abrir mão do conforto em longos granfondos. O corte race-fit ajusta à posição aerotuck enquanto painéis estratégicos de elastano de alta compressão estabilizam os músculos da coxa e lombar. O tecido principal bloqueia até 40% do vento frontal e possui UPF 50+. Três bolsos traseiros espaçosos e um bolso zíper para itens de valor completam a camisa perfeita para quem leva a sério cada watt.',
      549.90,
      729.90,
      'cycling',
      'men',
      ARRAY['ciclismo', 'aerodinâmico', 'race-fit', 'UPF50', 'granfondo'],
      ARRAY[
        'Tecido aerodinâmico com bloqueio de 40% do vento frontal',
        'Corte race-fit otimizado para posição aerotuck',
        'UPF 50+ — proteção solar total',
        'Painéis de compressão lombar e de coxa',
        'Três bolsos traseiros + bolso zíper para itens de valor',
        'Elástico de silicone grippado na barra — sem deslocamento',
        'Zíper frontal YKK full-length com pull-tab aerodinâmico',
        'Costuras sublimadas — design exclusivo sem desbotamento'
      ],
      '88% Poliéster reciclado / 12% Elastano — tecido Aeroweave Pro',
      'Lavar à máquina em ciclo delicado, água fria, bolso virado. Não usar amaciante. Secar à sombra. Não passar ferro sobre sublimação. Não usar secadora.',
      true,
      30
    ),
    (
      'arc-run-kit-men',
      'ARC Run Kit — Masculino',
      'Leveza que liberta a passada',
      'O ARC Run Kit masculino redefine o padrão de performance em corrida de rua e trilha. O conjunto inclui camiseta e shorts desenvolvidos com tecido AirMesh de gramatura ultra baixa (90 g/m²), que promove evaporação ativa do suor e mantém a temperatura corporal estável mesmo nos treinos mais intensos. A camiseta de corte atlético com costura raglan elimina pontos de atrito nos ombros, enquanto os shorts com forro integrado oferecem liberdade de movimento em 360°. Bolso traseiro com zíper no shorts e painel reflexivo para visibilidade noturna completam o kit do atleta sério.',
      429.90,
      579.90,
      'running',
      'men',
      ARRAY['corrida', 'trail', 'ultra-leve', 'kit', 'reflexivo', 'noturno'],
      ARRAY[
        'Tecido AirMesh ultra-leve 90 g/m² com evaporação ativa',
        'Camiseta com corte raglan — zero atrito nos ombros',
        'Shorts com forro integrado e liberdade 360°',
        'Painel reflexivo 360° para corridas noturnas',
        'Bolso traseiro com zíper no shorts — seguro para gel e chave',
        'Elástico interno com cordão ajustável',
        'Tratamento antimicrobiano permanente',
        'UPF 30+ na camiseta'
      ],
      '92% Poliéster reciclado / 8% Elastano — AirMesh Pro',
      'Lavar à máquina em ciclo normal, água fria. Não usar amaciante. Não usar secadora em temperatura alta. Secar à sombra. Não passar ferro.',
      true,
      40
    )
  RETURNING id, slug
),

-- ─────────────────────────────────────────
-- 8. SEED DATA — PRODUCT IMAGES (4 per product)
-- ─────────────────────────────────────────
inserted_images AS (
  INSERT INTO product_images (product_id, url, alt, color_variant, is_primary, sort_order)
  SELECT p.id, i.url, i.alt, i.color_variant, i.is_primary, i.sort_order
  FROM inserted_products p
  JOIN (VALUES
    ('arc-pro-trisuit-men', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', 'ARC Pro Trisuit masculino — frente, Preto Carbono',        'Preto Carbono', true,  1),
    ('arc-pro-trisuit-men', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', 'ARC Pro Trisuit masculino — costas, Preto Carbono',        'Preto Carbono', false, 2),
    ('arc-pro-trisuit-men', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', 'ARC Pro Trisuit masculino — detalhe selim e costuras',     NULL,            false, 3),
    ('arc-pro-trisuit-men', 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80', 'ARC Pro Trisuit masculino — atleta em prova de triathlon', NULL,            false, 4),

    ('arc-pro-trisuit-women', 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80', 'ARC Pro Trisuit feminino — frente, Azul Oceano',         'Azul Oceano', true,  1),
    ('arc-pro-trisuit-women', 'https://images.unsplash.com/photo-1560753804-adf7be3ce5b9?w=800&q=80', 'ARC Pro Trisuit feminino — costas, Azul Oceano',           'Azul Oceano', false, 2),
    ('arc-pro-trisuit-women', 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&q=80', 'ARC Pro Trisuit feminino — detalhe suporte de busto',    NULL,          false, 3),
    ('arc-pro-trisuit-women', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', 'ARC Pro Trisuit feminino — atleta no ciclismo',          NULL,          false, 4),

    ('arc-aero-cycling-jersey-men', 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&q=80', 'ARC Aero Cycling Jersey — frente, Preto Carbono',   'Preto Carbono', true,  1),
    ('arc-aero-cycling-jersey-men', 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80', 'ARC Aero Cycling Jersey — costas com bolsos',       NULL,            false, 2),
    ('arc-aero-cycling-jersey-men', 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80', 'ARC Aero Cycling Jersey — detalhe zíper e tecido',  NULL,            false, 3),
    ('arc-aero-cycling-jersey-men', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'ARC Aero Cycling Jersey — atleta em aerotuck',        NULL,            false, 4),

    ('arc-run-kit-men', 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80', 'ARC Run Kit masculino — conjunto completo, Preto Carbono',  'Preto Carbono', true,  1),
    ('arc-run-kit-men', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80', 'ARC Run Kit masculino — camiseta detalhe mesh',             NULL,            false, 2),
    ('arc-run-kit-men', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 'ARC Run Kit masculino — shorts com bolso zíper',               NULL,            false, 3),
    ('arc-run-kit-men', 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&q=80', 'ARC Run Kit masculino — atleta em corrida noturna',         NULL,            false, 4)
  ) AS i (slug, url, alt, color_variant, is_primary, sort_order)
  ON p.slug = i.slug
  RETURNING id
),

-- ─────────────────────────────────────────
-- 9. SEED DATA — PRODUCT VARIANTS (3 colors × 6 sizes per product)
-- ─────────────────────────────────────────
inserted_variants AS (
  INSERT INTO product_variants (product_id, size, color, color_hex, stock, sku)
  SELECT p.id, v.size, v.color, v.color_hex, v.stock, v.sku
  FROM inserted_products p
  JOIN (VALUES
    -- ── arc-pro-trisuit-men ──────────────────────────────────
    ('arc-pro-trisuit-men', 'XS',  'Preto Carbono', '#1A1A1A', 12, 'ARC-TRIS-M-BLK-XS'),
    ('arc-pro-trisuit-men', 'S',   'Preto Carbono', '#1A1A1A', 20, 'ARC-TRIS-M-BLK-S'),
    ('arc-pro-trisuit-men', 'M',   'Preto Carbono', '#1A1A1A', 25, 'ARC-TRIS-M-BLK-M'),
    ('arc-pro-trisuit-men', 'L',   'Preto Carbono', '#1A1A1A', 22, 'ARC-TRIS-M-BLK-L'),
    ('arc-pro-trisuit-men', 'XL',  'Preto Carbono', '#1A1A1A', 15, 'ARC-TRIS-M-BLK-XL'),
    ('arc-pro-trisuit-men', 'XXL', 'Preto Carbono', '#1A1A1A',  8, 'ARC-TRIS-M-BLK-XXL'),

    ('arc-pro-trisuit-men', 'XS',  'Azul Elétrico', '#0057FF', 10, 'ARC-TRIS-M-BLU-XS'),
    ('arc-pro-trisuit-men', 'S',   'Azul Elétrico', '#0057FF', 18, 'ARC-TRIS-M-BLU-S'),
    ('arc-pro-trisuit-men', 'M',   'Azul Elétrico', '#0057FF', 22, 'ARC-TRIS-M-BLU-M'),
    ('arc-pro-trisuit-men', 'L',   'Azul Elétrico', '#0057FF', 20, 'ARC-TRIS-M-BLU-L'),
    ('arc-pro-trisuit-men', 'XL',  'Azul Elétrico', '#0057FF', 12, 'ARC-TRIS-M-BLU-XL'),
    ('arc-pro-trisuit-men', 'XXL', 'Azul Elétrico', '#0057FF',  5, 'ARC-TRIS-M-BLU-XXL'),

    ('arc-pro-trisuit-men', 'XS',  'Vermelho ARC',  '#CC2200',  8, 'ARC-TRIS-M-RED-XS'),
    ('arc-pro-trisuit-men', 'S',   'Vermelho ARC',  '#CC2200', 15, 'ARC-TRIS-M-RED-S'),
    ('arc-pro-trisuit-men', 'M',   'Vermelho ARC',  '#CC2200', 18, 'ARC-TRIS-M-RED-M'),
    ('arc-pro-trisuit-men', 'L',   'Vermelho ARC',  '#CC2200', 16, 'ARC-TRIS-M-RED-L'),
    ('arc-pro-trisuit-men', 'XL',  'Vermelho ARC',  '#CC2200', 10, 'ARC-TRIS-M-RED-XL'),
    ('arc-pro-trisuit-men', 'XXL', 'Vermelho ARC',  '#CC2200',  4, 'ARC-TRIS-M-RED-XXL'),

    -- ── arc-pro-trisuit-women ────────────────────────────────
    ('arc-pro-trisuit-women', 'XS',  'Azul Oceano',   '#006B8F', 14, 'ARC-TRIS-W-OCE-XS'),
    ('arc-pro-trisuit-women', 'S',   'Azul Oceano',   '#006B8F', 22, 'ARC-TRIS-W-OCE-S'),
    ('arc-pro-trisuit-women', 'M',   'Azul Oceano',   '#006B8F', 26, 'ARC-TRIS-W-OCE-M'),
    ('arc-pro-trisuit-women', 'L',   'Azul Oceano',   '#006B8F', 20, 'ARC-TRIS-W-OCE-L'),
    ('arc-pro-trisuit-women', 'XL',  'Azul Oceano',   '#006B8F', 12, 'ARC-TRIS-W-OCE-XL'),
    ('arc-pro-trisuit-women', 'XXL', 'Azul Oceano',   '#006B8F',  6, 'ARC-TRIS-W-OCE-XXL'),

    ('arc-pro-trisuit-women', 'XS',  'Preto Carbono', '#1A1A1A', 12, 'ARC-TRIS-W-BLK-XS'),
    ('arc-pro-trisuit-women', 'S',   'Preto Carbono', '#1A1A1A', 20, 'ARC-TRIS-W-BLK-S'),
    ('arc-pro-trisuit-women', 'M',   'Preto Carbono', '#1A1A1A', 24, 'ARC-TRIS-W-BLK-M'),
    ('arc-pro-trisuit-women', 'L',   'Preto Carbono', '#1A1A1A', 18, 'ARC-TRIS-W-BLK-L'),
    ('arc-pro-trisuit-women', 'XL',  'Preto Carbono', '#1A1A1A', 10, 'ARC-TRIS-W-BLK-XL'),
    ('arc-pro-trisuit-women', 'XXL', 'Preto Carbono', '#1A1A1A',  4, 'ARC-TRIS-W-BLK-XXL'),

    ('arc-pro-trisuit-women', 'XS',  'Rosa Coral',    '#E8527A',  9, 'ARC-TRIS-W-COR-XS'),
    ('arc-pro-trisuit-women', 'S',   'Rosa Coral',    '#E8527A', 16, 'ARC-TRIS-W-COR-S'),
    ('arc-pro-trisuit-women', 'M',   'Rosa Coral',    '#E8527A', 20, 'ARC-TRIS-W-COR-M'),
    ('arc-pro-trisuit-women', 'L',   'Rosa Coral',    '#E8527A', 14, 'ARC-TRIS-W-COR-L'),
    ('arc-pro-trisuit-women', 'XL',  'Rosa Coral',    '#E8527A',  8, 'ARC-TRIS-W-COR-XL'),
    ('arc-pro-trisuit-women', 'XXL', 'Rosa Coral',    '#E8527A',  3, 'ARC-TRIS-W-COR-XXL'),

    -- ── arc-aero-cycling-jersey-men ──────────────────────────
    ('arc-aero-cycling-jersey-men', 'XS',  'Preto Carbono',  '#1A1A1A', 15, 'ARC-CYCJ-M-BLK-XS'),
    ('arc-aero-cycling-jersey-men', 'S',   'Preto Carbono',  '#1A1A1A', 25, 'ARC-CYCJ-M-BLK-S'),
    ('arc-aero-cycling-jersey-men', 'M',   'Preto Carbono',  '#1A1A1A', 30, 'ARC-CYCJ-M-BLK-M'),
    ('arc-aero-cycling-jersey-men', 'L',   'Preto Carbono',  '#1A1A1A', 28, 'ARC-CYCJ-M-BLK-L'),
    ('arc-aero-cycling-jersey-men', 'XL',  'Preto Carbono',  '#1A1A1A', 18, 'ARC-CYCJ-M-BLK-XL'),
    ('arc-aero-cycling-jersey-men', 'XXL', 'Preto Carbono',  '#1A1A1A', 10, 'ARC-CYCJ-M-BLK-XXL'),

    ('arc-aero-cycling-jersey-men', 'XS',  'Branco Ártico',  '#F5F5F5', 12, 'ARC-CYCJ-M-WHT-XS'),
    ('arc-aero-cycling-jersey-men', 'S',   'Branco Ártico',  '#F5F5F5', 20, 'ARC-CYCJ-M-WHT-S'),
    ('arc-aero-cycling-jersey-men', 'M',   'Branco Ártico',  '#F5F5F5', 24, 'ARC-CYCJ-M-WHT-M'),
    ('arc-aero-cycling-jersey-men', 'L',   'Branco Ártico',  '#F5F5F5', 20, 'ARC-CYCJ-M-WHT-L'),
    ('arc-aero-cycling-jersey-men', 'XL',  'Branco Ártico',  '#F5F5F5', 14, 'ARC-CYCJ-M-WHT-XL'),
    ('arc-aero-cycling-jersey-men', 'XXL', 'Branco Ártico',  '#F5F5F5',  7, 'ARC-CYCJ-M-WHT-XXL'),

    ('arc-aero-cycling-jersey-men', 'XS',  'Azul Elétrico',  '#0057FF', 10, 'ARC-CYCJ-M-BLU-XS'),
    ('arc-aero-cycling-jersey-men', 'S',   'Azul Elétrico',  '#0057FF', 18, 'ARC-CYCJ-M-BLU-S'),
    ('arc-aero-cycling-jersey-men', 'M',   'Azul Elétrico',  '#0057FF', 22, 'ARC-CYCJ-M-BLU-M'),
    ('arc-aero-cycling-jersey-men', 'L',   'Azul Elétrico',  '#0057FF', 18, 'ARC-CYCJ-M-BLU-L'),
    ('arc-aero-cycling-jersey-men', 'XL',  'Azul Elétrico',  '#0057FF', 11, 'ARC-CYCJ-M-BLU-XL'),
    ('arc-aero-cycling-jersey-men', 'XXL', 'Azul Elétrico',  '#0057FF',  5, 'ARC-CYCJ-M-BLU-XXL'),

    -- ── arc-run-kit-men ──────────────────────────────────────
    ('arc-run-kit-men', 'XS',  'Preto Carbono', '#1A1A1A', 18, 'ARC-RUNK-M-BLK-XS'),
    ('arc-run-kit-men', 'S',   'Preto Carbono', '#1A1A1A', 28, 'ARC-RUNK-M-BLK-S'),
    ('arc-run-kit-men', 'M',   'Preto Carbono', '#1A1A1A', 35, 'ARC-RUNK-M-BLK-M'),
    ('arc-run-kit-men', 'L',   'Preto Carbono', '#1A1A1A', 30, 'ARC-RUNK-M-BLK-L'),
    ('arc-run-kit-men', 'XL',  'Preto Carbono', '#1A1A1A', 20, 'ARC-RUNK-M-BLK-XL'),
    ('arc-run-kit-men', 'XXL', 'Preto Carbono', '#1A1A1A', 10, 'ARC-RUNK-M-BLK-XXL'),

    ('arc-run-kit-men', 'XS',  'Cinza Grafite', '#4A4A4A', 15, 'ARC-RUNK-M-GRY-XS'),
    ('arc-run-kit-men', 'S',   'Cinza Grafite', '#4A4A4A', 22, 'ARC-RUNK-M-GRY-S'),
    ('arc-run-kit-men', 'M',   'Cinza Grafite', '#4A4A4A', 28, 'ARC-RUNK-M-GRY-M'),
    ('arc-run-kit-men', 'L',   'Cinza Grafite', '#4A4A4A', 24, 'ARC-RUNK-M-GRY-L'),
    ('arc-run-kit-men', 'XL',  'Cinza Grafite', '#4A4A4A', 16, 'ARC-RUNK-M-GRY-XL'),
    ('arc-run-kit-men', 'XXL', 'Cinza Grafite', '#4A4A4A',  8, 'ARC-RUNK-M-GRY-XXL'),

    ('arc-run-kit-men', 'XS',  'Verde Neon',    '#39FF14', 10, 'ARC-RUNK-M-NEO-XS'),
    ('arc-run-kit-men', 'S',   'Verde Neon',    '#39FF14', 16, 'ARC-RUNK-M-NEO-S'),
    ('arc-run-kit-men', 'M',   'Verde Neon',    '#39FF14', 20, 'ARC-RUNK-M-NEO-M'),
    ('arc-run-kit-men', 'L',   'Verde Neon',    '#39FF14', 17, 'ARC-RUNK-M-NEO-L'),
    ('arc-run-kit-men', 'XL',  'Verde Neon',    '#39FF14', 11, 'ARC-RUNK-M-NEO-XL'),
    ('arc-run-kit-men', 'XXL', 'Verde Neon',    '#39FF14',  5, 'ARC-RUNK-M-NEO-XXL')
  ) AS v (slug, size, color, color_hex, stock, sku)
  ON p.slug = v.slug
  RETURNING id
)

-- Confirm seed row counts
SELECT
  (SELECT COUNT(*) FROM inserted_products) AS products_inserted,
  (SELECT COUNT(*) FROM inserted_images)   AS images_inserted,
  (SELECT COUNT(*) FROM inserted_variants) AS variants_inserted;
