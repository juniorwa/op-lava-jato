import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await stripe.products.list({
      expand: ["data.default_price"],
    });

    const products = response.data.map((product: Stripe.Product) => {
      const price = product.default_price as Stripe.Price;
      const formattedPrice = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "EUR",
      }).format((price.unit_amount as number) / 100);

      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formattedPrice,
        default_price: price.id,
        raw_price: price.unit_amount,
      };
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default handler;
