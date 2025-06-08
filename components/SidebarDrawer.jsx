"use client";
import React from "react";
import { Drawer, IconButton, Divider, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

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
import AcUnitIcon from "@mui/icons-material/AcUnit";
function SideBarDrawer({ open, close }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const root = pathname.split("/")[1];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={close}
      sx={{ "& .MuiDrawer-paper": { width: "60vw" } }}
    >
      <>
        <div className="sidebar_nav" style={{ width: "60vw" }}>
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
            <div className="dashboard-inner">
              {root === "user" && (
                <ul style={{ marginTop: "10px" }}>
                  <li className={`${pathname === "/user" ? "active" : ""}`}>
                    <Link href="/user" style={{ display: "flex" }}>
                      <HomeIcon sx={{ marginRight: "10px" }} /> <div>Home</div>
                    </Link>
                  </li>

                  <li
                    className={`${pathname === "/user/orders" ? "active" : ""}`}
                  >
                    <Link href="/user/orders" style={{ display: "flex" }}>
                      <HomeRepairServiceIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>My Orders</div>
                    </Link>
                  </li>
                  <li
                    className={`${
                      pathname === "/user/add-fund" ? "active" : ""
                    }`}
                  >
                    <Link href="/user/add-fund" style={{ display: "flex" }}>
                      <AccountBalanceWalletIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>Add Funds</div>
                    </Link>
                  </li>
                  <li
                    className={`${
                      pathname === "/user/add-fund" ? "active" : ""
                    }`}
                  >
                    <Link
                      target="_blank"
                      href="https://drive.google.com/drive/folders/1fuS7l45QWGCzp7CIqHPofiy4L28lsEua"
                      style={{ display: "flex" }}
                    >
                      <AcUnitIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>How to Login</div>
                    </Link>
                  </li>
                  <li
                    className={`${pathname === "/user/rules" ? "active" : ""}`}
                  >
                    <Link href="/user/rules" style={{ display: "flex" }}>
                      <GavelIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>Rules</div>
                    </Link>
                  </li>
                  <li
                    // className={`${pathname === "/user/support" ? "active" : ""}`}
                    style={{
                      borderLeft: `${
                        pathname === "/user/support" ? "solid #8075ff" : ""
                      }`,
                    }}
                  >
                    <Link href="/user/support" style={{ display: "flex" }}>
                      <SupportAgentIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>Customer Care</div>
                    </Link>
                  </li>
                </ul>
              )}
              {root === "dashboard" && (
                <ul style={{ marginTop: "10px" }}>
                  <li
                    className={`${pathname === "/dashboard" ? "active" : ""}`}
                  >
                    <Link href="/dashboard" style={{ display: "flex" }}>
                      <HomeIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>Dashboard</div>
                    </Link>
                  </li>

                  <li
                    className={`${
                      pathname === "/dashboard/upload-logs" ? "active" : ""
                    }`}
                  >
                    <Link
                      href="/dashboard/upload-logs"
                      style={{ display: "flex" }}
                    >
                      <HomeRepairServiceIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>Manage Logs</div>
                    </Link>
                  </li>
                  <li
                    className={`${
                      pathname === "/dashboard/manage-mail" ? "active" : ""
                    }`}
                  >
                    <Link
                      href="/dashboard/manage-mail"
                      style={{ display: "flex" }}
                    >
                      <HomeRepairServiceIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>Manage Mail</div>
                    </Link>
                  </li>
                  <li
                    className={`${
                      pathname === "/dashboard/upload-logs" ? "active" : ""
                    }`}
                  >
                    <Link href="/dashboard/orders" style={{ display: "flex" }}>
                      <ProductionQuantityLimitsIcon
                        sx={{ marginRight: "10px" }}
                      />{" "}
                      <div>Orders</div>
                    </Link>
                  </li>
                  <li
                    className={`${
                      pathname === "/dashboard/upload-logs" ? "active" : ""
                    }`}
                  >
                    <Link href="/dashboard/users" style={{ display: "flex" }}>
                      <PersonIcon sx={{ marginRight: "10px" }} />{" "}
                      <div>users</div>
                    </Link>
                  </li>
                </ul>
              )}

              <h4>Account</h4>
              <ul>
                {/* <li className={pathname === "/dashboard-profile" ? "active" : ""}>
              <Link href="/dashboard-profile">
                <i className="flaticon-male"></i> Restaurant Profile
              </Link>
            </li> */}
                {session?.user?.role === "admin" && root === "dashboard" && (
                  <li
                    className={
                      pathname === "/dashboard/payment-method" ? "active" : ""
                    }
                  >
                    <Link href="/dashboard/payment-method">
                      <i className="flaticon-list-1"></i> Payment Method
                    </Link>
                  </li>
                )}

                {root === "user" && (
                  <li
                    className={`${
                      pathname === "/user/profile" ? "active" : ""
                    }`}
                  >
                    <Link href="/user/profile" style={{ display: "flex" }}>
                      <Person2Icon sx={{ marginRight: "10px" }} />{" "}
                      <div>profile</div>
                    </Link>
                  </li>
                )}
                <li onClick={signOut}>
                  <Link href="#" style={{ display: "flex" }}>
                    <LogoutIcon sx={{ marginRight: "10px", color: "red" }} />{" "}
                    <div style={{ color: "red" }}>Sign Out</div>
                  </Link>
                </li>
              </ul>
              {session?.user?.role === "admin" && (
                <ul style={{ marginTop: "25px", border: "none" }}>
                  <li>
                    <Link
                      href={`${root === "dashboard" ? "/user" : "/dashboard"}`}
                      style={{
                        display: "flex",
                        border: "1px solid white",
                        width: "85%",
                        borderRadius: "10px",
                      }}
                    >
                      <DashboardIcon
                        sx={{ marginRight: "10px", color: "#8075ff" }}
                      />{" "}
                      <div style={{ color: "white" }}>
                        {root === "dashboard" ? "User Section" : "Dashboard"}
                      </div>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    </Drawer>
  );
}

export default SideBarDrawer;
