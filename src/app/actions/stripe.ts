"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY } from "../config/index";
import { stripe } from "../lib/stripe";
import { getUserIdFromSupabase } from "../lib/getUserIdFromSupabase";

export async function createCheckoutSession(
  data: FormData
): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = data.get(
    "uiMode"
  ) as Stripe.Checkout.SessionCreateParams.UiMode;

  const origin: string = headers().get("origin") as string;

  const locale = headers().get("accept-language")?.split(",")[0] || "ka";

  // console.log("Accept-Language Header:", locale);

  const description = `
    Product Name: ${data.get("name") as string}
    Description (EN): ${data.get("description") as string}
    Description (GE): ${data.get("description_ge") as string}
    Title (GE): ${data.get("title_ge") as string}
  `;

  const productId = data.get("id") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: data.get("name") as string,
              description: description,
            },
            unit_amount: Number(data.get("priceInCents") as string),
          },
        },
      ],
      metadata: {
        product_id: productId,
      },
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/${locale}/product-list`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    });

  const userId = await getUserIdFromSupabase();

  if (!userId) {
    throw new Error("Unauthorized: User ID not found.");
  }

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data: FormData
): Promise<{ client_secret: string }> {
  const productId = data.get("id") as string;

  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: Number(data.get("priceInCents") as string),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
      metadata: {
        product_id: productId,
      },
    });

  return { client_secret: paymentIntent.client_secret as string };
}
