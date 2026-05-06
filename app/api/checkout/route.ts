import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

type CartItem = {
  product: { shortName: string; size: string; dimensions: string; price: number };
  quantity: number;
};

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const { items, shipping, customerEmail, promoCode, discountRate } = await req.json() as {
      items: CartItem[];
      shipping: number;
      customerEmail: string;
      promoCode?: string;
      discountRate?: number;
    };

    const line_items = items.map(item => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.product.shortName,
          description: `${item.product.size} · ${item.product.dimensions}`,
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    if (shipping > 0) {
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Frais de livraison", description: "" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items,
      customer_email: customerEmail || undefined,
      success_url: `${req.nextUrl.origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/panier`,
      locale: "fr",
      payment_method_types: ["card"],
    };

    if (promoCode && discountRate && discountRate > 0) {
      const coupon = await stripe.coupons.create({
        percent_off: Math.round(discountRate * 100),
        duration: "once",
        name: promoCode,
      });
      sessionParams.discounts = [{ coupon: coupon.id }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
