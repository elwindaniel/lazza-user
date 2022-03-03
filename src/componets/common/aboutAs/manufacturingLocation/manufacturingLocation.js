import React from "react";
import GoogleMapReact from "google-map-react";
import { Grid } from "@material-ui/core";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function ManufacturingLocation() {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <div
        style={{
          height: "50vh",
          width: "100%",
          padding: "30px",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD7LxmmmL6FMWutXwfnkgEtjbiOhAlYtMw" }}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          defaultZoom={11}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </Grid>
  );
}

export default ManufacturingLocation;
