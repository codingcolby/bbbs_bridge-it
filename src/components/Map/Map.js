import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import GoogleMapReact from "google-map-react";
import { withRouter } from "react-router-dom";
import Marker from "./Marker";

class Map extends Component {
  componentDidMount() {}
  static defaultProps = {
    center: {
      lat: 39.099789,
      lng: -94.57856,
    },
    zoom: 10,
  };
  render() {
    const profiles = this.props.store.profiles;

    // const renderThesePins = this.props.store.checked
    //   ? profiles.map((item, index) => {
    //       return (
    //         <Marker
    //           key={index}
    //           lat={item.latitude}
    //           lng={item.longitude}
    //           name={item.first_name + " " + item.last_name}
    //         />
    //       );
    //     })
    //   : profiles.map((item, index) => {
    //       return (
    //         <Marker
    //           key={index}
    //           lat={item.latitude}
    //           lng={item.longitude}
    //           name={item.first_name + " " + item.last_name}
    //         />
    //       );
    //     });
    const checked = this.props.store.checked;
    console.log("CHECKED", checked);
    if (checked) {
      if (checked == "female") {
        console.log("FEMALE");
      }

      if (checked == "male") {
        console.log("MALE");
      }

      if (checked == "couple") {
        console.log("COUPLE");
      }
    }

    const profilesFiltered = profiles.filter((item, index) => {
      return item.sex === 1;
    });

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
