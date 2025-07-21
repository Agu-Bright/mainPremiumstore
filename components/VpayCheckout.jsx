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
    script.src = "https://dropin.vpay.africa/dropin/v1/initialise.js"; // update if production
    script.async = true;

    script.onload = () => {
      if (window.VPayDropin) {
        const { open } = window.VPayDropin.create({
          amount,
          currency,
          domain: "live", //Change to 'live' in production
          key: "3e71a8cab1fa4780b3b372965c450f13", //Replace with your Vpay public key
          email,
          transactionref: transactionRef,
          customer_logo:
            "https://www.vpay.africa/static/media/vpayLogo.91e11322.svg",
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
