import React from "react";
import NavigationBar from "../navigationBar";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AboutAsImg from "../../../assets/aboutAs/abotAsBack.png";
import "./aboutAs.css";
import AboutusSection from "./aboutusSection/aboutusSection";
import OurHistorySection from "./ourhistorySection/ourhistorySection";
import OurMissionAndVission from "./ourMissionAndVission/ourMissionAndVission";
import ManufacturingLocation from "./manufacturingLocation";
import contactoffernew from "../../../assets/contactoffernew.png";
import BannerDialog from "../BannerDialog";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: "Spicy Rice",
      //fontWeightMedium: 100,
      fontSize: 36,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "98%",
    //height: 450,
    padding: theme.spacing(3),
    //margin: "30px",
  },
  historyroot: {
    flexGrow: 1,
    //width: "100%",
    //height: 450,
    padding: theme.spacing(3),
    //margin: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function AboutAs() {
  const classes = useStyles();
  return (
    <>
      <BannerDialog src={contactoffernew} />
      <div className="aboutAs">
        {/* <div className="aboutas_header"><NavigationBar /></div> */}
        <div
        // className="aboutas_heading"
        // style={{ backgroundImage: `url(${AboutAsImg})`, height: "120px" }}
        >
          {/* <ThemeProvider theme={theme}>
          <Typography variant="h2" align="center">
            About Us
          </Typography>
        </ThemeProvider> */}
        </div>
        <AboutusSection />
        {/* <OurHistorySection /> */}
        <OurMissionAndVission />
        <ManufacturingLocation />
      </div>
    </>
  );
}

export default AboutAs;
