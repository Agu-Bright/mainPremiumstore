"use client";
// import Navbar from "@components/Navbar";
import { CircularProgress } from "@mui/material";
import { images } from "@next.config.cjs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import Body from "./Body";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@components/Navbar"), { ssr: false });
const Body = dynamic(() => import("./Body"), { ssr: false });

export default function Home() {
  const { data: session, status } = useSession();
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
        }}
      >
        <CircularProgress style={{ color: "orange" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/dashboard/login");
  } else if (session?.user?.role === "user") {
    return (
      <div
        style={{
          height: "100vh",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontWeight: "800",
        }}
      >
        {" "}
        <img width={250} height={250} src="/img/unauth.svg" />
        Unauthorized
      </div>
    );
  } else
    return (
      // <NavPage type="dashboard">
      //   <div
      //     className="contact-section overview-bgi"
      //     style={{ height: "95%", overflow: "hidden", color: "white" }}
      //   >
      //     {/* <div>welcome {session?.user?.accountName}</div> */}
      //     <div
      //       className="container"
      //       style={{
      //         zIndex: "999",
      //         width: "100%",
      //         height: "100%",
      //       }}
      //     >
      //       <div
      //         className="details"
      //         style={{
      //           height: "100vh",
      //           overflowY: "scroll",
      //           marginTop: "70px",
      //           marginBottom: "70px",
      //         }}
      //       >
      //         <p style={{ color: "black" }}>Dashboard</p>
      //       </div>
      //     </div>
      //   </div>
      // </NavPage>

      <>
        <Navbar type="dashboard" data={session} />
        <Body data={session} />
      </>
    );
}
