import React, { useContext, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Avatar } from "@mui/material";
import { Bounce } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./Modal";
import { RestaurantContext } from "@context/RestaurantContext";

const Table = () => {
  const { formatDateToReadable, formatMoney } = useContext(RestaurantContext);
  const [wallets, setWallets] = useState([]);
  const [filteredWallets, setFilteredWallets] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Fetch paginated orders from the server, with email search if provided
        const { data } = await axios.get(
          `/api/admin/get-orders?page=${
            page + 1
          }&limit=${rowsPerPage}&email=${searchText}`
        );
        setWallets(data?.orders); // Update fetched orders
        setFilteredWallets(data?.orders); // Default filtered data is the fetched data
        setTotalOrders(data?.pagination?.total); // Update total order count
        setLoading(false);
      } catch (error) {
        // toast.error(error?.response?.data?.message, {
        //   position: "top-center",
        //   autoClose: 5000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   theme: "dark",
        //   transition: Bounce,
        // });
        setLoading(false);
        setFilteredWallets([]);
      }
    };

    fetchOrders();
  }, [page, rowsPerPage, searchText]);

  useEffect(() => {
    const filtered = wallets.filter((order) =>
      order?.user?.email?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredWallets(filtered);
  }, [searchText, wallets]);

  const options = {
    responsive: "standard",
    serverSide: true,
    count: totalOrders,
    page,
    rowsPerPage,
    onChangePage: (newPage) => setPage(newPage),
    onChangeRowsPerPage: (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    },
    onSearchChange: (searchVal) => {
      setSearchText(searchVal || "");
      setPage(0);
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

  const data = filteredWallets.map((order) => [
    <div style={{ display: "flex", alignItems: "center" }}>
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
        color: `${order?.user?.role === "admin" ? "red" : "green"}`,
        fontWeight: "800",
      }}
    >
      {order?.user?.role}
    </div>,
    order?.social,
    formatMoney(Number(order?.logs.length * order?.orderLog?.price)),
    order?.logs.length,
    formatDateToReadable(order?.createdAt),
  ]);

  return (
    <>
      <MUIDataTable
        title="Orders"
        data={data}
        columns={[
          "Account Name",
          "Email",
          "Role",
          "Log",
          "Amount",
          "Logs",
          "Created At",
        ]}
        options={options}
      />
      <DeleteModal
        open={false}
        setOpen={() => {}}
        active={null}
        setActive={() => {}}
        setState={() => {}}
      />
      <ToastContainer />
    </>
  );
};

export default Table;
