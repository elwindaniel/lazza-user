import { useEffect, useState } from "react";
import Axios from "../../../../api/axios";
import SessionCheck from "../../../../api/SessionCheck";
import { cart, order, user } from "../../../../api/constants";
import NavigationBar from "../../navigationBar";
import "../checkout.css";
// import HeaderBackgroundImg from "../../../assets/allProduct/allProductbanner.png";
import HeaderBackgroundImg from "../../../../assets/allProduct/allProductbanner.png";
import {
  Paper,
  Typography,
  Divider,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import AddressSesion from "./addressSesion";
import OrderSummerySession from "./orderSummerySession";

let theme = createMuiTheme({});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "50vh",
  },
  mainPaper: {
    padding: theme.spacing(3),
  },
  orderDateDiv: {
    display: "flex",
  },
  orderSummerPaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    borderStyle: "solid",
    borderWidth: 2,
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0),
      marginRighr: theme.spacing(0),
    },
  },
}));

export default function PaymentSucess(props) {
  //console.log("propsss===>>>", props);
  const cart_API = `${cart.getCart}/`;
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;

  let a = props.match.params.token;

  let payload = "";
  let jsonPayload = "";
  if (a) {
    const payloadStart = a.indexOf(".") + 1;
    const payloadEnd = a.lastIndexOf(".");
    payload = a.substring(payloadStart, payloadEnd);
    payload = atob(payload);
    jsonPayload = JSON.parse(payload);
    //console.log(jsonPayload, "===>>payload");
  }

  const [userData, setUserData] = useState();
  const [cartData, setCartData] = useState();

  const [userDataLoading, setUserDataLoading] = useState(true);
  const [cartDataLoading, setCartDataLoading] = useState(true);
  const [creaateOrderLoading, setCreaateOrderLoading] = useState(true);
  // let creaateOrderLoading = true;
  let total = 0;

  const [postOrderDetails, setPostOrderDetails] = useState();

  const [data, setData] = useState({
    customerMobileNumber: "",
    name: "",
    productName: "",
    defaultLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    customerId: "",
    customerId: "",
    stockingPointId: "",
    address: [
      {
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        state: "",
        region: "",
        country: "India",
        pinCode: "",
      },
    ],
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setUserDataLoading(true);
        await Axios.get(user.getUserbyUserid + "/" + userId).then((res) => {
          //console.log("get user ==>>", res);
          if (res.data) {
            setUserData(res.data);
            setUserDataLoading(false);
          }
          setUserDataLoading(false);
        });
      } catch (e) {
        //console.log(e);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      setCartDataLoading(true);
      try {
        await Axios.get(cart_API + userId).then((res) => {
          //console.log("get cart ==>>", res);
          if (res.data) {
            setCartData(res.data);
          }
          setCartDataLoading(false);
        });
      } catch (e) {
        //console.log(e);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const postOrder = async () => {
      const newOrder = {
        customerMobileNumber: userData.phoneNumber,
        name: userData.name,
        razorpay_payment_id: jsonPayload.razorpay_payment_id,
        customerId: cartData[0].customerid,
        razorpay_order_id: "",
        razorpay_signature: "",
        total: total,
        productDetails: [],
      };
      cartData.forEach((element) => {
        let res = {
          stockingPointId: element.stockingPointId,
          productName: element.variantName,
          variantId: element.variantId,
          variantName: element.variantName,
          productId: element.productId,
          cartId: element._id,
          quantity: element.quantity,
          rate: element.rate,
        };
        newOrder.productDetails.push(res);
      });
      //console.log("post data==>>", userData, "==>>", cartData);
      //console.log("new data==>>", newOrder);
      setCreaateOrderLoading(true);
      // creaateOrderLoading = true;
      await Axios.post(order.createOrder, newOrder).then((res) => {
        //console.log("post ress", res);
        // setCreaateOrderLoading(false);
        setPostOrderDetails(res.data);
        if (res.data) {
          setCreaateOrderLoading(false);
        }
        // creaateOrderLoading = false;
      });
    };

    if (!userDataLoading && !cartDataLoading) {
      postOrder();
    }
    // postOrder();
  }, [userDataLoading, cartDataLoading]);

  // const postOrder = async () => {
  //   const newOrder = {
  //     // customerMobileNumber: userData.phoneNumber,
  //     // name: userData.name,
  //     // productName: cartData[0].variantName,
  //     // defaultLocation: "ksssss",
  //     // pickUpDate: "2/1/2012",
  //     // pickUpTime: "9.00am",
  //     // customerId: cartData[0].customerid,
  //     // productId: cartData[0].productId,
  //     // stockingPointId: cartData[0].stockingPointId,
  //     // address: userData.address,

  //     customerMobileNumber: userData.phoneNumber,
  //     name: userData.name,
  //     razorpay_payment_id: jsonPayload.razorpay_payment_id,
  //     customerId: cartData[0].customerid,
  //     razorpay_order_id: "",
  //     razorpay_signature: "",
  //     total: total,
  //     productDetails: [],
  //   };

  //   // const newOrder = {
  //   //   customerMobileNumber: userData.phoneNumber,
  //   //   name: userData.name,
  //   //   razorpay_payment_id: jsonPayload.razorpay_payment_id,
  //   //   // password:"12345678",
  //   //   customerId: "6017e892998fee1d9860ccac",
  //   //   razorpay_order_id: "ffgh12345698dd",
  //   //   razorpay_signature: "ggggd",
  //   //   total: "98",
  //   //   addressLine1: "heavens",
  //   //   addressLine2: "faith lines",
  //   //   street: "address.streets",
  //   //   city: "address.citys",
  //   //   district: "address.districts",
  //   //   state: "address.states",
  //   //   country: "address.countreys",
  //   //   zipcode: "695543",
  //   //   productDetails: [
  //   //     {
  //   //       stockingPointId: "5fdc7de9c8a40e1cd4a12d00",
  //   //       productName: "icecreamd",
  //   //       variantId: "5feb11a3c2680b0d9021bb25",
  //   //       variantName: "your",
  //   //       productId: "5feb11a3c2680b0d9021bb21",
  //   //       cartId: "5fe89407f4c6c713983fb02d",
  //   //       quantity: "10",
  //   //       rate: "98",
  //   //     },
  //   //   ],
  //   // };

  //   cartData.forEach((element) => {
  //     let res = {
  //       stockingPointId: element.stockingPointId,
  //       productName: element.variantName,
  //       variantId: element.variantId,
  //       variantName: element.variantName,
  //       productId: element.productId,
  //       cartId: element._id,
  //       quantity: element.quantity,
  //       rate: element.rate,
  //     };
  //     newOrder.productDetails.push(res);
  //   });

  //   console.log("post data==>>", userData, "==>>", cartData);
  //   console.log("new data==>>", newOrder);
  //   setCreaateOrderLoading(true);
  //   // creaateOrderLoading = true;
  //   await Axios.post(order.createOrder, newOrder).then((res) => {
  //     console.log("post ress", res);
  //     // setCreaateOrderLoading(false);
  //     setPostOrderDetails(res.data);
  //     if (res.data) {
  //       setCreaateOrderLoading(false);
  //     }
  //     // creaateOrderLoading = false;
  //   });
  // };

  const classes = useStyles();

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <div className="checkout_header">
          <NavigationBar background={true} />
        </div>
        <div
          className="checkout_heading"
          style={{
            backgroundImage: `url(${HeaderBackgroundImg})`,
            height: "120px",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            style={{
              fontSize: 34,
              fontWeight: "bold",
            }}
          >
            Order Details
          </Typography>
        </div>
        <div className={classes.root}>
          {!userDataLoading && !cartDataLoading ? (
            <div>
              <div>
                {cartData.map((data) => {
                  let mulPrize = data.quantity * data.rate;
                  total = total + mulPrize;
                })}
                {/* {(() => {
                  if (creaateOrderLoading) {
                    // postOrder();
                  }
                  // postOrder();
                })()} */}
              </div>
              {creaateOrderLoading ? null : (
                <Paper className={classes.mainPaper} elevation={0}>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                    }}
                  >
                    Order Details
                  </Typography>
                  <div className={classes.orderDateDiv}>
                    <Typography
                      variant="h6"
                      style={{
                        paddingRight: 20,
                      }}
                    >
                      Ordered on 29 January 2021
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography
                      variant="h6"
                      style={{
                        paddingLeft: 20,
                        // paddingRight: 20,
                      }}
                    >
                      Order Number : {postOrderDetails.orderId}
                    </Typography>
                  </div>
                  <Paper className={classes.orderSummerPaper}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={3}>
                        <AddressSesion
                          address={userData.address[userData.defaultAddress]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <paper>
                          <Typography
                            variant="h6"
                            style={{
                              // fontSize: 30,
                              fontWeight: "bold",
                            }}
                          >
                            Payment method
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{
                              // fontSize: 15,
                              // fontWeight: "bold",
                              paddingTop: 20,
                            }}
                          >
                            Pay by Card/UPI/Net Banking/Wallet
                          </Typography>
                        </paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <OrderSummerySession cartData={cartData} />
                      </Grid>
                    </Grid>
                  </Paper>
                </Paper>
              )}
            </div>
          ) : (
            <div>
              <LinearProgress />
            </div>
          )}
        </div>
      </MuiThemeProvider>
    </div>
  );
}
