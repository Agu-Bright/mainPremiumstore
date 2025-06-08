import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RestaurantContext } from "@context/RestaurantContext";

const options = ["Add Logs", "Edit", "Delete Logs"];

const ITEM_HEIGHT = 48;

export default function EditIcon({ _logId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setType, setCatType, setOpen, setLogId } =
    React.useContext(RestaurantContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            sx={{ color: `${option === "Delete Logs" ? "red" : "black"}` }}
            key={option}
            // selected={option === "Pyxis"}
            onClick={() => {
              if (option === "Add Logs") {
                setType("add-log");
                setLogId(_logId);
                setOpen(true);
              } else if (option === "Edit") {
                setType("edit-log");
                setLogId(_logId);
                setOpen(true);
              } else {
                setType("delete-log");
                setLogId(_logId);
                setOpen(true);
              }
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
