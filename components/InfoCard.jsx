"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Data } from "@react-google-maps/api";
const InfoCards = ({ summary }) => {
  const { data: session, status } = useSession();
  const [dashboard, setDashboard] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/get-dashboard");
        console.log("dashboard", data);
        setDashboard(data?.dashboard);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Stack
        sx={{
          margin: "0px",
          padding: "0px",
          display: { md: "flex", sm: "flex", xs: "none" },
        }}
      >
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="ui-item bg-success">
              <div className="left">
                {session?.user?.role === "admin" && <p>Today's Orders</p>}

                {session?.user?.role === "admin" && (
                  <h4>{dashboard?.orders || "0"}</h4>
                )}
              </div>
              {/* <div className="right">
                <i className="fa fa-map-marker"></i>
              </div> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="ui-item bg-warning">
              <div className="left">
                {session?.user?.role === "admin" && <p>Todays Deposit</p>}
                {session?.user?.role === "admin" && (
                  <h4>{dashboard?.deposits || "0"}</h4>
                )}
                {session?.user?.role === "sub-admin" && (
                  <h4>{dashboard?.deposits || "0"}</h4>
                )}
                {/* <p>Listing Views</p> */}
              </div>
              {/* <div className="right">
                <i className="fa fa-eye"></i>
              </div> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="ui-item bg-active">
              <div className="left">
                {session?.user?.role === "admin" && <p>Logs</p>}
                {session?.user?.role === "sub-admin" && <p>Logs</p>}
                {session?.user?.role === "admin" && (
                  <h4>{dashboard?.logs || "0"}</h4>
                )}
                {session?.user?.role === "sub-admin" && (
                  <h4>{dashboard?.logs || "0"}</h4>
                )}
              </div>
              {/* <div className="right">
                <i className="fa fa-comments-o"></i>
              </div> */}
            </div>
          </div>

          {session?.user?.role === "admin" && (
            <div className="col-lg-3 col-md-3 col-sm-6">
              <div className="ui-item bg-dark">
                <div className="left">
                  {session?.user?.role === "admin" && <p>Users</p>}
                  {session?.user?.role === "admin" && (
                    <h4>{dashboard?.users || "0"}</h4>
                  )}

                  {/* <p>Bookmarked</p> */}
                </div>
                {/* <div className="right">
                  <i className="fa fa-heart-o"></i>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </Stack>
      <Box
        sx={{
          margin: "0px",
          padding: "0px",
          display: { md: "none", sm: "none", xs: "flex" },
        }}
      >
        <Swiper
          slidesPerView={1.2}
          spaceBetween={5}
          freeMode={true}
          modules={[FreeMode]}
          navigation
        >
          <SwiperSlide>
            <div
              className="col-lg-3 col-md-3 col-sm-6"
              style={{ paddingRight: "0px", paddingLeft: "0px" }}
            >
              <div className="ui-item bg-success">
                <div className="left">
                  {session?.user?.role === "admin" && <p>Today's Orders</p>}
                  {session?.user?.role === "admin" && (
                    <h4>{dashboard?.orders || "NGN 0"}</h4>
                  )}
                </div>
                <div className="right">
                  <i className="fa fa-map-marker"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="col-lg-3 col-md-3 col-sm-6"
              style={{ paddingRight: "0px", paddingLeft: "0px" }}
            >
              <div className="ui-item bg-warning">
                <div className="left">
                  {session?.user?.role === "admin" && <p> Today's Deposits</p>}
                  {session?.user?.role === "admin" && (
                    <h4>{dashboard?.deposits || "0"}</h4>
                  )}
                  {session?.user?.role === "sub-admin" && (
                    <h4>{dashboard?.deposits || "0"}</h4>
                  )}
                  {/* <p>Listing Views</p> */}
                </div>
                <div className="right">
                  <i className="fa fa-eye"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="ui-item bg-active">
                  <div className="left">
                    {session?.user?.role === "admin" && <p>Logs</p>}
                    {session?.user?.role === "admin" && (
                      <h4>{dashboard?.logs || "0"}</h4>
                    )}
                  </div>
                  <div className="right">
                    <i className="fa fa-comments-o"></i>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {session?.user?.role === "admin" && (
            <SwiperSlide>
              <div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="ui-item bg-dark">
                    <div className="left">
                      {session?.user?.role === "admin" && <p>Users</p>}
                      {session?.user?.role === "admin" && (
                        <h4>{dashboard?.users || "0"}</h4>
                      )}

                      {/* <p>Bookmarked</p> */}
                    </div>
                    <div className="right">
                      <i className="fa fa-heart-o"></i>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </Box>
    </>
  );
};

export default InfoCards;
