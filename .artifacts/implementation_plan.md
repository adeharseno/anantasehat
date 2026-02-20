# Ananta Sehat CMS Implementation Plan

## Architecture
- **Frontend**: Next.js (existing) deployed on Vercel
- **Database**: PostgreSQL via Supabase
- **CMS**: Admin panel under `/cms` route group
- **Auth**: Supabase Auth for CMS login

## Database Tables (Supabase)
1. `admin_users` - CMS admin accounts
2. `banners` - Hero banner slides
3. `categories` - Product categories
4. `products` - Products
5. `orders` - Customer orders
6. `order_items` - Order line items
7. `users` - Customer/frontend users
8. `payments` - Payment records
9. `payment_qrcode` - QRIS QR codes
10. `faqs` - FAQ items
11. `pages` - CMS managed pages (about, cara pemesanan, kebijakan privasi, syarat ketentuan)
12. `footer_settings` - Footer configuration
13. `banner_promos` - Promotional banners
14. `why_choose_us` - "Mengapa Pilih Ananta Sehat" items
15. `testimonials` - "Apa Kata Mereka" testimonials

## CMS Pages
1. `/cms/login` - Admin login
2. `/cms/dashboard` - Overview dashboard
3. `/cms/banners` - CRUD banners
4. `/cms/categories` - CRUD categories
5. `/cms/products` - CRUD products
6. `/cms/orders` - View all orders
7. `/cms/users` - View users
8. `/cms/payments` - CRUD payments
9. `/cms/qrcode` - Upload QRIS QR code
10. `/cms/faq` - CRUD FAQ
11. `/cms/pages/about` - About Us editor
12. `/cms/pages/cara-pemesanan` - Cara Pemesanan editor
13. `/cms/pages/kebijakan-privasi` - Kebijakan Privasi editor
14. `/cms/pages/syarat-ketentuan` - Syarat Ketentuan editor
15. `/cms/footer` - Manage footer
16. `/cms/banner-promo` - Promo banners
17. `/cms/why-choose-us` - Why choose us items
18. `/cms/testimonials` - Testimonials

## Implementation Steps
1. Install Supabase client
2. Create Supabase config + SQL migration
3. Build CMS layout (sidebar, auth guard)
4. Build each CMS page
5. Create API routes for CRUD operations
6. Integrate frontend to use Supabase data
