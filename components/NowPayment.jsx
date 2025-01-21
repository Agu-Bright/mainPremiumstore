import React from "react";
import NowPaymentsApi from "@nowpaymentsio/nowpayments-api-js";
import axios from "@node_modules/axios";
const npApi = new NowPaymentsApi({ apiKey: "7R4A2AK-4T6M5HY-JP7DTPG-0XV1Y1A" });
const NowPayment = () => {
  const [currenciesArr, setCurrenciesArr] = React.useState([]);

  React.useEffect(() => {
    async function fetchCurrencies() {
      const { currencies } = await npApi.getCurrencies();
      setCurrenciesArr(currencies);
      console.log(currencies);
    }
    fetchCurrencies();
  }, []);

  const createPayment = () => {
    var data = JSON.stringify({
      price_amount: 3999.5,
      price_currency: "usd",
      pay_currency: "btc",
      ipn_callback_url: "https://nowpayments.io",
      order_id: "RGDBP-21314",
      order_description: "Apple Macbook Pro 2019 x 1",
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.nowpayments.io/v1/payment",
      headers: {
        "x-api-key": "7R4A2AK-4T6M5HY-JP7DTPG-0XV1Y1A",
        "Content-Type": "application/json",
      },
      data: data, // JSON.stringify(data),
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreatePayment = async () => {
    try {
      const payment = await npApi.createPayment({
        price_amount: 100,
        price_currency: "usd",
        pay_currency: "btc",
        order_id: "123",
        ipn_callback_url: "https://premiumstoree.com",
        order_description: "Order description",
      });
      console.log("Payment created:", payment);
    } catch (error) {
      if (error?.response) {
        console.error("API Error:", error.response.data);
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  };
  return (
    <div>
      <h2>Available currencies</h2>
      {/* <br />
      {currenciesArr.map((currency) => (
        <p>{currency}</p>
      ))} */}
      <button onClick={createPayment}>Create payment</button>
    </div>
  );
};
export default NowPayment;
