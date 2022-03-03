import React from "react";
import "./ourhistorySection.css";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import youtubeImg from "../../../../assets/aboutAs/youtube.png";
import ReactPlayer from "react-player";

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
  historyroot: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  aboutusSection_leftGrid: {
    height: "55vh",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      height: "30vh",
    },
  },
  aboutusSection_rightGrid: {
    height: "50vh",
    width: "70%",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  aboutusSection_rightGrid_body: {
    //paddingRight: theme.spacing(4),
    //paddingRight: "40px",
  },
  aboutusSection_rightGrid_heading: {
    display: "flex",
  },
}));

function OurhistorySection() {
  const classes = useStyles();
  return (
    <div
      className={classes.historyroot}
      style={{ backgroundColor: "rgba(33,33,33,1)", color: "#ffff" }}
      //className="ourhistorySection"
    >
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={6}
            justify="center"
            alignItems="center"
          >
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                className={classes.aboutusSection_rightGrid_heading}
              >
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h2"
                    align="left"
                    style={{ color: "rgba(74,74,74,1)" }}
                  >
                    Our
                  </Typography>

                  <Typography
                    variant="h2"
                    align="left"
                    style={{ color: "rgba(188,135,0,1)" }}
                  >
                    History
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  The company was founded in 1972 by Mr. M C John a retired
                  senior bureaucrat in the Kerala government. It is currently
                  led by Mr. Simon John, his brother Francis John and their team
                  of eminent directors. The company is a pioneer in the ice
                  cream industry in South India.
                </Typography>
                <br></br>
                <Typography variant="subtitle1">
                  The first factory was started in Kochi and today has over 28
                  factories spread across South India. The 22 factories put
                  together has a production capacity that is among the top 5 in
                  the country. The company has also started overseas operations
                  in parts of Middle East and Africa.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={12} md={6}>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=PtuG8Mcj_Es"
              controls="true"
            />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default OurhistorySection;
