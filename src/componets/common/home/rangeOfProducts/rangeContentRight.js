import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Typography, Paper } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100px",
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: "center",
    //color: theme.palette.text.secondary,
  },
  paperimg: {
    textAlign: "center",
    height: "120px",
  },
  paperDetails: {
    textAlign: "left",
    height: "120px",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function RangeContentRight({ img, title, details }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className={classes.paperimg} elevation={0}>
            <img src={img} alt={title} />
            <Typography variant="h2" style={{ fontSize: "20px" }}>
              {title}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paperDetails} elevation={0}>
            <Typography variant="subtitle1" style={{ fontSize: "16px" }}>
              {details}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default RangeContentRight;
