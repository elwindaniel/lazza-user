import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddressSesion from "../paymentSucsses/addressSesion";
import Axios from "../../../../api/axios";
import { order } from "../../../../api/constants";
import OrderSummarySection from "./orderSummarySection";
import CartProducts from "../cartProducts";
import { get, toNumber } from "../../../../utils/lodash";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 80,
    minHeight: 500,
  },
}));

export default function InvoicePage(props) {
  const [invoice, setinvoice] = useState("");
  const [cartDetails, setcartDetails] = useState([]);
  const orderId = get(props, "match.params.orderId");
  const classes = useStyles();

  useEffect(() => {
    getOrderById(orderId);
  }, []);

  const getOrderById = async (orderId) => {
    const { data } = await Axios.get(order.getOrderById + "/" + orderId);
    setcartDetails(data.productDetails);
    setinvoice(data);
  };

  return (
    <div className={classes.root}>
      <Grid container className="bg-white px-3 pb-3">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="border-bottom-thick"
        >
          <h2 className="sub-header border-0">Order Placed</h2>
          <h4
            className="text-right"
            style={{
              color: "red",
            }}
          >
            Please note, this delivery might be against multiple invoices/stocking points
          </h4>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <h4>Order ID: {get(invoice, "orderId")}</h4>
          <h4>Order Date: {get(invoice, "reg_time")}</h4>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className="mt-2 mt-md-4 "
      >
        {/* Order Details Section goes here */}
        <Grid item md={7} className="px-3 pb-3 bg-white">
          <h3 className="sub-header border-0">Order Details</h3>
          {cartDetails &&
            cartDetails.map((data, index) => {
              return (
                <CartProducts
                  key={index}
                  id={data._id}
                  quantity={toNumber(data.quantity)}
                  image={data.image}
                  title={data.variantName}
                  promo={data.promoCodes}
                  prize={toNumber(data.rate)}
                />
              );
            })}
        </Grid>

        <Grid md direction="column">
          {/* Delivery Address Section goes here */}
          <Grid
            direction="column"
            className="p-3 mt-2 mt-md-0 pb-3 bg-white ml-md-3"
          >
            <h3
              className="sub-header border-0 mt-0"
              style={{ marginTop: "16px" }}
            >
              Delivery Address
            </h3>
            <AddressSesion address={invoice} />
          </Grid>

          {/* Order Summary Section goes here */}
          <Grid direction="column" className="p-3 pb-3 bg-white ml-md-3 mt-2">
            <h3 className="sub-header border-0 mt-0">Order Summary</h3>
            <h5 className="font-weight-bold">
              Pay by Card/UPI/Net Banking/Wallet
            </h5>
            <OrderSummarySection
              grantTotal={invoice.grantTotal}
              deliveryCharge={invoice.deliveryCharge}
              total={invoice.total}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
