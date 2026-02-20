
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admins Table
CREATE TABLE admins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- In a real app, use Supabase Auth. For this simple CMS, we might store hashed passwords or just use Supabase Auth users table with a role. 
    -- Let's use Supabase Auth for actual authentication, but we can have an admins table for profile info if needed.
    -- Actually, for simplicity in this specific request, let's assume we use Supabase Auth and just check a 'role' metadata or a separate table mapping auth.users to admin roles.
    -- For now, let's create a simple table for manual auth if they don't want to use the full Auth UI, but Supabase Auth is best.
    -- Let's stick to Supabase Auth. We will create a profile table.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Banners Table
CREATE TABLE banners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Categories Table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT, -- Emoji or URL
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Products Table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES categories(id),
    price NUMERIC NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT,
    image_url TEXT,
    dosage TEXT,
    manufacturer TEXT,
    badge TEXT, -- 'Terlaris', 'Promo', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Orders Table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID, -- Can be null for guest checkout, or reference auth.users
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    customer_address TEXT,
    total_amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, paid, shipped, completed, cancelled
    payment_method TEXT,
    payment_proof_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Order Items Table
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_purchase NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Payment Methods Table
CREATE TABLE payment_methods (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    account_number TEXT,
    account_name TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. QRIS Table
CREATE TABLE qris (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. FAQ Table
CREATE TABLE faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Pages Content Table (About Us, Terms, etc.)
CREATE TABLE pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- HTML or Markdown
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Footer Links / Settings
CREATE TABLE footer_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    section_name TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Promo Banners (Secondary banners)
CREATE TABLE promo_banners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    position TEXT, -- 'top', 'middle', 'bottom'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Why Choose Us
CREATE TABLE why_choose_us (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Testimonials
CREATE TABLE testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    message TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some initial data if needed
INSERT INTO pages (slug, title, content) VALUES
('about-us', 'Tentang Kami', 'Isi halaman tentang kami...'),
('how-to-order', 'Cara Pemesanan', 'Isi halaman cara pemesanan...'),
('privacy-policy', 'Kebijakan Privasi', 'Isi halaman kebijakan privasi...'),
('terms-conditions', 'Syarat & Ketentuan', 'Isi halaman syarat & ketentuan...');
