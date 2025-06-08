import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
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

export default function BasicModal({ open, setOpen, activeOrder }) {
  const handleClose = () => setOpen(false);
  activeOrder && console.log(activeOrder);
  const handleCopy = (address) => {
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
            Ordered Logs{" "}
          </Typography>
          <Stack direction="column" spacing={2}>
            <div
              style={{
                height: "60vh",
                overflowY: "scroll",
              }}
            >
              {activeOrder &&
                activeOrder?.map((item) => (
                  <Stack
                    direction="row"
                    sx={{
                      border: "0.1px solid gray",
                      padding: "5px",
                      borderRadius: "5px",
                      marginBottom: "2px",
                    }}
                  >
                    <Typography
                      sx={{
                        overflowX: "scroll",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        cursor: "pointer",
                      }}
                    >
                      {item?.log}
                    </Typography>
                    <IconButton onClick={() => handleCopy(item?.log)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Stack>
                ))}
            </div>
          </Stack>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
