import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import Stripe from "stripe";
import { createClient } from "../../lib/supaBase/server"; // Adjust the path if necessary
import { decode } from 'base64-arraybuffer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST method to handle adding a product
 * @param {Request} req
 * @returns {Response}
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json(); // Parse the JSON body

    const {
      title_en,
      title_ge,
      description_en,
      description_ge,
      gender,
      category,
      price,
      size,
      tags,
      image,
      name
    } = body;

    // Validate required fields
    if (!title_en || !title_ge || !price || !category || !size) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a product in Stripe
    const product = await stripe.products.create({
      name: title_en,
      description: description_en,
      metadata: {
        title_ge,
        description_ge,
        gender,
        category,
        price: price.toString(), // Ensure price is a string
        size,
        tags: tags.join(","), // Convert tags array to a comma-separated string
      },
    });

    // Create a price for the product
    await stripe.prices.create({
      product: product.id,
      unit_amount: parseInt(price) * 100, // Ensure price is an integer
      currency: "usd",
    });

   const base64String = image.replace(/^data:image\/\w+;base64,/, '');

    /// Store Images
    const UploadImage = await supabase
      .storage
      .from('product_images')
      .upload(`public/${product.id}`, decode(base64String), {
        contentType: 'image/png'
      })
      const { data: publicUrl } = supabase.storage
      .from('product_images') // Replace with your bucket name
      .getPublicUrl(UploadImage.data?.path as string)

    // Add product to Supabase
    const { error: productError } = await supabase.from("products").insert({
      title_en,
      title_ge,
      description_en,
      description_ge,
      gender,
      category,
      price,
      size,
      tags,
      stripe_product_id: product.id,
      image: publicUrl.publicUrl
    });

    if (productError) {
      throw new Error(`Supabase Error: ${productError.message}`);
    }

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Handles other HTTP methods
 * @returns {Response}
 */
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
