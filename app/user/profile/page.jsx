"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import BasicModal from "./UpdateModal";
import { RestaurantContext } from "@context/RestaurantContext";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { myWallet, formatMoney } = useContext(RestaurantContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

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
      <NavPage>
        <div
          style={{ paddingBottom: "300px" }}
          className="container min-vh-100"
        >
          <div className="flex">
            <div className="d-flex justify-content-center">
              <svg
                width="78"
                height="78"
                viewBox="0 0 78 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.150087"
                  cx="39"
                  cy="39"
                  r="39"
                  fill="#10113D"
                ></circle>
                <path
                  d="M38.994 44.7993C30.3363 44.7993 22.9412 46.1643 22.9412 51.6243C22.9412 57.0863 30.2901 58.4995 38.994 58.4995C47.6517 58.4995 55.0468 57.1365 55.0468 51.6745C55.0468 46.2125 47.6999 44.7993 38.994 44.7993Z"
                  fill="#8075ff"
                ></path>
                <path
                  opacity="0.4"
                  d="M38.9939 39.599C44.8915 39.599 49.6169 34.8717 49.6169 28.9761C49.6169 23.0805 44.8915 18.3532 38.9939 18.3532C33.0983 18.3532 28.371 23.0805 28.371 28.9761C28.371 34.8717 33.0983 39.599 38.9939 39.599Z"
                  fill="#8075ff"
                ></path>
              </svg>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <strong>{session?.user?.username} </strong>
            </div>

            <div className="d-flex justify-content-center mt-1">
              <strong> {session?.user?.email} </strong>
            </div>

            <div className="card my-3">
              <div className="card-body">
                <div className="d-flex justify-content-start col-lg-12  col-sm-12 p-3 my-3 text-black-50">
                  <svg
                    className="mr-3"
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.05"
                      cx="20"
                      cy="20.92"
                      r="20"
                      fill="#0601B4"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.9873 23.7086C16.7643 23.7086 14.0119 24.1959 14.0119 26.1475C14.0119 28.099 16.7468 28.6038 19.9873 28.6038C23.2103 28.6038 25.9619 28.1157 25.9619 26.1649C25.9619 24.2141 23.2278 23.7086 19.9873 23.7086Z"
                      stroke="#161455"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.9873 20.9249C22.1024 20.9249 23.8167 19.2098 23.8167 17.0948C23.8167 14.9797 22.1024 13.2654 19.9873 13.2654C17.8722 13.2654 16.1571 14.9797 16.1571 17.0948C16.15 19.2027 17.8532 20.9178 19.9603 20.9249H19.9873Z"
                      stroke="#161455"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <div className="lh-100">
                    <h6 className="mb-0 text-black lh-100">Account Balance</h6>
                    <small style={{ fontWeight: "800" }}>
                      {" "}
                      {formatMoney(myWallet?.balance) || 0.0}
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center p-3 my-3 text-black-50 bg-purple rounded box-shadow">
                  <svg
                    className="mr-3"
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.05"
                      cx="20"
                      cy="20.92"
                      r="20"
                      fill="#0601B4"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25.7209 15.1899C26.085 15.3174 26.3284 15.6607 26.3284 16.0465V21.6907C26.3284 23.2682 25.755 24.774 24.7425 25.9407C24.2334 26.5282 23.5892 26.9857 22.905 27.3557L19.94 28.9574L16.97 27.3549C16.285 26.9849 15.64 26.5282 15.13 25.9399C14.1167 24.7732 13.5417 23.2665 13.5417 21.6874V16.0465C13.5417 15.6607 13.785 15.3174 14.1492 15.1899L19.6342 13.2624C19.8292 13.194 20.0417 13.194 20.2359 13.2624L25.7209 15.1899Z"
                      stroke="#161455"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M17.7688 20.8515L19.3455 22.429L22.5938 19.1807"
                      stroke="#161455"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>

                  <div className="lh-100">
                    <h6 className="mb-0 text-black lh-100">Change Password</h6>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpen(true)}
                    >
                      <small>Click to change your password</small>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center p-3 my-3 text-black-50 bg-purple rounded box-shadow">
                  <a href="logout">
                    <svg
                      className="mr-3"
                      width="40"
                      height="41"
                      viewBox="0 0 40 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.05"
                        cx="20"
                        cy="20.92"
                        r="20"
                        fill="#555555"
                      ></circle>
                      <path
                        opacity="0.4"
                        d="M22.5133 17.0779V16.3004C22.5133 14.6046 21.1383 13.2296 19.4425 13.2296H15.38C13.685 13.2296 12.31 14.6046 12.31 16.3004V25.5754C12.31 27.2712 13.685 28.6463 15.38 28.6463H19.4508C21.1417 28.6463 22.5133 27.2754 22.5133 25.5846V24.7988"
                        stroke="#10113D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M28.1746 20.9378H18.1404"
                        stroke="#10113D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M25.7343 18.5086L28.1743 20.9377L25.7343 23.3677"
                        stroke="#10113D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </a>

                  <div className="lh-100">
                    <h6 className="mb-0 text-black lh-100">Log Out</h6>
                    <a onClick={() => signOut()} href="#">
                      <small>Click Here to Log Out</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BasicModal
            open={open}
            handleOpen={handleOpen}
            setOpen={setOpen}
            title="Update Password"
          />
        </div>
      </NavPage>
    );
}
