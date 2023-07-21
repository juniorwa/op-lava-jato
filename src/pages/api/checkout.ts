import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { BookingType } from "@/app/page";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismaClient";

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { booking }: { booking: BookingType } = req.body;

    if (req.method !== "POST") {
      return res.status(405).json({
        checkoutUrl: `${process.env.APP_URL}?error=Method not allowed.`,
      });
    }

    const token = req.headers.authorization?.split(" ")[1]; // Assuming Authorization: Bearer <token>
    if (!token) {
      return res
        .status(403)
        .json({
          checkoutUrl: `${process.env.APP_URL}?error=No token provided.`,
        });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        // if the error happened because the JWT is invalid
        return res
          .status(403)
          .json({
            checkoutUrl: `${process.env.APP_URL}/login?error=Invalid token.`,
          });
      } else {
        // the error will be an instance of jwt.TokenExpiredError if the token expired
        return res
          .status(403)
          .json({
            checkoutUrl: `${process.env.APP_URL}/login?error=Expired token.`,
          });
      }
    }

    // @ts-ignore
    if (!decoded.userId) {
      return res
        .status(401)
        .json({
          checkoutUrl: `${process.env.APP_URL}/login?error=User not found.`,
        });
    }

    if (!booking.formattedDate) {
      return res.status(400).json({
        checkoutUrl: `${process.env.APP_URL}?error=Price was not found.`,
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
      checkoutUrl: `${process.env.APP_URL}?error=Error making checkout.`,
    });
  }
};

export default checkout;
