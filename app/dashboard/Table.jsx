"use client";
import React, { useContext, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Avatar } from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicModal from "./Modal";
import { RestaurantContext } from "@context/RestaurantContext";

const Table = () => {
  const { formatMoney, formatDateToReadable } = useContext(RestaurantContext);

  const [wallets, setWallets] = useState([]); // Fetched data
  const [page, setPage] = useState(0); // Zero-based page index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(""); // Search input

  const columns = [
    "Account Name",
    "Email",
    "Payment Method",
    "Amount",
    "USDT",
    "Network",
    "Screenshot",
    "Status",
    "Created At",
    "Actions",
  ];

  // Fetch paginated and filtered data from the server
  const fetchDeposits = async (page, limit, search = "") => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/deposit/get-deposits`, {
        params: { page: page + 1, limit, search }, // Pass search parameter to backend
      });
      setWallets(data.deposits); // Update server-fetched data
      setTotalRows(data.pagination.total); // Update total rows
    } catch (error) {
      console.log(error);
      setWallets([]);
      // toast.error("Failed to fetch deposits.", { transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component load or when searchText, page, or rowsPerPage changes
  useEffect(() => {
    fetchDeposits(page, rowsPerPage, searchText);
  }, [page, rowsPerPage, searchText]);

  const getColor = (status) => {
    if (status === "success") return "green";
    if (status === "pending") return "orange";
    if (status === "rejected") return "red";
  };

  const data = wallets.map((order) => [
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar
        sx={{
          width: "25px",
          height: "25px",
          fontSize: "12px",
          background: "green",
        }}
        src="/img/man.png"
        alt="avatar"
      />
      <span style={{ marginLeft: "5px" }}>{order?.user?.username}</span>
    </div>,
    order?.user?.email,
    order?.method,
    <div>{formatMoney(order?.amount)}</div>,
    <div>{order?.usdt}</div>,
    <div>{order?.network}</div>,
    order?.screenShot ? (
      <a href={order?.screenShot} target="_blank" rel="noopener noreferrer">
        View Screenshot
      </a>
    ) : (
      "No screenshot"
    ),
    <div
      style={{ textDecoration: "underline", color: getColor(order?.status) }}
    >
      {order?.status}
    </div>,
    formatDateToReadable(order?.createdAt),
    <button
      onClick={() => {
        if (order?.status !== "success") {
          setActive(order);
          setTimeout(() => handleOpen(), 1000);
        }
      }}
      style={{
        cursor: "pointer",
        color: "white",
        background: getColor(order?.status),
        textAlign: "center",
        borderRadius: "5px",
      }}
    >
      {order?.status !== "success" ? "Update" : "Complete"}
    </button>,
  ]);

  const options = {
    responsive: "standard",
    serverSide: true, // Enable server-side pagination
    count: totalRows, // Total number of rows
    rowsPerPage,
    page,
    onChangePage: (newPage) => setPage(newPage),
    onChangeRowsPerPage: (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setPage(0); // Reset to the first page
    },
    onSearchChange: (searchVal) => {
      setSearchText(searchVal || ""); // Update search state
      setPage(0); // Reset to the first page
    },
    textLabels: {
      body: {
        noMatch: loading ? (
          <div style={{ textAlign: "center", padding: "10px" }}>Loading...</div>
        ) : (
          "No matching records found"
        ),
      },
    },
  };

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MUIDataTable
        title="Account Top Ups"
        data={data}
        columns={columns}
        options={options}
      />
      <ToastContainer />
      <BasicModal
        open={open}
        handleClose={handleClose}
        active={active}
        setState={() => fetchDeposits(page, rowsPerPage, searchText)}
      />
    </>
  );
};

export default Table;
