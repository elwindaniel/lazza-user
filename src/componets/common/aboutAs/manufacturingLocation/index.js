import React from "react";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import ManufactureImg1 from "../../../../assets/manufacturngsection/Frame 159.png";
import AboutAs4 from "../../../../assets/stakeholderimg.png";
//import Map from "./manufacturingLocation";
import AboutAs5 from "../../../../assets/aboutus5.png";
import "./manufacturinglocation.css";
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
    padding: "24px",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    display: "absolute",
  },
  aboutusSection_leftGrid_heading: {
    display: "flex",
    //marginBottom: "20px",
  },

  boxborder: {
    border: "1px solid #7a7474",
    margin: "20px",
    width: "100%",
    padding: "20px",
  },
}));

function ManufacturingDetailsSection() {
  const classes = useStyles();

  return (
    <div className="manufaroot">
      <MuiThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <div className={classes.boxborder}>
            <Grid container spacing={3}>
              <Grid
                container
                item
                md={2}
                className={classes.aboutusSection_leftGrid}
              ></Grid>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={4}
                className={classes.aboutusSection_leftGrid}
              >
                <img src={AboutAs4} alt="" width="100%" />
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={6}
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
                        align="left"
                        style={{
                          color: "rgba(74,74,74,1)",
                          fontFamily: "Open Sans Condensed",
                          textAlign: 'center',
                        }}
                      >
                        COMMITMENT TO STAKE HOLDERS
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
                    <Typography variant="subtitle1"
                      style={{
                        color: "rgba(74,74,74,1)",
                        fontFamily: "Open Sans Condensed",
                        fontSize: 18,
                        textAlign: 'center',
                      }}
                    >
                      Eventhough we are not as big as some of the real
                      corporatesout there,we still believe in being engaged with
                      and giving back to the communities where we operate.We
                      believe in a growth that is sustainable for all the stake
                      holders involved.
                    </Typography>
                    <br></br>
                    <ul className='listhere'>
                      <li>Rain water harvesting</li>
                      <li>Effluent treatment plants</li>
                      <li>Emergency medical assistance</li>
                      <li>Youth talent development programme</li>
                    </ul>

                  </Grid>
                </Grid>
                {/*</div>*/}
              </Grid>
            </Grid>
          </div>
          <br />

          <div className={classes.boxborder}>
            <Grid container spacing={3}>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={7}
                justify="center"
                alignItems="center"
              >
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    className={classes.aboutusSection_leftGrid_heading}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography
                        variant="h2"
                        align="center"
                        style={{
                          color: "rgba(74,74,74,1)",
                          fontFamily: "Open Sans Condensed",
                          textAlign: 'center',
                        }}
                      >
                        MANUFACTURING LOCATIONS & QUALITY SYSTEMS
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: "rgba(74,74,74,1)",
                        fontFamily: "Open Sans Condensed",
                        fontSize: 18,
                        textAlign: 'center',
                      }}
                    >
                      Each local factory is a stand alone unit that produces icecream for the local market. There is a central organization however that offers consulting advice to the local factory on the various marketing and technical aspects. This model enables the local factory to be a part of a national brand and benefit from the years of expertise of the central organization at the same time retain the innovation and entrepreneurship needed to succeed in their local market.

                      Our factories near every major city ensures that we are above to localize our product and supply the freshest possible icecream. In fact 70% of our icecream is consumed within 72 hours of manufacturing, making it the next best thing to eating homemade icecream.
                    </Typography>
                    <br></br>
                    <ul className='listhere'>

                      <li style={{ color: "rgba(74,74,74,1)", }}><b>India</b> </li>
                      <li><b>Tamil Nadu:</b> Chennai, Madurai, Tiruchy, Tirunelveli, Erode, Pondicherry</li>
                      <li><b>Telengana:</b> Hyderabad</li>
                      <li><b>Karnataka:</b> Mangalore, Bangalore</li>
                      <li><b>Kerala:</b> Kannur, Kozhikode, Palakkad, Thrissur, Kochi/ Ernakulam, Kottayam, Kollam, Pathanamthitta, Trivandrum</li>
                      <li style={{ color: "rgba(74,74,74,1)", }}><b>Congo</b> </li>
                      <li>Kinshasa</li>
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12} md={5} justify="center">
                <img src={AboutAs5} alt="" width="80%" height="80%" />
              </Grid>
            </Grid>
          </div>

        </Container>
      </MuiThemeProvider>
    </div>
  );
}

export default ManufacturingDetailsSection;
