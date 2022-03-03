import React from "react";
import "./productDiscriptionPage.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { API_URL, cart, user } from "../../../api/constants";
import Axios from "../../../api/axios";
import cookie from "react-cookies";
import Alert from "@material-ui/lab/Alert";
import SessionCheck from "../../../api/SessionCheck";

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
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  typography: {
    paddingTop: theme.spacing(2),
  },
  thumbnails: {
    margin: theme.spacing(2),
    width: 600,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
  },
  image: {
    width: "600px",
    // height: "400px",
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      // height: "400px",
      width: "500px",
    },
    [theme.breakpoints.down("xs")]: {
      // height: "400px",
      width: "300px",
    },
  },
}));

function ProductDiscriptionPage(props) {
  // console.log("products ==>>", props);
  const addtoCart_API = `${cart.addToCart}/`;
  const token = SessionCheck.checkSession();
  let userId;
  if (token) {
    // console.log("token==>>", token);
    const userdetails = SessionCheck.getLoggedinUserId();
    userId = userdetails.userId;
  }

  const [varientList, setVarientList] = React.useState(props.varient);
  const [filterGpList, setFilterGpList] = React.useState(props.filterGp);
  const [indexValue, setIndexValue] = React.useState(0);
  const [count, setCount] = React.useState(1);
  const [pincodeOpen, setPincodeOpen] = React.useState(false);
  const [changePincode, setChangePincode] = React.useState();
  const [noStockPoint, setNoStockPoint] = React.useState(false);

  const classes = useStyles();
  const history = useHistory();

  // console.log(varientList, "varientList>>>>>>>>>");
  // console.log(props.varient, "props.varient>>>>>>>>>");
  // console.log(filterGpList, "props.filterGp>>>>>>>>>");

  const [data, setData] = React.useState({
    variantName: varientList[0].variantName,
    variantId: varientList[0]._id,
    filterGp: filterGpList[0].filterName,
    quantity: count,
    productId: props.id,
    productName: props.title,
  });
  // console.log(data, "<<<<<<<<<<<data>>>>>>>>>>>>>>>>>>");

  let pin = { pincode: cookie.load("pincode") };

  const subtrCount = () => {
    setCount(Math.max(count - 1, 1));
    const newData = { ...data };
    newData["quantity"] = count;
    setData(newData);
  };

  const addCount = () => {
    setCount(Math.max(count + 1));
    const newData = { ...data };
    newData["quantity"] = count;
    setData(newData);
    // // console.log(data.quantity, "quantity");
  };

  const pincodehandleClickOpen = () => {
    if (token) {
      setPincodeOpen(true);
      // setAddCartOpen(true);
    } else {
      // console.log("else Part!!!");
      if (pin.pincode && pin.pincode !== "undefined") {
        // console.log("else Part pin!!!");
        // setAddCartOpen(true);
        viewCarthandle();
      } else {
        // console.log("else Part pin else!!!");
        setPincodeOpen(true);
      }
    }
  };

  function changePincodeHandle(e) {
    // console.log("change pincode==>>", e.target.value);
    setChangePincode(e.target.value);
  }

  const pincodehandleClose = () => {
    setPincodeOpen(false);
  };

  const setPincodefn = () => {
    cookie.save("pincode", changePincode, { path: "/" });
    pincodehandleClose();
    viewCarthandle();
    // addCarthandleClickOpen();
  };

  const viewCarthandle = () => {
    // console.log("submit");

    let postData = [
      {
        variantName: varientList[0].variantName,
        variantId: varientList[0]._id,
        quantity: count,
        productId: props.id,
        productName: props.title,
      },
    ];

    let cart = [];

    if (token) {
      // console.log("token with!!");
      Axios.post(
        addtoCart_API + userId + "?" + "zipCode=" + pin.pincode,
        postData
      ).then((res) => {
        // console.log("ress cart ==>>", res);
        if (res.data.selectedStockingPoints.length === 0) {
          setNoStockPoint(true);
        }
        if (res.status === 200) {
          // console.log("ress sucess");
          // addCarthandleClose();
          // history.push("/shoppingCart");
        }
      });
    } else {
      //   cart = { cart: cookie.load("cart") };
      //   // let c = { ...cart };
      //   let c = cart;
      //   // var arr = JSON.parse(cart);
      //   let l = c.cart.length;
      //   console.log("json retuen data ==>>", c.cart, "==>>", l);
      //   if (l) {
      //     console.log("data==>>", data, "==>>", c.cart[l]);
      //     c.cart[l] = data;
      //     console.log("array pushed ==>>", c);
      //   } else {
      //     c = postData;
      //   }
      //   console.log("array addsed data ==>>", c, "==>>", l);
      //   cookie.remove("cart", { path: "/" });
      //   let cart2 = { cart: cookie.load("cart") };
      //   console.log("carttt betwen===>>", cart2);
      //   cookie.save("cart", c, { path: "/" });
      //   let cart1 = { cart: cookie.load("cart") };
      //   console.log("carttt final===>>", cart1);
    }
  };

  return (
    <div className="product_view">
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={3} justify="space-evenly">
          <Grid
            container
            //alignItems="center"
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            justify="center"
          >
            <img
              src={`${API_URL}/${varientList[indexValue].imagePath}`}
              alt=""
              className={classes.image}
              //width="65%"
              // mobile
              //width="320px"
              //desk
              // height="500px"
              //width="600vw"
              //object
              // style={{ objectFit: "contain" }}
            />
            <Grid
              container
              className={classes.thumbnails}
              spacing={3}
              //justify="space-between"
              justify="space-evenly"
            >
              {varientList[1]
                ? varientList.map((data, index) => (
                    <Grid item xs={3} onClick={() => setIndexValue(index)}>
                      <div>
                        <img
                          src={`${API_URL}/${data.imagePath}`}
                          alt=""
                          width="80%"
                          // width="50px"
                          // height="100px"
                          // border="1px solid black"
                          style={{
                            border:
                              index === indexValue ? "1px solid black" : null,
                          }}
                        />
                      </div>
                    </Grid>
                  ))
                : null}
              {/* <Grid item xs={3}>
                <img src={SubImg1} alt="" width="80%" />
              </Grid>
              <Grid item xs={3}>
                <img src={SubImg2} alt="" width="80%" />
              </Grid>
              <Grid item xs={3}>
                <img src={SubImg3} alt="" width="80%" />
              </Grid>
              <Grid item xs={3}>
                <img src={SubImg4} alt="" width="80%" />
              </Grid> */}
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            justify="flex-start"
          >
            <Typography
              variant="h4"
              //color="textSecondary"
              className={classes.typography}
              component="p"
              style={{ color: "rgba(188,135,0,1)" }}
            >
              {varientList[indexValue].variantName}
            </Typography>
            <Typography
              variant="h4"
              className={classes.typography}
              color="initial"
              component="p"
              align="left"
            >
              &#x20B9; {""}
              {varientList[indexValue].regularPrice} {""} /-
            </Typography>
            {filterGpList.map((data) => (
              <Grid container spacing={3} className={classes.typography}>
                <Grid item xs={3}>
                  <Typography variant="h6">{data.filterGroupName}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6">{data.filterName}</Typography>
                </Grid>
              </Grid>
            ))}

            <Grid container spacing={3} className={classes.typography}>
              <Grid container item xs={12}>
                <Grid item xs={4} sm={3}>
                  <Typography variant="h6">Quantity :</Typography>
                </Grid>
                <Grid container item xs={4}>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button style={{ outline: "none" }} onClick={subtrCount}>
                      <RemoveIcon />
                    </Button>
                    <Button style={{ outline: "none" }}>
                      <Typography variant="h5">{count}</Typography>
                    </Button>
                    <Button style={{ outline: "none" }} onClick={addCount}>
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                  {/* <IconButton
                    aria-label="delete"
                    style={{ outline: "none", marginRight: "10px" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h5" align="center">
                    2
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    style={{ outline: "none", marginLeft: "10px" }}
                  >
                    <AddIcon />
                  </IconButton> */}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" className={classes.typography}>
                  {props.description}
                </Typography>
              </Grid>
              {/* <Grid
                container
                justify="space-between"
                xs={12}
                sm={6}
                md={6}
                className={classes.typography}
              >
                <Button variant="contained">{products.variant[0]}</Button>
                <Button variant="contained">{products.variant[1]}</Button>
                <Button variant="contained">{products.variant[2]}</Button>
              </Grid> */}
            </Grid>

            <div
              //  className="cart_prize"
              className="product_tot_prizing"
            >
              <ThemeProvider theme={theme}>
                <Typography variant="h2" style={{ fontSize: "28px" }}>
                  Total: {varientList[indexValue].regularPrice * count}
                </Typography>
              </ThemeProvider>
              <Typography
                variant="subtitle1"
                align="right"
                style={{ fontSize: "22px", marginTop: "10px" }}
              >
                Shipping, taxes, and discounts will be calculated at checkout.
              </Typography>
              <div style={{ marginTop: "10px" }}>
                {/* <Button
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
                </Button> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={pincodehandleClickOpen}
                  style={{ backgroundColor: "#ff9100", outline: "none" }}
                >
                  Add to Cart
                </Button>
              </div>
              <Dialog open={pincodeOpen} onClose={pincodehandleClose}>
                <DialogTitle id="form-dialog-title">
                  Enter Pincode of Delivery location
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="pincode"
                    lable="Pincode"
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
                    continue
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            {noStockPoint ? (
              <Alert severity="warning">
                This Product is not waillable in your stocking point!
              </Alert>
            ) : null}
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default ProductDiscriptionPage;
