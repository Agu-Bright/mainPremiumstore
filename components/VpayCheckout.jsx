import React, { useEffect } from "react";

const VpayCheckout = ({
  amount = 119,
  currency = "NGN",
  email = "orderbuyer@givmail.com",
  transactionRef = "ref-" + Date.now(),
}) => {
  useEffect(() => {
    // Dynamically inject the Vpay script
    const script = document.createElement("script");
    script.src = "https://sandbox.vpay.africa/dropin/v1/initialise.js"; // update if production
    script.async = true;

    script.onload = () => {
      if (window.VPayDropin) {
        const { open } = window.VPayDropin.create({
          amount,
          currency,
          domain: "sandbox", // Change to 'live' in production
          key: "fdcdb195-6553-4890-844c-ee576b7ea715", // Replace with your Vpay public key
          email,
          transactionref: transactionRef,
          customer_logo: "https://www.vpay.africa/static/media/vpayLogo.91e11322.svg",
          customer_service_channel: "+2348030007000, support@org.com",
          txn_charge: 6,
          txn_charge_type: "flat",
          onSuccess: function (response) {
            console.log("✅ Payment Successful:", response.message);
          },
          onExit: function (response) {
            console.log("⚠️ Payment Closed:", response.message);
          },
        });

        open();
      }
    };

    document.body.appendChild(script);
  }, [amount, email, transactionRef]);

  return (
    <div>
      <p style={{ color: "white" }}>Initializing Vpay Checkout...</p>
    </div>
  );
};

export default VpayCheckout;
