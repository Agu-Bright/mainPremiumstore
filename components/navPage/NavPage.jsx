"use client";
import Navbar from "@components/Navbar";
import React, { useContext, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RestoreIcon from "@mui/icons-material/Restore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, IconButton, Stack } from "@mui/material";
import { RestaurantContext } from "@context/RestaurantContext";
import { useRouter } from "next/navigation";
import Call from "@components/CallModal";
import LiveChatScript from "@components/LiveChat";
import Sidebar from "@components/Sidebar";
import BasicModal from "@app/user/Modal";
import { ToastContainer } from "react-toastify";

const NavPage = ({ children, buttonNav, topNav, title, type }) => {
  const { active, setActive, handleOpen, open, setOpen, handleClose } =
    useContext(RestaurantContext);
  const router = useRouter();
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    if (typeof window !== "undefined" && window.LiveChatWidget) {
      if (chatVisible) {
        window.LiveChatWidget.call("hide");
      } else {
        window.LiveChatWidget.call("maximize");
      }
      setChatVisible(!chatVisible);
    }
  };

  if (type === "dashboard") {
    <Navbar type="dashboard" data={session} />;
  } else
    return (
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        <Navbar fixed={false} topNav={topNav} title={title} type="dashboard" />
        <div className="dashboard">
          <div className="container-fluid ">
            <div className="row">
              <Sidebar />
              <Box
                className="dashboard-content dashboard_row"
                sx={{
                  width: { md: "75%" },
                }}
              >
                <div>
                  {children}
                  <BasicModal
                    handleOpen={handleOpen}
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                  />
                </div>
              </Box>
            </div>
          </div>
        </div>
        <ToastContainer />

        {/* <LiveChatScript /> */}
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            margin: "30px",
            zIndex: "999",
            position: "fixed",
            bottom: 0,
            right: 0,
            color: "white",
          }}
        >
          <a href="https://t.me/premiumstorexcom" target="_blank">
            <img
              style={{ width: "100%", height: "100%" }}
              src="/img/telegram.png"
            />
          </a>
        </div>
      </div>
    );
};

export default NavPage;
