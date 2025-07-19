"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MuiDrawer from "./Drawer";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, BadgeProps } from "@mui/material";
import { display } from "@mui/system";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import SideBarDrawer from "./SidebarDrawer";
import SideBarDrawer2 from "./SidebarDrawer2";
import Points from "./Points";
import { RestaurantContext } from "@context/RestaurantContext";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TopNav from "./topNav/TopNav";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import SortIcon from "@mui/icons-material/Sort";
import Image from "next/image";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = ({ fixed, type, data, topNav, title }) => {
  const { setState, user, myWallet, formatMoney, sidebar2, setSideBar2 } =
    useContext(RestaurantContext);

  //menu state
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //others
  const { data: session } = useSession();
  const [scrollingUp, setScrollingUp] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 72) {
      setScrollingUp(true);
    } else {
      setScrollingUp(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  const handlePosition = () => {
    if (fixed) {
      return "main-header fixed-header2";
    } else {
      return `main-header header-transparent sticky-header header-shrink`;
    }
  };

  const handleNavigate = () => {
    router.push("/dashboard");
    handleClose();
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSidebarClose = () => {
    setSideBar(false);
  };
  const handleSidebarClose2 = () => {
    setSideBar2(false);
  };
  const [openDrawer, setOpen] = useState(false);

  const [sidebar, setSideBar] = useState(false);
  return (
    <>
      {type !== "dashboard" ? (
        <>
          <header className={`${handlePosition()} bg-black text-white`}>
            <div className="container" style={{ position: "relative" }}>
              <nav className="navbar navbar-expand-lg navbar-dark">
                <Link
                  style={{ fontWeight: "800", color: "#fff" }}
                  className="navbar-brand logo"
                  href="/user"
                >
                  Premium Store
                </Link>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => {
                      console.log(openDrawer);
                      setOpen(true);
                    }}
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ background: "#333" }}
                  >
                    <span
                      className="fa fa-bars"
                      style={{ color: "#fff" }}
                    ></span>
                  </button>
                </div>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav header-ml">
                    <li className="nav-item dropdown"></li>
                    <li className="nav-item dropdown"></li>
                  </ul>

                  <ul
                    className="navbar-nav ml-auto"
                    style={{ visibility: "hidden" }}
                  >
                    <li className="nav-item"></li>
                    <li className="nav-item">
                      <div className="nav-link link-color text-white">
                        <i className="fa fa-search"></i> Find
                      </div>
                    </li>
                  </ul>

                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() => router.push("/user/account")}
                      sx={{ color: "white" }}
                    >
                      <PersonOutlineIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        signOut();
                        router.push("/user/login");
                      }}
                      sx={{ color: "white" }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </Stack>
                </div>
              </nav>

              {topNav && <TopNav title={title} />}
            </div>
          </header>

          <MuiDrawer
            open={openDrawer}
            close={handleDrawerClose}
            session={session}
          />
        </>
      ) : (
        <>
          <header
            className="main-header header-2 fixed-header"
            style={{
              zIndex: "999",
              borderBottom: "0.1px solid #333",
              boxShadow: "1px 2px 5px rgba(0, 0, 0, 0.5)",
              backgroundColor: "#121212", // dark background
              color: "#ffffff", // white text
            }}
          >
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg navbar-dark">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <IconButton
                    onClick={() => setSideBar2(true)}
                    sx={{
                      border: "0.5px solid #555",
                      marginRight: "10px",
                      color: "white",
                    }}
                  >
                    <SortIcon sx={{ fontWeight: "800" }} />
                  </IconButton>

                  <Link
                    style={{
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      color: "white",
                      textDecoration: "none",
                    }}
                    className="navbar-brand logo"
                    href="/user"
                  >
                    <Typography
                      sx={{
                        fontWeight: "800",
                        color: "white",
                        marginLeft: "5px",
                      }}
                    >
                      Premium Store
                    </Typography>
                  </Link>
                </Stack>

                <IconButton
                  onClick={() => setSideBar(true)}
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  sx={{ color: "white" }}
                >
                  <ViewWeekIcon sx={{ display: { md: "none", xs: "block" } }} />
                </IconButton>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                ></div>

                <Box
                  sx={{
                    display: { sm: "block", md: "block", xs: "none" },
                    color: "white",
                  }}
                >
                  <span style={{ paddingRight: "10px", fontWeight: "800" }}>
                    Balance:
                  </span>
                  <span style={{ fontWeight: "800" }}>
                    {formatMoney(myWallet?.balance) || 0.0}
                  </span>
                </Box>
              </nav>
            </div>
          </header>

          <SideBarDrawer
            open={sidebar}
            close={handleSidebarClose}
            session={session}
          />
          <SideBarDrawer2
            open={sidebar2}
            close={handleSidebarClose2}
            session={session}
          />
        </>
      )}
    </>
  );
};

export default Navbar;

// {session?.user?.image ? (
//   <Avatar
//     id="basic-button"
//     aria-controls={
//       open ? "basic-menu" : undefined
//     }
//     aria-haspopup="true"
//     aria-expanded={open ? "true" : undefined}
//     src={session?.user?.image}
//     alt="profile"
//   />
// ) : (
//   <Avatar
//     id="basic-button"
//     aria-controls={
//       open ? "basic-menu" : undefined
//     }
//     aria-haspopup="true"
//     aria-expanded={open ? "true" : undefined}
//     alt="profile"
//   >
//     {
//       session?.user?.name
//         ?.split(" ")[0]
//         .split("")[0]
//     }
//   </Avatar>
// )}
