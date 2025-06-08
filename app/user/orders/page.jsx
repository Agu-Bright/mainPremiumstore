"use client";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { writeFile, utils } from "xlsx";
import { saveAs } from "file-saver";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BasicModal from "./Modal";
// const array = [
//   { log: "@username,password,email,emailpassword" },
//   { log: "@username2,password2,email2,emailpassword2" },
//   { log: "@username3,password3,email3,emailpassword3" },
// ];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [state, setState] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeOrder, setActiveOrder] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const refreshComponent = () => {
    // Incrementing the key will force the component to re-render
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const toggle = () => {
    setState((prev) => !prev);
  };

  const downloadExcel = (_logs) => {
    // Convert array to sheet format
    const logArray = _logs.map((item) => {
      return { log: item?.log };
    });
    const data = logArray.map((item) => {
      const [username, password, email, emailPassword] = item.log.split(",");
      return { username, password, email, emailPassword };
    });

    const ws = utils.json_to_sheet(data);

    // Create a new workbook
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Logs");

    // Generate Excel file
    const wbout = writeFile(wb, "Logs.xlsx", {
      bookType: "xlsx",
      type: "array",
    });

    // Create a new blob
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    // Use FileSaver.js to trigger the download
    saveAs(blob, "Logs.xlsx");
    router.push("/user");
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s?.length); //convert s to arrayBuffer
    const view = new Uint8Array(buf); //create uint8array as viewer
    for (let i = 0; i < s?.length; i++) view[i] = s?.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/logs/get-my-orders");
        console.log("orders", data);
        setOrders(data?.orders);
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    })();
  }, [state]);

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EC5766",
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
      <div key={refreshKey}>
        <NavPage>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <h5
              style={{
                textAlign: "start",
                width: "100%",
                fontWeight: "800",
              }}
            >
              Your Orders
            </h5>
            {orders && orders.length === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Image width={250} height={250} src="/img/order.png" />
                <Typography>You have no order yet</Typography>
                <Button
                  onClick={() => router.push("/user")}
                  style={{
                    display: "flex",
                    border: "none",
                    color: "white",
                    fontWeight: "800",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    marginTop: "20px",
                    textAlign: "center",
                    background:
                      "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                  }}
                  className="btn-md  btn-block"
                >
                  <Typography sx={{ color: "white" }}>Explore Logs</Typography>
                </Button>
              </div>
            )}

            {orders && orders.length > 0 && (
              <div style={{ width: "100%" }}>
                {orders.map((item) => (
                  <Paper
                    key={item?._id}
                    sx={{
                      width: "100%",
                      padding: "15px 10px",
                      cursor: "pointer",
                      display: "flex",
                      padding: "2px",
                      marginTop: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        border: "2px solid white",
                        padding: "10px",
                        width: "100%",
                        borderRadius: "5px",
                        display: "flex",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      >
                        <Box
                          sx={{
                            width: "70%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                          }}
                        >
                          <Box>
                            <Avatar
                              src={
                                item?.image
                                  ? item?.image
                                  : `/img/${item?.social}.png`
                              }
                              sx={{
                                borderRadius: "2px",
                                marginRight: "15px",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              fontWeight: "800",
                              fontSize: "1.5em",
                              marginRight: "15px",
                            }}
                          >
                            {item?.orderLog?.social}
                          </Typography>
                          <Typography>{item?.description}</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ marginRight: "10px" }}>
                            <span style={{ fontWeight: "800" }}>Logs:</span>
                            <span>{item?.logs?.length}</span>
                          </Typography>
                          <IconButton
                            onClick={() => {
                              setActiveOrder(item.logs);
                              handleOpen();
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Box>
                      </Stack>
                    </Box>
                  </Paper>
                ))}
              </div>
            )}
          </div>
          <BasicModal open={open} setOpen={setOpen} activeOrder={activeOrder} />
        </NavPage>
      </div>
    );
}
