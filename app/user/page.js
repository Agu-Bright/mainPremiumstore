"use client";
import NavPage from "@components/navPage/NavPage";
import { Box, Stack, Typography, Divider, Avatar } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import TableList from "./Table";
import React from "react";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import Spinner from "@components/Spinner";
import Swiper from "@components/Swiper";

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
    <Stack direction="row" alignItems="center">
      <Avatar src={src} alt="img" sx={{ borderRadius: "0px" }} />
      <Typography
        style={{ marginLeft: "10px", fontSize: "12px", color: "white" }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [values, setvalues] = useState([]);
  const [loading, setLoading] = useState(false);
  const { myWallet, formatMoney, setGlobalCat } = useContext(RestaurantContext);

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
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const [categoriesResponse, categories2Response] = await Promise.all([
          axios.get("/api/logs/getCategories"),
          axios.get("/api/logs/get-categories2"),
        ]);
        setCategories(categoriesResponse?.data?.categories);
        setGlobalCat(categoriesResponse?.data?.categories);
        setCategories2(categories2Response?.data?.categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <Box sx={{ height: "100vh" }}>
          <Swiper />

          <div>
            <>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <TableList
                      key={category?.id}
                      category={category?.catType}
                      products={category?.products}
                      catId={category?._id}
                      icon={category?.icon}
                      type="shopviaclone22"
                      title={
                        <Topic title={category?.name} src={category?.icon} />
                      }
                    />
                  );
                })}
            </>
            <Divider />
            <>
              {categories2.length > 0 &&
                categories2.map((category) => {
                  return (
                    <TableList
                      key={category?.id}
                      category={category?.catType}
                      products={category?.accounts}
                      catId={category?._id}
                      icon={category?.proxiedImage}
                      type="accsmtp"
                      title={
                        <Topic
                          title={category?.name}
                          src={category?.proxiedImage}
                        />
                      }
                    />
                  );
                })}
            </>

            {loading && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <div className="spinner"></div>
                <style jsx>{`
                  .spinner {
                    width: 56px;
                    height: 56px;
                    border: 11.2px #7247ff double;
                    border-left-style: solid;
                    border-radius: 50%;
                    animation: spinner-aib1d7 0.75s infinite linear;
                  }

                  @keyframes spinner-aib1d7 {
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </div>
            )}

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
