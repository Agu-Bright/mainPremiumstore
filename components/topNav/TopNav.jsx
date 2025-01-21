import { IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import React from "react";

const TopNav = ({ title }) => {
  const router = useRouter();

  const handleSelect = (title) => {
    if (
      title === "Transaction History" ||
      title === "Cash Withdrawal" ||
      title === "Deposit" ||
      title === "Security" ||
      title === "Bind Wallet Address"
    ) {
      return "black";
    } else {
      return "white";
    }
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "absolute",
        color: "white",
        zIndex: "999",
        width: "100%",
        marginBottom: "50px",
        marginTop: "10px",
        background: "transparent",
      }}
    >
      <IconButton
        onClick={() => router.back()}
        sx={{
          marginRight: "auto",
        }}
      >
        <ArrowBackIosIcon sx={{ color: "orange" }} />
      </IconButton>
      <Typography
        sx={{
          color: handleSelect(title),
          textAlign: "center",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: "800",
          fontSize: "1.5em",
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default TopNav;
