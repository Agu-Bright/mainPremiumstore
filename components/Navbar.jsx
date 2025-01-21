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
          <header className={handlePosition()}>
            <div className="container" style={{ position: "relative" }}>
              <nav className="navbar navbar-expand-lg navbar-light">
                {/* <Link
                  style={{ fontWeight: "800" }}
                  className="navbar-brand logo"
                  href="/user"
                >
                  Premium Store{" "}
                </Link> */}
                {/* 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100"
                  zoomAndPan="magnify"
                  viewBox="0 0 375 374.999991"
                  height="100"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.0"
                >
                  <defs>
                    <clipPath id="95fda0ff89">
                      <path
                        d="M 189 141 L 307 141 L 307 229 L 189 229 Z M 189 141"
                        clipRule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="f3050e4403">
                      <path
                        d="M 184.121094 154.054688 L 297.828125 126.492188 L 317.613281 208.128906 L 203.90625 235.691406 Z M 184.121094 154.054688"
                        clipRule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="25fc91d6c2">
                      <path
                        d="M 184.121094 154.054688 L 297.828125 126.492188 L 317.613281 208.128906 L 203.90625 235.691406 Z M 184.121094 154.054688"
                        clipRule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="aea0779268">
                      <path
                        d="M 10.113281 172.132812 L 28.863281 172.132812 L 28.863281 190.882812 L 10.113281 190.882812 Z M 10.113281 172.132812"
                        clipRule="nonzero"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#95fda0ff89)">
                    <g clipPath="url(#f3050e4403)">
                      <g clipPath="url(#25fc91d6c2)">
                        <path
                          fill="#9cff1e"
                          d="M 304.832031 165.082031 C 305.257812 166.695312 306.152344 167.65625 306.886719 168.199219 C 305.78125 169.695312 304.667969 171.1875 303.546875 172.671875 C 302.328125 171.753906 300.347656 169.808594 299.484375 166.53125 C 297.429688 169.28125 295.351562 172.011719 293.246094 174.722656 ..."
                        />
                        {/* Add other <path> elements here based on the original SVG 
                      </g>
                    </g>
                  </g>
                </svg> */}

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
                    style={{ background: "white" }}
                  >
                    <span
                      className="fa fa-bars"
                      style={{ color: "black" }}
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
                      <div className="nav-link link-color">
                        <i className="fa fa-search"></i>
                        Find
                      </div>
                    </li>
                  </ul>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => router.push("/user/account")}>
                      <PersonOutlineIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        signOut();
                        router.push("/user/login");
                      }}
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // borderBottom: "0.1px solid #d6d3d3",
              // boxShadow: "1px 2px 5px #e4e4e4",
            }}
          >
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <IconButton
                    onClick={() => setSideBar2(true)}
                    sx={{
                      border: "0.1px solid gray",
                      marginRight: "10px",
                      background: "white",
                    }}
                  >
                    <SortIcon sx={{ fontWeight: "800", color: "#c1c3c61f3" }} />
                  </IconButton>
                  <Link
                    style={{
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                    className="navbar-brand logo"
                    href="/user"
                  ></Link>
                </Stack>
                <IconButton
                  // style={{ border: "1px solid black" }}
                  onClick={() => setSideBar(true)}
                  // className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  {/* <span className="fa fa-bars"></span> */}
                  <ViewWeekIcon
                    sx={{
                      display: { md: "none", xs: "block" },
                      color: "white",
                    }}
                  />
                </IconButton>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                ></div>
                <Box sx={{ display: { sm: "block", md: "block", xs: "none" } }}>
                  <span
                    style={{
                      fontWeight: "800",
                      fontSize: "12px",
                      padding: "8px",
                      borderRadius: "15px",
                      border: "1px solid #363434",
                      color: "white",
                      background: "#242222",
                    }}
                  >
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
