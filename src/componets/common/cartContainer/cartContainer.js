import React, { useState, useEffect } from "react";
import "./cartContainer.css";
import { Typography, Grid, LinearProgress } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import NavigationBar from "../navigationBar";
import CartCard from "./cartCard/cartCard";
import EmptyCart from "../../../assets/emptyCart.webp";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MobileCartCard from "./cartCard/mobileCartCard";
import Axios from "../../../api/axios";
import { cart } from "../../../api/constants";
import SessionCheck from "../../../api/SessionCheck";
import { total, list } from "cart-localstorage";

let theme = createMuiTheme({});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "70vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function CartContainer() {
  const userdetails = SessionCheck.getLoggedinUserId();
  const token = SessionCheck.checkSession();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [cartDetails, setCartDetails] = useState();
  const history = useHistory();
  const [localStrgCrtDtls, setLocalStrgCrtDtls] = useState();

  const viewCheckOuthandle = () => {
    history.push("/checkout");
  };

  let totalPrice = 0;

  useEffect(() => {
    fetchPost();
  }, [userdetails.userId]);

  const fetchPost = async () => {
    if (token) {
      try {
        await Axios.get(cart.getCart + "/" + userdetails.userId).then((res) => {
          setLoading(true);
          setCartDetails(res.data);
          setLoading(false);
        });
      } catch (e) {
        //console.log(e);
      }
    } else {
      setLoading(true);
      setLocalStrgCrtDtls(list());

      setLoading(false);
    }
  };

  const IsMD = useMediaQuery("(min-width:800px)");

  function child() {
    fetchPost();
  }

  return (
    <div>
      <div className="cart_header">
        <NavigationBar background={true} />
      </div>
      <MuiThemeProvider theme={theme}>
        <div className="cart_title">
          <ThemeProvider theme={theme}>
            <Typography variant="h2" align="center" style={{ fontSize: 30 }}>
              Your Shopping Cart
            </Typography>
          </ThemeProvider>
        </div>
        {loading ? (
          <div className={classes.root}>
            <LinearProgress />
          </div>
        ) : (
          <div className={classes.root}>
            {(cartDetails && cartDetails.length) ||
            (localStrgCrtDtls && localStrgCrtDtls.length) ? (
              <div>
                <div className="cart_body_main_div">
                  {IsMD ? (
                    <div className="cart_body">
                      <div className="cart_table_head">
                        <Grid container spacing={3}>
                          <Grid container item xs={4} justify="center">
                            <Typography variant="h5" align="center">
                              Product
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography variant="h5" align="center">
                              Price
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="h5" align="center">
                              Quantity
                            </Typography>
                          </Grid>
                          <Grid container item xs={3} justify="space-evenly">
                            <Typography variant="h5" align="left">
                              Total Price
                            </Typography>
                            <div className="cart_blank"></div>
                          </Grid>
                        </Grid>
                      </div>
                      {token
                        ? cartDetails && cartDetails.length
                          ? cartDetails.map((data) => {
                              return (
                                <CartCard
                                  key={data._id}
                                  id={data._id}
                                  imgsrc={data.image}
                                  title={data.variantName}
                                  prize={
                                    data.discountPrice
                                      ? data.discountPrice
                                      : data.rate
                                  }
                                  quantity={data.quantity}
                                  productId={data.productId}
                                  productName={data.productName}
                                  onSelect={() => child()}
                                />
                              );
                            })
                          : null
                        : localStrgCrtDtls && localStrgCrtDtls.length
                        ? localStrgCrtDtls.map((data, index) => {
                            //console.log("data==>>>", data);
                            return (
                              <CartCard
                                key={index}
                                id={data.id}
                                imgsrc={data.image}
                                title={data.name}
                                prize={data.price}
                                quantity={data.quantity}
                                productId={data.productId}
                                productName={data.productName}
                                onSelect={() => child()}
                              />
                            );
                          })
                        : null}
                    </div>
                  ) : (
                    <div>
                      {" "}
                      {token
                        ? cartDetails && cartDetails.length
                          ? cartDetails.map((data) => (
                              <MobileCartCard
                                key={data._id}
                                id={data._id}
                                imgsrc={data.image}
                                title={data.variantName}
                                prize={data.rate}
                                quantity={data.quantity}
                                onSelect={() => child()}
                              />
                            ))
                          : null
                        : localStrgCrtDtls && localStrgCrtDtls.length
                        ? localStrgCrtDtls.map((data, index) => {
                            return (
                              <MobileCartCard
                                key={index}
                                id={data.id}
                                imgsrc={data.image}
                                title={data.name}
                                prize={data.price}
                                quantity={data.quantity}
                                productId={data.productId}
                                productName={data.productName}
                                onSelect={() => child()}
                              />
                            );
                          })
                        : null}
                    </div>
                  )}
                </div>
                <div className="cart_prize">
                  <ThemeProvider theme={theme}>
                    <Typography variant="h2" style={{ fontSize: "35px" }}>
                      Total Price:{" "}
                      {token
                        ? cartDetails && cartDetails.length
                          ? cartDetails.map((data) => {
                              let mulPrize = data.quantity * data.rate;
                              totalPrice = totalPrice + mulPrize;
                              return null;
                            })
                          : null
                        : null}
                      {token ? totalPrice : total()}
                    </Typography>
                  </ThemeProvider>
                  <Typography
                    variant="subtitle1"
                    align="right"
                    style={{ fontSize: "22px", marginTop: "10px" }}
                  >
                    Shipping, taxes, and discounts will be calculated at
                    checkout.
                  </Typography>
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#ff9100",
                        outline: "none",
                        marginRight: "10px",
                      }}
                      onClick={() => history.push("/")}
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={viewCheckOuthandle}
                      style={{ backgroundColor: "#ff9100", outline: "none" }}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Grid
                container
                justify="center"
                style={{
                  backgroundColor: "rgba(255,255,255,1)",
                  color: "rgba(255,255,255,1)",
                }}
              >
                <img src={EmptyCart} alt="" />
              </Grid>
            )}
          </div>
        )}
      </MuiThemeProvider>
    </div>
  );
}

export default CartContainer;
