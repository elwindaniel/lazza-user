import { Paper, Grid, Badge, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../../../api/constants";

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

export default function CartProducts({
  quantity,
  image,
  title,
  promo,
  prize,
  orderPage,
}) {
  const classes = useStyles();
  //console.log("Image: ", image);
  let promoValue;
  let totalPrize = prize * quantity;

  if (promo) {
    if (promo.variantName === title) {
      if (promo.status === "percentage") {
        let a = quantity * prize;
        promoValue = a * (promo.value / 100);
        totalPrize -= promoValue;
      } else {
        promoValue = promo.value;
        totalPrize -= promoValue;
      }
    }
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className="product-list"
    >
      <Grid
        className="border"
        item
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          {orderPage ? null : (
            <Badge badgeContent={quantity} color="secondary">
              <img src={`${API_URL}/${image}`} alt="" height="80px" />
            </Badge>
          )}
        </Grid>
      </Grid>
      <Grid item direction="column">
        <h3>{title}</h3>

        {promo ? (
          promo.variantName === title ? (
            <h5>Offer Applied: {promo.promotionalCode}</h5>
          ) : null
        ) : null}
      </Grid>

      <Grid>
        <h3>
          {" "}
          {quantity} * &#x20B9;
          {prize}
        </h3>
        <h5>
          {promoValue ? (
            promo.status === "percentage" ? (
              <h5>- {promo.value} %</h5>
            ) : (
              <h5>- Rs {promo.value}</h5>
            )
          ) : null}
        </h5>
      </Grid>

      <Grid>
        <div>Item Total:</div>
        <h3 className="sub-header border-0 mt-0 font-weight-bold font-size-lg">
          &#x20B9; {totalPrize}
        </h3>
      </Grid>
    </Grid>
  );
}
