import React from "react";
import { connect } from "react-redux";

import mapStoreToProps from "../../redux/mapStoreToProps";

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <div>
    <h1 id="welcome">Welcome, {props.store.user.email}!</h1>
  </div>
);

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
