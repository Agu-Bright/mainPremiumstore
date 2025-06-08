import React, { useContext, useEffect, useState } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "./EditIcon";
const Details = ({ category, catId }) => {
  const [logs, setLogs] = useState("");
  const { setOpen, setType, setCatType, toggle } =
    useContext(RestaurantContext);
  useEffect(() => {
    //fetch logs for this , catId
    (async () => {
      try {
        const { data } = await axios.post("/api/logs/get-category-logs", {
          category,
        });
        setLogs(data?.logs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [toggle]);
  return (
    <AccordionDetails>
      <Stack direction={{ xs: "column" }}>
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          direction="row"
          justifyContent="end"
        >
          <IconButton
            onClick={() => {
              setType("edit-category");
              setCatType(catId);
              setOpen(true);
            }}
          >
            <EditIcon sx={{ color: "blue" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              setType("delete-category");
              setCatType(catId);
              setOpen(true);
            }}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </IconButton>
        </Stack>
        <Divider />
        {logs && logs.length === 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <Image src="/img/creativity.png" width={100} height={100} />
            </div>
            <h5 style={{ fontWeight: "200", marginTop: "10px" }}>
              Create a log for this category
            </h5>
            <button
              onClick={() => {
                setType("createLog");
                setCatType(category);
                setOpen(true);
              }}
              style={{
                border: "none",
                color: "white",
                fontWeight: "800",
                borderRadius: "10px",
                fontSize: "1.2em",
                background:
                  "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
              }}
              className="btn-md  btn-block"
            >
              Create Log{" "}
            </button>
          </div>
        )}
        <div style={{ width: "100%" }}>
          {logs &&
            logs.length > 0 &&
            logs.map((log, _index) => (
              <Paper
                key={_index}
                sx={{
                  width: "100%",
                  padding: "15px 10px",
                  cursor: "pointer",
                  display: "flex",
                  padding: "2px",
                  marginTop: "10px",
                  background:
                    "linear-gradient(90deg, #efeff4 0%, #e8e7f2 35%, #d3e5e8 100%)",
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
                        alignItems: { md: "center", xs: "start" },
                        justifyContent: "start",
                        flexDirection: { md: "row", xs: "column" },
                      }}
                    >
                      <Box>
                        <Avatar
                          src={
                            log?.image ? log?.image : `/img/${log?.social}.png`
                          }
                          sx={{ borderRadius: "2px", marginRight: "15px" }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          fontSize: { md: "1.5em", xs: "1em" },
                          marginRight: "15px",
                          textAlign: { md: "center", xs: "start" },
                        }}
                      >
                        {log?.social}
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: { md: "center", xs: "start" },
                          fontSize: { md: "1.5em", xs: "0.8em" },
                        }}
                      >
                        {log?.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: { md: "center", xs: "start" },
                      }}
                    >
                      <Typography sx={{ marginRight: "10px" }}>
                        <span style={{ fontWeight: "800" }}>Stock:</span>
                        <span>{log?.logs.length}</span>
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "800" }}>Price:</span>
                        <span>₦{log?.price}</span>
                      </Typography>
                      <EditIcon _logId={log?._id} />
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            ))}
          {logs && logs.length > 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginTop: "10px" }}
            >
              <div></div>
              <button
                onClick={() => {
                  setType("createLog");
                  setCatType(category);
                  setOpen(true);
                }}
                style={{
                  border: "none",
                  color: "white",
                  fontWeight: "800",
                  borderRadius: "10px",
                  fontSize: "1em",
                  background:
                    "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                }}
                // className="btn-md  btn-block"
              >
                Add Log
              </button>{" "}
            </Stack>
          )}
        </div>
      </Stack>
    </AccordionDetails>
  );
};

export default Details;
