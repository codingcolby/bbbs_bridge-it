import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";

function UploadPage(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div>
        <Button onClick={handleClick} variant="outlined">
          Upload Big or Little
        </Button>
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
          <MenuItem>Big</MenuItem>
          <MenuItem>Little</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default UploadPage;
