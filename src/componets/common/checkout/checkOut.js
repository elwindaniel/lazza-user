import React, { useState, useEffect, useRef } from "react";
import "./checkout.css";
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Paper,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
} from "@material-ui/core";
import DeliveryLocation from "./deleveryLocation";
import AddDeliveryLocation from "./addDeliveryLocation";
import PaymentOption from "./paymentOption";
import Axios from "../../../api/axios";
import { cart, user, payNow } from "../../../api/constants";
import SessionCheck from "../../../api/SessionCheck";
import "fontsource-roboto";
import { list, update } from "cart-localstorage";
import AddGuestUsrDeliveryAddrss from "./addDeliveryLocation/addGuestUsrDeliveryAddrss";
import { useSelector, useDispatch } from "react-redux";
import {
  addPincode,
  selectedPromCodeIndex,
  snackBar,
  addCartStockingPoints,
} from "../../../redux/actions";
import SnackBar from "../snackBar";
import CartCard from "../cartContainer/cartCard/cartCard";
import EmptyCart from "../../../assets/emptycart.jpg";
import { isEmpty, round } from '../../../utils/lodash';

let theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 32,
      fontWeight: "bold",
    },
  },
});

theme = responsiveFontSizes(theme);
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

export default function CheckOut() {
  const get_userbyuserid_API = `${user.getUserbyUserid}/`;
  const addtoCart_API = `${cart.addToCart}/`;

  const [isDelivryLocation, setIsDelivryLocation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offerUpdate, setofferUpdate] = useState("0");
  const [cartDetails, setCartDetails] = useState([]);
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  let checkoutFormSubmitButtonRef = useRef(null);
  const token = SessionCheck.checkSession();

  const userSession = SessionCheck.getLoggedinUserId();
  const [userDetails, setUserDetails] = useState();
  const [promoValue, setPromoValue] = React.useState("");
  const [promoValueForGuestUSer, setpromoValueForGuestUSer] = React.useState(null);
  const [promo, setPromo] = React.useState();
  const [localCartDetails, setLocalCartDetails] = useState();
  const [localStrgCrtDtls, setLocalStrgCrtDtls] = useState();
  const [guestAddress, setGuestAddress] = useState();
  const [buttonActive, setButtonActive] = useState(false);
  const [selectedStokingPoints, setSelectedStokingPoints] = useState([]);
  let pincode = useSelector((state) => state.userInfoReducer.pincode);
  let stockingPoint = useSelector(
    (state) => state.userInfoReducer.stockingPointDetails
  );
  let promoCodeSelectedObject = useSelector(
    (state) => state.userInfoReducer.selectedPromo
  );
  const [promoFlag, setPromoFlag] = React.useState(false);
  let promoCodeList = [];
  let grandTotal = 0;

  const isEmptyCart = () => {
    return token ? isEmpty(cartDetails) : isEmpty(localStrgCrtDtls);
  } 

  const calculateSubTotal = (cartInfo, selectedPromo) => {
    let totalCartAmount = 0 
    if(!cartInfo) return totalCartAmount;
    cartInfo.map(item => {
      const { discountPrice, rate, quantity, variantName, price, name } = item;
      let ItemPrice = token ? (discountPrice || rate) : price;
      let totalItemPrice = quantity * ItemPrice;
      let matchingVariantName = token ? variantName : name; 
      if (selectedPromo && matchingVariantName === selectedPromo.variantName) {
        const { value, status }  = selectedPromo;
        if (status === "percentage") {
          let promoPrice = totalItemPrice - (totalItemPrice * (value / 100))
          totalCartAmount = totalCartAmount + promoPrice
        } else {
          let promoPrice = totalItemPrice - value;
          totalCartAmount= totalCartAmount + promoPrice;
        }
      } else {
        totalCartAmount = totalCartAmount + totalItemPrice;
      };
    });
    return round(totalCartAmount);
  }

  let totalPrice = calculateSubTotal(token ? cartDetails : localStrgCrtDtls, promo);

  const promoFormHandleChange = (event, value, promo, e) => {
    dispatch(selectedPromCodeIndex(promo));
    setPromoValue(event);
    setpromoValueForGuestUSer(event);
    setPromo(promo);
    totalPrice = calculateSubTotal(token ? cartDetails : localStrgCrtDtls, promo);
    const totalWithOffer = totalPrice + stockingPoint.delivery
    setofferUpdate(totalWithOffer);
    localStorage.setItem("promoCodeWithOffer", totalWithOffer);
  }

  grandTotal = stockingPoint?.grant ? stockingPoint.grant : 0;
  console.log(grandTotal, "grandTotal");
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (
      (cartDetails?.length && pincode) ||
      (localStrgCrtDtls?.length && pincode)
    ) {
      addressCheck();
    }
  }, [cartDetails, pincode, localStrgCrtDtls, loading]);

  const addressCheck = async () => {
    if (isEmptyCart()) return;
    let localProductCheck = [];
    if (!token) {
      if (localStrgCrtDtls?.length) {
        localStrgCrtDtls.map((element) => {
          let res = {
            variantName: element.name,
            variantId: element.id,
            quantity: element.quantity,
            productId: element.productId,
            productName: element.productName,
          };
          localProductCheck.push(res);
        });
      }
    }

    const cart = token ? cartDetails : localProductCheck;

    await Axios.post(addtoCart_API + "null/?zipCode=" + pincode, cart).then(
      (res) => {
        dispatch(addCartStockingPoints(res.data));
        let guestAddress = localStorage.getItem("guestUserAddress");

        guestAddress = guestAddress ? JSON.parse(guestAddress) : null;
        if (res.status === 200) {
          if (res.data) {
            setSelectedStokingPoints(res.data.selectedStockingPoints);
            if (res.data.selectedStockingPoints.length === 0) {
              if (res.data.cartData.length > 0) {
                if (guestAddress) {
                  setButtonActive(false);
                } else {
                  setButtonActive(true);
                }
              } else {
                setButtonActive(true);
              }

              dispatch(
                snackBar(
                  true,
                  "error",
                  "This products are not available in your location " + pincode
                )
              );
            } else {
              if (res.data.productsNotAvailable.length !== 0) {
                setButtonActive(true);
                dispatch(
                  snackBar(
                    true,
                    "error",
                    "This product are not available in your location " + pincode
                  )
                );
              } else {
                // setButtonActive(false);
                setSelectedStokingPoints(res.data.selectedStockingPoints);
                if (res.data.cartData.length > 0) {
                  if (guestAddress) {
                    setButtonActive(false);
                  } else {
                    setButtonActive(true);
                  }
                } else {
                  setButtonActive(true);
                }
                dispatch(
                  snackBar(
                    true,
                    "success",
                    "Product are available in your location"
                  )
                );
              }
            }
          }
        }
      }
    );
  };

  const fetchUser = async () => {
    if (token) {
      try {
        await Axios.get(get_userbyuserid_API + userSession.userId).then(
          (res) => {
            setLoading(true);
            if (res.data.address.length > 0) {
              localStorage.setItem(
                "guestUserAddress",
                JSON.stringify(res.data.address)
              );
              setIsDelivryLocation(true);
              setButtonActive(false);
              setUserDetails(res.data);
              // console.log("user res ==>>", res.data);
              dispatch(
                addPincode(res.data.address[res.data.defaultAddress].zipcode)
              );
              pincode = res.data.address[res.data.defaultAddress].zipcode;
              // console.log("pincode ==>>", pincode);
              addressCheck();
              setLoading(false);
            } else {
              setUserDetails([]);
              pincode = "";
              setLoading(false);
              setButtonActive(true);
            }
          }
        );
      } catch (e) {}
    } else {
      let guestAddress = localStorage.getItem("guestUserAddress");

      guestAddress = guestAddress ? JSON.parse(guestAddress) : null;

      if (guestAddress) {
        setIsDelivryLocation(true);
        setGuestAddress(guestAddress);
        setButtonActive(false);
        pincode = guestAddress ? guestAddress[0].zipcode : null;
        // console.log("gust pincode==>>", pincode);
        addressCheck();
      } else {
        setIsDelivryLocation(false);
        pincode = "";
        setButtonActive(true);
      }
    }
  };

  const updatePromoCodes = async () => {
    if (isEmptyCart()) return;
    let localProductCheck = [];
    if (!token) {
      let cartDetailsFromLS = list();
      if (cartDetailsFromLS?.length) {
        cartDetailsFromLS.map((element) => {
          if (element.promocode.length > 0) {
            setPromoFlag(true);
          }
          let res = {
            variantName: element.name,
            variantId: element.id,
            quantity: element.quantity,
            productId: element.productId,
            productName: element.productName,
          };
          localProductCheck.push(res);
        });
      }
    }

    const cart = token ? cartDetails : localProductCheck;

    await Axios.post(addtoCart_API + "null/?zipCode=" + pincode, cart).then(
      (res) => {
        if (res.status === 200) {
          if (res.data) {
            if (res.data.cartData.length !== 0) {
              res.data.cartData.map((element) => {
                update(element.variantId, "promocode", element.promoCodes);
              });
            }
          }
        }
      }
    );
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className="p-3 mb-4">
            <h2 class="sub-header border-0 " style={{ marginTop: "16px" }}>
              DELIVERY ADDRESS
            </h2>
            {isDelivryLocation ? (
              <div>
                {" "}
                <DeliveryLocation
                  address={token ? userDetails : guestAddress}
                  onSuccessEdit={handleDeliveryLocation}
                  user={token ? "signedUser" : "guestUser"}
                />
                <Grid
                  container
                  justify="flex-end"
                  alignItems="center"
                  style={{ marginBottom: "14px" }}
                >
                  {guestAddress ? null : (
                    <Button
                      onClick={() => setIsDelivryLocation(false)}
                      style={{
                        color: "#fff",
                        backgroundColor: "#000",
                      }}
                    >
                      Add Address
                    </Button>
                  )}
                </Grid>
              </div>
            ) : (
              <div>
                {token ? (
                  <AddDeliveryLocation
                    address={userDetails}
                    onSelect={handleDeliveryLocation}
                  />
                ) : (
                  <AddGuestUsrDeliveryAddrss
                    onSelect={handleDeliveryLocation}
                  />
                )}
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div className="p-3">
            <h2 class="sub-header border-0 " style={{ marginTop: "16px" }}>
              ORDER SUMMARY{" "}
            </h2>
            <PaymentOption
              subtotal={totalPrice}
              totalPrize={offerUpdate}
              // totalPrize={
              //   offerUpdate && offerUpdate != "0" ? offerUpdate : total
              // }
              cartDetails={token ? cartDetails : localStrgCrtDtls}
              promoCodes={promo}
            />
            <h4>{buttonActive}</h4>
            <form method="post" action="https://secure.payu.in/_payment">
              <input type="hidden" name="key" value={checkoutDetails?.key} />
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
              <input type="hidden" name="hash" value={checkoutDetails?.hash} />
              <input type="hidden" name="surl" value={checkoutDetails?.surl} />
              <input type="hidden" name="furl" value={checkoutDetails?.furl} />
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
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  /**
   * TODO: Needs to remove this implimentation after the backend enhancement
   * Adding the below keys to support creation of order before proceeding the payment
   * Everything should fetch from the backend based on the Cart Info
   * Method: getCreateOrderPayload
   */
  const getCreateOrderPayload = (checkoutPayload) => {
    let address = {};
    let total = "";
    let productDetails = [];
    let customerId = null;

    if (token) {
      address = userDetails && userDetails.address[userDetails.defaultAddress];
      total = localStorage.getItem("promoCodeWithOffer");
      productDetails = cartDetails;
      customerId = userSession.userId;
    } else {
      let guestAddress = localStorage.getItem("guestUserAddress");
      address = guestAddress && JSON.parse(guestAddress)[0];
      productDetails = JSON.parse(localStorage.getItem("__cart"));
    }
    const {
      addressLine1,
      addressLine2,
      street,
      city,
      district,
      state,
      country,
      zipcode,
      phoneNumber,
      name,
    } = address;

    return {
      ...checkoutPayload,
      promoCodes: [promoCodeSelectedObject],
      selectedStockingPoints: selectedStokingPoints,
      customerId,
      productDetails,
      total,
      addressLine1,
      addressLine2,
      street,
      city,
      district,
      state,
      country,
      zipcode,
      customerMobileNumber: phoneNumber,
      name,
    };
  };

  const proceedCheckout = async () => {
    let totalAmount = 0;
    if (offerUpdate == 0) totalAmount = grandTotal;
    else totalAmount = offerUpdate;

    let data = {
      email: token ? userDetails.email : "",
      amount: totalAmount,
      productName: token
        ? cartDetails[0].productName
        : localStrgCrtDtls[0].name,
      promoCodeId: promo?.promocodeId ?? null,
    };
    data = getCreateOrderPayload(data);
    await Axios.post(`${payNow.payU}`, data).then((res) => {
      console.log("payment res ==>>", res);
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

  function handleDeliveryLocation() {
    setIsDelivryLocation(true);
    fetchUser();
  }

  const fetchPost = async () => {
    if (token) {
      try {
        await Axios.get(cart.getCart + "/" + userSession.userId).then((res) => {
          setCartDetails(res.data);
          console.log("cart data ==>>", res.data);
          if (res.data) {
            res.data.map((data) => {
              if (data.promoCodes) {
                setPromoFlag(true);
              }

              return null;
            });
          }
          setLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      setLocalCartDetails(JSON.parse(localStorage.getItem("cart")));
      setLocalStrgCrtDtls(list());

      await updatePromoCodes().then(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchPost();
  }, [userSession.userId]);

  const promCodeListRender = (token) => {
    let cartArray = localStorage.getItem("__cart");
    cartArray = cartArray ? JSON.parse(cartArray) : [];
    cartArray.map((data, index) => {
      promoCodeList.push(...data.promocode);
    });

    if (token === "") {
      return (
        <>
          {" "}
          {promoCodeList.length > 0
            ? promoCodeList.map((promo, i) => {
                console.log(promo, "promo");
                return (
                  <>
                    <FormControlLabel
                      value={i}
                      control={
                        <Radio id={i} onClick={(event) =>
                            promoFormHandleChange(
                              i,
                              promo.value,
                              promo,
                              event
                              // data
                            )
                          }
                        />
                      }
                      style={{
                        marginTop: 18,
                      }}
                      label={
                        <Paper className={classes.offerFormPaper} elevation={0}>
                          <Typography
                            variant="h5"
                            align="left"
                            style={{
                              fontSize: 22,
                            }}
                          >
                            {promo.promotionalCode} -{" "}
                            {promo.status === "percentage" ? (
                              <>{promo.value} % </>
                            ) : (
                              <>Rs {promo.value} </>
                            )}
                            Off on {promo.variantName}
                          </Typography>
                        </Paper>
                      }
                    />
                    {promo.minimumSpent ? (
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        align="left"
                        style={{
                          paddingTop: 0,
                          paddingLeft: 45,
                          fontSize: 18,
                        }}
                      >
                        {" "}
                        Minimum Total Order Value must be above &#x20B9;{" "}
                        {promo.minimumSpent}
                      </Typography>
                    ) : null}
                  </>
                );
              })
            : null}
        </>
      );
    } else {
      return cartDetails.map((data) => {
        return (
          <>
            {data.promoCodes && data.promoCodes.length
              ? data.promoCodes.map((promo, i) => {
                  return (
                    <>
                      <FormControlLabel
                        value={promo._id}
                        control={
                          <Radio id={i} onClick={(event) =>
                              promoFormHandleChange(
                                promo._id,
                                promo.value,
                                promo,
                                event
                              )
                            }
                          />
                        }
                        style={{
                          marginTop: 18,
                        }}
                        label={
                          <Paper
                            className={classes.offerFormPaper}
                            elevation={0}
                          >
                            <div
                              style={{
                                fontSize: 22,
                              }}
                            >
                              <span className="font-weight-bold">
                                {promo.promotionalCode}
                              </span>{" "}
                              -{" "}
                              {promo.status === "percentage" ? (
                                <>{promo.value} % </>
                              ) : (
                                <>Rs {promo.value} </>
                              )}
                              Off on {data.variantName}
                            </div>
                          </Paper>
                        }
                      />
                      {promo.minimumSpent ? (
                        <div
                          style={{
                            paddingTop: 0,
                            paddingLeft: 45,
                            fontSize: 18,
                          }}
                        >
                          {" "}
                          Total Order Value must be above &#x20B9;{" "}
                          <span className="font-weight-bold">
                            {promo.minimumSpent}
                          </span>
                        </div>
                      ) : null}
                    </>
                  );
                })
              : null}
          </>
        );
      });
    }
  };

  const isStockAvailable = (variantId) => {
    let variant = selectedStokingPoints.find(
      (ele) => ele.variantId == variantId
    );
    return variant ? variant.variantId == variantId : false;
  };

  return (
    <div
      className="bg-light-gray mt-80px py-4 px-4"
      style={{ minHeight: "70vh" }}
    >
      <SnackBar />
      <div>
        {loading ? (
          <LinearProgress color="rgba(188,135,0,100%)" />
        ) : (
          <div className="pb-md-1 px-md-2">
            <div>
              <div className="row justify-content-between">
                <div className=" col col-12 col-lg-8 bg-white">
                  <h2 class="sub-header headingtextt">MY CART</h2>
                  <div className="border-bottom-thic">
                    {token ? (
                      cartDetails && cartDetails?.length > 0 ? (
                        cartDetails.map((data, index) => (
                          <CartCard
                            key={index}
                            id={data._id}
                            quantity={data.quantity}
                            image={data.image}
                            title={data.variantName}
                            promo={promo}
                            prize={
                              data.discountPrice
                                ? data.discountPrice
                                : data.rate
                            }
                            onSelect={() => fetchPost()}
                            isStockAvailable={isStockAvailable(
                              data.variantId
                            )}
                            pincode={pincode}
                          />
                        ))
                      ) : (
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                          style={{ minHeight: "70vh" }}
                        >
                          <h3>No products added in cart!</h3>
                          <img src={EmptyCart} alt="" />
                        </Grid>
                      )
                    ) : localStrgCrtDtls && localStrgCrtDtls.length ? (
                      localStrgCrtDtls.map((data, index) => {
                        return (
                          <CartCard
                            key={index}
                            id={data.id}
                            quantity={data.quantity}
                            image={data.image}
                            title={data.name}
                            promo={promo}
                            prize={data.price}
                            onSelect={() => fetchPost()}
                            isStockAvailable={isStockAvailable(data.id)}
                            pincode={pincode}
                          />
                        );
                      })
                    ) : (
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{ minHeight: "50vh" }}
                      >
                        <h3>No products added in cart!</h3>
                        <img src={EmptyCart} alt="" className="crtimg" />
                      </Grid>
                    )}
                  </div>

                  <Grid container justify="flex-end">
                    <h3 className="sub-header border-0 mt-0">
                      Sub Total: &#x20B9;
                      {totalPrice}
                    </h3>
                  </Grid>

                  <div>
                    {promoFlag ? (
                      <h2 className="sub-header">Available promocodes</h2>
                    ) : null}
                    <RadioGroup
                      aria-label="promoCode"
                      value={token ? promoValue : promoValueForGuestUSer}
                    >
                      {token
                        ? promCodeListRender(token)
                        : promCodeListRender("")}
                    </RadioGroup>
                  </div>
                </div>
                <div className=" col p-0 p-lg-auto mt-2 mt-md-0 ml-lg-2">
                  <div className="bg-white">{getStepContent(0)}</div>
                  <div className="bg-white">{getStepContent(1)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
