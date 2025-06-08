  import React, { useContext } from "react";
  import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
  import "./flutterstyle.css";
  import axios from "axios";
  import { useRouter } from "next/navigation";
  import { RestaurantContext } from "@context/RestaurantContext";
  import { toast } from "react-toastify";
  import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
  import "react-toastify/dist/ReactToastify.css";

  export default function FlutterButton({ session, amount, activeLog, count }) {
    const { setLoading, handleClose, setOpen, setState } =
      useContext(RestaurantContext);
    const config = {
      // public_key: "FLWPUBK_TEST-062167x`ffe435b9fd876e5d21767af6cf-X",
      public_key: "FLWPUBK-22602bb843837396f90a9b6eebc8292f-X",
      tx_ref: Date.now(),
      amount: amount,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: session?.user?.email,
        name: session?.user?.username,
      },
      customizations: {
        title: "Happy Mall Store",
        description: `Account Topup`,
        logo: "/img/logo.png",
      },
    };


    // const handleOrder = async (res) => {
    //   console.log(res);
    //   closePaymentModal();
    //   try {
    //     closePaymentModal();
    //     setLoading(true);
    //     await axios.post("/api/logs/order-log", {
    //       number: count,
    //       log: activeLog?._id,
    //       status: res?.status,
    //       transactionId: res?.transaction_id,
    //       txRef: res?.tx_ref,
    //       amount: res?.charged_amount,
    //     });
    //     toast.success("Purchase successful", {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //       transition: Bounce,
    //     });
    //     setLoading(false);
    //     router.push("/user/orders");
    //     handleClose();
    //     // closePaymentModal();
    //   } catch (error) {
    //     setLoading(false);
    //     toast.error(error?.response?.data?.message, {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //       transition: Bounce,
    //     });
    //     console.log(error);
    //   }
    // };

    const handleSubmit = async (res) => {
      console.log("res", res);
      closePaymentModal();
      try {
        setOpen(true);
        setLoading(true);
        const { data } = await axios.post("/api/deposit/create-deposit/", {
          amount: amount,
          method: "flutter",
        });
        toast.success("Deposit Successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setState((prev) => !prev);
        setOpen(false);

        setLoading(false);
      } catch (error) {
        setOpen(false);
        setLoading(false);
        toast.error(error?.response?.data?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    };
    const fwConfig = {
      ...config,
      text: "Pay With Flutter",
      callback: async (response) => {
        await handleSubmit(response);
      },
      onClose: () => {
        console.log("closed");
      },
      className: "btn-md btn-block flutter_style",
    };

    return <FlutterWaveButton {...fwConfig} />;
  }
