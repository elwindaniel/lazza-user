import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, ButtonGroup, Link } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { API_URL } from "../../../api/constants";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ProductDiscription from "../productDiscriptionPage/productDiscriptionPopUP";
import ProductView from "../productDiscriptionPage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./card.css";
import SessionCheck from "../../../api/SessionCheck";
import Axios from "../../../api/axios";
import { cart } from "../../../api/constants";
import cookie from "react-cookies";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import {
  addPincode,
  snackBar,
  getCartCount,
  removePincode,
  addCartStockingPoints,
} from "../../../redux/actions";
import Tooltip from "@material-ui/core/Tooltip";
import { add } from "cart-localstorage";
import "../../../styles/styles.css";
import { useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  divroot: {
    marginRight: "50%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "3%",
    },
  },
  root: {
    width: 300,
    height: 430,
    marginBottom: "5%",
    marginRight: "50%",
    marginTop: "5%",
  },
  media: {
    paddingTop: "180px",
    objectFit: "contain",
  },
  paper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  varientDropdown: {
    width: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: "15px 0 0 0",
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
    position: "relative",
  },
  varientDropdownOptions: {
    zIndex: 9,
    width: "80px",
    position: "absolute",
    top: "71px",
    padding: theme.spacing(1),
  },
  discountPrice: {
    height: 75,
  },
  rootTest: {
    backgroundColor: "transparent"
  },
  paperTest: {
    boxShadow: "0px 0px 0px 6px #888888"
  },
  activeButton: {
    backgroundColor: "#000",
    color: "#fff",
    outline: "none",
    letterSpacing: "1px",
  },
  disabledButton: {
    backgroundColor: "#ccccc",
    color: "#666666",
    outline: "none",
    letterSpacing: "1px",
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 1)
  },
  dialogActions: {
    flexDirection: 'column',
    color: "#F27321",
    width: "85%",
    margin: "auto",
    textAlign: "center"
  },
  dialogContent: {
    display: "flex",
    alignItems: 'flex-end',
  }
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#ff9100",
  },
  tooltip: {
    backgroundColor: "rgba(188,135,0,1)",
    fontSize: theme.typography.pxToRem(18),
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();
  return <Tooltip arrow classes={classes} {...props} />;
}

const MAX_LENGTH = 25;

let arrayvalue = localStorage.getItem("foryou");

arrayvalue = arrayvalue ? JSON.parse(arrayvalue) : [];

