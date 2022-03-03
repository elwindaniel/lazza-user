//import React from 'react'
import "./ourHistory.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import OurHistoryBackImg from "../../../../assets/ourHistory/ourHistoryBackground.png";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme();

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //height: 350,
    minHeight: 350,
    //  alignItems: "center",
    //  justify: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      //padding: 0,
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginLeft: "100px",
    marginRight: "100px",
    backgroundColor: "transparent",
    //color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      //padding: 0,
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

function OurHistory() {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `url(${OurHistoryBackImg})`,
        //  height: "350px",
        //  alignItems: "center",
        // justify: "center",
      }}
    >
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={0}>
              <Typography
                variant="h3"
                style={{
                  //fontSize: 40,
                  color: "rgba(243, 205, 85, 1)",
                  //fontFamily: "Spicy Rice",
                }}
              >
                OUR HISTORY
              </Typography>
            </Paper>
          </Grid>
          <Grid container item xs={12} justify="space-around">
            <Paper className={classes.paper} elevation={0}>
              <Typography
                variant="h6"
                align="left"
                style={{
                  color: "rgba(255, 255, 255, 1)",
                }}
              >
                The company was founded in 1972 by Mr. M C John a retired senior
                bureaucrat in the Kerala government. It is currently led by Mr.
                Simon John, his brother Francis John and their team of eminent
                directors. The company is a pioneer in the ice cream industry in
                South India.
              </Typography>
              <br></br>
              <Typography
                variant="h6"
                align="left"
                style={{
                  color: "rgba(255, 255, 255, 1)",
                }}
              >
                The first factory was started in Kochi and today has over 28
                factories spread across South India. The 22 factories put
                together has a production capacity that is among the top 5 in
                the country. The company has also started overseas operations in
                parts of Middle East and Africa.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default OurHistory;
