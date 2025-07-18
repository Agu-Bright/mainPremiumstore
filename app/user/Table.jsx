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
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function TableList({ title, key, category, catId }) {
  const router = useRouter();
  const [logs, setLogs] = React.useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const { open, setOpen, activeLog, setActiveLog, formatMoney } =
    React.useContext(RestaurantContext);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("/api/logs/get-category-logs2", {
          category: catId,
        });
        setLogs(data?.logs.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div key={key} style={{ marginTop: "15px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            marginBottom: "10px",
            background: "#6f42c1",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          <Typography sx={{ fontWeight: "800", color: "white" }}>
            {title}
          </Typography>
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              router.push(`/user/products?cat=${catId}&&catType=${category}`)
            }
          >
            <span
              style={{ fontWeight: "400", marginRight: "10px", color: "white" }}
            >
              See More
            </span>
          </div>
        </Stack>

        {logs.length > 0 &&
          logs.map((log) => (
            <Box
              key={log._id}
              sx={{
                marginTop: "10px",
                marginBottom: "5px",
                padding: "15px 10px",
                border: "1px solid #333",
                borderRadius: "5px",
                background: "#1a1a1a",
                width: "100%",
              }}
            >
              <Stack
                flexDirection={{ md: "row", xs: "column" }}
                justifyContent="space-between"
              >
                {/* Left */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: { md: "center", xs: "start" },
                    justifyContent: "start",
                    width: { md: "70%", xs: "100%" },
                  }}
                >
                  <Avatar
                    src={log?.image ? log.image : `/img/${log.social}.png`}
                    sx={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "1px",
                      marginRight: isMobile ? "0" : "10px",
                      marginBottom: isMobile ? "10px" : "0",
                    }}
                  />
                  <Typography sx={{ color: "#ddd" }}>
                    <span style={{ fontWeight: "700", marginRight: "5px" }}>
                      {log?.social}:
                    </span>
                    {log?.description}
                  </Typography>
                </Box>

                {/* Right */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: { md: "30%", xs: "100%" } }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      sx={{
                        height: "50px",
                        padding: "0px 20px",
                        marginRight: "10px",
                        borderRadius: "7px",
                        background: "#2b2b2b",
                      }}
                    >
                      <Typography sx={{ textAlign: "center", color: "#aaa" }}>
                        Stock
                      </Typography>
                      <Typography sx={{ textAlign: "center", color: "#fff" }}>
                        {log?.logCount}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: "50px",
                        padding: "0px 20px",
                        borderRadius: "7px",
                        background: "#2b2b2b",
                      }}
                    >
                      <Typography sx={{ textAlign: "center", color: "#aaa" }}>
                        Price
                      </Typography>
                      <Typography sx={{ textAlign: "center", color: "#fff" }}>
                        {formatMoney(log?.price)}
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
                        borderColor: "#6f42c1",
                        "&:hover": {
                          backgroundColor: "#6f42c1",
                          color: "#fff",
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
      </div>
      <Divider sx={{ margin: "20px 0px", background: "#333" }} />
    </>
  );
}