const CardView = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const addtoCart_API = `${cart.addToCart}/`;
  const token = SessionCheck.checkSession();
  let userId;
  if (token) {
    const userdetails = SessionCheck.getLoggedinUserId();
    userId = userdetails.userId;
  }

  const [pincodeOpen, setPincodeOpen] = React.useState(false);
  const [addCartOpen, setAddCartOpen] = React.useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [isDropdownOptions, setIsDropdownOptions] = React.useState(false);
  const [varientList] = React.useState(props.varient);
  const [count, setCount] = React.useState(1);
  const [data, setData] = React.useState({
    variantName: varientList[0].variantName,

    variantId: varientList[0]._id,
    quantity: count,
    productId: props.id,
    productName: props.title,
  });

  const [productData, setProductData] = React.useState({
    productId: props.id,
    productName: props.title,
    offer: props.offer,
    img: props.imgsrc,
    discountPrice: props.disMrp,
    regularPrice: props.mrp,
    filterGp: props.filterGp,
  });

  const [changePincode, setChangePincode] = React.useState();
  const [noStockPoint, setNoStockPoint] = React.useState(false);

  let pin = { pincode: cookie.load("pincode") };

  let pincode = useSelector((state) => state.userInfoReducer.pincode);

  let pinCode = token ? pincode : pin.pincode;

  const pincodehandleClickOpen = () => {
    if (token) {
      if (pincode !== "" && pincode !== undefined) {
        setChangePincode(pincode);
        setAddCartOpen(true);
      } else {
        setPincodeOpen(true);
      }
    } else {
      if (pin.pincode && pin.pincode !== "undefined") {
        setAddCartOpen(true);
      } else {
        setPincodeOpen(true);
      }
    }
  };

  function changePincodeHandle(e) {
    setChangePincode(e.target.value);
  }

  function alertChangePincode() {
    dispatch(removePincode());
    setNoStockPoint(false);
    setPincodeOpen(true);
  }

  const pincodehandleClose = () => {
    setPincodeOpen(false);
  };

  const [pincodelengthValidateError, setPincodelengthValidateError] =
    useState(false);

  const setPincodefn = () => {
    if (changePincode.length === 6) {
      setPincodelengthValidateError(false);
      if (token) {
        pincode = changePincode;
        dispatch(addPincode(changePincode));
      } else {
        cookie.save("pincode", changePincode, { path: "/" });
        dispatch(addPincode(changePincode));
      }

      pincodehandleClose();
      addCarthandleClickOpen();
    } else {
      setPincodelengthValidateError(true);
    }
  };

  const history = useHistory();
  const setPincodeAndReload = () => {
    let newPincode = changePincode || "682020"
    if (newPincode.length === 6) {
      setPincodelengthValidateError(false);
      if (token) {
        pincode = newPincode;
        dispatch(addPincode(newPincode));
      } else {
        cookie.save("pincode", newPincode, { path: "/" });
        dispatch(addPincode(newPincode));
      }
      // history.push('/allProduct')
      window.location.reload();
    } else {
      setPincodelengthValidateError(true);
    }
  }

  const addCarthandleClickOpen = () => {
    setAddCartOpen(true);
  };

  const addCarthandleClose = () => {
    setAddCartOpen(false);
  };

  // const productSelect = () => {
  //   if (token) {
  //   } else {
  //     setOpenPopup(true);
  //   }
  // };

  const changeVariant = (index) => {
    let temp = varientList[0];
    varientList[0] = varientList[index + 1];
    varientList[index + 1] = temp;
    setIsDropdownOptions(!isDropdownOptions);
    setProductData({
      productId: varientList[0]._id,
      productName: varientList[0].variantName,
      offer: varientList[0].offers,
      img: varientList[0].imagePath,
      discountPrice: varientList[0].discountPrice,
      regularPrice: varientList[0].regularPrice,
    });
  };

  const viewCarthandle = async (buyNow = false) => {
    if (pincode) {
      let postData = [
        {
          variantName: props.title,
          variantId: props.variantId,
          quantity: count,
          productId: props.id,
          productName: props.ProductName,
        },
      ];

      let promocode;
      props.varient.map((data) => {
        if (data.variantName === props.title) {
          promocode = data.promotionCode;
        }
        return null;
      });

      let ptData = {
        variantName: props.title,
        variantId: props.id,
        quantity: count.toString(),
        productId: props.id,
        productName: props.title,
        image: props.imgsrc,

        discountPrice: props.disMrp,
        rate: props.mrp,
        variants: props.varient,
        promocode: promocode,
      };

      let forUProdExt = false;

      if (arrayvalue.length > 0) {
        arrayvalue.map((data) => {
          if (data.productId === ptData.productId) {
            forUProdExt = true;
          }
          return null;
        });
        if (forUProdExt === false) {
          arrayvalue.push(ptData);
        }
      } else {
        arrayvalue.push(ptData);
      }

      localStorage.setItem("foryou", JSON.stringify(arrayvalue));

      if (token) {
        // console.log("token with!!", postData, "==>>", pincode);
        await Axios.post(
          addtoCart_API + userId + "?zipCode=" + pincode,
          postData
        )
          .then((res) => {
            // console.log("ress cart ==>>", res);
            dispatch(getCartCount());
            dispatch(addCartStockingPoints(res.data));

            if (res.status === 200) {
              if (res.data.selectedStockingPoints.length === 0) {
                setNoStockPoint(true);
                dispatch(
                  snackBar(
                    true,
                    "error",
                    "This product is not available in your location "
                  )
                );
              } else {
                if (res.data.productsNotAvailable.length !== 0) {
                  setNoStockPoint(true);
                  dispatch(
                    snackBar(
                      true,
                      "error",
                      "This product is not available in your location"
                    )
                  );
                } else {
                  dispatch(
                    snackBar(true, "success", "Product has been added to cart")
                  );
                }

                addCarthandleClose();
                if (buyNow) { history.push("/shoppingCart"); }
              }
            }
          })
          .catch((err) => {
            //console.log(err);
          });
      } else {
        let promocode;
        props.varient.map((data) => {
          if (data.variantName === props.title) {
            promocode = data.promotionCode;
          }
          return null;
        });

        await Axios.post(
          addtoCart_API + "null/?zipCode=" + pincode,
          postData
        ).then((res) => {
          //console.log(res, "res");
          // dispatch(addCartStockingPoints(res.data));
          if (res.status === 200) {
            if (res.data.selectedStockingPoints.length === 0) {
              setNoStockPoint(true);
              dispatch(
                snackBar(
                  true,
                  "error",
                  "This product is not available in your location "
                )
              );
            } else {
              if (res.data.productsNotAvailable.length !== 0) {
                setNoStockPoint(true);
                dispatch(
                  snackBar(
                    true,
                    "error",
                    "This product is not available in your location"
                  )
                );
              } else {
                add(
                  {
                    id: props.variantId,
                    name: props.title,
                    price: props.disMrp ? props.disMrp : props.mrp,
                    productId: props.id,
                    productName: props.ProductName,
                    image: props.imgsrc,
                    varients: props.varient,
                    promocode: res.data.cartData[0].promoCodes,
                  },
                  count
                );

                let aaa = [
                  {
                    id: props.variantId,
                    name: props.title,
                    price: props.disMrp ? props.disMrp : props.mrp,
                    productId: props.id,
                    productName: props.ProductName,
                    image: props.imgsrc,
                    varients: props.varient,
                    promocode: res.data.cartData[0].promoCodes,
                  },
                ];

                //console.log("aaaaa==>>", aaa);
                dispatch(getCartCount());
                addCarthandleClose();
                dispatch(
                  snackBar(true, "success", "Product has been added to cart")
                );
              }

              addCarthandleClose();
              if (buyNow) { history.push("/shoppingCart"); }
            }
          }
        });
      }
    } else {
      setPincodeOpen(true);
    }
  };

  const addCount = () => {
    const newCount = Math.max(count + 1);
    setCount(newCount);
    const newData = { ...data };
    newData["quantity"] = newCount;
    setData(newData);
    checkProductAvailability(newCount);
  };

  const subtrCount = () => {
    let newCount = Math.max(count - 1, 1);
    setCount(newCount);
    const newData = { ...data };
    newData["quantity"] = newCount;
    setData(newData);
    checkProductAvailability(newCount);
  };

  const isStockAvailable = ({ selectedStockingPoints, variantId }) => {
    let variant =
      selectedStockingPoints &&
      selectedStockingPoints.find((ele) => ele.variantId == variantId);
    return variant ? variant.variantId == variantId : false;
  };

  const checkProductAvailability = async (newCount) => {
    const { variantName, variantId, productId, productName } = data;
    const cart = [
      { variantName, variantId, quantity: newCount, productId, productName },
    ];

    await Axios.post(addtoCart_API + "null/?zipCode=" + pincode, cart).then(
      (res) => {
        if (
          res.status === 200 &&
          res.data &&
          res.data.selectedStockingPoints.length > 0
        ) {
          let isAvailable = isStockAvailable({
            variantId,
            selectedStockingPoints: res.data.selectedStockingPoints,
          });
          setNoStockPoint(!isAvailable);
        } else {
          setNoStockPoint(true);
        }
      }
    );
  };

  const getStatus = (statusCode = "undeliverable") => {
    const status = { out_of_stock: "Out of Stock", available: "Add to Cart", undeliverable: "Undeliverable" }
    return status[statusCode] || "Invalid";
  }

  return (
    <div className={classes.divroot}>
      <div className="product-container mt-4 text-center">
        <Grid container justify="space-between" style={{ width: "100%" }}>
          {productData.offer ? (
            <div className="offer">
              <div>OFFER</div>
            </div>
          ) : (
            <div style={{ width: "20px" }}></div>
          )}
          <div
            className="varientDropdown"
            onClick={() => setIsDropdownOptions(!isDropdownOptions)}
            onMouseEnter={() => setIsDropdownOptions(!isDropdownOptions)}
            onMouseLeave={() => setIsDropdownOptions(!isDropdownOptions)}
          >
            {varientList[1] ? (
              <ExpandMoreIcon
                className="cursor"
                style={{
                  color: "#000",
                }}
                fontSize="large"
              />
            ) : null}
            {varientList[1] && isDropdownOptions ? (
              <div className="varientDropdownOptions p-2">
                {varientList.slice(1, 7).map((data, index) => {
                  return (
                    <div
                      className="varientDropdownOptionsName row border-bottom cursor"
                      onClick={() => changeVariant(index)}
                    >
                      <img
                        src={`${API_URL}/${data.imagePath}`}
                        className="avatar"
                        alt=""
                      />

                      <BootstrapTooltip title={data.variantName}>
                        <div className="text-nowrap py-2 cursor">
                          {data.variantName.substring(0, 20)}
                        </div>
                      </BootstrapTooltip>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </Grid>
        <div className="w-100 ">
          <img
            className="product-img mx-auto mb-2"
            src={`${API_URL}/${productData.img}`}
            alt=""
          />
        </div>
        <BootstrapTooltip title={productData.productName}>
          <h4 className="product-title cursor">
            {productData.productName.substring(0, MAX_LENGTH) + ".."}
          </h4>
        </BootstrapTooltip>
        <div
          style={{
            height: 60,
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            align: "center",
          }}
        >
          {productData.discountPrice && (
            <h3 className="product-price">
              {" "}
              {"₹ " + productData.discountPrice}
            </h3>
          )}
          {productData.discountPrice && (
            <h3 className="product-price strike">
              {"₹ " + productData.regularPrice}
            </h3>
          )}
          {!productData.discountPrice && (
            <h3 className="product-price mt-3">
              {"₹ " + productData.regularPrice}
            </h3>
          )}
        </div>
        <Grid item xs={12}>
          <Button
            id="addProductToCart"
            className={props.status == 'available' ? classes.activeButton : classes.disabledButton}
            variant="contained"
            onClick={pincodehandleClickOpen}
            elevation={7}
            value={data.variantName}
            disabled={props.status != 'available'}
          >
            {getStatus(props.status)}
          </Button>
        </Grid>
      </div>
      <Dialog
        open={pincodeOpen}
        onClose={pincodehandleClose}
        aria-labelledby="form-dialog-title"
      >
        {pincodelengthValidateError ? (
          <Alert severity="error">Enter Valid Pincode!</Alert>
        ) : null}
        <DialogTitle id="form-dialog-title">
          Enter Pincode of Delivery Location
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="pinCode"
            label="Pincode"
            type="text"
            fullWidth
            onChange={(e) => changePincodeHandle(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={setPincodefn}
            color="primary"
            style={{ backgroundColor: "#ff9100", outline: "none" }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={addCartOpen}
        onClose={addCarthandleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent className="card_addtocartConfirm">
          {noStockPoint ? (
            <Alert
              severity="warning"
              action={
                <Link href="#" onClick={alertChangePincode} align="right">
                  Want to try another location?
                </Link>
              }
            >
              This Product is Not Available Near Your Location at {pincode}
            </Alert>
          ) : null}

          <Grid
            container
            spacing={3}
            justify="space-between"
            alignItems="center"
          >
            <Grid
              container
              item
              xs={12}
              sm={8}
              align="left"
              alignItems="center"
              justify="space-between"
            >
              <img src={`${API_URL}/${productData.img}`} alt="" width="40%" />
              <div>
                <Typography
                  variant="subtitle1"
                  //color="textSecondary"
                  component="p"
                  style={{
                    color: "#666",
                    fontSize: "22px",
                    fontFamily: "Open Sans Condensed",
                  }}
                >
                  {productData.productName}
                </Typography>
                <Grid container item xs={12}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    style={{
                      color: "#666",
                      fontSize: "22px",
                      fontFamily: "Open Sans Condensed",
                    }}
                  >
                    Qty: &ensp;
                  </Typography>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button style={{ outline: "none" }} onClick={subtrCount}>
                      <RemoveIcon />
                    </Button>
                    <Button style={{ outline: "none" }}>
                      <Typography variant="h6">{count}</Typography>
                    </Button>
                    <Button
                      style={{ outline: "none" }}
                      onClick={addCount}
                      disabled={noStockPoint}
                    >
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} align="right">
              <Typography variant="h4" color="initial" component="p">
                &#x20B9;
                {productData.offer
                  ? productData.discountPrice * count
                  : productData.regularPrice * count}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => viewCarthandle(false)}
            color="primary"
            style={{ backgroundColor: "#ff9100", outline: "none" }}
          >
            Add to cart
          </Button>
          <Button
            variant="contained"
            onClick={() => viewCarthandle(true)}
            color="secondary"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              outline: "none",
              letterSpacing: "1px",
            }}
          >
            Buy Now
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={!pinCode}
        onClose={pincodehandleClose}
        aria-labelledby="form-dialog-title"
        BackdropProps={{
          classes: {
            root: classes.rootTest
          }
        }}
        PaperProps={{
          classes: {
            root: classes.paperTest
          }
        }}
      >
        {pincodelengthValidateError ? (
          <Alert severity="error">Enter Valid Pincode!</Alert>
        ) : null}
        <DialogTitle id="form-dialog-title" disableTypography className={classes.dialogTitle}>
          <Typography component="div">Enter Pincode of Delivery Location</Typography>
          <IconButton aria-label="close" onClick={() => setPincodeAndReload()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            required
            autoFocus
            margin="dense"
            id="pinCode"
            label="Pincode"
            type="text"
            fullWidth
            onChange={(e) => changePincodeHandle(e)}
          />
          <Button
            variant="contained"
            onClick={setPincodeAndReload}
            color="primary"
            style={{ backgroundColor: "#ff9100", outline: "none", marginLeft: "10px" }}
          >
            Continue
          </Button>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
         Providing a Pincode will ensure the correct display of stock availability and deliverability of your order
        </DialogActions>
      </Dialog>
      <ProductDiscription openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <ProductView
          id={props.id}
          title={props.title}
          varient={props.varient}
          description={props.description}
          discountPrice={props.discountPrice}
          filterGp={props.filterGp}
        />
      </ProductDiscription>
    </div>
  );
};

export default CardView;
