"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import TableList from "./Table";

import React from "react";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";

function timeAgo(dateString) {
  const givenDate = new Date(dateString);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diff = now - givenDate;

  // Convert to various time units
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  // Determine the appropriate unit
  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;
  if (weeks < 52) return `${weeks} weeks ago`;
  return `${years} years ago`;
}

const Topic = ({ title, src }) => {
  return (
    <div>
      <Image src={src} alt="img" width={30} height={30} />
      <span style={{ marginLeft: "10px" }}>{title}</span>
    </div>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [values, setvalues] = useState([]);

  const { myWallet, formatMoney, setSideBar2, setGlobalCat } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const { data } = await axios.get("/api/get-orders-deposits");
        setvalues(data?.values);
      } catch (error) {
        console.log(error);
      }
    };
    fetchValues();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/logs/getCategories");
        setCategories(data?.categories);
        setGlobalCat(data?.categories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (status === "loading") {
    return (
      <div
        className="contact-section overview-bgi"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <Box sx={{ height: "100vh" }}>
          <Stack direction="row" justifyContent="space-between">
            <h2 style={{ fontSize: "1em" }}>
              <span style={{ color: "#8075ff", fontWeight: "800" }}>
                Welcome!!{" "}
              </span>
              <span style={{}}>{session?.user?.username}</span> 😇
            </h2>
            <h2 style={{ fontSize: "1em" }}>
              <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                Balance:
              </span>
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "800",
                }}
              >
                {formatMoney(myWallet?.balance)}
              </span>
            </h2>
          </Stack>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "800",
              fontSize: { md: "3em", xs: "1.6em" },
              background:
                "linear-gradient(92.12deg, #007C9B 1.46%, #00CCFF 41.25%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Buy social accounts and Followers
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: { md: "1em", xs: "0.8em" } }}
          >
            Leading marketplace to buy established Facebook accounts, Youtube
            Followers, Theme pages etc.
          </Typography>

          <Box
            sx={{
              border: "1px solid #e6dede",
              borderRadius: { md: "40px", xs: "20px" },
              width: "100%",
              marginBottom: "20px",
              // boxShadow: "1px 1px 2px gray",
              padding: "5px",
              overflow: "hidden",
            }}
          >
            <Swiper
              style={{ width: "100%", height: "100%" }}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                {" "}
                <a href="https://t.me/activest0re" target="_blank">
                  <img
                    src="/img/flier-1.png"
                    alt="flier"
                    style={{ width: "100%" }}
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" target="_blank">
                  <img
                    src="/img/note.png"
                    alt="flier"
                    style={{ width: "100%" }}
                  />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="https://t.me/activest0re" target="_blank">
                  <img
                    src="/img/flier-3.png"
                    alt="flier"
                    style={{ width: "100%" }}
                  />
                </a>
              </SwiperSlide>
            </Swiper>
          </Box>

          <div>
            <>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <TableList
                      key={category?._id}
                      category={category?.catType}
                      catId={category?._id}
                      title={
                        <Topic title={category?.catType} src="/img/star.png" />
                      }
                    />
                  );
                })}
            </>
            <>
              {categories.length == 0 && (
                <div
                  style={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image src="/img/photo.png" width={200} height={200} />
                    <Typography sx={{ textAlign: "center", fontWeight: "800" }}>
                      No Log Uploaded yet
                    </Typography>
                    {session?.user?.role === "admin" && (
                      <>
                        <a
                          href="/dashboard/upload-logs"
                          target="_blank"
                          style={{
                            border: "none",
                            color: "white",
                            fontWeight: "800",
                            borderRadius: "10px",
                            fontSize: "1.2em",
                            marginTop: "20px",
                            textAlign: "center",
                            background:
                              "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                          }}
                          className="btn-md  btn-block"
                        >
                          Manage Logs{" "}
                        </a>
                        <Typography
                          style={{
                            fontWeight: "300",
                            fontSize: "0.8em",
                            marginTop: "10px",
                          }}
                        >
                          <span style={{ fontWeight: "800" }}>N/B:</span> {""}{" "}
                          This button is only visible to the admin
                        </Typography>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
            <div className="mt-5">
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  marginBottom: "10px",
                  background: "#131132",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              >
                <Typography sx={{ fontWeight: "800", color: "white" }}>
                  latest Orders and Deposits
                </Typography>
              </Stack>

              <Box
                sx={{
                  marginTop: "10px",
                  marginBottom: "15px",
                  padding: "15px 10px",
                  border: "0.2px solid #dcd7d7",
                  borderRadius: "5px",
                  wdth: "100%",
                  maxHeight: "80vh",
                  overflowY: "scroll",
                }}
              >
                {values.map((item) => {
                  if (item.method) {
                    return (
                      <>
                        <Stack flexDirection="row">
                          <Image
                            src="/img/icons/deposit.png"
                            alt="deposit"
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          <Typography
                            className="mr-2"
                            style={{ fontSize: "12px" }}
                          >
                            {item?.user?.username.slice(0, 3)}
                          </Typography>{" "}
                          |{" "}
                          <Typography
                            className="mr-2 !text-green"
                            sx={{ color: "green", fontSize: "12px" }}
                          >
                            Deposited
                          </Typography>
                          |{" "}
                          <Typography
                            className="mr-2"
                            sx={{ color: "orange", fontSize: "12px" }}
                          >
                            &#8358;{item?.amount}
                          </Typography>{" "}
                          |{" "}
                          <Typography
                            sx={{
                              background: "#8075FF",
                              borderRadius: "10px",
                              padding: "2px",
                              color: "white",
                              fontSize: "12px",
                            }}
                          >
                            {timeAgo(item?.createdAt)}
                          </Typography>
                        </Stack>
                        <Divider className="my-2" />
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Stack flexDirection="row">
                          <Image
                            src="/img/icons/order.png"
                            alt="order"
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          <Typography
                            className="mr-2"
                            style={{ fontSize: "12px" }}
                          >
                            {item?.user?.username.slice(0, 3)}
                          </Typography>{" "}
                          |{" "}
                          <Typography
                            sx={{ color: "green", fontSize: "12px" }}
                            className="mr-2 "
                          >
                            Bought
                          </Typography>
                          |{" "}
                          <Typography className="mr-2">
                            {item?.social}
                          </Typography>{" "}
                          |{" "}
                          <Typography
                            className="mr-2"
                            sx={{ color: "orange", fontSize: "12px" }}
                          >
                            &#8358;{item?.orderLog?.price}
                          </Typography>{" "}
                          |{" "}
                          <Typography
                            sx={{
                              background: "#8075FF",
                              borderRadius: "10px",
                              padding: "2px",
                              color: "white",
                              fontSize: "12px",
                            }}
                          >
                            {timeAgo(item?.createdAt)}
                          </Typography>
                        </Stack>
                        <Divider className="my-2" />
                      </>
                    );
                  }
                })}
              </Box>
              <div style={{ visibility: "hidden" }}>hii</div>
            </div>
          </div>
          
        </Box>
      </NavPage>
    );
}
