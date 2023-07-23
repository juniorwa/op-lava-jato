import { BookingType, ProductType } from "@/app/page";
import Selector from "@/components/Selector/Selector";
import useGetTime from "@/hooks/useGetTime/useGetTime";
import React from "react";

const availableTimeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

type SelectionStepsProps = {
  step: number;
  data?: ProductType[];
  dates: ReturnType<typeof useGetTime>;
  bookingData: BookingType;
  setBookingData: (newState: BookingType) => void;
};

const SelectionSteps: React.FC<SelectionStepsProps> = ({
  step,
  data,
  dates,
  bookingData,
  setBookingData,
}) => {
  switch (step) {
    case 0:
      return data
        ?.filter((item, index) => index < 4)
        .map((product) => (
          <Selector
            key={product.id}
            item={product.id}
            selectedItem={bookingData.selectedProductId}
            onClick={() =>
              setBookingData({
                ...bookingData,
                selectedProductId: product.id,
                selectedProductNane: product.name,
                selectedProdutPrice: product.price,
                selectedProductDefaultPrice: product.default_price,
                rawPrice: product.raw_price,
              })
            }
          >
            <strong>{product.name}</strong>
            <p>{product.price}</p>
          </Selector>
        ));
    case 1:
      return dates.map((date) => (
        <Selector
          key={date.formattedDate}
          item={date.formattedDate}
          selectedItem={bookingData.formattedDate}
          onClick={() =>
            setBookingData({
              ...bookingData,
              ...date,
            })
          }
        />
      ));
    case 2:
      return availableTimeSlots.map((timeSlot) => (
        <Selector
          key={timeSlot}
          item={timeSlot}
          selectedItem={bookingData.selectedTime}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedTime: timeSlot,
            })
          }
        />
      ));
    default:
      return null;
  }
};

export default SelectionSteps;
