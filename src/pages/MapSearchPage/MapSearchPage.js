import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Map from "../../components/Map/Map";

class MapSearchPage extends Component {
  render() {
    return (
      <div>
        <h2>Map Search Page</h2>
        <br />
        <div>
          <Map />
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(MapSearchPage);
