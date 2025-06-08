import React, { useContext, useState, useEffect, useRef } from "react";
import { useKorapay, KorapayButton } from "react-korapay";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "@node_modules/next/navigation";

const KorapayComponent = ({ session, amount }) => {
  const { setLoading } = useContext(RestaurantContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      // Cleanup logic (if needed)
      setIsProcessing(false); // Reset the processing flag
    };
  }, []);

  const config = {
    public_key: "pk_live_tbRMaH9CAsorBApYwiPGHPo7bUrma7naBaJz6Poi",
    amount: parseFloat(amount) || 0,
    customer: {
      email: session?.user?.email,
      name: session?.user?.username,
    },
    narration: "Purchase Product",
  };

  const handleSubmit = async (res) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      setLoading(true);
      //verify payment
      const { data } = await axios.get(
        `/api/payment/verify-korapay/${res?.reference}`
      );
      console.log("payment verififcation", data);
      if (data.success) {
        await axios.post("/api/deposit/create-deposit/", {
          amount: data?.data?.amount,
          method: "korapay",
          transactionRef: data?.data?.reference,
        });
        toast.success("Deposit Successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
        router.push("/user/success");
      } else {
        toast.error("Deposit Failed", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
        router.push("/user");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Deposit Failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  const hasSubmitted = useRef(false);

  const korapayBtnConfig = {
    ...config,
    onClose: () => {
      console.log("Payment closed");
    },
    onSuccess: (res) => {
      if (!hasSubmitted.current && !isProcessing) {
        hasSubmitted.current = true;
        handleSubmit(res);
      }
    },
    text: "Pay with Transfer!",
    className: "btn-md btn-block flutter_style",
  };

  return (
    <div>
      <KorapayButton {...korapayBtnConfig} />
    </div>
  );
};

export default KorapayComponent;
