import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import GoogleMapReact from "google-map-react";
import { withRouter } from "react-router-dom";
import Marker from "./Marker";

class MapList extends Component {
  componentDidMount() {}
  static defaultProps = {
    center: {
      lat: 39.099789,
      lng: -94.57856,
    },
    zoom: 10,
  };
  render() {
    const profiles = this.props.selectedLittles;

    let checked = this.props.store.checked;

    if (checked) {
      if (checked === "female") {
        checked = 1;
      } else if (checked === "male") {
        checked = 2;
      } else if (checked === "couple") {
        checked = 3;
      } else {
        checked = this.props.store.checked;
      }
    }
    console.log("PROFILES:", profiles);

    const profilesFiltered = profiles.filter((item, index) => {
      return Number(item.distance) <= this.props.radius;
    });
    console.log("PROFILES LITTLES:", profilesFiltered);

    return (
      <div>
        <div style={{ height: "70vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_API_GMAP }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {profilesFiltered.map((item, index) => {
              return (
                <Marker
                  key={index}
                  lat={item.latitude}
                  lng={item.longitude}
                  name={item.first_name + " " + item.last_name}
                  type={item.profile_type}
                  id={item.id}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
export default withRouter(connect(mapStoreToProps)(MapList));
