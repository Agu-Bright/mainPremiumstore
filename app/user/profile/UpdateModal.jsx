"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Divider } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function BasicModal({ handleOpen, open, setOpen, title }) {
  const handleClose = () => setOpen(false);
  const { data: session, update } = useSession();

  //===================================handle password=================================
  const [isSubmitting, setIsSubmiting] = React.useState(false);
  const [passwordUpdate, setPasswordUpdate] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordUpdate = async (type) => {
    if (type === "profile") {
      if (!phoneNumber) {
        toast.error("Phone Number is required", {
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
        const { data } = await axios.put(`/api/auth/update`, {
          phoneNumber: phoneNumber,
        });
        setIsSubmiting(false);
        toast.success("phone Number updated", {
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
        await update({
          ...session,
          user: {
            ...session.user,
            phoneNumber: phoneNumber,
          },
        });
        setPhoneNumber("");
        handleClose();
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
        console.log(error);
      }
    } else {
      if (
        !passwordUpdate.oldPassword &&
        !passwordUpdate.newPassword &&
        !passwordUpdate.confirmNewPassword
      ) {
        toast.error("Every Detail is required", {
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
        const { data } = await axios.post(
          type === "password"
            ? `/api/auth/password-update`
            : `/api/auth/withdrawal-password`,
          passwordUpdate
        );
        console.log(data);
        setIsSubmiting(false);
        toast.success(
          type === "password"
            ? "Password Updated"
            : "Withdrawal Password Updated",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        setPasswordUpdate({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        handleClose();
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
        console.log(error);
      }
    }
  };
  //===================================handle profile update=================================
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handleChange = (e) => {
    if (
      e.target.name === "oldPassword" ||
      e.target.name === "newPassword" ||
      e.target.name === "confirmNewPassword"
    ) {
      setPasswordUpdate((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
    if (e.target.name === "phoneNumber") {
      const numericPattern = /^-?\d+(\.\d+)?$/;
      if (numericPattern.test(e.target.value)) {
        setPhoneNumber(e.target.value);
      } else {
        console.log("null");
        setPhoneNumber("");
        return;
      }
    }
  };

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
            {title}{" "}
          </Typography>

          {(title === "Update Password" ||
            title === "Update Withdrawal Password") && (
            <>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <input
                  style={{ width: "100%" }}
                  type="password"
                  name="oldPassword"
                  className="input-text"
                  placeholder={
                    title === "Update Password"
                      ? "Current Password"
                      : "Current Withdrawal Password"
                  }
                  onChange={handleChange}
                  value={passwordUpdate.oldPassword}
                />
              </div>
              <Divider sx={{ margin: "10px 0px" }} />
              <div className="form-group" style={{ marginTop: "10px" }}>
                <input
                  style={{ width: "100%" }}
                  type="password"
                  name="newPassword"
                  className="input-text"
                  placeholder={
                    title === "Update Password"
                      ? "New Password"
                      : "New Withdrawal Password"
                  }
                  onChange={handleChange}
                  value={passwordUpdate.newPassword}
                />
              </div>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <input
                  style={{ width: "100%" }}
                  type="password"
                  name="confirmNewPassword"
                  className="input-text"
                  placeholder={
                    title === "Update Password"
                      ? "Confirm New Password"
                      : "Confirm New Withdrawal Password"
                  }
                  onChange={handleChange}
                  value={passwordUpdate.confirmNewPassword}
                />
              </div>
              <div className="form-group mb-0">
                <button
                  style={{ background: "#8075ff", color: "white" }}
                  onClick={() =>
                    handlePasswordUpdate(
                      title === "Update Password" ? "password" : "withdrawal"
                    )
                  }
                  className="btn-md button-theme btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </>
          )}
          {/* {title === "Update Profile" && (
            <>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="phoneNumber"
                  className="input-text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={phoneNumber || session?.user?.phoneNumber}
                />
              </div>
              <div className="form-group mb-0">
                <button
                  onClick={() => handlePasswordUpdate("profile")}
                  className="btn-md button-theme btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Update Number"
                  )}
                </button>
              </div>
            </>
          )} */}
        </Box>
      </Modal>
    </div>
  );
}
