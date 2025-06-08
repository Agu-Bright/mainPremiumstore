import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius } from "@mui/system";
import { CircularProgress, IconButton, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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

export default function DeleteModal({
  open,
  setOpen,
  active,
  setActive,
  setState,
}) {
  const handleClose = () => setOpen(false);
  const { type } = React.useContext(RestaurantContext);
  React.useEffect(() => {
    return () => {
      setActive();
    };
  }, []);
  const [amount, setAmount] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const handleAccountTopUp = async () => {
    if (!amount) {
      toast.error("Invalid Input", {
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
      await axios.post("/api/admin/deposit", {
        amount: amount,
        user: active?.user?._id,
        method: "Admin_Top_Up",
      });
      toast.error("Successful", {
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
      setOpen(false);
      setState((prev) => !prev);
      setLoading(false);
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
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/delete/${id}`);
      toast.success("user Deleted", {
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
      setOpen(false);
      setState((prev) => !prev);
    } catch (error) {
      toast.error("Error Deleting", {
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
  if (type === "top_up") {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack direction="row" justifyContent="space-between">
              <div></div>
              <IconButton onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </Stack>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Account Topup{" "}
            </Typography>
            <div className="form-group" style={{ marginTop: "10px" }}>
              <input
                style={{ width: "100%" }}
                type="number"
                name="amount"
                className="input-text"
                placeholder="Enter Amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>

            <Stack direction="row" justifyContent="space-between">
              <div></div>
              {!loading ? (
                <button
                  onClick={() => handleAccountTopUp()}
                  style={{
                    color: "white",
                    background: "green",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Top Up
                </button>
              ) : (
                <button
                  style={{
                    color: "white",
                    background: "green",
                    border: "none",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <CircularProgress sx={{ color: "white" }} size={18} />
                </button>
              )}
            </Stack>
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
            <Stack direction="row" justifyContent="space-between">
              <div></div>
              <IconButton onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </Stack>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User Deletion{" "}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure, you want to delete {active?.user?.accountName}{" "}
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <div></div>
              <button
                onClick={() => handleDelete(active?.user?._id)}
                style={{ color: "white", background: "red", border: "none" }}
              >
                Delete
              </button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
}
