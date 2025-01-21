import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { RestaurantContext } from "@context/RestaurantContext";

function valuetext(value) {
  return `${value}°C`;
}

export default function Points() {
  const { user } = React.useContext(RestaurantContext);
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        disabled={true}
        aria-label="Temperature"
        defaultValue={user?.loyaltyPoint}
        getAriaValueText={valuetext}
        // color="secondary"
        sx={{ color: "#a4adb6" }}
      />
    </Box>
  );
}
