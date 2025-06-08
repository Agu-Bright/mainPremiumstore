import React, { useEffect, useState } from "react";

const SafeHavenCheckoutComponent = ({
  amount,
  session,
  environment = "production",
  onSuccess,
  onClose,
  webhookUrl,
  customIconUrl,
  metadata,
  feeBearer,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [transactionRef, setTransactionRef] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);

  // Generate a random reference code for the transaction
  useEffect(() => {
    setTransactionRef("" + Math.floor(Math.random() * 1000000000 + 1));
  }, []);

  // Load the SafeHaven checkout script using a more reliable method
  useEffect(() => {
    // First check if the script is already loaded
    if (window.SafeHavenCheckout) {
      setIsLoaded(true);
      return;
    }

    // Create and append a script tag outside of React's error boundaries
    const loadSafeHavenScript = () => {
      // This function will be called immediately to load the script
      return new Promise((resolve, reject) => {
        // Create a new script element
        const script = document.createElement("script");
        script.src = "https://checkout.safehavenmfb.com/assets/checkout.min.js";
        script.async = true;

        // Don't use crossOrigin attribute as it can cause issues
        // Instead, use event handlers to detect success or failure

        script.onload = () => {
          console.log("SafeHaven script loaded successfully");
          resolve(true);
        };

        script.onerror = () => {
          console.error("Failed to load SafeHaven script");
          reject(new Error("Failed to load payment script"));
        };

        // Add the script to the document head
        document.head.appendChild(script);
      });
    };

    // Use setTimeout to escape React's error boundary for script loading
    setTimeout(() => {
      loadSafeHavenScript()
        .then(() => setIsLoaded(true))
        .catch(() => console.error("Could not load SafeHaven script"));
    }, 100);

    // No need to remove the script on cleanup as it should persist for the page session
  }, []);

  const verifyTransaction = async (referenceCode) => {
    try {
      const baseUrl =
        environment === "production"
          ? "https://api.safehavenmfb.com"
          : "https://api.sandbox.safehavenmfb.com";

      const response = await fetch(
        `${baseUrl}/checkout/${referenceCode}/verify`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setVerificationStatus(data);

      if (data.status === "successful") {
        onSuccess && onSuccess(data);
      }

      return data;
    } catch (error) {
      console.error("Transaction verification failed:", error);
      return { status: "failed", error };
    }
  };

  const handlePayment = () => {
    if (!isLoaded || !window.SafeHavenCheckout) {
      console.error("SafeHaven Checkout not loaded yet");
      return;
    }

    try {
      const checkoutConfig = {
        environment,
        clientId: "aacfdb86364ee20d6431aa4c2d726eb2",
        referenceCode: transactionRef,
        customer: {
          firstName: session?.user?.firstName || "John",
          lastName: session?.user?.lastName || "Doe",
          emailAddress: session?.user?.email || "johndoe@example.com",
          phoneNumber: session?.user?.phone || "+2348032273616",
        },
        currency: "NGN",
        amount,
        settlementAccount: {
          bankCode: "090286", // SafeHaven bank code
          accountNumber: "0110706119",
        },
        onClose: () => {
          console.log("Checkout Closed");
          onClose && onClose();
        },
        callback: (response) => {
          console.log("Payment response:", response);
          if (response && response.referenceCode) {
            verifyTransaction(response.referenceCode);
          }
        },
      };

      // Add optional parameters if provided
      if (webhookUrl) checkoutConfig.webhookUrl = webhookUrl;
      if (customIconUrl) checkoutConfig.customIconUrl = customIconUrl;
      if (metadata) checkoutConfig.metadata = metadata;
      if (feeBearer) checkoutConfig.feeBearer = feeBearer;

      // Use setTimeout to escape React's error boundary for initialization
      setTimeout(() => {
        window.SafeHavenCheckout(checkoutConfig);
      }, 0);
    } catch (error) {
      console.error("Error initializing checkout:", error);
    }
  };

  return (
    <div className="safehaven-checkout-container">
      <button
        onClick={handlePayment}
        disabled={!isLoaded}
        className="safehaven-checkout-button"
      >
        {isLoaded ? "Pay with SafeHaven" : "Loading payment gateway..."}
      </button>

      {verificationStatus && (
        <div className="verification-status">
          <p>Transaction status: {verificationStatus.status}</p>
          {verificationStatus.status === "successful" && (
            <p>Payment successful! Thank you for your purchase.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SafeHavenCheckoutComponent;
