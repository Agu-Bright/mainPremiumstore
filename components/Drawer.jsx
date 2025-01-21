"use client";
import React, { useContext } from "react";
import { Drawer, IconButton, Divider, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { RestaurantContext } from "@context/RestaurantContext";
import { Router } from "next/router";

function MuiDrawer({ open, close, session }) {
  const { setState } = useContext(RestaurantContext);
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={close}
      sx={{ "& .MuiDrawer-paper": { width: "60vw" } }}
    >
      <>
        <div className="drawer-container">
          <div className="top-icon-button">
            <IconButton onClick={() => close()}>
              <CloseIcon sx={{ color: "black" }} />
            </IconButton>
          </div>
          <Divider />
          <div className="drawer-items">
            <ul>
              {session?.user ? (
                <>
                  <li>
                    {" "}
                    <Link className="nav-link" href="#">
                      Hello,{" "}
                      <span style={{ fontWeight: "600" }}>
                        {" "}
                        {session?.user?.accountName}
                      </span>
                    </Link>
                  </li>
                  {/* <Divider /> */}

                  {session?.user && (
                    <li>
                      <Link
                        onClick={() => close()}
                        className="nav-link"
                        href="/user/account"
                      >
                        My Account
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      className="nav-link"
                      href="#"
                      style={{ color: "red" }}
                      onClick={() => {
                        close();
                        signOut();
                        Router.push("/user/login");
                      }}
                    >
                      Sign Out
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  {" "}
                  <Link className="nav-link" href="/signup">
                    <i className="flaticon-logout"></i>Sign In
                  </Link>
                </li>
              )}
              <Divider sx={{ paddingTop: "50px" }} />{" "}
            </ul>
          </div>
        </div>
      </>
    </Drawer>
  );
}

export default MuiDrawer;
