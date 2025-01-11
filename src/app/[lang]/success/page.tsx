import { stripe } from "../../lib/stripe";
import { getUserIdFromSupabase } from "../../lib/getUserIdFromSupabase";
import { insertPurchaseRecord } from "../../lib/insertPurchaseRecord";
import type { Stripe } from "stripe";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}): Promise<JSX.Element> {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  const userId = await getUserIdFromSupabase();

  await insertPurchaseRecord(userId, checkoutSession.id);

  return (
    <div className="container mx-auto px-4 py-6 dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl font-semibold text-center text-green-600 dark:text-green-400 mb-6">
        Thank you for your purchase! Your payment was successful.
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-6 dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="text-center space-y-4">
          <p className="text-lg font-medium">
            <strong>Session ID:</strong> {checkoutSession.id}
          </p>
          <p className="text-lg font-medium">
            <strong>Amount:</strong> ${(checkoutSession.amount_total ?? 0) / 100}
          </p>
          <p className="text-lg font-medium">
            <strong>Payment Status:</strong> {paymentIntent.status}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Thank you for using our services!
        </h3>
      </div>
    </div>
  );
}
