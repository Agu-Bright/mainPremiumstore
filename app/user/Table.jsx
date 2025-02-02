import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TableList({
  title,
  key,
  category,
  catId,
  products,
  icon,
  type,
}) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");

  const { setOpen, setActiveLog, formatMoney, rate, percentage, setType } =
    React.useContext(RestaurantContext);

  console.log("percentage", percentage);

  const calculatePrice = (price) => {
    const conversion = Number(price * rate?.rate).toFixed(2);
    const profit = Number(conversion * (percentage / 100)).toFixed(2);
    const finalPrice = (parseFloat(profit) + parseFloat(conversion)).toFixed(0);
    return formatMoney(finalPrice);
  };
  const calculatePrice2 = (price) => {
    const profit = Number(price * (percentage / 100)).toFixed(2);
    const finalPrice = (parseFloat(profit) + parseFloat(price)).toFixed(0);
    return formatMoney(finalPrice);
  };

  return (
    <>
      <div key={key} style={{ marginTop: "15px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            marginBottom: "10px",
            background: "#6b5ff7",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          <Typography sx={{ fontWeight: "800", color: "white" }}>
            {title}
          </Typography>
          <div
            style={{ cursor: "pointer", visibility: "hidden" }}
            onClick={() => router.push(`#`)}
          >
            <span
              style={{ fontWeight: "400", marginRight: "10px", color: "white" }}
            >
              {" "}
              See More
            </span>
          </div>
        </Stack>

        <>
          {products.length > 0 &&
            products.map((log) =>
              log?.amount !== 0 ? (
                <Box
                  sx={{
                    marginTop: "10px",
                    marginBottom: "5px",
                    padding: "15px 10px",
                    border: "0.2px solid #dcd7d7",
                    borderRadius: "5px",
                    wdth: "100%",
                    background: "#fafafa",
                  }}
                >
                  <Stack
                    flexDirection={{ md: "row", xs: "column" }}
                    justifyContent="space-between"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: { md: "center", xs: "start" },
                        justifyContent: "start",
                        width: { md: "70%", xs: "100%" },
                      }}
                    >
                      <Avatar
                        src={icon}
                        sx={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "1px",
                          marginRight: isMobile ? "0" : "10px",
                          marginBottom: isMobile ? "10px" : "0",
                        }}
                      />
                      <Typography>
                        <span
                          style={{
                            fontWeight: "700",
                            marginRight: "5px",
                          }}
                        >
                          {log?.name}:
                        </span>
                        <span
                          style={{
                            color: "gray",
                            fontSize: "10px",
                            display: "block",
                          }}
                        >
                          {log?.description}
                        </span>
                        {/*  */}
                      </Typography>
                    </Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        width: { md: "30%", xs: "100%" },
                        marginTop: { md: "0", xs: "8px" },
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            height: "50px",
                            padding: "0px 20px",
                            marginRight: "10px",
                            borderRadius: "7px",
                            background: "#d7d6ff",
                          }}
                        >
                          <Typography
                            sx={{ textAlign: "center", color: "black" }}
                          >
                            Stock
                          </Typography>
                          <Typography
                            sx={{ textAlign: "center", color: "black" }}
                          >
                            {log?.amount}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            height: "50px",
                            padding: "0px 20px",
                            borderRadius: "7px",
                            background: "#d7d6ff",
                          }}
                        >
                          <Typography
                            sx={{ textAlign: "center", color: "black" }}
                          >
                            Price
                          </Typography>
                          {type === "shopviaclone22" ? (
                            <Typography
                              sx={{ textAlign: "center", color: "black" }}
                            >
                              {calculatePrice(log?.price)}
                            </Typography>
                          ) : (
                            <Typography
                              sx={{ textAlign: "center", color: "black" }}
                            >
                              {calculatePrice2(log?.price)}
                            </Typography>
                          )}
                        </Box>
                      </Stack>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={() => {
                            if (log?.amount == 0) {
                              toast.error("Sold Out", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Bounce,
                              });
                              return;
                            }
                            setActiveLog(log);
                            setType(type);
                            setOpen(true);
                          }}
                          variant="outlined"
                          sx={{
                            background: "#6462e6",
                            border: "1px solid white",
                            color: "white",
                          }}
                          startIcon={<LocalMallIcon sx={{ color: "white" }} />}
                        >
                          Buy
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              ) : (
                ""
              )
            )}
        </>
      </div>
      <Divider sx={{ margin: "20px 0px", visibility: "hidden" }} />
    </>
  );
}
