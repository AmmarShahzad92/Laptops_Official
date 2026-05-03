-- ====================================================
-- SUPABASE SQL QUERIES - Laptops Official
-- Run these in Supabase SQL Editor (in order)
-- ====================================================

-- ─── 1. USERS TABLE ─────────────────────────────────
-- Simple users table with email + password hash
-- No email verification / no Supabase Auth dependency

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast login lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    NEW.updated_at = NOW();
  EXCEPTION
    WHEN undefined_column THEN
      -- Allow reuse on tables that do not define updated_at.
      NULL;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS but allow all operations (testing purposes)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true) WITH CHECK (true);

-- Migration for existing databases created before `username` existed.
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT;
UPDATE users
SET username = split_part(email, '@', 1)
WHERE username IS NULL OR trim(username) = '';
ALTER TABLE users ALTER COLUMN username SET NOT NULL;


-- ─── 1b. CUSTOMER PROFILES (Supabase Auth) ─────────────────
-- Stores verified customer info linked to auth.users

CREATE TABLE IF NOT EXISTS public.customer_profiles (
  cust_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  address TEXT,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER customer_profiles_updated_at
  BEFORE UPDATE ON public.customer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "customer_profiles_select_own" ON public.customer_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "customer_profiles_update_own" ON public.customer_profiles
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

GRANT SELECT, UPDATE ON public.customer_profiles TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_verified_customer_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.customer_profiles (user_id, name, phone, email, address, email_verified)
    VALUES (
      NEW.id,
      COALESCE(NULLIF(NEW.raw_user_meta_data->>'name', ''), split_part(NEW.email, '@', 1)),
      NULLIF(NEW.raw_user_meta_data->>'phone', ''),
      NEW.email,
      NULLIF(NEW.raw_user_meta_data->>'address', ''),
      true
    )
    ON CONFLICT (user_id) DO UPDATE SET
      name = EXCLUDED.name,
      phone = EXCLUDED.phone,
      email = EXCLUDED.email,
      address = EXCLUDED.address,
      email_verified = true,
      updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_verified ON auth.users;
CREATE TRIGGER on_auth_user_verified
  AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_verified_customer_profile();


-- ─── 2. LAPTOPS TABLE ───────────────────────────────

CREATE TABLE IF NOT EXISTS laptops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT DEFAULT 'laptop',
  status TEXT DEFAULT 'live',
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  cpu TEXT,
  ram TEXT,
  storage JSONB DEFAULT '{}'::jsonb,
  gpu JSONB DEFAULT '{}'::jsonb,
  screen TEXT,
  condition TEXT DEFAULT 'New',
  price INTEGER NOT NULL,
  qty INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  wattage INTEGER,
  connector_type TEXT,
  highlights TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_laptops_brand ON laptops(brand);
CREATE INDEX IF NOT EXISTS idx_laptops_price ON laptops(price);
CREATE INDEX IF NOT EXISTS idx_laptops_status ON laptops(status);
CREATE INDEX IF NOT EXISTS idx_laptops_category ON laptops(category);

CREATE TRIGGER laptops_updated_at
  BEFORE UPDATE ON laptops
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE laptops ENABLE ROW LEVEL SECURITY;

-- Public read access, authenticated write
CREATE POLICY "Public read access on laptops" ON laptops
  FOR SELECT USING (true);

CREATE POLICY "Allow all write on laptops" ON laptops
  FOR ALL USING (true) WITH CHECK (true);

-- Migrations for existing databases
ALTER TABLE laptops ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'laptop';
ALTER TABLE laptops ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'live';
ALTER TABLE laptops ADD COLUMN IF NOT EXISTS wattage INTEGER;
ALTER TABLE laptops ADD COLUMN IF NOT EXISTS connector_type TEXT;

ALTER TABLE laptops
  ALTER COLUMN storage TYPE JSONB
  USING (CASE
    WHEN storage IS NULL OR storage = '' THEN '{}'::jsonb
    ELSE jsonb_build_object('primary', storage)
  END);

ALTER TABLE laptops
  ALTER COLUMN gpu TYPE JSONB
  USING (CASE
    WHEN gpu IS NULL OR gpu = '' THEN '{}'::jsonb
    ELSE jsonb_build_object('integrated', gpu)
  END);

ALTER TABLE laptops ALTER COLUMN cpu DROP NOT NULL;
ALTER TABLE laptops ALTER COLUMN ram DROP NOT NULL;
ALTER TABLE laptops ALTER COLUMN storage DROP NOT NULL;
ALTER TABLE laptops ALTER COLUMN gpu DROP NOT NULL;
ALTER TABLE laptops ALTER COLUMN screen DROP NOT NULL;


-- ─── 3. SEED LAPTOPS DATA ───────────────────────────

INSERT INTO laptops (brand, model, cpu, ram, storage, gpu, screen, condition, price, qty, images, highlights, specs, created_at) VALUES
(
  'HP', 'OMEN 16', 'Intel Core i5-12500H', '16GB DDR4', jsonb_build_object('primary', '512GB NVMe SSD'), jsonb_build_object('integrated', 'RTX 4060 8GB'), '16.1" QHD 165Hz', 'New', 275000, 2,
  ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1612287230202-1ff1d85d1fc8?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'],
  ARRAY['QHD 165Hz Display','OMEN Cryo Chamber Cooling','4-Zone RGB Keyboard'],
  '{"processor":"Intel Core i5-12500H (2.5GHz base, 4.5GHz boost)","memory":"16GB DDR4-3200MHz (2x8GB)","storage":"512GB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 4060 8GB GDDR6","display":"16.1\" QHD (2560x1440) IPS 165Hz G-SYNC","os":"Windows 11 Home","weight":"2.3 kg","battery":"83Wh 6-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-10'
),
(
  'Lenovo', 'Legion 5 Pro', 'AMD Ryzen 7 7735HS', '32GB DDR5', jsonb_build_object('primary', '1TB NVMe SSD'), jsonb_build_object('integrated', 'RTX 4070 8GB'), '16" WQXGA 165Hz', 'New', 395000, 1,
  ARRAY['https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1591799265444-01c2d8daf544?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1548690312-e3b507d8cc1d?auto=format&fit=crop&w=800&q=80'],
  ARRAY['WQXGA High Resolution','Legion Coldfront 5.0','RGB Backlit Keyboard'],
  '{"processor":"AMD Ryzen 7 7735HS (3.2GHz base, 4.75GHz boost)","memory":"32GB DDR5-4800MHz (2x16GB)","storage":"1TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 4070 8GB GDDR6","display":"16\" WQXGA (2560x1600) IPS 165Hz G-SYNC","os":"Windows 11 Home","weight":"2.5 kg","battery":"80Wh 4-cell","warranty":"2 years international"}'::jsonb,
  '2024-01-08'
),
(
  'Alienware', 'X17', 'Intel Core i9-12900HK', '32GB DDR5', jsonb_build_object('primary', '2TB NVMe SSD'), jsonb_build_object('integrated', 'RTX 4080 12GB'), '17.3" UHD 120Hz', 'New', 650000, 1,
  ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=800&q=80'],
  ARRAY['4K UHD Display','Alienware Command Center','Advanced Liquid Cooling'],
  '{"processor":"Intel Core i9-12900HK (2.5GHz base, 5.0GHz boost)","memory":"32GB DDR5-4800MHz (2x16GB)","storage":"2TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 4080 12GB GDDR6X","display":"17.3\" UHD (3840x2160) IPS 120Hz G-SYNC","os":"Windows 11 Pro","weight":"3.0 kg","battery":"97Wh 6-cell","warranty":"3 years premium support"}'::jsonb,
  '2024-01-05'
),
(
  'Asus', 'ROG Zephyrus G15', 'AMD Ryzen 9 6900HS', '16GB DDR5', jsonb_build_object('primary', '1TB NVMe SSD'), jsonb_build_object('integrated', 'RTX 3080 8GB'), '15.6" QHD 165Hz', 'New', 320000, 3,
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1548690312-e3b507d8cc1d?auto=format&fit=crop&w=800&q=80'],
  ARRAY['Slim Lightweight Design','Adaptive-Sync Display','Excellent Cooling'],
  '{"processor":"AMD Ryzen 9 6900HS (3.3GHz base, 4.9GHz boost)","memory":"16GB DDR5-4800MHz","storage":"1TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 3080 8GB GDDR6","display":"15.6\" QHD (2560x1440) IPS 165Hz Adaptive-Sync","os":"Windows 11 Home","weight":"1.9 kg","battery":"90Wh 4-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-02'
),
(
  'MSI', 'Raider GE77', 'Intel Core i9-13980HX', '32GB DDR5', jsonb_build_object('primary', '2TB NVMe SSD'), jsonb_build_object('integrated', 'RTX 4090 16GB'), '17.3" QHD 240Hz', 'New', 720000, 1,
  ARRAY['https://images.unsplash.com/photo-1559163499-413811fb2344?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'],
  ARRAY['240Hz Gaming Display','SteelSeries RGB Keyboard','Cooler Boost 5'],
  '{"processor":"Intel Core i9-13980HX (2.2GHz base, 5.6GHz boost)","memory":"32GB DDR5-5600MHz","storage":"2TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 4090 16GB GDDR6X","display":"17.3\" QHD (2560x1440) IPS 240Hz","os":"Windows 11 Pro","weight":"3.2 kg","battery":"99Wh 6-cell","warranty":"2 years international"}'::jsonb,
  '2024-01-04'
),
(
  'Apple', 'MacBook Pro 16" M2 Max', 'Apple M2 Max', '32GB Unified', jsonb_build_object('primary', '1TB SSD'), jsonb_build_object('integrated', 'M2 Max 38-core GPU'), '16.2" Liquid Retina XDR', 'New', 600000, 2,
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1537498425277-c283d32ef9df?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1546094086-594c87b144be?auto=format&fit=crop&w=800&q=80'],
  ARRAY['Liquid Retina XDR Display','Studio-Grade Performance','Up to 21 Hours Battery'],
  '{"processor":"Apple M2 Max 12-core CPU (8 performance, 4 efficiency)","memory":"32GB Unified Memory","storage":"1TB SSD","graphics":"Apple M2 Max 38-core GPU","display":"16.2\" Liquid Retina XDR (3456x2234) Mini-LED 120Hz","os":"macOS Ventura","weight":"2.2 kg","battery":"Up to 21 hours video playback","warranty":"1 year limited warranty"}'::jsonb,
  '2024-01-01'
),
(
  'Razer', 'Blade 15 Advanced', 'Intel Core i7-13800H', '16GB DDR5', jsonb_build_object('primary', '1TB NVMe SSD'), jsonb_build_object('integrated', 'RTX 4070 8GB'), '15.6" QHD 240Hz', 'New', 420000, 2,
  ARRAY['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80'],
  ARRAY['Ultra-Thin CNC Aluminum','Chroma RGB Keyboard','240Hz Gaming Display'],
  '{"processor":"Intel Core i7-13800H (2.4GHz base, 5.2GHz boost)","memory":"16GB DDR5-5200MHz","storage":"1TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 4070 8GB GDDR6","display":"15.6\" QHD (2560x1440) IPS 240Hz","os":"Windows 11 Home","weight":"2.0 kg","battery":"80Wh 4-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-07'
),
(
  'Dell', 'XPS 15 OLED', 'Intel Core i7-12700H', '16GB DDR5', jsonb_build_object('primary', '1TB NVMe SSD'), jsonb_build_object('integrated', 'RTX 3050 Ti 4GB'), '15.6" 3.5K OLED Touch', 'New', 310000, 3,
  ARRAY['https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
  ARRAY['OLED Touch Display','Premium Aluminum Design','Long Battery Life'],
  '{"processor":"Intel Core i7-12700H (2.3GHz base, 4.7GHz boost)","memory":"16GB DDR5-4800MHz","storage":"1TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 3050 Ti 4GB GDDR6","display":"15.6\" 3.5K OLED Touch (3456x2160)","os":"Windows 11 Pro","weight":"1.9 kg","battery":"86Wh 6-cell","warranty":"1 year premium support"}'::jsonb,
  '2024-01-09'
),
(
  'Acer', 'Swift X 14', 'Intel Core i7-13700H', '16GB DDR5', jsonb_build_object('primary', '1TB NVMe SSD'), jsonb_build_object('integrated', 'RTX 4050 6GB'), '14.5" 3K OLED 120Hz', 'New', 345000, 2,
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=800&q=80'],
  ARRAY['3K OLED Display','Lightweight Metal Chassis','NVIDIA Studio Ready'],
  '{"processor":"Intel Core i7-13700H (2.4GHz base, 5.0GHz boost)","memory":"16GB DDR5-5200MHz","storage":"1TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 4050 6GB GDDR6","display":"14.5\" 3K (2880x1800) OLED 120Hz","os":"Windows 11 Home","weight":"1.4 kg","battery":"76Wh 4-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-12'
),
(
  'Gigabyte', 'Aorus 17', 'Intel Core i7-13700H', '32GB DDR5', jsonb_build_object('primary', '1TB NVMe SSD'), jsonb_build_object('integrated', 'RTX 4070 8GB'), '17.3" QHD 240Hz', 'New', 450000, 1,
  ARRAY['https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=800&q=80'],
  ARRAY['240Hz Display','Advanced Cooling','RGB Keyboard'],
  '{"processor":"Intel Core i7-13700H (2.4GHz base, 5.0GHz boost)","memory":"32GB DDR5-4800MHz (2x16GB)","storage":"1TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 4070 8GB GDDR6","display":"17.3\" QHD (2560x1440) IPS 240Hz","os":"Windows 11 Home","weight":"2.8 kg","battery":"99Wh 6-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-15'
),
(
  'Samsung', 'Galaxy Book3 Ultra', 'Intel Core i9-13900H', '32GB DDR5', jsonb_build_object('primary', '1TB SSD'), jsonb_build_object('integrated', 'RTX 4070 8GB'), '16" 3K AMOLED 120Hz', 'New', 500000, 2,
  ARRAY['https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=800&q=80'],
  ARRAY['AMOLED Display','S Pen Support','Lightweight'],
  '{"processor":"Intel Core i9-13900H (2.6GHz base, 5.4GHz boost)","memory":"32GB DDR5-5200MHz","storage":"1TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 4070 8GB GDDR6","display":"16\" 3K (2880x1800) AMOLED 120Hz","os":"Windows 11 Pro","weight":"1.8 kg","battery":"76Wh 4-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-16'
),
(
  'HP', 'Pavilion Gaming 15', 'AMD Ryzen 5 5600H', '16GB DDR4', jsonb_build_object('primary', '512GB SSD'), jsonb_build_object('integrated', 'RTX 3050 4GB'), '15.6" FHD 144Hz', 'New', 200000, 4,
  ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'],
  ARRAY['144Hz Display','Dual Fan Cooling','Bang & Olufsen Audio'],
  '{"processor":"AMD Ryzen 5 5600H (3.3GHz base, 4.2GHz boost)","memory":"16GB DDR4-3200MHz (2x8GB)","storage":"512GB PCIe NVMe SSD","graphics":"NVIDIA GeForce RTX 3050 4GB GDDR6","display":"15.6\" FHD (1920x1080) IPS 144Hz","os":"Windows 11 Home","weight":"2.2 kg","battery":"52.5Wh 3-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-17'
),
(
  'Lenovo', 'IdeaPad Gaming 3', 'AMD Ryzen 7 6800H', '16GB DDR5', jsonb_build_object('primary', '512GB SSD'), jsonb_build_object('integrated', 'RTX 3050 Ti 4GB'), '15.6" QHD 165Hz', 'New', 250000, 3,
  ARRAY['https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1591799265444-01c2d8daf544?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1612287230202-1ff1d85d1fc8?auto=format&fit=crop&w=800&q=80'],
  ARRAY['High Refresh Rate','MUX Switch','RGB Keyboard'],
  '{"processor":"AMD Ryzen 7 6800H (3.2GHz base, 4.7GHz boost)","memory":"16GB DDR5-4800MHz (2x8GB)","storage":"512GB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 3050 Ti 4GB GDDR6","display":"15.6\" QHD (2560x1440) IPS 165Hz","os":"Windows 11 Home","weight":"2.3 kg","battery":"60Wh 3-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-18'
),
(
  'MSI', 'Thin GF63', 'Intel Core i5-12450H', '16GB DDR4', jsonb_build_object('primary', '512GB SSD'), jsonb_build_object('integrated', 'RTX 4050 6GB'), '15.6" FHD 144Hz', 'New', 220000, 5,
  ARRAY['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'],
  ARRAY['Thin Design','Cooler Boost','Nahimic Audio'],
  '{"processor":"Intel Core i5-12450H (2.0GHz base, 4.4GHz boost)","memory":"16GB DDR4-3200MHz (2x8GB)","storage":"512GB PCIe NVMe SSD","graphics":"NVIDIA GeForce RTX 4050 6GB GDDR6","display":"15.6\" FHD (1920x1080) IPS 144Hz","os":"Windows 11 Home","weight":"1.9 kg","battery":"51Wh 3-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-19'
),
(
  'Dell', 'G15', 'Intel Core i7-12700H', '16GB DDR5', jsonb_build_object('primary', '1TB SSD'), jsonb_build_object('integrated', 'RTX 3060 6GB'), '15.6" FHD 120Hz', 'New', 280000, 2,
  ARRAY['https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&w=800&q=80'],
  ARRAY['Alienware Inspired','Game Shift Key','Dolby Audio'],
  '{"processor":"Intel Core i7-12700H (2.3GHz base, 4.7GHz boost)","memory":"16GB DDR5-4800MHz (2x8GB)","storage":"1TB PCIe Gen4 NVMe SSD","graphics":"NVIDIA GeForce RTX 3060 6GB GDDR6","display":"15.6\" FHD (1920x1080) IPS 120Hz","os":"Windows 11 Home","weight":"2.6 kg","battery":"56Wh 3-cell","warranty":"1 year international"}'::jsonb,
  '2024-01-20'
);


ALTER TABLE laptops ADD COLUMN IF NOT EXISTS offer_id UUID REFERENCES public.vendor_offers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_laptops_offer_id ON laptops(offer_id);
  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'inventory'
    ) THEN
      ALTER TABLE public.laptops
        ADD COLUMN IF NOT EXISTS inventory_id UUID REFERENCES public.inventory(id) ON DELETE SET NULL;
      CREATE INDEX IF NOT EXISTS idx_laptops_inventory_id ON public.laptops(inventory_id);
    END IF;
  END $$;


  -- ─── 4. SHARED DB EXTENSIONS (inventory/vendor_offers images + storage) ─────
  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'inventory'
    ) THEN
      ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
    END IF;

    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'vendor_offers'
    ) THEN
      ALTER TABLE public.vendor_offers ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
    END IF;
  END $$;

  INSERT INTO storage.buckets (id, name, public)
  VALUES ('catalog_images', 'catalog_images', true)
  ON CONFLICT (id) DO NOTHING;

  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'storage' AND tablename = 'objects'
        AND policyname = 'catalog_images_public_read'
    ) THEN
      CREATE POLICY "catalog_images_public_read" ON storage.objects
        FOR SELECT USING (bucket_id = 'catalog_images');
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'storage' AND tablename = 'objects'
        AND policyname = 'catalog_images_anon_insert'
    ) THEN
      CREATE POLICY "catalog_images_anon_insert" ON storage.objects
        FOR INSERT TO anon WITH CHECK (bucket_id = 'catalog_images');
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'storage' AND tablename = 'objects'
        AND policyname = 'catalog_images_anon_update'
    ) THEN
      CREATE POLICY "catalog_images_anon_update" ON storage.objects
        FOR UPDATE TO anon USING (bucket_id = 'catalog_images')
        WITH CHECK (bucket_id = 'catalog_images');
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'storage' AND tablename = 'objects'
        AND policyname = 'catalog_images_anon_delete'
    ) THEN
      CREATE POLICY "catalog_images_anon_delete" ON storage.objects
        FOR DELETE TO anon USING (bucket_id = 'catalog_images');
    END IF;
  END $$;

  GRANT SELECT ON storage.buckets TO anon;
  GRANT SELECT, INSERT, UPDATE, DELETE ON storage.objects TO anon;
