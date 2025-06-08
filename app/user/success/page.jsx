"use client";
import NavPage from "@components/navPage/NavPage";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { RestaurantContext } from "@context/RestaurantContext";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const { amount } = useContext(RestaurantContext);
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[#EC5766] to-[#F07470]">
        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center">
          <CircularProgress style={{ color: "#EC5766" }} />
          <p className="mt-4 text-gray-600 font-medium">
            Processing your payment...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
    return null;
  }

  return (
    <NavPage>
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle size={80} className="text-green-500" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>

          {amount && (
            <p className="text-xl text-gray-700 mb-4">
              Amount: <span className="font-semibold">{amount}</span>
            </p>
          )}

          <p className="text-gray-600 mb-8">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>

          <div className="flex flex-col space-y-3">
            <button
              style={{ background: "#0b6ac6" }}
              onClick={() => router.push("/user")}
              className="w-full py-3 bg-[#EC5766] hover:bg-[#d94755] text-white font-medium rounded-lg transition-colors"
            >
              Return Home
            </button>

            <button
              onClick={() => router.push("/user/orders")}
              className="w-full py-3 border border-[#EC5766] text-[#EC5766] hover:bg-[#FEF1F2] font-medium rounded-lg transition-colors"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </NavPage>
  );
}
