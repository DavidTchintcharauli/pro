export interface Product {
  id: string | number;
  title_ge: string;
  title_en: string;
  image: string;
  description_ge: string;
  description_en: string;
  price: number;
  gender: string;
  category: string;
  size: string;
  tags: string;
  stripe_product_id: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const appUrl = process.env.AUTH0_BASE_URL;
  const productsURL = `${appUrl}/api/products`;
  try {
    const response = await fetch(productsURL, {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.json();
  } catch (error) {
    return [];
  }
}
