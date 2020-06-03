import React, { useState } from "react";
import { Menu, MenuItem, ButtonBase } from "@material-ui/core";
import { useHistory } from "react-router";

function DropdownMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = (event) => {
    history.push({ pathname: "/search" });
  };

  const upload = (event) => {
    history.push({ pathname: "/upload" });
  };

  const map = (event) => {
    history.push({ pathname: "/map" });
  };

  // const logout = (event) => {
  //   history.push({ pathname: "/login" });
  // };
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
        <MenuItem onClick={search}>Search</MenuItem>
        <MenuItem onClick={upload}>Upload</MenuItem>
        <MenuItem onClick={map}>Map</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu;
