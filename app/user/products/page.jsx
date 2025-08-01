"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { RestaurantContext } from "@context/RestaurantContext";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const query = useSearchParams();
  const cat = query.get("cat");
  const catType = query.get("catType");
  const special = query.get("special");

  const [logs, setLogs] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { open, setOpen, activeLog, setActiveLog, formatMoney } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const endpoint = special
          ? "/api/logs/get-cat"
          : "/api/logs/get-category-logs2";
        const payload = special ? { social: "facebook" } : { category: cat };
        const { data } = await axios.post(endpoint, payload);
        setLogs(data?.logs || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (cat || special) fetchLogs();
  }, [cat, special]);

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121212",
        }}
      >
        <CircularProgress style={{ color: "#bb86fc" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  }

  return (
    <NavPage>
      <Box>
        <Typography variant="h6" color="#ffffff" mb={2}>
          {catType}
        </Typography>

        {logs.length > 0 &&
          logs.map((log) => (
            <Box
              key={log._id}
              sx={{
                mt: 2,
                mb: 1,
                p: 2,
                border: "1px solid #333",
                borderRadius: "8px",
                backgroundColor: "#2c2c2c",
              }}
            >
              <Stack
                direction={{ md: "row", xs: "column" }}
                justifyContent="space-between"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: { md: "70%", xs: "100%" },
                    mb: { xs: 2, md: 0 },
                  }}
                >
                  <Avatar
                    src={log?.image || `/img/${log?.social}.png`}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "4px",
                      mr: 2,
                    }}
                  />
                  <Typography color="#ffffff">
                    <strong style={{ marginRight: 5 }}>{log?.social}:</strong>
                    {log?.description}
                  </Typography>
                </Box>

                <Divider sx={{ display: { md: "none", xs: "block" }, my: 2 }} />

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ width: { md: "30%", xs: "100%" } }}
                >
                  <Box
                    sx={{
                      height: 60,
                      px: 2,
                      borderRadius: "8px",
                      backgroundColor: "#3c3f41",
                    }}
                  >
                    <Typography color="#ccc" align="center" fontSize={14}>
                      Stock
                    </Typography>
                    <Typography color="#fff" align="center" fontSize={16}>
                      {log?.logCount}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      height: 60,
                      px: 2,
                      borderRadius: "8px",
                      backgroundColor: "#3c3f41",
                    }}
                  >
                    <Typography color="#ccc" align="center" fontSize={14}>
                      Price
                    </Typography>
                    <Typography color="#fff" align="center" fontSize={16}>
                      {formatMoney(log?.price)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
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
                            theme: "dark",
                            transition: Bounce,
                          });
                          return;
                        }
                        setActiveLog(log);
                        setOpen(true);
                      }}
                      variant="outlined"
                      sx={{
                        color: "#fff",
                        borderColor: "#bb86fc",
                        "&:hover": {
                          backgroundColor: "#bb86fc",
                          color: "#000",
                        },
                      }}
                      startIcon={<LocalMallIcon />}
                    >
                      Buy
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          ))}
      </Box>
    </NavPage>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<div style={{ color: "#fff" }}>loading ...</div>}>
      <Product />
    </Suspense>
  );
}
