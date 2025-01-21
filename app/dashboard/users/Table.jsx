"use client";
import React, { useContext, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Avatar, IconButton } from "@mui/material";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./Modal";
import { RestaurantContext } from "@context/RestaurantContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const Table = () => {
  const { formatDateToReadable, formatMoney, setType } =
    useContext(RestaurantContext);
  const handleCopy = (address) => {
    // const referralCode = session?.user?.referalCode;
    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          toast.success("Copied to Clipboard", {
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
          // Optionally, display a notification or toast here
        })
        .catch((err) => {
          toast.error("copy failed", {
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
        });
    }
  };
  const [wallets, setWallets] = useState([]);
  const columns = [
    "Account Name",
    "Email",
    "badge",
    "Account Balance",
    "Created At",
    "Delete",
    "Top Up",
    "Debit",
  ];
  const [state, setState] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/get-all-wallet`);
        setWallets(data?.wallets.reverse());
      } catch (error) {
        toast.error(error?.response?.data?.message, {
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
      }
    })();
  }, [state]);

  const options = {
    responsive: "standard",
  };

  const [active, setActive] = useState();
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);

  const data = [];
  wallets &&
    wallets.map((order) =>
      data.push([
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Avatar
            sx={{
              width: "25px",
              height: "25px",
              fontSize: "12px",
              background: "green",
            }}
            src={`${
              order?.user?.sex === "male" ? "/img/man.png" : "/img/woman.png"
            }`}
            alt="avatar"
          />

          <span style={{ marginLeft: "5px" }}>{order?.user?.username} </span>
        </div>,

        order?.user?.email,
        <div
          style={{
            color: `${order?.user?.role === "admin" ? "red" : "reen"}`,
            fontWeight: "800",
          }}
        >
          {order?.user?.role}
        </div>,

        formatMoney(order?.balance),
        formatDateToReadable(order?.createdAt),
        <IconButton
          onClick={() => {
            setActive(order);
            setType("");
            handleOpen();
          }}
        >
          <DeleteIcon />
        </IconButton>,
        <IconButton
          onClick={() => {
            setActive(order);
            setType("top_up");
            handleOpen();
          }}
        >
          <AddCircleIcon sx={{ color: "blue" }} />
        </IconButton>,
        <IconButton
          onClick={() => {
            setActive(order);
            setType("remove");
            handleOpen();
          }}
        >
          <RemoveCircleIcon sx={{ color: "red" }} />
        </IconButton>,
      ])
    );
  return (
    <>
      <MUIDataTable
        title="User Details"
        data={data}
        columns={columns}
        options={options}
      />
      <DeleteModal
        open={open}
        setOpen={setOpen}
        active={active}
        setActive={setActive}
        setState={setState}
      />
      <ToastContainer />
    </>
  );
};

export default Table;
