
import { supabase } from "@/lib/supabase";
import { categories as staticCategories, products as staticProducts } from "@/lib/data";

// Helper to check if Supabase is configured
const isSupabaseConfigured = () => {
    return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};

export async function getBanners() {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching banners:", error);
        return [];
    }
    return data || [];
}

export async function getCategories() {
    if (!isSupabaseConfigured()) return staticCategories;

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    if (error || !data || data.length === 0) {
        return staticCategories; // Fallback
    }

    return data;
}

// Helper to map Supabase product result to frontend structure
const mapProduct = (p: any) => ({
    ...p,
    category: p.categories?.name || p.category, // Fallback to existing or relation
    categorySlug: p.categories?.slug || p.categorySlug || p.categories?.name?.toLowerCase().replace(/\s+/g, '-'),
});

export async function getProducts(categoryId?: string) {
    if (!isSupabaseConfigured()) return staticProducts;

    let query = supabase.from('products').select('*, categories(slug, name)');

    if (categoryId) {
        // Since we can't easily filter by joined table column in simple query without !inner join
        // For MVP, fetch all then filter in JS if needed, or assume we pass category_id
        // But ProductsPageContent passes slug.
        // Let's rely on client side filtering for now as implemented there, OR filter here
        // If we want to filter here:
        // query = query.eq('categories.slug', categoryId); // This requires !inner join syntax which is trickier in basic supabase-js without typing
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
        // Filter static data
        if (categoryId) {
            return staticProducts.filter(p => p.categorySlug === categoryId);
        }
        return staticProducts;
    }

    const mapped = data.map(mapProduct);

    if (categoryId) {
        return mapped.filter((p: any) => p.categorySlug === categoryId);
    }

    return mapped;
}

export async function getProduct(slugOrId: string | number) {
    if (!isSupabaseConfigured()) {
        return staticProducts.find(p => p.id === Number(slugOrId) || p.slug === slugOrId);
    }

    const { data, error } = await supabase
        .from('products')
        .select('*, categories(slug, name)')
        .or(`id.eq.${slugOrId},slug.eq.${slugOrId}`)
        .single();

    if (error || !data) {
        return staticProducts.find(p => p.id === Number(slugOrId));
    }

    return mapProduct(data);
}

export async function getPromoBanners(position: string) {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
        .from('promo_banners')
        .select('*')
        .eq('active', true)
        .eq('position', position);

    return data || [];
}

export async function getTestimonials() {
    if (!isSupabaseConfigured()) return []; // or mock

    const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('active', true);

    return data || [];
}

export async function getWhyChooseUs() {
    if (!isSupabaseConfigured()) return [];

    const { data } = await supabase
        .from('why_choose_us')
        .select('*')
        .order('order');

    return data || [];
}

export async function getFooterLinks(section?: string) {
    if (!isSupabaseConfigured()) return [];

    let query = supabase.from('footer_settings').select('*').order('order');
    if (section) query = query.eq('section_name', section);

    const { data } = await query;
    return data || [];
}

export async function getFAQ() {
    if (!isSupabaseConfigured()) return [];

    const { data } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('order');

    return data || [];
}

export async function getPageContent(slug: string) {
    if (!isSupabaseConfigured()) return null;

    const { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();

    return data;
}
