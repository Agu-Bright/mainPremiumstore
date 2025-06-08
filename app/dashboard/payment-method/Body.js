"use client";

import Sidebar from "@components/Sidebar";
import { IconButton, Paper } from "@mui/material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import WalletModal from "./Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { RestaurantContext } from "@context/RestaurantContext";
import SettingsIcon from "@mui/icons-material/Settings";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
const Body = () => {
  const { data: session } = useSession();
  const [isWalletSet, setIsWalletSet] = useState(0);
  const [submiting, setSubmiting] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [adminWallets, setAdminWallets] = useState([]);
  const [wallet, setWallet] = useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState(null);
  const handleOpen = () => setOpen(true);
  const [state, setState] = useState(false);
  const { setType2 } = useContext(RestaurantContext);
  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/get-rate");
        setRate(data?.rate);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/get-admin-wallet`);
        setAdminWallets(data?.wallets);
        setIsWalletSet(data?.wallets.length);
      } catch (error) {
        toast.error("Unable to fetch Wallet", {
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

  const handleUpdateWalletAddress = async () => {
    if (!wallet && !walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
      return;
    }
    if (!wallet) {
      toast.error("Wallet Address and Network Type is required", {
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
      return;
    }
    if (!walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
      return;
    }
    try {
      setSubmiting(true);
      const { data } = await axios.post(`/api/admin-upload-wallet`, {
        wallet,
        walletAddress,
      });

      setSubmiting(false);
      setState((prev) => !prev);
      toast.success("Success", {
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
    } catch (error) {
      console.log(error);
      setSubmiting(false);
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
  };

  const handleCreateWallet = async () => {
    if (!wallet && !walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
      return;
    }
    if (!wallet) {
      toast.error("Wallet Address and Network Type is required", {
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
      return;
    }
    if (!walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
      return;
    }
    try {
      setSubmiting(true);
      const { data } = await axios.post(`/api/admin-create-wallet`, {
        wallet,
        walletAddress,
      });
      if (data?.success) {
        toast.success("Success", {
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
        setState((prev) => !prev);
        setWallet("");
        setWalletAddress("");
      }
      setSubmiting(false);
    } catch (error) {
      console.log(error);
      setSubmiting(false);
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
  };
  const handleCreatePayment = async () => {
    if (!token && !name) {
      toast.error("Name and Key are required", {
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
      return;
    }

    try {
      setIsSubmiting(true);
      const { data } = await axios.post(`/api/create-payment`, {
        name,
        token,
      });
      if (data?.success) {
        toast.success("Success", {
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
        setName("");
        setToken("");
      }
      setIsSubmiting(false);
      setToggle((prev) => !prev);
    } catch (error) {
      setIsSubmiting(false);
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
  };

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
            theme: "light",
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
            theme: "light",
            transition: Bounce,
          });
        });
    }
  };

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/get-payment");
        setPayments(data?.payments);
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
  }, [toggle]);

  const handleStatus = async (status, id) => {
    try {
      const { data } = await axios.put("/api/update-payment", { status, id });

      toast.success("Status updated", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setToggle((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div
            className="dashboard-content dashboard_row"
            style={{
              width: "100%",
              height: "90vh",
            }}
          >
            <div>
              <>
                <div className="dashboard-header clearfix">
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography>
                        Hi &#x1F44B;, {session?.user?.accountName}{" "}
                        {session?.user?.role === "admin" && (
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Admin
                          </span>
                        )}{" "}
                      </Typography>
                    </Box>
                    <Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            marginRight: "4px",
                            background: "gray",
                            color: "white",
                            borderRadius: "10px",
                            padding: "0px 2px",
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            justifyContent: "center",
                          }}
                        >
                          &#8358; {rate?.rate} / USDT
                        </Typography>

                        <Box>
                          <IconButton
                            onClick={() => {
                              setOpen(true);
                              setType2("exchangeRate");
                            }}
                          >
                            <SettingsIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Stack>
                </div>
                <div className="container">
                  <Stack
                    spacing={2}
                    direction="column"
                    justifyContent="space-between"
                  >
                    {adminWallets &&
                      adminWallets.length > 0 &&
                      adminWallets.map((item, index) => {
                        return (
                          <Paper
                            key={index}
                            //   onClick={() => setActive("trc")}
                            sx={{
                              width: "100%",
                              alignContent: "center",
                              padding: "10px",
                            }}
                          >
                            <Typography>
                              Wallet Address:{" "}
                              <span
                                style={{
                                  cursor: "pointer",
                                  border: "0.1px dotted gray",
                                  borderRadius: "10px",
                                  padding: "2px",
                                }}
                                onClick={() => handleCopy(item?.walletAddress)}
                              >
                                {item?.walletAddress}
                              </span>
                            </Typography>
                            <Typography>Network: {item?.network}</Typography>
                            <IconButton
                              onClick={() => {
                                setActive(item);
                                setType2("update");
                                handleOpen();
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setActive(item);
                                setType2("delete");
                                handleOpen();
                              }}
                            >
                              <DeleteIcon sx={{ color: "red" }} />
                            </IconButton>
                          </Paper>
                        );
                      })}
                  </Stack>

                  <div className="row mt-5">
                    <Typography>Create Wallet Address</Typography>
                    <div className="col-lg-12">
                      <div className="form-group" style={{ marginTop: "10px" }}>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="walletAddress"
                          className="input-text"
                          placeholder="Wallet Address"
                          onChange={(e) => setWalletAddress(e.target.value)}
                          value={walletAddress}
                        />
                      </div>
                      <div className="form-group">
                        <select
                          style={{
                            width: "100%",
                            border: "1px solid #beb8b8",
                            height: "50px",
                          }}
                          name="sex"
                          className="input-text"
                          onChange={(e) => setWallet(e.target.value)}
                          value={wallet}
                        >
                          <option value=""> Choose Network</option>
                          <option value="trc20">TRC20</option>
                          <option value="erc20">ERC20</option>
                          <option value="bep20">BEP20</option>
                        </select>
                      </div>
                      <>
                        <button
                          onClick={handleCreateWallet}
                          className="btn-md button-theme btn-block"
                          disabled={submiting}
                          style={{ background: "orange" }}
                        >
                          {submiting ? (
                            <CircularProgress
                              size={20}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            "Create Address"
                          )}
                        </button>
                      </>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <Typography>Create Payment Method</Typography>
                    <div className="col-lg-12">
                      <div className="form-group" style={{ marginTop: "10px" }}>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="name"
                          className="input-text"
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                      </div>
                      <div className="form-group" style={{ marginTop: "10px" }}>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="token"
                          className="input-text"
                          placeholder="key"
                          onChange={(e) => setToken(e.target.value)}
                          value={token}
                        />
                      </div>

                      <>
                        <button
                          onClick={handleCreatePayment}
                          className="btn-md button-theme btn-block"
                          disabled={isSubmiting}
                          style={{ background: "orange" }}
                        >
                          {isSubmiting ? (
                            <CircularProgress
                              size={20}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            "Create Payment Method"
                          )}
                        </button>
                      </>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                      Payment Methods
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {payments.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg mt-2"
                        >
                          <p className="text-lg font-medium text-gray-900">
                            Name: {item?.name}
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              item?.status === "active"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            Status: {item?.status}
                          </p>

                          <div className="flex items-center justify-between mt-4">
                            <p className="text-gray-700">Toggle Status:</p>
                            <IconButton
                              onClick={() =>
                                handleStatus(
                                  item?.status === "active"
                                    ? "disable"
                                    : "active",
                                  item?._id
                                )
                              }
                            >
                              {item?.status === "active" ? (
                                <ToggleOnIcon
                                  sx={{ color: "blue", fontSize: "2em" }}
                                />
                              ) : (
                                <ToggleOffIcon
                                  sx={{ color: "red", fontSize: "2em" }}
                                />
                              )}
                            </IconButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <WalletModal
        open={open}
        setOpen={setOpen}
        activeWallet={active}
        setState={setState}
        setActive={setActive}
      />
    </div>
  );
};

export default Body;
