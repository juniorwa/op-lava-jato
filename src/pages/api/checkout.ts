import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { BookingType } from "@/app/page";

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { booking }: { booking: BookingType } = req.body;

    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed.",
      });
    }

    if (!booking.formattedDate) {
      return res.status(400).json({
        error: "Price was not found.",
      });
    }

    const success_url = `${process.env.APP_URL}/success?day=${booking.formattedDate}&time=${booking.selectedTime}&service=${booking.selectedProductNane}`;
    const cancel_url = `${process.env.APP_URL}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url,
      cancel_url,
      mode: "payment",
      line_items: [
        {
          price: booking.selectedProductDefaultPrice,
          quantity: 1,
        },
      ],
    });

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error: any) {
    console.error("Error making checkout:", error);
    return res.status(500).json({
      error: "Error making checkout.",
    });
  }
};

export default checkout;
