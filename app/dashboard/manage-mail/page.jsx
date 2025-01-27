"use client";
import { CircularProgress } from "@mui/material";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  } else if (session?.user?.role !== "admin") {
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
      <>
        <Navbar type="dashboard" data={session} />
        <Body data={session} />
      </>
    );
}
