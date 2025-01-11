import { createClient } from "./supaBase/server";
import { stripe } from "./stripe";
const supabase = createClient();

export async function insertPurchaseRecord(
  userId: string,
  checkoutId: string
): Promise<void> {
  try {
    const session = await stripe.checkout.sessions.retrieve(checkoutId, {
      expand: ["line_items"],
    });

    let purchaseType = "single";

    if (session && session.line_items && session.line_items.data) {
      const isCartItem = session.line_items.data.some((item) => {
        const productName = item.description || "Unknown Product";
        return productName.includes("Cart Items");
      });

      if (isCartItem) {
        purchaseType = "cart";
      }

      session.line_items.data.forEach((item) => {
        const productName = item.description || "Unknown Product";
        // console.log(`Product name: ${productName}`);
      });
    } else {
      console.log("No line items found in the checkout session.");
    }

    const productId = session.metadata?.product_id || null;

    const purchaseData = {
      user_id: userId,
      checkout_id: checkoutId,
      purchase_type: purchaseType,
      product_ids: productId ? productId : null,
    };

    const { error } = await (await supabase)
      .from("purchaseList")
      .insert([purchaseData]);

    if (error) {
      if (error.code === "23505") {
        console.log(
          `Duplicate checkout ID: ${checkoutId} for user ${userId}. Skipping insertion.`
        );
      } else {
        throw new Error(`Error creating purchase record: ${error.message}`);
      }
    } else {
      console.log(
        `Purchase record created for user ${userId} with checkout ID ${checkoutId} and purchase_type: ${purchaseType}`
      );
    }
  } catch (error) {
    console.error("Error inserting purchase record:", error);
    throw error;
  }
}
