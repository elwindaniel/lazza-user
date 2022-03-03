import React, { useState, useEffect, useRef } from "react";
import NavigationBar from "../navigationBar";
import "../checkout/checkout.css";
import HeaderBackgroundImg from "../../../assets/allProduct/allProductbanner.png";
import {
  Typography,
  LinearProgress,
  Button,
  Grid,
  useMediaQuery,
  Box,
  Paper,
  Divider,
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import RazorPayIntegration from "../checkout/razorPayInteration";
import { order, payNow } from "../../../api/constants";
import Axios from "../../../api/axios";
import CartProducts from "../checkout/cartProducts";
import DelivLocationCard from "../checkout/deleveryLocation/card";
import "fontsource-roboto";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 32,
      fontWeight: "bold",
    },
  },
});

const restheme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "70vh",
  },
  checkout_content: {
    padding: "20px",
    minHeight: "70vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgba(250,250,250,100%)",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  offerPaper: {
    padding: theme.spacing(2),
    backgroundColor: "rgba(250,250,250,100%)",
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  offerFormPaper: {
    paddingLeft: theme.spacing(2),
  },
  mobpaper: {
    textAlign: "center",
    backgroundColor: "rgba(250,250,250,100%)",
  },
  mobTopDiv: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    paddingBottom: theme.spacing(3),
  },
}));

