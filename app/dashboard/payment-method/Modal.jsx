import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Stack } from "@mui/material";
import { borderRadius } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function WalletModal({
  open,
  setOpen,
  activeWallet,
  setState,
  setActive,
}) {
  const handleClose = () => setOpen(false);
  const [walletAddress, setWalletAddress] = React.useState("");
  const [submiting, setSubmiting] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const { type2, setType2 } = React.useContext(RestaurantContext);
  const [rate, setRate] = React.useState("");
  const [percentage, setPercentage] = React.useState("");

  const hanedleUpload = async () => {
    if (!rate && !percentage) {
      toast.error("Rate value is required", {
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
      return;
    }
    try {
      setSubmiting(true);
      const payload = {};
      if (rate) {
        payload.rate = rate;
      }
      if (percentage) {
        payload.percentage = percentage;
      }

      const { data } = await axios.post(`/api/admin-upload-rate`, payload);
      if (data?.success) {
        toast.success("Success", {
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
      setState((prev) => !prev);
      setSubmiting(false);
      setType2("");
      setRate("");
      setOpen(false);
    } catch (error) {
      setSubmiting(false);
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
  };
  React.useEffect(() => {
    return () => {
      setActive("");
    };
  }, []);
  const handleUpdateWalletAddress = async () => {
    try {
      setSubmiting(true);
      const { data } = await axios.post(`/api/admin-update-wallet`, {
        network: activeWallet?.network,
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
          theme: "dark",
          transition: Bounce,
        });
      }
      setState((prev) => !prev);
      setSubmiting(false);
      setActive("");
      setType2("");
      setWalletAddress("");
      setOpen(false);
    } catch (error) {
      setSubmiting(false);
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
  };
  const handleDeleteWalletAddress = async (active) => {
    try {
      setDeleting(true);
      const { data } = await axios.delete(
        `/api/admin-delete-wallet/${activeWallet?._id}`,
        {}
      );
      if (data?.success) {
        toast.success("Success", {
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
      setState((prev) => !prev);
      setDeleting(false);
      setActive("");
      setType2("");
      setOpen(false);
    } catch (error) {
      setDeleting(false);
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
  };

  if (type2 === "delete") {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Wallet Address{" "}
            </Typography>
            <div className="row">
              <div className="col-lg-12">
                <Typography>
                  Are you sure you want to delete this Wallet Address
                </Typography>
                <Stack>
                  <button
                    onClick={() => {
                      setType2("");
                      setActive("");
                      setOpen(false);
                    }}
                    className="btn-md button-theme btn-block"
                    //   disabled={submiting}
                    style={{ color: "red" }}
                  >
                    cancel
                  </button>
                  <button
                    onClick={handleDeleteWalletAddress}
                    className="btn-md button-theme btn-block"
                    //   disabled={submiting}
                    style={{ background: "orange" }}
                  >
                    {deleting ? (
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </Stack>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
  if (type2 === "exchangeRate") {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Exchange Rate{" "}
            </Typography>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group" style={{ marginTop: "10px" }}>
                  <input
                    style={{ width: "100%" }}
                    type="number"
                    name="rate"
                    className="input-text"
                    placeholder="Enter Current Rate"
                    onChange={(e) => setRate(e.target.value)}
                    value={rate}
                  />
                </div>
                <div className="form-group" style={{ marginTop: "10px" }}>
                  <input
                    style={{ width: "100%" }}
                    type="number"
                    name="percentage"
                    className="input-text"
                    placeholder="Enter Percentage"
                    onChange={(e) => setPercentage(e.target.value)}
                    value={percentage}
                  />
                </div>
                <Stack>
                  <button
                    onClick={() => {
                      setType2("");
                      setActive("");
                      setOpen(false);
                    }}
                    className="btn-md button-theme btn-block"
                    //   disabled={submiting}
                    style={{ color: "red" }}
                  >
                    cancel
                  </button>
                  <button
                    onClick={hanedleUpload}
                    className="btn-md button-theme btn-block"
                    //   disabled={submiting}
                    style={{ background: "orange" }}
                  >
                    {submiting ? (
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    ) : (
                      "Upload"
                    )}
                  </button>
                </Stack>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  } else
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Wallet Address{" "}
            </Typography>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group" style={{ marginTop: "10px" }}>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    name="walletAddress"
                    className="input-text"
                    placeholder="Wallet Address"
                    onChange={(e) => setWalletAddress(e.target.value)}
                    //   onChange={(e) => setWalletAddress(e.target.value)}
                    value={walletAddress || activeWallet?.walletAddress}
                  />
                </div>
                <div className="form-group" style={{ display: "flex" }}>
                  <h5>Wallet Network:</h5>{" "}
                  <Typography
                    style={{ fontWeight: "800", paddingLeft: "15px" }}
                  >
                    {activeWallet?.network}
                  </Typography>
                </div>
                <>
                  <button
                    onClick={handleUpdateWalletAddress}
                    className="btn-md button-theme btn-block"
                    //   disabled={submiting}
                    style={{ background: "orange" }}
                  >
                    {submiting ? (
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    ) : (
                      "Update"
                    )}
                  </button>
                </>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
}
