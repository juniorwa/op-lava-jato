"use client";
import SelectionSteps from "@/components/SelectionSteps/SelectionSteps";
import Spinner from "@/components/Spinner/Spinner";
import StepButton from "@/components/StepButton/StepButton";
import { bookingDataInitialState } from "@/constants";
import useGetTime from "@/hooks/useGetTime/useGetTime";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { fetcher } from "@/utils/fetcher/fetcher";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import useSWR from "swr";

export type ProductType = {
  id: string;
  name: string;
  price: string;
  default_price: string;
  raw_price: string;
};

export type BookingType = typeof bookingDataInitialState;

const BookingPage: NextPage = () => {
  const { data, error, isLoading } = useSWR<ProductType[]>(
    "/api/getprices",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const [bookingData, setBookingData] = useLocalStorage(
    "booking_step",
    bookingDataInitialState as BookingType
  );
  const [checkoutIsLoading, setIsCheckoutLoading] = useState<boolean>(false);
  const dates = useGetTime();
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkoutError = searchParams?.get("error");
  useEffect(() => {
    if (checkoutError) {
      alert(checkoutError);
      router.push("/");
    }
  }, [checkoutError]);

  const handleBuyProduct = async (): Promise<void> => {
    try {
      setIsCheckoutLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            ...bookingData,
          },
        }),
      });

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error: any) {
      setIsCheckoutLoading(false);
      alert(`An error occured`);
      console.log(error);
    }
  };

  if (error)
    return (
      <div className="flex flex-col items-center mt-10">
        <h1>Error loading page...</h1>
      </div>
    );
  if (isLoading || checkoutIsLoading)
    return (
      <div className="flex flex-col items-center mt-10">
        <Spinner />
      </div>
    );
  return (
    <div className="flex flex-col items-center min-h-screen p-10">
      <Toaster position="top-center" />

      <div className="w-full max-w-lg">
        <h2 className="mb-8 text-3xl text-center">Book Now!</h2>
        <div className="mb-4">
          <label className="block mb-2">
            {!bookingData.step && "Select your service:"}
            {bookingData.step === 1 && "Select your day:"}
            {bookingData.step === 2 && "Select your time:"}
          </label>
          <div className="flex flex-col gap-4">
            <SelectionSteps
              step={bookingData.step}
              data={data}
              dates={dates}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          </div>
        </div>
        <StepButton
          step={bookingData.step}
          checkoutIsLoading={checkoutIsLoading}
          selectedProductId={bookingData.selectedProductId}
          formattedDate={bookingData.formattedDate}
          selectedTime={bookingData.selectedTime}
          setBookingData={setBookingData}
          handleBuyProduct={handleBuyProduct}
        />
      </div>
    </div>
  );
};

export default BookingPage;
