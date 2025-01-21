"use client";
import NavPage from "@components/navPage/NavPage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Paper,
  IconButton,
  Avatar,
  useMediaQuery,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RestaurantContext } from "@context/RestaurantContext";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const query = useSearchParams();
  console.log("query", query);
  const cat = query.get("cat");
  const catType = query.get("catType");
  const special = query.get("special");
  console.log("speciel", special);
  const [logs, setLogs] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const { open, setOpen, activeLog, setActiveLog, formatMoney } =
    useContext(RestaurantContext);
  useEffect(() => {
    if (special) {
      (async () => {
        try {
          console.log("fetching with social");
          //fetch logs based on category
          const { data } = await axios.post("/api/logs/get-cat", {
            social: "facebook",
          });
          console.log(data);
          setLogs(data?.logs);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      cat &&
        (async () => {
          console.log("fetching with normal");

          try {
            //fetch logs based on category
            const { data } = await axios.post("/api/logs/get-category-logs2", {
              category: cat,
            });
            console.log(data);
            setLogs(data?.logs);
          } catch (error) {
            console.log(error);
          }
        })();
    }
  }, [cat, special]);

  if (status === "loading") {
    return (
      <div
        className="contact-section overview-bgi"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "#CDC5B4" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <div>
          <Typography>{catType}</Typography>
          <>
            {logs.length > 0 &&
              logs.map((log) => (
                <Box
                  sx={{
                    marginTop: "10px",
                    marginBottom: "5px",
                    padding: "15px 10px",
                    border: "0.2px solid #dcd7d7",
                    borderRadius: "5px",
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
                        src={
                          log?.image ? log?.image : `/img/${log?.social}.png`
                        }
                        sx={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "1px",
                          marginRight: isMobile ? "0" : "10px",
                          marginBottom: isMobile ? "10px" : "0",
                        }}
                      />
                      <Typography>
                        <span style={{ fontWeight: "700", marginRight: "5px" }}>
                          {log?.social}:
                        </span>
                        {log?.description}
                      </Typography>{" "}
                    </Box>
                    <Divider
                      sx={{
                        display: { md: "none", xs: "block" },
                        margin: "15px 0px",
                      }}
                    />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ width: { md: "30%", xs: "100%" } }}
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
                            background: "#d6e8ff",
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
                            {log?.logCount}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            height: "50px",
                            padding: "0px 20px",
                            borderRadius: "7px",
                            background: "#d6e8ff",
                          }}
                        >
                          <Typography
                            sx={{ textAlign: "center", color: "black" }}
                          >
                            Price
                          </Typography>
                          <Typography
                            sx={{ textAlign: "center", color: "black" }}
                          >
                            {formatMoney(log?.price)}{" "}
                          </Typography>
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
                            if (log?.logCount === 0) {
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
                            setOpen(true);
                          }}
                          variant="outlined"
                          sx={{ background: "primary" }}
                          startIcon={<LocalMallIcon />}
                        >
                          Buy
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              ))}
          </>
        </div>
      </NavPage>
    );
};

export default function Home() {
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <Product />
    </Suspense>
  );
}
