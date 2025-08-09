"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

export default function PaymentButton({ session, amount }) {
  const { setLoading, handleClose, setOpen, setState, setActiveLoading } =
    useContext(RestaurantContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isProcessing, setIsProcessing] = useState(false);

  // Check for payment verification on component mount
  useEffect(() => {
    const transactionRef = searchParams.get("transactionRef");
    const status = searchParams.get("status");

    if (transactionRef && status === "success") {
      // setActiveLoading(true);
      verifyPayment(transactionRef);
    } else if (transactionRef && status === "failed") {
      toast.error("Payment was cancelled or failed.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
    }
  }, [searchParams]);

  const verifyPayment = async (transactionRef) => {
    if (!transactionRef) {
      toast.error("No transaction reference provided.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
      return;
    }

    try {
      // setActiveLoading(true);

      // Backend handles verification and deposit creation
      const response = await axios.post("/api/payment/verify-ercaspay", {
        transactionRef: transactionRef,
        _session: session,
      });

      const result = response.data;

      if (result?.success) {
        toast.success("Payment verified and deposit successful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          transition: Bounce,
        });

        setState((prev) => !prev);
        setOpen(false);

        // Remove query parameters from URL
        router.replace("/user/add-fund");
      } else {
        throw new Error(result?.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);

      let errorMessage = "Payment verification failed. Please contact support.";

      if (error.response?.status === 409) {
        errorMessage = "This transaction has already been processed.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
    } finally {
      setActiveLoading(false);
    }
  };

  const initializePayment = async () => {
    // Validation
    if (!session?.user?.email) {
      toast.error("Please log in to make a payment.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
      return;
    }

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
      return;
    }

    // Check if user has phone number (optional but recommended)
    // No validation needed since phone is optional

    if (isProcessing) {
      return; // Prevent double submission
    }

    setIsProcessing(true);
    setLoading(true);

    const reference = `REF-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const sanitizeCustomerName = (name) => {
      if (!name) return "Active User";

      // Remove special characters and numbers, keep only letters and spaces
      return name
        .replace(/[^a-zA-Z\s]/g, "") // Remove everything except letters and spaces
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim(); // Remove leading/trailing spaces
    };
    try {
      // Move payment initialization to your backend API for security
      const response = await axios.post("/api/payment/initialize-ercaspay", {
        amount: parseFloat(amount),
        paymentReference: reference,
        customerName:
          sanitizeCustomerName(session?.user?.name) || "Active User",
        customerEmail: session?.user?.email,
        customerPhoneNumber: session?.user?.phone || undefined, // Optional field
        userId: session?.user?.id,
        description: "Account Top-up",
      });

      const result = response.data;

      if (result?.success && result?.data?.responseCode === "success") {
        // Store reference for tracking
        localStorage.setItem("pendingPaymentRef", reference);

        // Redirect to Ercaspay checkout
        window.location.href = result.data.responseBody.checkoutUrl;
      } else {
        throw new Error(result?.message || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to initialize payment. Please try again.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          transition: Bounce,
        }
      );
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={initializePayment}
      disabled={isProcessing || !session?.user?.email || !amount}
      className="btn-md btn-block flutter_style"
      style={{
        background: isProcessing ? "#ccc" : "blue",
        color: "white",
        cursor: isProcessing ? "not-allowed" : "pointer",
        opacity: isProcessing ? 0.7 : 1,
      }}
    >
      {isProcessing ? "Processing..." : "Pay With Transfer or Card"}
    </button>
  );
}
