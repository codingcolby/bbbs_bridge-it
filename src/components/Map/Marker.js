import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import { IconButton, ButtonBase, FormControlLabel } from "@material-ui/core";
import { withRouter } from "react-router-dom";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
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
          <ButtonBase onClick={handleClick}>
            <p>{this.props.name}</p>
          </ButtonBase>
        </IconButton>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Marker));
