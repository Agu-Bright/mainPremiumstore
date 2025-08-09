"use client";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Components
import NavPage from "@components/navPage/NavPage";
import FlutterButton from "@components/FlutterConfig";
import SquadPayButton from "@components/SquadConfig";
import PaymentButton from "@components/ErcasPay";
import KorapayComponent from "@components/Korapay";
import SafeHavenCheckoutComponent from "@components/SafeheavenPayment";

// Context
import { RestaurantContext } from "@context/RestaurantContext";

// UI Components
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Divider,
  Modal,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ClearIcon from "@mui/icons-material/Clear";

// Toast
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styles
import "./style.css";
import ErcasPay from "@components/ErcasPay";

// Constants
const PAYMENT_STATUS_COLORS = {
  success: "green",
  pending: "orange",
  rejected: "red",
};

const MODAL_STYLE = {
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

// Utility Functions
const formatDateString = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatAmountWithCommas = (amount) => {
  return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

const getStatusColor = (status) => PAYMENT_STATUS_COLORS[status] || "gray";

// Components
const LoadingModal = ({ open, setOpen }) => (
  <Modal
    open={open}
    onClose={(event, reason) => {
      if (reason === "backdropClick" || reason === "escapeKeyDown") return;
      setOpen(false);
    }}
  >
    <Box sx={MODAL_STYLE}>
      <CircularProgress />
      <Typography sx={{ fontSize: "10px", color: "gray", marginTop: "10px" }}>
        Verifying Transaction...
      </Typography>
      <Typography sx={{ color: "red" }}>Do not refresh this page</Typography>
    </Box>
  </Modal>
);

const CryptoPaymentSection = ({
  amount,
  appState,
  setAppState,
  adminWallet,
  fetching,
  active,
  setActive,
  main,
  setMain,
  setPaymentMethod,
  handleCopy,
  image,
  setImage,
  uploading,
  setUploading,
  handleSubmit,
  rate,
  formatMoney,
  formatDollar,
  setAmount,
}) => {
  const handleScreenshot = () => {
    document.getElementById("screenshot")?.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target?.files;
    if (!file) return;

    try {
      setUploading(true);
      const { data } = await axios.post("/api/cloudinaryupload/profile", file);
      setImage(data?.photosArray[0].url);
    } catch (error) {
      toast.error("Unable to upload", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
    } finally {
      setUploading(false);
    }
  };

  if (appState !== "crypto") return null;

  return (
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
        <Typography>Payment Amount: {formatMoney(amount)}</Typography>
        <Typography>Exchange Rate: {formatMoney(rate?.rate)}</Typography>
        <Typography sx={{ color: "green", fontWeight: "800" }}>
          USDT Equivalent:{" "}
          {formatDollar(Number(amount / rate?.rate).toFixed(2))}
        </Typography>
      </Box>

      <Typography sx={{ fontWeight: "800", marginTop: "5px" }}>
        Select Network
      </Typography>

      <Stack spacing={2} direction="column" justifyContent="space-between">
        {adminWallet?.map((item, index) => (
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
              background:
                active === item?.network
                  ? "linear-gradient(90deg, #efeff4 0%, #e8e7f2 35%, #d3e5e8 100%)"
                  : "white",
            }}
          >
            <Typography sx={{ color: "black" }}>
              Network: {item?.network}
            </Typography>
          </Paper>
        ))}

        {fetching && <CircularProgress size={20} sx={{ color: "#8075ff" }} />}

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
              Upload a screenshot of your transaction to verify deposit
            </Typography>

            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                padding: "10px",
              }}
              onClick={handleScreenshot}
            >
              Upload Screenshot
            </button>

            <input
              type="file"
              id="screenshot"
              style={{ display: "none" }}
              onChange={handleFileUpload}
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
                  <CircularProgress sx={{ color: "rgba(0,212,255,1)" }} />
                </div>
              ) : (
                image && (
                  <>
                    <Avatar
                      src={image}
                      alt="screenshot"
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
                        padding: "10px 20px",
                        borderRadius: "10px",
                        marginTop: "10px",
                        color: "white",
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </>
                )
              )}
            </div>
          </>
        )}
      </Stack>
    </div>
  );
};

const PaymentMethodButtons = ({ amount, session, payments, router }) => {
  if (!amount) return null;

  return (
    <>
      {payments?.map((item, index) => {
        if (item.status !== "active") return null;

        return (
          <div key={index}>
            {/* {item.name === "kora" && (
              <button
                onClick={() => router.push("/user/korapay")}
                className="btn-md btn-block flutter_style"
              >
                Pay with Transfer!
              </button>
            )} */}
            {/* {item.name === "squad" && (
              <SquadPayButton amount={amount} session={session} />
            )} */}
            {item.name === "ercaspay" && (
              <ErcasPay amount={amount} session={session} />
            )}
          </div>
        );
      })}
    </>
  );
};

