"use client";
import NavPage from "@components/navPage/NavPage";

import {
  Box,
  CircularProgress,
  Stack,
  Typography,
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
import TableList from "../Table";

const Topic = ({ title, src }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Avatar src={src} alt="img" sx={{ borderRadius: "0px" }} />
      <Typography
        style={{ marginLeft: "10px", fontSize: "12px", color: "white" }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

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

  const type = query.get("type");
  const id = query.get("id");

  const isMobile = useMediaQuery("(max-width:600px)");
  const { setOpen, setActiveLog, formatMoney } = useContext(RestaurantContext);
  useEffect(() => {
    (async () => {
      try {
        console.log("fetching with social");
        const { data } = await axios.post("/api/logs/get-cat", {
          id: id,
        });
        console.log(data);
        setLogs(data?.logs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
                <TableList
                  key={log?.id}
                  category={log?.catType}
                  products={log?.products}
                  catId={log?._id}
                  icon={log?.icon}
                  type="shopviaclone22"
                  title={<Topic title={log?.name} src={log?.icon} />}
                />
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
