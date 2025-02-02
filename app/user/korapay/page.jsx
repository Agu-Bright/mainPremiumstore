"use client";
import NavPage from "@components/navPage/NavPage";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import KorapayComponent from "@components/Korapay";
import { RestaurantContext } from "@context/RestaurantContext";

export default function Home() {
  const { data: session, status } = useSession();
  const { amount } = useContext(RestaurantContext);
  const router = useRouter();

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "#CDC5B4" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <div>
        <NavPage>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <h5
              style={{
                textAlign: "start",
                width: "100%",
                fontWeight: "800",
              }}
            >
              Pay with Korapay{" "}
            </h5>
            {amount && <KorapayComponent session={session} amount={amount} />}
          </div>
        </NavPage>
      </div>
    );
}
