"use client";
import React, { useContext, useEffect } from "react";
import { Drawer, IconButton, Divider, Avatar } from "@mui/material";
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

function SideBarDrawer2({ open, close }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const root = pathname.split("/")[1];
  const router = useRouter();
  // const { globalCat } = useContext(RestaurantContext);

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
            <ul style={{ marginTop: "10px", paddingLeft: "10px" }}>
              <li>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66e2317767f6ea038e702a07&&catType=FACEBOOK&&special=true"
                    );
                    close();
                  }}
                  style={{ display: "flex", cursor: "pointer" }}
                >
                  <Image
                    src="/img/facebook.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />
                  <div style={{ color: "black", fontWeight: "700" }}>
                    Facebook
                  </div>
                </div>
              </li>

              <li
                className={`${pathname === "/user/orders" ? "active" : ""}`}
                style={{ marginTop: "15px" }}
              >
                <div
                  style={{ display: "flex", cursor: "pointer" }}
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66e231af3297fe72df46011a&&catType=INSTAGRAM"
                    );
                    close();
                  }}
                >
                  <Image
                    src="/img/instagram.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    Instagram
                  </div>
                </div>
              </li>
              <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66e46532789afde03410d506&&catType=TIKTOK"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/tiktok.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    TikTok
                  </div>
                </div>
              </li>

              <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66e4653a789afde03410d51d&&catType=TWITTER"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/twitter.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    Twitter
                  </div>
                </div>
              </li>
              <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66f9fa093beb74e3984a3cf2&&catType=TELEGRAM"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/telegram.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    Telegram
                  </div>
                </div>
              </li>
              <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66eb01a27df2da0824d46978&&catType=WE CREATE WEBSITES"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/web.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    WE CREATE WEBSITES
                  </div>
                </div>
              </li>
              {/* <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66ef4e77943ed55e069cad30&&catType=Texting"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/texting.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    Texting{" "}
                  </div>
                </div>
              </li> */}
              {/* <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66ef5481871def43f07190c0&&catType=REDDIT"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/reddit.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    Reddit{" "}
                  </div>
                </div>
              </li> */}
              {/* <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66ef57bb6602fd5380d26858&&catType=DISCORD"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/discord.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    DISCORD{" "}
                  </div>
                </div>
              </li> */}
              <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66e6b8742cb499b71600f213&&catType=VPN"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/vpn.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>VPN </div>
                </div>
              </li>
              <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66eb4fd47b1ca98317297f63&&catType=MAILS 📫"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/gmail.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    MAILS 📫{" "}
                  </div>
                </div>
              </li>
              <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66f068a016f64083195fbd03&&catType=MOVIES"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/video.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    MOVIES{" "}
                  </div>
                </div>
              </li>
              {/* <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66ef5f35e366e02ee10b66e1&&catType=LINKEDIN"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/linkedin.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    LINKEDIN{" "}
                  </div>
                </div>
              </li> */}
              {/* <li style={{ marginTop: "15px", cursor: "pointer" }}>
                <div
                  onClick={() => {
                    router.push(
                      "/user/products?cat=66f9f8bfccc60d5173fdcfd4&&catType=TWITCH"
                    );
                    close();
                  }}
                  style={{ display: "flex" }}
                >
                  <Image
                    src="/img/twitch.png"
                    alt="facebook"
                    width={25}
                    height={25}
                    style={{ marginRight: "7px" }}
                  />{" "}
                  <div style={{ color: "black", fontWeight: "700" }}>
                    TWITCH{" "}
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </>
    </Drawer>
  );
}

export default SideBarDrawer2;
