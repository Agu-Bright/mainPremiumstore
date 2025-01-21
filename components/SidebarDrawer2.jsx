"use client";
import React, { useContext, useEffect, useState } from "react";
import { Drawer, IconButton, Divider, Avatar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GavelIcon from "@mui/icons-material/Gavel";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import axios from "@node_modules/axios";

function SideBarDrawer2({ open, close }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const root = pathname.split("/")[1];
  const router = useRouter();
  // const { globalCat } = useContext(RestaurantContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/logs/getCategories");
        setCategories(data?.categories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={close}
      sx={{
        "& .MuiDrawer-paper": { width: "60vw" },
        color: "black",
      }}
    >
      <>
        <div
          className="sidebar_nav"
          style={{ width: "60vw", background: "white", color: "black" }}
        >
          <div className="dashboard-inner">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "60vw",
              }}
            >
              <IconButton onClick={() => close()}>
                <CloseIcon sx={{ color: "red" }} />
              </IconButton>
            </div>
            <Typography>Categories</Typography>
            <ul style={{ marginTop: "10px", paddingLeft: "10px" }}>
              {categories.map((category) => {
                return (
                  <li key={category?.id} style={{ marginTop: "10px" }}>
                    <div
                      onClick={() => {
                        // router.push(
                        //   "/user/products?cat=66e2317767f6ea038e702a07&&catType=FACEBOOK&&special=true"
                        // );
                        close();
                      }}
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={category?.icon}
                        alt="facebook"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "8px",
                        }}
                      />
                      <div style={{ color: "black", fontWeight: "700" }}>
                        {category?.name}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    </Drawer>
  );
}

export default SideBarDrawer2;
