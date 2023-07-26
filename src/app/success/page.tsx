import { NextPage } from "next";
import React from "react";
import Button from "@/components/Button/Button";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prismaClient";
import { redirect } from "next/navigation";
import emailjs from "@emailjs/browser";

type SuccessProps = {
  searchParams: {
    day: string;
    time: string;
    service: string;
    session_id: string;
    day_week: string;
    user_id: string;
    month: string;
    year: string;
    userNumber: string;
    price: string;
  };
};

const Success: NextPage<SuccessProps> = async ({ searchParams }) => {
  const { day, day_week, month, service, session_id, time, year, price } =
    searchParams;

  if (
    !day ||
    !day_week ||
    !month ||
    !service ||
    !session_id ||
    !time ||
    !year ||
    !price
  ) {
    redirect(`${process.env.APP_URL}/?error=Fields not provided`);
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const userExists = await prisma.clientes.findFirst({
      where: {
        telefone: session.customer_details?.phone as string,
      },
    });

    // If user does not exists create one
    if (!userExists) {
      await prisma.clientes.create({
        data: {
          telefone: session.customer_details?.phone as string,
          email: session.customer_details?.email as string,
          nome: session.customer_details?.name as string,
          v: 0,
        },
      });
    }

    // If user exists but he does not have an email add email to it
    if (userExists && !userExists.email) {
      const updatedUser = await prisma.clientes.update({
        where: {
          id: userExists.id,
        },
        data: {
          email: session.customer_details?.email as string,
        },
      });

      const bookingCreated = await prisma.booking.create({
        data: {
          selectedDate: Number(day),
          selectedDayOfWeek: day_week,
          selectedMonth: month,
          selectedTime: time,
          selectedYear: Number(year),
          selectedProductDefaultPrice: Number(price),
          cliente: {
            connect: {
              telefone: session.customer_details?.phone as string,
            },
          },
        },
      });

      if (bookingCreated) {
        console.log("Send email to " + updatedUser.email);
      }
    }

    if (userExists && userExists.email) {
      const bookingCreated = await prisma.booking.create({
        data: {
          selectedDate: Number(day),
          selectedDayOfWeek: day_week,
          selectedMonth: month,
          selectedTime: time,
          selectedYear: Number(year),
          selectedProductDefaultPrice: Number(price),
          cliente: {
            connect: {
              telefone: session.customer_details?.phone as string,
            },
          },
        },
      });

      if (bookingCreated) {
        console.log("Send email to " + userExists.email);
      }
    }
  } catch (error: any) {
    redirect(`${process.env.APP_URL}/?error=${error.message}`);
  }

  return (
    <main className="flex min-h-screen justify-center p-10">
      <div className="w-full max-w-lg flex items-center flex-col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 256 256"
          className="fill-green-600"
        >
          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
        </svg>
        <span className="text-green-600 font-semibold mt-2">
          Booking Confirmed!
        </span>
        <span className="mt-1 font-bold">
          {service} {day_week} {day} {month} {searchParams.time}
        </span>
        <a href="/" className="mt-3 w-full">
          <Button isLoading={false} type="button">
            Go Back
          </Button>
        </a>
      </div>
    </main>
  );
};

export default Success;
