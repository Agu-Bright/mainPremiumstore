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
  Divider,
  Button,
} from "@mui/material";
import Swal from "sweetalert2";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import FlutterButton from "@components/FlutterConfig";
import { RestaurantContext } from "@context/RestaurantContext";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ClearIcon from "@mui/icons-material/Clear";
import SquadPayButton from "@components/SquadConfig";
import PaymentButton from "@components/ErcasPay";
import { useSearchParams } from "next/navigation";

import Modal from "@mui/material/Modal";
import { borderRadius } from "@mui/system";
import KorapayComponent from "@components/Korapay";
import SafeHavenCheckoutComponent from "@components/SafeheavenPayment";

const LoadingModal = ({ open, setOpen }) => {
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={(event, reason) => {
          // Prevent closing when clicking outside the modal or pressing escape
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CircularProgress />
          <Typography
            style={{ fontSize: "10px", color: "gray", marginTop: "10px" }}
          >
            Verifying Transaction ...
          </Typography>
          <Typography style={{ color: "red" }}>
            Do not refersh this page
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

function formatDateString(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    return "Invalid date";
  }

  // Define options for formatting the date
  const options = {
    weekday: "long", // Full name of the day of the week (e.g., Monday)
    year: "numeric", // Full numeric representation of the year (e.g., 2021)
    month: "long", // Full name of the month (e.g., January)
    day: "numeric", // Numeric day of the month (e.g., 1)
  };

  // Format the date using the options
  return date.toLocaleDateString("en-US", options);
}

function formatAmountWithCommas(amount) {
  // Convert the amount to a string and use a regular expression to add commas
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const HomeData = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deposits, setDeposits] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState("");
  const [main, setMain] = useState("");
  const [open, setOpen] = useState(false);
  const baseUrl = " https://api.ercaspay.com/api/v1";

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Payment Successful",
      confirmButtonText: "Go to Home",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/user");
      }
    });
  };

  const {
    state,
    setState,
    rate,
    formatMoney,
    formatDollar,
    setActiveLoading,
    amount,
    setAmount,
  } = useContext(RestaurantContext);

  const searchParams = useSearchParams();

  const verifyPayment = async (transactionRef) => {
    setActiveLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/payment/transaction/verify/${transactionRef}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result?.requestSuccessful) {
        try {
          await axios.post("/api/deposit/create-deposit/", {
            amount: result?.responseBody?.amount,
            method: "ErcasPay",
            transactionRef: transactionRef,
          });
          setState((prev) => !prev);
          showSuccessAlert();
          setOpen(false);
          // handleClose();
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            transition: Bounce,
          });
        }
      } else {
        toast.error(result?.responseMessage || "Payment verification failed.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          transition: Bounce,
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      // toast.error("An error occurred during payment verification.", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: true,
      //   transition: Bounce,
      // });
      setOpen(false);
    } finally {
      setActiveLoading(false);
      setOpen(false);
      router.push("/user/add-fund");
    }
  };

  useEffect(() => {
    const transRef = searchParams.get("transRef");
    if (transRef) {
      setOpen(true);
      console.log("THERE IS TRANSACTION REFERENCE");
      verifyPayment(transRef);
    }
  }, [searchParams]);

  const [adminWallet, setAdminWallets] = useState([]);
  const [appState, setAppState] = useState("default");

  const handleScreenshot = () => {
    const el = document.getElementById("screenshot");
    if (el) {
      el.click();
    }
  };

  const handleSubmit = async () => {
    if (!amount && !paymentMethod) {
      toast.error("Amount and Payment Method, Required", {
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
      setLoading(true);
      const { data } = await axios.post("/api/deposit/crypto-deposit/", {
        amount: amount,
        method: "crypto",
        network: main?.network,
        usdt: Number(amount / rate?.rate).toFixed(2),
        screenShot: image,
        status: "pending",
      });
      toast.success("Deposit Successful", {
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
      setLoading(false);
      setAmount("");
      setAppState("default");
      setImage("");
      setAmount("");
    } catch (error) {
      setLoading(false);
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
  const handleSubmit2 = async () => {
    if (!amount && !paymentMethod) {
      toast.error("Amount and Payment Method, Required", {
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
      setLoading(true);
      const { data } = await axios.post("/api/deposit/crypto-deposit/", {
        amount: amount,
        method: "Transfer",
        network: main?.network,
        usdt: "",
        screenShot: image,
        status: "pending",
      });
      toast.success("Deposit Successful", {
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
      setLoading(false);
      setAmount("");
      setAppState("default");
      setImage("");
      setAmount("");
    } catch (error) {
      setLoading(false);
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

  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    appState === "crypto" &&
      (async () => {
        try {
          setFetching(true);
          const { data } = await axios.get(`/api/get-admin-wallet`);
          setAdminWallets(data?.wallets);
          setFetching(false);
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
          setFetching(false);
        }
      })();
  }, [appState]);

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

  const [colorIndex, setColorIndex] = useState(0);
  // Define the colors to cycle through
  const colors = ["red", "blue", "green"];

  // useEffect(() => {
  //   // Change the color every second
  //   const interval = setInterval(() => {
  //     setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  //   }, 1000);

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, [colors.length]);
  const handleClick = () => {
    window.open(
      "https://drive.google.com/file/d/11uFSKv63FEvZ2GoFQbvaAzADjtPDGWSM/view?usp=drivesdk",
      "_blank"
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/deposit/get-my-deposits");
        console.log(data);
        setDeposits(data?.deposits.reverse());
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

  const getColor = (status) => {
    if (status === "success") {
      return "green";
    }
    if (status === "pending") {
      return "orange";
    }
    if (status === "rejected") {
      return "red";
    }
  };

  const [payments, setPayments] = useState();
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
      <NavPage>
        <div class="container">
          <div class="col">
            <div className="col">
              {appState === "default" && (
                <>
                  <form>
                    <p class="mt-3" style={{ fontWeight: "700" }}>
                      Top up your wallet easily using Bank Transfer or Crypto
                    </p>

                    <div class="card" style={{ marginBottom: "20px" }}>
                      <div class="card-body">
                        <h6 style={{ fontWeight: "700" }}>
                          Enter Amount (NGN)
                        </h6>
                        <input
                          style={{ margin: "10px 0px" }}
                          placeholder="Enter amount"
                          type="number"
                          name="amount"
                          onChange={(e) => setAmount(e.target.value)}
                          value={amount}
                          class="text-dark p-2 form-control inputField"
                          required=""
                        />
                      </div>
                    </div>
                  </form>
                  {amount && (
                    <>
                      {payments &&
                        payments.map((item, index) => {
                          if (item.status === "active")
                            return (
                              <div key={index}>
                                {item.name === "kora" && (
                                  <button
                                    onClick={() => router.push("/user/korapay")}
                                    className="btn-md btn-block flutter_style"
                                  >
                                    Pay with Transfer!
                                  </button>
                                )}
                                {item.name === "squad" && (
                                  <SquadPayButton
                                    amount={amount}
                                    session={session}
                                  />
                                )}
                              </div>
                            );
                        })}
                    </>
                  )}
                  {/* {amount && (
                    <SafeHavenCheckoutComponent
                      amount={amount}
                      session={session}

                    />
                  )} */}
                  {/* {amount && (
                    <FlutterButton amount={amount} session={session} />
                  )}{" "} */}
                  {/* {amount && (
                    <>
                      <Typography
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCopy("0279099194")}
                      >
                        Click to copy Number
                      </Typography>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "400px",
                            height: "auto",
                          }}
                        >
                          <img
                            src="/img/opay.jpg"
                            alt="payment"
                            style={{ width: "100%", height: "100%" }}
                            onClick={() => handleCopy("6113479018")}
                          />
                        </div>
                      </div>
                      <button
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          padding: "10px 0px",
                          background:
                            "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                          border: "none",
                          borderRadius: "10px",
                          color: "white",
                        }}
                        onClick={handleScreenshot}
                      >
                        Upload Screenshot
                      </button>
                      <input
                        type="file"
                        id="screenshot"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          const file = e.target?.files;
                          if (file) {
                            try {
                              setUploading(true);
                              const { data } = await axios.post(
                                "/api/cloudinaryupload/profile",
                                file
                              );
                              setImage(data?.photosArray[0].url);
                              setUploading(false);
                            } catch (error) {
                              setUploading(false);
                              toast.error("Unable to upload", {
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
                          }
                        }}
                      />
                      <div style={{ marginTop: "10px" }}>
                        {uploading ? (
                          <div
                            style={{
                              width: "150px",
                              height: "150px",
                              border: "0.1px solid #cacecf",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "5px",
                            }}
                          >
                            <CircularProgress
                              sx={{ color: "rgba(0,212,255,1)" }}
                            />
                          </div>
                        ) : (
                          <>
                            {image && (
                              <>
                                <Avatar
                                  src={image}
                                  alt="screendhot"
                                  sx={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "5px",
                                  }}
                                />
                                <button
                                  style={{
                                    background:
                                      "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                                    border: "none",
                                    padding: "2px 4px",
                                    borderRadius: "10px",
                                    marginTop: "10px",
                                    color: "white",
                                  }}
                                  onClick={handleSubmit2}
                                >
                                  Submit
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )} */}
                  {/* {amount && (
                    <SquadPayButton amount={amount} session={session} />
                  )} */}
                  {/* {amount && (
                    <KorapayComponent amount={amount} session={session} />
                  )} */}
                  {/* {amount && (
                    <button
                      onClick={() => router.push("/user/korapay")}
                      className="btn-md btn-block flutter_style"
                    >
                      Pay with Transfer!
                    </button>
                  )} */}
                  {/* <p style={{ textAlign: "center" }}>------- OR ------- </p>
                   {amount && (
                    <PaymentButton amount={amount} session={session} />
                  )}  */}
                  {/* {activeLoading ? (
                    <CircularProgress size={15} sx={{ color: "blue" }} />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      {amount && (
                        <Stack direction="column">
                          <PaymentButton amount={amount} session={session} />
                          <Typography sx={{ color: "red", marginTop: "5px" }}>
                            Pls After making payment, wait to be redirected back
                            to our platform (Don't refresh or leave the page)
                          </Typography>
                        </Stack>
                      )}
                    </div>
                  )} */}
                  {/* {amount ? (
                    <p style={{ textAl  ign: "center" }}>------- OR ------- </p>
                  ) : (
                    ""
                  )} */}
                  {amount && (
                    <button
                      onClick={() => setAppState("crypto")}
                      className="btn-md btn-block button_style"
                    >
                      Pay With Crypto
                    </button>
                  )}{" "}
                </>
              )}
              {appState === "crypto" && (
                <>
                  <div
                    style={{
                      border: "1px dotted gray",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <div></div>
                      <IconButton
                        onClick={() => {
                          setImage("");
                          setAppState("default");
                          setAmount("");
                        }}
                      >
                        <ClearIcon sx={{ color: "red" }} />
                      </IconButton>
                    </Stack>
                    <Box>
                      <Typography>
                        Payment Amount: {formatMoney(amount)}
                      </Typography>
                      <Typography>
                        Exchange Rate: {formatMoney(rate?.rate)}
                      </Typography>
                      <Typography style={{ color: "green", fontWeight: "800" }}>
                        USDT Equivalent:{" "}
                        {formatDollar(Number(amount / rate?.rate).toFixed(2))}
                      </Typography>
                    </Box>
                    <Typography style={{ fontWeight: "800", marginTop: "5px" }}>
                      Select Network
                    </Typography>
                    <Stack
                      spacing={2}
                      direction="column"
                      justifyContent="space-between"
                    >
                      {adminWallet &&
                        adminWallet.length > 0 &&
                        adminWallet.map((item, index) => {
                          return (
                            <Paper
                              key={index}
                              onClick={() => {
                                setActive(item?.network);
                                setMain(item);
                                setPaymentMethod(item?.network);
                              }}
                              sx={{
                                width: "100%",
                                alignContent: "center",
                                padding: "10px",
                                cursor: "pointer",
                                background: `${
                                  active === item?.network
                                    ? "linear-gradient(90deg, #efeff4 0%, #e8e7f2 35%, #d3e5e8 100%)"
                                    : "white"
                                }`,
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "black",
                                }}
                              >
                                Network: {item?.network}
                              </Typography>
                            </Paper>
                          );
                        })}

                      {fetching && (
                        <CircularProgress size={20} sx={{ color: "#8075f" }} />
                      )}
                      {main?.walletAddress && (
                        <>
                          <Typography
                            sx={{
                              cursor: "pointer",
                              border: "0.1px dotted gray",
                              borderRadius: "10px",
                              padding: "0px",
                              margin: "0px",
                            }}
                            onClick={() => handleCopy(main?.walletAddress)}
                          >
                            <span
                              style={{
                                background: "gray",
                                color: "white",
                                borderTopLeftRadius: "10px",
                                borderBottomLeftRadius: "10px",
                                height: "100%",
                                paddingRight: "4px",
                              }}
                            >
                              copy:
                            </span>
                            <span>{main?.walletAddress}</span>
                          </Typography>
                          <Typography>
                            Upload a screenshot of your transaction to verify
                            deposit
                          </Typography>
                          <button
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                              border: "none",
                              borderRadius: "10px",
                              color: "white",
                            }}
                            onClick={handleScreenshot}
                          >
                            Upload Screenshot
                          </button>
                          <input
                            type="file"
                            id="screenshot"
                            style={{ display: "none" }}
                            onChange={async (e) => {
                              const file = e.target?.files;
                              if (file) {
                                try {
                                  setUploading(true);
                                  const { data } = await axios.post(
                                    "/api/cloudinaryupload/profile",
                                    file
                                  );
                                  setImage(data?.photosArray[0].url);
                                  setUploading(false);
                                } catch (error) {
                                  setUploading(false);
                                  toast.error("Unable to upload", {
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
                              }
                            }}
                          />
                          <div style={{ marginTop: "10px" }}>
                            {uploading ? (
                              <div
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  border: "0.1px solid #cacecf",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "5px",
                                }}
                              >
                                <CircularProgress
                                  sx={{ color: "rgba(0,212,255,1)" }}
                                />
                              </div>
                            ) : (
                              <>
                                {image && (
                                  <>
                                    <Avatar
                                      src={image}
                                      alt="screendhot"
                                      sx={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                    <button
                                      style={{
                                        background:
                                          "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                                        border: "none",
                                        padding: "2px 4px",
                                        borderRadius: "10px",
                                        marginTop: "10px",
                                        color: "white",
                                      }}
                                      onClick={handleSubmit}
                                    >
                                      Submit
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Stack>
                  </div>
                </>
              )}
            </div>

            <Divider sx={{ margin: "20px 0px" }} />
            <Stack direction="row" alignItems="center">
              <Typography sx={{ marginRight: "10px" }}>
                Deposit Tutorial video{" "}
              </Typography>

              <IconButton
                onClick={handleClick}
                sx={{ color: colors[colorIndex] }}
              >
                <PlayCircleFilledWhiteIcon />
              </IconButton>
            </Stack>

            <Stack
              direction="column"
              alignItems="center"
              sx={{ width: "100%", marginTop: "20px" }}
            >
              <div style={{ width: "100%" }}>
                <h5
                  class="mt-4 mb-4"
                  style={{
                    background: "#8075ff",
                    padding: "8px",
                    borderRadius: "5px",
                    color: "white",
                    wdth: "100%",
                  }}
                >
                  Latest Payments History
                </h5>
                {deposits && deposits.length === 0 && (
                  <div class="card">
                    <div class="card-body text-center p-4">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.699126 22.1299L11.4851 0.936473C11.6065 0.697285 11.7856 0.49768 12.0036 0.358621C12.2215 0.219562 12.4703 0.146179 12.7237 0.146179C12.9772 0.146179 13.2259 0.219562 13.4439 0.358621C13.6618 0.49768 13.841 0.697285 13.9624 0.936473L24.7483 22.1299C24.8658 22.3607 24.9253 22.6205 24.9209 22.8835C24.9165 23.1466 24.8484 23.4039 24.7234 23.6301C24.5983 23.8562 24.4206 24.0434 24.2078 24.1732C23.995 24.303 23.7543 24.3708 23.5097 24.3701H1.93781C1.69314 24.3708 1.45252 24.303 1.23968 24.1732C1.02684 24.0434 0.849131 23.8562 0.724084 23.6301C0.599037 23.4039 0.530969 23.1466 0.526592 22.8835C0.522216 22.6205 0.581682 22.3607 0.699126 22.1299ZM14.2252 14.2749L14.9815 9.39487C15.0039 9.25037 14.9967 9.10237 14.9605 8.96116C14.9243 8.81995 14.8599 8.6889 14.7719 8.57713C14.6838 8.46536 14.5742 8.37554 14.4506 8.31391C14.327 8.25228 14.1925 8.22033 14.0563 8.22026H11.3912C11.255 8.22033 11.1204 8.25228 10.9969 8.31391C10.8733 8.37554 10.7637 8.46536 10.6756 8.57713C10.5876 8.6889 10.5232 8.81995 10.487 8.96116C10.4508 9.10237 10.4436 9.25037 10.466 9.39487L11.2223 14.2749H14.2252ZM14.7882 18.1096C14.7882 17.5208 14.5707 16.9561 14.1835 16.5398C13.7964 16.1234 13.2713 15.8895 12.7237 15.8895C12.1762 15.8895 11.6511 16.1234 11.2639 16.5398C10.8768 16.9561 10.6593 17.5208 10.6593 18.1096C10.6593 18.6984 10.8768 19.2631 11.2639 19.6794C11.6511 20.0957 12.1762 20.3296 12.7237 20.3296C13.2713 20.3296 13.7964 20.0957 14.1835 19.6794C14.5707 19.2631 14.7882 18.6984 14.7882 18.1096Z"
                          fill="#EA4335"
                        ></path>
                      </svg>
                      <br />
                      <br />

                      <h6>No data found</h6>
                    </div>
                  </div>
                )}
              </div>
              {deposits &&
                deposits.map((item, index) => {
                  return (
                    <Paper
                      key={index}
                      sx={{
                        padding: "10px",
                        marginBottom: "10px",
                        width: "99%",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontWeight: "600" }}>
                          Deposit
                        </Typography>
                        <Typography sx={{ fontWeight: "600" }}>
                          ₦ {formatAmountWithCommas(item?.amount)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ color: "gray" }}>
                          {formatDateString(item?.createdAt)}
                        </Typography>
                        <Typography sx={{ color: getColor(item?.status) }}>
                          <span style={{ color: "black" }}>
                            Approval Status:
                          </span>{" "}
                          {item?.status}
                        </Typography>
                      </Stack>
                    </Paper>
                  );
                })}
            </Stack>
            <LoadingModal open={open} setOpen={setOpen} />
          </div>
        </div>
      </NavPage>
    );
};

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeData />
    </Suspense>
  );
}
