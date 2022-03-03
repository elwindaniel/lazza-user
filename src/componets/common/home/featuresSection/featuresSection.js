import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core/";
import FeatureImg from "../../../../assets/featureimg/featureimg.png";
import IceCreamImg from "../../../../assets/featureimg/ice-cream 1.png";
import VegetarianImg from "../../../../assets/featureimg/vegetarian 3.png";
import Carousel from "react-bootstrap/Carousel";
import "./featureSection.css";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
  typography: {
    h2: {
      //fontFamily: "Spicy Rice",
      //fontWeightMedium: 100,
      fontSize: 42,
    },
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //width: "97.5%",
    padding: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      //width: "98.5%",
    },
  },
  rightpaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    //color: theme.palette.text.secondary,
    //height: 570,
    minHeight: 570,
    [theme.breakpoints.down("sm")]: {
      //height: 800,
      //paddingLeft: theme.spacing(3),
      padding: theme.spacing(1),
    },
  },
  leftpaper: {
    //padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    height: 570,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
}));

function FeaturesSection() {
  const classes = useStyles();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.leftpaper} elevation={0}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img src={FeatureImg} alt="" width="100%" height="550" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={FeatureImg} alt="" width="100%" height="550" />
              </Carousel.Item>
            </Carousel>
            {/* <img src={FeatureImg} alt="" width="420" height="550" />*/}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <MuiThemeProvider theme={theme}>
            <Paper className={classes.rightpaper} elevation={0}>
              <Typography variant="h3" align="left">
                What Makes our Ice Cream Special?
              </Typography>
              <div className="featurepaper">
                <Grid
                  container
                  spacing={3}
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <img src={VegetarianImg} alt="" />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    direction="column"
                    justify="space-between"
                    style={{ paddingLeft: "30px" }}
                  >
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        //fontSize: 24,
                        color: "rgba(105, 62, 27, 1)",
                        //fontFamily: "Spicy Rice",
                      }}
                    >
                      Pure ingredients
                    </Typography>
                    <Typography variant="subtitle1" align="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi hendrerit elit turpis, a porttitor tellus
                      sollicitudin at.
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div className="featurepaper">
                <Grid
                  container
                  spacing={3}
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid
                    //container
                    item
                    xs={2}
                    //justify="center"
                  >
                    <img src={IceCreamImg} alt="" />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    direction="column"
                    justify="space-between"
                    style={{ paddingLeft: "30px" }}
                  >
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        //fontSize: 26,
                        color: "rgba(105, 62, 27, 1)",
                      }}
                    >
                      Sustainability
                    </Typography>
                    <Typography variant="subtitle1" align="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi hendrerit elit turpis, a porttitor tellus
                      sollicitudin at.
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div className="featurepaper">
                <Grid
                  container
                  spacing={3}
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <img src={VegetarianImg} alt="" />
                  </Grid>
                  <Grid item xs={10} style={{ paddingLeft: "30px" }}>
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        //fontSize: 26,
                        color: "rgba(105, 62, 27, 1)",
                      }}
                    >
                      Pure ingredients
                    </Typography>
                    <Typography variant="subtitle1" align="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi hendrerit elit turpis, a porttitor tellus
                      sollicitudin at.
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div className="featurepaper">
                <Grid
                  container
                  spacing={3}
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <img src={IceCreamImg} alt="" />
                  </Grid>
                  <Grid item xs={10} style={{ paddingLeft: "30px" }}>
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        //fontSize: 26,
                        color: "rgba(105, 62, 27, 1)",
                      }}
                    >
                      Sustainability
                    </Typography>
                    <Typography variant="subtitle1" align="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi hendrerit elit turpis, a porttitor tellus
                      sollicitudin at.
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </MuiThemeProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default FeaturesSection;
