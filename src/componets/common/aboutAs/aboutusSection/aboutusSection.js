import React from "react";
import "./aboutusSection.css";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import AboutAsdescripImg from "../../../../assets/aboutAs/Rectangle 31.png";
import AboutAs4 from "../../../../assets/aboutus4.png";
import StickIce from "../../../../assets/stickice.jpg";

let theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: "Spicy Rice",
      fontSize: 36,
    },
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
  },
  aboutusSection_leftGrid: {
    height: "55vh",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      height: "30vh",
      marginTop: "40px",
    },
  },
  aboutusSection_rightGrid: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginLeft: "20px",
      marginBottom: "20px",
    },
  },
  aboutusSection_rightGrid_bodyGrid: {
    paddingRight: "60px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "10px",
    },
  },
  aboutusSection_rightGrid_heading: {},
  aboutusSection_rightGrid_body: {
    paddingRight: "40px",
  },
}));

function AboutusSection() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={3}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              className={classes.aboutusSection_rightGrid}
              //className="aboutusSection_rightGrid"
              justify="center"
              alignItems="center"
            >
              <Grid
                container
                spacing={3}
                className={classes.aboutusSection_rightGrid_bodyGrid}
              >
                {/*<div className="aboutusSection_rightGrid_heading">*/}
                <Grid item xs={12}>
                  <ThemeProvider theme={theme}>
                    <Typography
                      variant="h2"
                      align="center"
                      style={{
                        fontFamily: "Open Sans Condensed",
                      }}
                    >
                      ABOUT US
                    </Typography>
                  </ThemeProvider>
                </Grid>
                {/*</div>*/}
                {/*<div className={classes.aboutusSection_rightGrid_body}>*/}
                <Grid
                  item
                  xs={12}
                  className={classes.aboutusSection_rightGrid_body}
                >
                  <Typography
                    variant="subtitle1"
                    style={{ justifyContent: "center", fontFamily: "Open Sans Condensed", fontSize: 18, }}
                  >
                    The company was founded in 1972 by Mr. M C John a retired
                    senior bureaucrat in the Kerala government. It is currently
                    led by Mr. Simon John, his brother Francis John and their
                    team of eminent directors. The company is a pioneer in the
                    ice cream industry in South India. The first factory was
                    started in Kochi and today has over 28 factories spread
                    across South India. The 22 factories put together has a
                    production capacity that is among the top 5 in the country.
                    The company has also started overseas operations in parts of
                    Middle East and Africa.
                  </Typography>
                </Grid>
              </Grid>
              {/*</div>*/}
            </Grid>
          </Grid>
          {/* ,................... */}

          {/* ......................... */}
        </MuiThemeProvider>
      </div>
    </>
  );
}

export default AboutusSection;
