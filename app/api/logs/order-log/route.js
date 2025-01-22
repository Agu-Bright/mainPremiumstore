import User from "@models/user";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Wallet from "@models/wallet";
import Order from "@models/order";
import axios from "@node_modules/axios";
import FormData from "form-data";

const buyProduct = async (productId, quantity) => {
  try {
    // Create form-data
    const formData = new FormData();
    formData.append("action", "buyProduct");
    formData.append("id", productId);
    formData.append("amount", quantity);
    // formData.append("coupon", coupon);
    formData.append("api_key", "46a255ee592b54e3d05021daf07dd07c");

    // Send POST request with Axios
    const response = await axios.post(
      "https://shopviaclone22.com/api/buy_product",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    // Handle the response
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

// Example usage
// buyProduct("12345", 2, "DISCOUNT10")
//   .then((data) => console.log("Purchase successful:", data))
//   .catch((error) => console.error("Purchase failed:", error));

export const POST = async (req, res) => {
  const session = await getServerSession(
    req,
    {
      ...NextResponse,
      getHeader: (name) => NextResponse.headers?.get(name),
      setHeader: (name, value) => NextResponse.headers?.set(name, value),
    },
    authOptions
  );
  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }

  try {
    await connectDB;
    const { id, amount, totalPrice, profit, name, icon, type } =
      await req.json();

    const userWallet = await Wallet.findOne({ user: session?.user?.id });
    if (!userWallet) {
      return Response.json({ message: `Invalid user waller` }, { status: 401 });
    }

    if (userWallet.balance < totalPrice) {
      return Response.json(
        { message: `Insucfficient account balance to purchase this log` },
        { status: 401 }
      );
    }

    if (type === "accsmtp") {
      //get balance
      const { data } = await axios.get(
        `https://accsmtp.com/api/GetBalance.php?username=${process.env._username}&password=${process.env._password}`
      );
      console.log(data);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
      });
    } else {
      //get balance
      const { data } = await axios.get(
        `https://shopviaclone22.com/api/profile.php?api_key=${process.env.SHOP_VIA_CLONE_API}`
      );

      if (Number(data?.money) < totalPrice) {
        return Response.json(
          { message: `Error purchasing log` },
          { status: 401 }
        );
      }

      const res = await buyProduct(id, amount);
      if (res?.status === "success") {
        const order = await Order.create({
          user: session?.user?.id,
          logs: res?.data,
          categoryId: id,
          transactionId: res?.trans_id,
          profit: profit,
          source: "shopviaclone",
          name: name,
          icon: icon,
        });

        //remove balance from users account
        userWallet.balance = Number(userWallet.balance) - totalPrice;
        await userWallet.save();

        return new Response(JSON.stringify({ success: true, order }), {
          status: 200,
        });
      } else {
        throw new Error();
      }
    }
  } catch (error) {
    console.log("error", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
