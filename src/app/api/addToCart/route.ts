import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../lib/supaBase/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, productId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const client = createClient();

    const { data, error: fetchError } = await (await client)
      .from('cart')
      .select('user_id, product_list')  
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      return NextResponse.json({ error: fetchError.message }, { status: 400 });
    }

    let updatedProductList = [];

    if (data) {
      updatedProductList = [...data.product_list, productId];
      const { error: updateError } = await (await client)
        .from('cart')
        .update({
          product_list: updatedProductList,
        })
        .eq('user_id', userId);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 400 });
      }
    } else {
      const { error: insertError } = await (await client)
        .from('cart')
        .insert([
          {
            user_id: userId,
            product_list: [productId], 
          },
        ]);

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: 'Product added to cart' });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while adding to the cart' }, { status: 500 });
  }
}
