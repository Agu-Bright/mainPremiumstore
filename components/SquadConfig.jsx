import React, { useContext } from "react";
import SquadPay from "react-squadpay";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import "./flutterstyle.css";

export default function   SquadPayButton({ session, amount, activeLog, count }) {
  const { setLoading, handleClose, setOpen, setState } =
    useContext(RestaurantContext);
  const router = useRouter();

  const params = {
    key: "pk_83ae5e454fe23e2949bca7910cf6401c53dd6d2e",
    email: session?.user?.email,
    amount: amount, // Amount in Naira, no need to multiply by 100
    currencyCode: "NGN",
  };

  const handlePaymentSuccess = async (response) => {
    console.log("Payment successful", response);
    try {
      setOpen(true);
      setLoading(true);
      await axios.post("/api/deposit/create-deposit/", {
        amount: amount,
        method: "squadpay",
        transactionId: response.transactionId,
      });
      toast.success("Deposit Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setState((prev) => !prev);
      setOpen(false);
      setLoading(false);
    } catch (error) {
      setOpen(false);
      setLoading(false);
      toast.error(error?.response?.data?.message || "An error occurred", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.error(error);
    }
  };

  const handlePaymentClose = () => {
    console.log("Widget closed");
  };

  const handleWidgetLoad = () => {
    console.log("Widget loaded");
  };

  return (
    <div>
      <SquadPay
        className="btn-md btn-block flutter_style"
        text="Pay with Card"
        params={params}
        onClose={handlePaymentClose}
        onLoad={handleWidgetLoad}
        onSuccess={(response) => handlePaymentSuccess(response)}
      />
    </div>
  );
}
