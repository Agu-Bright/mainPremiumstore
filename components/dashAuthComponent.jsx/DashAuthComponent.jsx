"use client";

import React, { useContext } from "react";
import "./dashStyle.css";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RestaurantContext } from "@context/RestaurantContext";
const DashAuthComponent = () => {
  const { data: session } = useSession();
  const { setRestaurantIntent } = useContext(RestaurantContext);
  const router = useRouter();

  const handleNextStep = () => {
    if (session) {
      console.log("handling  user");
      router.push("/pricing");
    } else if (!session) {
      console.log("handling non user");
      setRestaurantIntent(true);
      router.push("/login");
    }
  };

  return (
    <div
      className="listing-item content-area-14 bg-grea-3"
      style={{ marginBottom: "30px" }}
    >
      <div className="container">
        {/* <!-- Main title --> */}

        <div className="main-title flex-up">
          <h1>Are you a Restaurant Owner</h1>
        </div>

        <div
          className="chef_flex_container"
          //   style={{ border: "1px solid black" }}
        >
          <div>
            <div>
              <img src="/img/chef.jpg" alt="chef-cooking" className="img_reg" />
            </div>
          </div>

          <div className="reg_view">
            <div>
              <h1 className="topic_reg">Register Your Restaurant</h1>
              <p
                style={{ fontSize: "14px", textWrap: "wrap", width: "inherit" }}
              >
                Tell us more about you and we will contact you as soon as
                possible
              </p>
              <button
                style={{
                  border: "none",
                  background: "#007bff",
                  padding: "10px 5px",
                  cursor: "pointer",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={() => handleNextStep()}
              >
                Get Started
              </button>
            </div>
            {session && session?.user.role === "sub-admin" && (
              <div style={{ paddingTop: "10px" }}>
                <h1 className="topic_reg">Already a Client</h1>
                <p style={{ fontSize: "14px" }}>
                  Login to your dashboard and contact us by chat{" "}
                </p>
                <button
                  style={{
                    border: "none",
                    background: "#007bff",
                    padding: "10px 5px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  <Link href="/dashboard" style={{ color: "white" }}>
                    Go to dashboard
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashAuthComponent;
