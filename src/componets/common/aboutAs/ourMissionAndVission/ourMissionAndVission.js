import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import OurMissionCard from "./ourMissionCard/ourMissionCard";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import VisionImg from "../../../../assets/ourMission/Ellipse 58.png";
import AboutAs1 from "../../../../assets/aboutus1.png";
import AboutAs2 from "../../../../assets/aboutus2.png";
import AboutAs3 from "../../../../assets/aboutus3.png";
let theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: "Spicy Rice",
      //fontWeightMedium: 100,
      fontSize: 36,
    },
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // backgroundColor: "rgba(234,234,234,1)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontFamily: "Open Sans Condensed",
    // backgroundColor: "rgba(234,234,234,1)",
  },
  headerpaper: {
    padding: theme.spacing(3),
    display: "flex",
    fontFamily: "Open Sans Condensed",
    justifyContent: "center",
    // backgroundColor: "rgba(234,234,234,1)",
  },
}));

function OurMissionAndVission() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.headerpaper} elevation={0}>
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h2"
                  align="center"
                  style={{
                    color: "rgba(74,74,74,1)",
                    fontFamily: "Open Sans Condensed",
                  }}
                >
                  Our
                </Typography>
                &nbsp;
                <Typography
                  variant="h2"
                  align="center"
                  style={{
                    color: "rgba(74,74,74,1)",
                    fontFamily: "Open Sans Condensed",
                  }}
                >
                  Mission & Vission
                </Typography>
              </ThemeProvider>
            </Paper>
          </Grid>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Paper className={classes.paper} elevation={0}>
                <OurMissionCard
                  style={{
                    color: "rgba(74,74,74,1)",
                    fontFamily: "Open Sans Condensed",
                  }}
                  imgsrc={AboutAs1}
                  title="OUR VISION"
                  discription="To make enjoyable ice cream experiences affordable and available to all"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Paper className={classes.paper} elevation={0}>
                <OurMissionCard
                  imgsrc={AboutAs2}
                  title="OUR MISSION"
                  discription="To manufacture international quality ice cream products at best-in-class pricing and make them available everywhere through a well placed cold chain network."
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Paper className={classes.paper} elevation={0}>
                <OurMissionCard
                  imgsrc={AboutAs3}
                  title="OUR VALUES"
                  discription="We focus on creating values for the intelligent, educated consumers who can see and choose what is really best for them."
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default OurMissionAndVission;
