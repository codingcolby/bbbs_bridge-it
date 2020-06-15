import React, { useState } from "react";
import { Menu, MenuItem, ButtonBase } from "@material-ui/core";
import { useHistory } from "react-router";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => {
  return createStyles({
    logo: {
      padding: "20px 24px",
      borderRadius: "100%",
      backgroundColor: "#ffffff",
      "&:hover": {
        backgroundColor: "#fff",
      },
      transform: "translate(6px, 0px)",
    },
  });
});

function DropdownMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

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

  const logout = (event) => {
    props.dispatch({ type: "LOGOUT" });
  };

  // const logout = (event) => {
  //   history.push({ pathname: "/login" });
  // };
  return (
    <div>
      <ButtonBase onClick={handleClick} className={classes.logo}>
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
        <MenuItem onClick={map}>Map</MenuItem>
        <MenuItem onClick={upload}>Upload</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default connect()(DropdownMenu);
