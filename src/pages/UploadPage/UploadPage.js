import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Button, Menu, MenuItem } from "@material-ui/core";

class UploadPage extends Component {
  render() {
    return (
      <div>
        <h2>Upload Page</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UploadPage);
