import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class AdminPage extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    return <div></div>;
  }
}

export default connect(mapStoreToProps)(AdminPage);