export default function LinkPayPage(props) {
  const token = props.match.params.token;

  let payload = "";
  if (token) {
    const payloadStart = token.indexOf(".") + 1;
    const payloadEnd = token.lastIndexOf(".");
    payload = token.substring(payloadStart, payloadEnd);
  }
  const [buttonActive, setButtonActive] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = React.useState(1);
  const [orderProduts, setOrderProduts] = useState();
  const [orderDetails, setOrderDetails] = useState();
  let checkoutFormSubmitButtonRef = useRef(null);

  let oderId = " ";
  let itemPrizeTot;
  let deliveryCharge;
  let grandTotal;

  if (payload.length !== 0) {
    payload = atob(payload);
    const jsonPayload = JSON.parse(payload);
    oderId = jsonPayload.orderId;
  }

  const stepsLength = 2;

  const classes = useStyles();

  const IsMD = useMediaQuery("(min-width:800px)");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await Axios.get(`${order.getOrderById}/` + oderId).then((res) => {
          //console.log('ressssss==>>0', res)
          setOrderProduts(res.data.productDetails);
          setOrderDetails(res.data);

          grandTotal = res.data.grantTotal;
          itemPrizeTot = res.data.total;
          deliveryCharge = res.data.deliveryCharge;

          // console.log('grandTotal', grandTotal)
          // console.log('itemPrizeTot', itemPrizeTot)
          // console.log('deliveryCharge', deliveryCharge)

          setLoading(false);
        });
      } catch (e) {
        // console.log(e);
      }
    };
    fetchOrder();
  }, [oderId]);

  function handleNext() {
    setActiveStep(activeStep + 1);
  }

  const proceedCheckout = async () => {
    debugger;
    let data = {
      email: "",
      orderId: oderId,
      amount: orderDetails.grantTotal,
      productName: "Lazza IceCream",
    };
    await Axios.post(`${payNow.payU}`, data).then((res) => {
      // console.log("payment res ==>>", res);
      // window.location.href = `${res.data.url}`;
      res.data.payuParams.payUmoneyURL = "https://secure.payu.in/_payment";
      let paramsObj = {
        key: res.data.payuParams.key,
        txnid: res.data.payuParams.txnid,
        amount: res.data.payuParams.amount,
        productinfo: res.data.payuParams.productinfo,
        firstname: res.data.payuParams.firstname,
        // 'lastname': res.data.payuParams.lastname,
        // 'email': res.data.payuParams.email,
        phone: res.data.payuParams.phone,
        surl: res.data.payuParams.surl,
        furl: res.data.payuParams.furl,
        curl: window.location.origin + "/shoppingCart",
        hash: res.data.payuParams.hash,
      };
      setCheckoutDetails(paramsObj);
      checkoutFormSubmitButtonRef.current.click();
    });
  };

  return (
    <div className="min-height-80vh bg-light-gray mt-80px">
      <div>
        {/* <div className="checkout_header">
          <NavigationBar background={true} />
        </div> */}

        {loading ? (
          <LinearProgress color="rgba(188,135,0,100%)" />
        ) : (
          <div>
            {activeStep === stepsLength ? (
              <RazorPayIntegration
                totalAmount={
                  orderProduts?.length
                    ? orderProduts.reduce(
                        (total, value) => total + parseInt(value.rate),
                        0
                      )
                    : null
                }
                cartDetails={orderProduts}
                orderPage={true}
              />
            ) : (
              <Grid container className=" bg-light-gray py-4 px-4">
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                  className=" mt-2 mt-md-4 "
                >
                  <Grid
                    direction="column"
                    item
                    md={7}
                    className="px-3 pb-3 bg-white"
                  >
                    <h3 className="sub-header border-0">Order Details</h3>
                    {orderProduts && orderProduts.length
                      ? orderProduts.map((data, index) => (
                          <CartProducts
                            key={index}
                            id={data._id}
                            quantity={data.quantity}
                            image={data.image}
                            title={data.variantName}
                            prize={data.rate}
                            orderPage={true}
                          />
                        ))
                      : null}
                    <Grid container alignItems="center" justify="flex-end">
                      <h3 className="font-size-lg font-weight-bold font-arial text-uppercase">
                        Total: &#x20B9;
                        {orderDetails.total}
                        {/* {orderProduts?.length
                          ? orderProduts.reduce(
                              (total, value) => total + parseInt(value.rate),
                              0
                            )
                          : null} */}
                      </h3>
                    </Grid>
                  </Grid>
                  <Grid md direction="column">
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
                      <DelivLocationCard
                        key={0}
                        id={orderDetails._id}
                        index={0}
                        user={orderDetails.name}
                        addressLine1={orderDetails.addressLine1}
                        street={orderDetails.street}
                        city={orderDetails.city}
                        district={orderDetails.district}
                        state={orderDetails.state}
                        country="India"
                        zipcode={orderDetails.zipcode}
                        orderPage={true}
                      />
                    </Grid>

                    <Grid
                      direction="column"
                      className="p-3 pb-3 bg-white ml-md-3 mt-2"
                    >
                      <h3 className="sub-header border-0 mt-0">
                        Order Summary
                      </h3>
                      <h5 className="font-weight-bold">
                        Pay by Card/UPI/Net Banking/Wallet
                      </h5>
                      {/* Added here */}
                      <div className="">
                        <Grid container justify="space-between">
                          <h5>Item(s) Subtotal:</h5>
                          <h5>₹ {orderDetails.total}</h5>
                        </Grid>

                        <Grid container justify="space-between">
                          <h5>Shipping:</h5>
                          <h5>₹ {orderDetails.deliveryCharge}</h5>
                        </Grid>

                        <Grid
                          className="pb-3 border-bottom"
                          container
                          justify="space-between"
                        >
                          <h5>Total with offer:</h5>
                          <h5>
                            {/* {cartData && cartData.length ? cartData.map((data) => {
                              let prize = token ? data.rate : data.price;
                              let name = token ? data.variantName : data.name;
                              let mulPrize = data.quantity * prize;

                              if (promo) {
                                if (name === promo.variantName) {
                                  if (promo.status === "percentage") {
                                    let a = mulPrize - mulPrize * (promo.value / 100);
                                    totalPrice = totalPrice + a;
                                  } else {
                                    let a = mulPrize - promo.value;
                                    totalPrice = totalPrice + a;
                                  }
                                } else {
                                  totalPrice = totalPrice + mulPrize;
                                }
                              } else {
                                totalPrice = totalPrice + mulPrize;
                              }
                              return null;
                            }) : null} */}
                            ₹ {orderDetails.grantTotal}
                          </h5>
                        </Grid>

                        <Grid
                          className="mt-3"
                          container
                          justify="space-between"
                        >
                          <h5 className="font-size-lg font-weight-bold font-arial text-uppercase">
                            Grand Total:
                          </h5>
                          <h5 className="font-size-lg font-weight-bold font-arial text-uppercase">
                            ₹ {orderDetails.grantTotal}
                          </h5>
                        </Grid>
                      </div>
                      {/* Added End here */}

                      <h4>{buttonActive}</h4>
                      <form
                        method="post"
                        action="https://secure.payu.in/_payment"
                      >
                        <input
                          type="hidden"
                          name="key"
                          value={checkoutDetails?.key}
                        />
                        <input
                          type="hidden"
                          name="txnid"
                          value={checkoutDetails?.txnid}
                        />
                        <input
                          type="hidden"
                          name="amount"
                          value={checkoutDetails?.amount}
                        />
                        <input
                          type="hidden"
                          name="firstname"
                          value={checkoutDetails?.firstname}
                        />
                        <input
                          type="hidden"
                          name="lastname"
                          value={checkoutDetails?.lastname}
                        />
                        <input
                          type="hidden"
                          name="productinfo"
                          value={checkoutDetails?.productinfo}
                        />
                        <input
                          type="hidden"
                          name="phone"
                          value={checkoutDetails?.phone}
                        />
                        <input
                          type="hidden"
                          name="email"
                          value={checkoutDetails?.email}
                        />
                        <input
                          type="hidden"
                          name="hash"
                          value={checkoutDetails?.hash}
                        />
                        <input
                          type="hidden"
                          name="surl"
                          value={checkoutDetails?.surl}
                        />
                        <input
                          type="hidden"
                          name="furl"
                          value={checkoutDetails?.furl}
                        />
                        <button
                          type="submit"
                          style={{ display: "none" }}
                          ref={checkoutFormSubmitButtonRef}
                        ></button>
                      </form>
                      <Button
                        variant="contained"
                        disabled={buttonActive}
                        className="w-100"
                        onClick={() => proceedCheckout()}
                        style={{
                          color: buttonActive ? "inherit" : "#fff",
                          background: buttonActive ? "none" : "#000",
                          fontSize: "1.4rem",
                        }}
                      >
                        CHECK OUT
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}

            {/* {activeStep === stepsLength ? (
                {/* <RazorPayIntegration
                  totalAmount={
                    orderProduts?.length
                      ? orderProduts.reduce(
                          (total, value) => total + parseInt(value.rate),
                          0,
                        )
                      : null
                  }
                  cartDetails={orderProduts}
                  orderPage={true}
                />
            ) : (  */}
            {/* <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
               
                <Box display="flex" p={1}>
                  <Box p={1} flexGrow={IsMD ? 1 : 0} />
                  <Box p={1} flexGrow={IsMD ? 2 : 2}>
                    <Paper
                      className={classes.paper}
                      elevation={1}
                      style={{ borderStyle: "solid", borderWidth: "2px" }}
                    >
                      {orderProduts && orderProduts.length
                        ? orderProduts.map((data, index) => (
                            <CartProducts
                              key={index}
                              id={data._id}
                              quantity={data.quantity}
                              image={data.image}
                              title={data.variantName}
                              prize={data.rate}
                              orderPage={true}
                            />
                          ))
                        : null}
                      <Divider variant="middle" />
                      <Paper
                        className={classes.paper}
                        elevation={0}
                        style={{ paddingRight: "20px" }}
                      >
                        <Grid container justify="flex-end">
                          <Typography variant="h2">
                            Total: &#x20B9;{" "}
                            {orderProduts?.length
                              ? orderProduts.reduce(
                                  (total, value) =>
                                    total + parseInt(value.rate),
                                  0
                                )
                              : null}
                          </Typography>
                        </Grid>
                      </Paper>
                    </Paper>
                  </Box>
                  <Box p={1} flexGrow={IsMD ? 0.5 : 0} />
                </Box>
             
              </Grid>
              <Grid items xs={12} sm={12} md={6}>
                <div>
                  <div style={{ width: "100%" }}>
             
                    <Box display="flex" p={1}>
                      <Box p={1} flexGrow={IsMD ? 0.5 : 0} />
                      <Box p={1} flexGrow={IsMD ? 2 : 2}>
                        <div>
                          <Typography variant="h4">
                            Delivery Location
                          </Typography>
                          <DelivLocationCard
                            key={0}
                            id={orderDetails._id}
                            index={0}
                            user={orderDetails.name}
                            addressLine1={orderDetails.addressLine1}
                            street={orderDetails.street}
                            city={orderDetails.city}
                            district={orderDetails.district}
                            state={orderDetails.state}
                            country="India"
                            zipcode={orderDetails.zipcode}
                            orderPage={true}
                          />
                        </div>
                      </Box>
                      <Box p={1} flexGrow={IsMD ? 1 : 0} />
                    </Box>
                    // {/* ) : null} }
                  </div>
                </div>
                <Grid
                  container
                  justify="flex-end"
                  style={{
                    paddingRight: 20,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    align="right"
                    onClick={handleNext}
                    
                  >
                    Pay
                  </Button>
                </Grid>
              </Grid>
            </Grid> */}
          </div>
        )}
      </div>
    </div>
  );
}
