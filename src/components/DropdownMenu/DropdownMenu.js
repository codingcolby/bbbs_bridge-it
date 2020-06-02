import React, { useState } from "react";
import { Menu, MenuItem, ButtonBase } from "@material-ui/core";

function DropdownMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonBase onClick={handleClick}>
        <img src="images/ButtonLogo.png" alt="logo" height="50" width="50" />
      </ButtonBase>
      <Menu
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)} // open state of menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>Search</MenuItem>
        <MenuItem>Upload</MenuItem>
        <MenuItem>Map</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu;