const DepositHistory = ({ deposits }) => (
  <Stack
    direction="column"
    alignItems="center"
    sx={{ width: "100%", marginTop: "20px" }}
  >
    <div style={{ width: "100%" }}>
      <h5
        className="mt-4 mb-4"
        style={{
          background: "#8075ff",
          padding: "8px",
          borderRadius: "5px",
          color: "white",
          width: "100%",
        }}
      >
        Latest Payments History
      </h5>

      {deposits?.length === 0 ? (
        <div className="card">
          <div className="card-body text-center p-4">
            <svg width="40" height="40" viewBox="0 0 25 25" fill="none">
              <path
                d="M0.699126 22.1299L11.4851 0.936473C11.6065 0.697285 11.7856 0.49768 12.0036 0.358621C12.2215 0.219562 12.4703 0.146179 12.7237 0.146179C12.9772 0.146179 13.2259 0.219562 13.4439 0.358621C13.6618 0.49768 13.841 0.697285 13.9624 0.936473L24.7483 22.1299C24.8658 22.3607 24.9253 22.6205 24.9209 22.8835C24.9165 23.1466 24.8484 23.4039 24.7234 23.6301C24.5983 23.8562 24.4206 24.0434 24.2078 24.1732C23.995 24.303 23.7543 24.3708 23.5097 24.3701H1.93781C1.69314 24.3708 1.45252 24.303 1.23968 24.1732C1.02684 24.0434 0.849131 23.8562 0.724084 23.6301C0.599037 23.4039 0.530969 23.1466 0.526592 22.8835C0.522216 22.6205 0.581682 22.3607 0.699126 22.1299ZM14.2252 14.2749L14.9815 9.39487C15.0039 9.25037 14.9967 9.10237 14.9605 8.96116C14.9243 8.81995 14.8599 8.6889 14.7719 8.57713C14.6838 8.46536 14.5742 8.37554 14.4506 8.31391C14.327 8.25228 14.1925 8.22033 14.0563 8.22026H11.3912C11.255 8.22033 11.1204 8.25228 10.9969 8.31391C10.8733 8.37554 10.7637 8.46536 10.6756 8.57713C10.5876 8.6889 10.5232 8.81995 10.487 8.96116C10.4508 9.10237 10.4436 9.25037 10.466 9.39487L11.2223 14.2749H14.2252ZM14.7882 18.1096C14.7882 17.5208 14.5707 16.9561 14.1835 16.5398C13.7964 16.1234 13.2713 15.8895 12.7237 15.8895C12.1762 15.8895 11.6511 16.1234 11.2639 16.5398C10.8768 16.9561 10.6593 17.5208 10.6593 18.1096C10.6593 18.6984 10.8768 19.2631 11.2639 19.6794C11.6511 20.0957 12.1762 20.3296 12.7237 20.3296C13.2713 20.3296 13.7964 20.0957 14.1835 19.6794C14.5707 19.2631 14.7882 18.6984 14.7882 18.1096Z"
                fill="#EA4335"
              />
            </svg>
            <br />
            <br />
            <h6>No data found</h6>
          </div>
        </div>
      ) : (
        deposits?.map((item, index) => (
          <Paper
            key={index}
            sx={{ padding: "10px", marginBottom: "10px", width: "99%" }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: "600" }}>Deposit</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                ₦ {formatAmountWithCommas(item?.amount)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: "gray" }}>
                {formatDateString(item?.createdAt)}
              </Typography>
              <Typography sx={{ color: getStatusColor(item?.status) }}>
                <span style={{ color: "black" }}>Approval Status:</span>{" "}
                {item?.status}
              </Typography>
            </Stack>
          </Paper>
        ))
      )}
    </div>
  </Stack>
);

