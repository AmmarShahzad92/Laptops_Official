import { NextResponse } from 'next/server';
import { products, getProductById } from '@/data/products';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (id) {
    const product = getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  }
  
  return NextResponse.json(products);
}
