import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { products as mockProducts, getProductById } from '@/data/products';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // Try Supabase first, fall back to mock data
  if (supabase) {
    try {
      if (id) {
        const { data, error } = await supabase
          .from('laptops')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !data) {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(data);
      }

      const { data, error } = await supabase
        .from('laptops')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data?.length > 0) {
        return NextResponse.json(data);
      }
    } catch {
      // Fall through to mock data
    }
  }

  // Fallback: mock data
  if (id) {
    const product = getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  return NextResponse.json(mockProducts);
}
