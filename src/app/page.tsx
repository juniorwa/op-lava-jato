"use client";
import Button from "@/components/Button/Button";
import Selector from "@/components/Selector/Selector";
import Spinner from "@/components/Spinner/Spinner";
import { fetcher } from "@/utils/fetcher/fetcher";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const availableTimeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

type ProductType = {
  id: string;
  name: string;
  price: string;
  default_price: string;
};

export type BookingType = {
  selectedDay: string;
  selectedTime: string;
  selectedProductId: string;
  selectedProductNane: string;
  selectedProdutPrice: string;
  selectedProductDefaultPrice: string;
  step: number;
};

const BookingPage: NextPage = () => {
  const { data, error, isLoading } = useSWR<ProductType[]>(
    "/api/getStripePrices",
    fetcher
  );

  const [bookingData, setBookingData] = useState({
    selectedDay: "",
    selectedTime: "",
    selectedProductId: "",
    selectedProductNane: "",
    selectedProdutPrice: "",
    step: 0,
  } as BookingType);

  const [dateList, setDateList] = useState<string[]>([]);
  const [checkoutIsLoading, setIsCheckoutLoading] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    const newDateList: string[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      newDateList.push(currentDate.toLocaleDateString(undefined, dateOptions));
    }

    setDateList(newDateList);
  }, []);

  const handleBuyProduct = async (): Promise<void> => {
    try {
      setIsCheckoutLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: bookingData,
        }),
      });

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error: any) {
      setIsCheckoutLoading(false);
      alert("Error making checkout");
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
            {!bookingData.step &&
              data
                ?.filter((item, index) => index < 4)
                .map((product) => (
                  <Selector
                    key={product.id}
                    item={product.id}
                    selectedItem={bookingData.selectedProductId}
                    onClick={() =>
                      setBookingData((prev) => ({
                        ...prev,
                        selectedProductId: product.id,
                        selectedProductNane: product.name,
                        selectedProdutPrice: product.price,
                        selectedProductDefaultPrice: product.default_price,
                      }))
                    }
                  >
                    <strong>{product.name}</strong>
                    <p>{product.price}</p>
                  </Selector>
                ))}
            {bookingData.step === 1 &&
              dateList.map((date) => (
                <Selector
                  key={date}
                  item={date}
                  selectedItem={bookingData.selectedDay}
                  onClick={() =>
                    setBookingData((prev) => ({
                      ...prev,
                      selectedDay: date,
                    }))
                  }
                />
              ))}
            {bookingData.step === 2 &&
              availableTimeSlots.map((timeSlot) => (
                <Selector
                  key={timeSlot}
                  item={timeSlot}
                  selectedItem={bookingData.selectedTime}
                  onClick={() =>
                    setBookingData((prev) => ({
                      ...prev,
                      selectedTime: timeSlot,
                    }))
                  }
                />
              ))}
          </div>
        </div>

        {bookingData.step > 0 && (
          <Button
            type="button"
            variant="danger"
            className="mb-3"
            isLoading={false}
            onClick={() =>
              setBookingData(() => ({
                selectedDay: "",
                selectedTime: "",
                selectedProductId: "",
                selectedProductNane: "",
                selectedProdutPrice: "",
                selectedProductDefaultPrice: "",
                step: 0,
              }))
            }
          >
            Cancel
          </Button>
        )}

        {!bookingData.step && (
          <Button
            type="button"
            isLoading={false}
            disabled={!bookingData.selectedProductId}
            onClick={() =>
              setBookingData((prev) => ({
                ...prev,
                step: prev.step + 1,
              }))
            }
          >
            Continue
          </Button>
        )}
        {bookingData.step === 1 && (
          <Button
            type="button"
            isLoading={false}
            disabled={!bookingData.selectedDay}
            onClick={() =>
              setBookingData((prev) => ({
                ...prev,
                step: prev.step + 1,
              }))
            }
          >
            Continue
          </Button>
        )}
        {bookingData.step === 2 && (
          <Button
            type="button"
            isLoading={checkoutIsLoading}
            disabled={!bookingData.selectedTime || checkoutIsLoading}
            onClick={handleBuyProduct}
          >
            Book
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
