import React from "react";
import { Avatar, Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";

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
    //padding: theme.spacing(2),
  },
  mainpaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    minwidth: "300px",
    border: "1px solid #7a7474",
    //color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    //minwidth: "300px",
    //color: theme.palette.text.secondary,
  },
  discriptionpaper: {
    //padding: theme.spacing(2),
    //textAlign: "center",
    //alignContent: "center",
    //alignItems: "center",
    height: "120px",
    //color: theme.palette.text.secondary,
  },
}));

function OurMissionCard(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.mainpaper}>
      <Grid container spacing={2}>
        <Grid container item xs={12} justify="center">
          <img
            alt=""
            src={props.imgsrc}
            style={{
              width: "100px",
              height: "100px",
              // backgroundColor: "rgba(234,234,234,1)",
              // marginTop: "30px",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <Typography
              variant="h5"
              style={{ fontFamily: "Open Sans Condensed" }}
            >
              {props.title}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.discriptionpaper} elevation={0}>
            <Typography variant="subtitle2" align="center">
              {props.discription}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OurMissionCard;
