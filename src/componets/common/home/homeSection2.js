//import React from 'react'
import { Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import Card from "../card/card";
import ProdImg from "../../../assets/Product img.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Col } from "react-bootstrap";
import { HomeSectionWrapper } from "./style";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: "Spicy Rice",
      //fontWeightMedium: 100,
      fontSize: 30,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "98%",
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

function HomeSection2() {
  const classes = useStyles();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <ThemeProvider theme={theme}>
              <Typography variant="h2" align="left">
                Bestseller
              </Typography>
            </ThemeProvider>
          </Paper>
        </Grid>
      </Grid>
      <HomeSectionWrapper>
        <Slider {...settings}>
          <Col>
            <Card
              id="01"
              imgsrc={ProdImg}
              title="Twin flavor packs"
              prize="800.00"
              mrp="1000.00"
            />
          </Col>
          <Col>
            <Card
              id="01"
              imgsrc={ProdImg}
              title="Twin flavor packs"
              prize="800.00"
              mrp="1000.00"
            />
          </Col>
          <Col>
            <Card
              id="01"
              imgsrc={ProdImg}
              title="Twin flavor packs"
              prize="800.00"
              mrp="1000.00"
            />
          </Col>
          <Col>
            <Card
              id="01"
              imgsrc={ProdImg}
              title="Twin flavor packs"
              prize="800.00"
              mrp="1000.00"
            />
          </Col>
          <Col>
            <Card
              id="01"
              imgsrc={ProdImg}
              title="Twin flavor packs"
              prize="800.00"
              mrp="1000.00"
            />
          </Col>
          <Col>
            <Card
              id="01"
              imgsrc={ProdImg}
              title="Twin flavor packs"
              prize="800.00"
              mrp="1000.00"
            />
          </Col>
        </Slider>
      </HomeSectionWrapper>
    </div>
  );
}

export default HomeSection2;
