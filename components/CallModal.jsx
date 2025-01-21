import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { borderRadius } from "@mui/system";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function Call({ open, setOpen }) {
  const handleClose = () => setOpen(false);

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
            Contact Us{" "}
          </Typography>
          <List>
            <ListItem
              // onClick={() => signOut()}
              sx={{ cursor: "pointer" }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <ArrowForwardIosIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  style={{ borderRadius: "0px" }}
                  src="/img/operator.png"
                  alt="profile"
                />
              </ListItemAvatar>
              <ListItemText primary="Online Service" secondary="10.00:23:59" />
            </ListItem>
          </List>
        </Box>
      </Modal>
    </div>
  );
}
