"use client";
import SelectionSteps from "@/components/SelectionSteps/SelectionSteps";
import Spinner from "@/components/Spinner/Spinner";
import StepButton from "@/components/StepButton/StepButton";
import useGetTime from "@/hooks/useGetTime/useGetTime";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { fetcher } from "@/utils/fetcher/fetcher";
import { NextPage } from "next";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import useSWR from "swr";

export const bookingDataInitialState = {
  formattedDate: "",
  selectedProductId: "",
  selectedProductNane: "",
  selectedProdutPrice: "",
  step: 0,
  selectedDayOfWeek: "",
  selectedDate: 0,
  selectedMonth: "",
  selectedYear: 0,
  selectedTime: "",
  selectedProductDefaultPrice: "",
};

export type ProductType = {
  id: string;
  name: string;
  price: string;
  default_price: string;
};

export type BookingType = typeof bookingDataInitialState;

const BookingPage: NextPage = () => {
  const { data, error, isLoading } = useSWR<ProductType[]>(
    "/api/getStripePrices",
    fetcher
  );
  const [bookingData, setBookingData] = useLocalStorage(
    "booking_step",
    bookingDataInitialState as BookingType
  );
  const [checkoutIsLoading, setIsCheckoutLoading] = useState<boolean>(false);
  const dates = useGetTime();

  const [token] = useLocalStorage<string>("", "token");

  const handleBuyProduct = async (): Promise<void> => {
    try {
      setIsCheckoutLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      toast.error(`An error occured`);
      console.log(error);
    }
  };
  if (error)
    return (
      <div className="flex flex-col items-center mt-10">
        <h1>Error loading page...</h1>
      </div>
    );
  if (isLoading)
    return (
      <div className="flex flex-col items-center mt-10">
        <Spinner height={10} width={10} />
      </div>
    );
  return (
    <div className="flex flex-col items-center min-h-screen p-10">
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
      />
    </div>
  );
};

export default BookingPage;
