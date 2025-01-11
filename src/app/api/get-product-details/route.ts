import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get("productId");

    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid Product ID" },
        { status: 400 }
      );
    }

    const product = await stripe.products.retrieve(productId);
    const prices = await stripe.prices.list({
      product: productId,
    });

    if (prices.data.length === 0) {
      return NextResponse.json(
        { error: "Product does not have any prices assigned" },
        { status: 400 }
      );
    }

    const price = prices.data[0] as Stripe.Price;

    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      description_ge: product.metadata.description_ge,
      title_ge: product.metadata.title_ge,
      category: product.metadata.category,
      tags: product.metadata.tags,
      gender: product.metadata.gender,
      size: product.metadata.size,
      priceInCents: price.unit_amount,
    });
  } catch (error) {
    // console.error("Error fetching product details:", error);
    return NextResponse.json(
      { error: "Unable to fetch product details" },
      { status: 500 }
    );
  }
}
