import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import GoogleMapReact from "google-map-react";
import { withRouter } from "react-router-dom";
import Marker from "./Marker";

class Map extends Component {
  componentDidMount() {}
  //default zoom and centering for the map
  static defaultProps = {
    center: {
      lat: 39.099789,
      lng: -94.57856,
    },
    zoom: 10.3,
  };
  render() {
    //all profiles from reducer
    const profiles = this.props.store.profiles;

    //radio button checked status from reducer
    let checked = this.props.store.checked;

    //converting checked value to match values from incoming profiles
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

    //filtering of profiles to render on map based on checked value
    const profilesFiltered = profiles.filter((item, index) => {
      if (checked === 3) {
        return item.profile_type === 2 || item.profile_type === 3;
      } else {
        return item.sex === checked;
      }
    });

    //ternary operator to render all profiles on map until checked reducer has a value
    const visibleProfiles = checked ? profilesFiltered : profiles;

    return (
      <div>
        <div style={{ height: "80vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_API_GMAP }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {visibleProfiles.map((item, index) => {
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
export default withRouter(connect(mapStoreToProps)(Map));
