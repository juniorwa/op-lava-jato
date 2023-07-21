import { BookingType, bookingDataInitialState } from "@/app/page";
import Button from "../Button/Button";

type StepButtonProps = {
  step: number;
  checkoutIsLoading: boolean;
  selectedProductId: string;
  formattedDate: string;
  selectedTime: string;
  setBookingData: (data: BookingType) => void;
  handleBuyProduct: () => void;
};

const StepButton: React.FC<StepButtonProps> = ({
  step,
  checkoutIsLoading,
  selectedProductId,
  formattedDate,
  selectedTime,
  setBookingData,
  handleBuyProduct,
}) => {
  const handleContinue = () => {
    // @ts-ignore
    setBookingData((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  const finishBooking = () => {
    setBookingData(bookingDataInitialState);
    handleBuyProduct();
  };
  return (
    <>
      {step > 0 && (
        <Button
          type="button"
          variant="danger"
          className="mb-3"
          isLoading={false}
          onClick={() => setBookingData(bookingDataInitialState)}
        >
          Cancel
        </Button>
      )}

      {step === 0 && (
        <Button
          type="button"
          isLoading={false}
          disabled={!selectedProductId}
          onClick={handleContinue}
        >
          Continue
        </Button>
      )}

      {step === 1 && (
        <Button
          type="button"
          isLoading={false}
          disabled={!formattedDate}
          onClick={handleContinue}
        >
          Continue
        </Button>
      )}

      {step === 2 && (
        <Button
          type="button"
          isLoading={checkoutIsLoading}
          disabled={!selectedTime || checkoutIsLoading}
          onClick={finishBooking}
        >
          Book
        </Button>
      )}
    </>
  );
};

export default StepButton;
