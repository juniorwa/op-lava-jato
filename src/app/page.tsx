"use client";
import Button from "@/components/Button/Button";
import Selector from "@/components/Selector/Selector";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

type BookingType = {};

const BookingPage: NextPage = () => {
  // Mock data for available time slots
  const availableTimeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  const [bookingData, setBookingData] = useState({
    selectedDay: "",
    selectedTime: "",
  });
  const [dateList, setDateList] = useState<string[]>([]);

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

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getStripePrices");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-10">
      <div className="w-full max-w-lg">
        <h2 className="mb-8 text-3xl text-center">Book a Time Slot</h2>
        <div className="mb-4">
          <label className="block mb-2">Select Time Slot</label>
          <div className="flex flex-col gap-4">
            {/* {dateList.map((date) => (
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
            {availableTimeSlots.map((timeSlot) => (
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
            ))} */}
          </div>
        </div>

        <Button type="button" isLoading={false}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BookingPage;
