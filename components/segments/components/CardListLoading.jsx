import React from "react";

import "@components/segments/components/swiper.css";

import { Skeleton, Stack } from "@mui/material";

const CardListLoading = () => {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: {
            md: "space-between",
            sm: "space-between",
            xs: "center",
          },
        }}
      >
        <Stack
          sx={{
            border: "1px solid #cfcaca",
            borderRadius: "5px",
            width: { md: "24%", sm: "28%", xs: "90%" },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton width="90%" />
          <Skeleton width="70%" />
          <Skeleton width="60%" />
          <Skeleton width="60%" />
        </Stack>
        <Stack
          sx={{
            border: "1px solid #cfcaca",
            borderRadius: "5px",
            width: { md: "24%", sm: "28%" },
            display: { md: "block", sm: "block", xs: "none" },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton width="90%" />
          <Skeleton width="70%" />
          <Skeleton width="60%" />
          <Skeleton width="60%" />
        </Stack>
        <Stack
          sx={{
            border: "1px solid #cfcaca",
            borderRadius: "5px",
            width: { md: "24%", sm: "30%" },
            display: { md: "block", sm: "block", xs: "none" },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton width="90%" />
          <Skeleton width="70%" />
          <Skeleton width="60%" />
          <Skeleton width="60%" />
        </Stack>
        <Stack
          sx={{
            border: "1px solid #cfcaca",
            borderRadius: "5px",
            width: "24%",
            display: { md: "block", sm: "none", xs: "none" },
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton width="90%" />
          <Skeleton width="70%" />
          <Skeleton width="60%" />
          <Skeleton width="60%" />
        </Stack>
      </Stack>
      {/* </SwiperSlide> */}
      {/* ))} */}
      {/* </SwiperComponent> */}
    </>
  );
};

export default CardListLoading;