const HomeData = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("session", session);

  // Context
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

  // State
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deposits, setDeposits] = useState([]);
  const [image, setImage] = useState("");
  const [active, setActive] = useState("");
  const [main, setMain] = useState("");
  const [open, setOpen] = useState(false);
  const [adminWallet, setAdminWallets] = useState([]);
  const [appState, setAppState] = useState("default");
  const [fetching, setFetching] = useState(false);
  const [payments, setPayments] = useState([]);

  // Memoized values
  const baseUrl = useMemo(() => "https://api.ercaspay.com/api/v1", []);

  // Callbacks
  const showSuccessAlert = useCallback(() => {
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
  }, [router]);

  const handleCopy = useCallback((address) => {
    if (!address) return;

    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Copied to Clipboard", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Bounce,
        });
      })
      .catch(() => {
        toast.error("Copy failed", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Bounce,
        });
      });
  }, []);

  const verifyPayment = useCallback(
    async (transactionRef) => {
      if (!transactionRef) {
        toast.error("No transaction reference provided.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          transition: Bounce,
        });
        return;
      }

      try {
        // setActiveLoading(true);

        // Backend handles verification and deposit creation
        const response = await axios.post("/api/payment/verify-ercaspay", {
          transactionRef: transactionRef,
          _session: session?.user?.id,
        });

        const result = response.data;

        if (result?.success) {
          toast.success("Payment verified and deposit successful!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            transition: Bounce,
          });

          setState((prev) => !prev);
          setOpen(false);

          // Remove query parameters from URL
          router.replace("/user/add-fund");
        } else {
          throw new Error(result?.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("Payment Verification Error:", error);

        let errorMessage =
          "Payment verification failed. Please contact support.";

        if (error.response?.status === 409) {
          errorMessage = "This transaction has already been processed.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          transition: Bounce,
        });
      } finally {
        setActiveLoading(false);
      }
    },
    [
      baseUrl,
      session?.user?.id,
      setState,
      showSuccessAlert,
      setActiveLoading,
      router,
    ]
  );

  const handleSubmit = useCallback(async () => {
    if (!amount || !paymentMethod) {
      toast.error("Amount and Payment Method Required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/deposit/crypto-deposit/", {
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
        transition: Bounce,
      });

      setState((prev) => !prev);
      setAmount("");
      setAppState("default");
      setImage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Deposit failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  }, [
    amount,
    paymentMethod,
    main?.network,
    rate?.rate,
    image,
    setState,
    setAmount,
  ]);

  const handleClick = useCallback(() => {
    window.open(
      "https://drive.google.com/file/d/11uFSKv63FEvZ2GoFQbvaAzADjtPDGWSM/view?usp=drivesdk",
      "_blank"
    );
  }, []);

  const processedTransactions = useRef(new Set());

  useEffect(() => {
    const transRef = searchParams.get("transRef");
    if (transRef && !processedTransactions.current.has(transRef)) {
      processedTransactions.current.add(transRef);
      verifyPayment(transRef);
    }
  }, [searchParams, verifyPayment]);

  useEffect(() => {
    if (appState === "crypto") {
      const fetchAdminWallet = async () => {
        try {
          setFetching(true);
          const { data } = await axios.get("/api/get-admin-wallet");
          setAdminWallets(data?.wallets);
        } catch (error) {
          toast.error("Unable to fetch Wallet", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            transition: Bounce,
          });
        } finally {
          setFetching(false);
        }
      };
      fetchAdminWallet();
    }
  }, [appState]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const { data } = await axios.get("/api/deposit/get-my-deposits");
        setDeposits(data?.deposits?.reverse() || []);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch deposits",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            transition: Bounce,
          }
        );
      }
    };
    fetchDeposits();
  }, [state]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get("/api/get-payment");
        setPayments(data?.payments || []);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch payments",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            transition: Bounce,
          }
        );
      }
    };
    fetchPayments();
  }, []);

  // Loading states
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
    return null;
  }

  return (
    <NavPage>
      <div className="container">
        <div className="col">
          <div className="col">
            {appState === "default" && (
              <>
                <form>
                  <p className="mt-3" style={{ fontWeight: "700" }}>
                    Top up your wallet easily using Bank Transfer or Crypto
                  </p>

                  <div className="card" style={{ marginBottom: "20px" }}>
                    <div className="card-body">
                      <h6 style={{ fontWeight: "700" }}>Enter Amount (NGN)</h6>
                      <input
                        style={{ margin: "10px 0px" }}
                        placeholder="Enter amount"
                        type="number"
                        name="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        className="text-dark p-2 form-control inputField"
                        required
                      />
                    </div>
                  </div>
                </form>

                <PaymentMethodButtons
                  amount={amount}
                  session={session}
                  payments={payments}
                  router={router}
                />

                {amount && (
                  <button
                    onClick={() => setAppState("crypto")}
                    className="btn-md btn-block button_style"
                  >
                    Pay With Crypto
                  </button>
                )}
              </>
            )}

            <CryptoPaymentSection
              amount={amount}
              appState={appState}
              setAppState={setAppState}
              adminWallet={adminWallet}
              fetching={fetching}
              active={active}
              setActive={setActive}
              main={main}
              setMain={setMain}
              setPaymentMethod={setPaymentMethod}
              handleCopy={handleCopy}
              image={image}
              setImage={setImage}
              uploading={uploading}
              setUploading={setUploading}
              handleSubmit={handleSubmit}
              rate={rate}
              formatMoney={formatMoney}
              formatDollar={formatDollar}
              setAmount={setAmount}
            />
          </div>

          <Divider sx={{ margin: "20px 0px" }} />

          <Stack direction="row" alignItems="center">
            <Typography sx={{ marginRight: "10px" }}>
              Deposit Tutorial video
            </Typography>
            <IconButton onClick={handleClick} sx={{ color: "blue" }}>
              <PlayCircleFilledWhiteIcon />
            </IconButton>
          </Stack>

          <DepositHistory deposits={deposits} />
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
