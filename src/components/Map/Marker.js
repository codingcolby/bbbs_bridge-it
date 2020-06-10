import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import {
  IconButton,
  ButtonBase,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

class Marker extends Component {
  render() {
    const handleClick = () => {
      this.props.history.push(`/list/${this.props.id}`);
    };
    return (
      <div className="map-marker">
        <IconButton onClick={handleClick}>
          <RoomRoundedIcon
            fontSize="large"
            id="pin"
            style={
              this.props.type === 2 ? { color: "green" } : { color: "black" }
            }
          />
          <Typography
            variant="caption"
            display="block"
            style={{ color: "black", margin: "0" }}
          >
            <p>{this.props.name}</p>
          </Typography>
        </IconButton>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Marker));
