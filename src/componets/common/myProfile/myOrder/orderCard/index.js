import React from "react";
import { Paper, Grid, Badge, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgba(250,250,250,100%)",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
}));

export default function OrderCard({ quantity, image, title, promo, prize }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container spacing={2}>
        <Grid
          container
          item
          xs={5}
          justify="space-evenly"
          direction="column"
          alignItems="flex-start"
        >
          <Typography
            variant="h5"
            style={{
              color: "rgba(188,135,0,100%)",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid container item xs={2} alignItems="center">
          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {quantity} * &#x20B9;
            {prize}
          </Typography>
          {/* {promoValue ? (
            promo.status === "percentage" ? (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                style={{
                  // color: "rgba(188,135,0,100%)",
                  // fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                - {promo.value} %
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                style={{
                  // color: "rgba(188,135,0,100%)",
                  // fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                - Rs {promo.value}
              </Typography>
            )
          ) : null} */}
        </Grid>
        <Grid container item xs={2} alignItems="center">
          <Typography
            variant="body1"
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            &#x20B9; {totalPrize}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
