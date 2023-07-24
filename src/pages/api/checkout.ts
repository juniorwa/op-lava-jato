import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { BookingType } from "@/app/page";

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { booking }: { booking: BookingType } = req.body;

    const {
      selectedDate,
      selectedDayOfWeek,
      selectedMonth,
      selectedProductDefaultPrice,
      selectedTime,
      selectedProductNane,
      selectedYear,
      rawPrice
    } = booking;

    if (req.method !== "POST") {
      return res.status(405).json({
        checkoutUrl: `${process.env.APP_URL}?error=Method not allowed.`,
      });
    }

    if (!selectedProductDefaultPrice) {
      return res.status(400).json({
        checkoutUrl: `${process.env.APP_URL}?error=Price was not found.`,
      });
    }

    const success_url = `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&day=${selectedDate}&price=${rawPrice}&year=${selectedYear}&day_week=${selectedDayOfWeek}&month=${selectedMonth}&time=${selectedTime}&service=${selectedProductNane}`;
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
      phone_number_collection: {
        enabled: true,
      },
    });

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error: any) {
    console.error("Error making checkout:", error);
    return res.status(500).json({
      checkoutUrl: `${process.env.APP_URL}?error=Error making checkout.`,
    });
  }
};

export default checkout;
