import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import {
  IconButton,
  Typography,
  withStyles,
  createStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const customStyles = (theme) =>
  createStyles({
    root: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      transform: "translate(-25%, -50%)",
    },
    padding: {
      padding: "0",
    },
    grow: {
      flexGrow: "1",
    },
  });

class Marker extends Component {
  render() {
    const handleClick = () => {
      this.props.history.push(`/list/${this.props.id}`);
    };
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.grow}>
          <IconButton className={classes.padding} onClick={handleClick}>
            <RoomRoundedIcon
              fontSize="large"
              id="pin"
              style={
                this.props.type === 2 ? { color: "green" } : { color: "black" }
              }
            />
          </IconButton>
        </div>
        <div className={classes.grow}>
          <Typography
            variant="caption"
            display="block"
            style={{ color: "black", margin: "0" }}
          >
            <p>{this.props.name}</p>
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  withRouter(connect(mapStoreToProps)(Marker))
);
