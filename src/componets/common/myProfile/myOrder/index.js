import React, { useState, useEffect } from "react";
import "./myOrder.css";
import { Typography, Paper } from "@material-ui/core";
import ProductImg from "../../../../assets/productView/productimg.png";
import { cart, order } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import SessionCheck from "../../../../api/SessionCheck";
import CartProducts from "../../checkout/cartProducts";
// import OrderCard from "./orderCard";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

//import classes from "*.module.css";
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme({});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(9),
    [theme.breakpoints.down("md")]: {
      // display: "flex",
      // justifyContent: "center",
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  none: { display: "none" },
  paper: {
    marginLeft: theme.spacing(2),
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
  },
  img: {
    width: "20%",
  },
  address: {
    width: "50px",
  },
}));

export default function MyOeder() {
  const userdetails = SessionCheck.getLoggedinUserId();
  const [loading, setLoading] = useState(true);
  const userId = userdetails.userId;
  const [orderData, setOrderData] = useState();
  const [expand, setExpand] = useState(false);
  const [selectedfilterGrpId, setSelectedfilterGrpId] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // console.log("order !!!");
        await Axios.get(order.getOrdersByUserId + "/" + userId).then((res) => {
          // console.log("order res ==>>", res);
          // console.log("res.data ==>>", res.data);
          setOrderData(res.data);
        });
      } catch (e) {
        // console.log(e);
      }
    };
    fetchPost();
  }, []);

  const expandLess = (id) => {
    if (id === selectedfilterGrpId) {
      setExpand(!expand);
    } else {
      setSelectedfilterGrpId(id);
    }
  };

  const classes = useStyles();
  return (
    <div>
      <h2 className="sub-header border-0">My Orders</h2>
      <hr />
      <div className={classes.paper}>
        <div className={`${classes.flex} text-left`}>
          <h4>Order ID</h4>
          <h4>{"Date & Time"}</h4>
          <h4>Amount</h4>
          <h4>Status</h4>

          <h4 className={classes.address}> </h4>
        </div>
      </div>
      <hr />
      {orderData && orderData.length
        ? orderData.map((i) => (
            <div className={classes.paper}>
              <div className={`${classes.flex} text-right`}>
                <h5>{i.orderId}</h5>
                <h5>{i.reg_time}</h5>
                <h5>₹ {i.grantTotal}</h5>
                <h5>{i.status}</h5>

                {/* <Typography align="left">
                  {i.reg_time.substring(0, 10)}
                </Typography> */}
                <IconButton onClick={() => expandLess(i._id)}>
                  {expand ? (
                    selectedfilterGrpId === i._id ? (
                      <ExpandLessIcon fontSize="inherit" />
                    ) : (
                      <ExpandMoreIcon fontSize="inherit" />
                    )
                  ) : (
                    <ExpandMoreIcon fontSize="inherit" />
                  )}{" "}
                </IconButton>
              </div>
              <br />
              <div
                className={
                  expand
                    ? selectedfilterGrpId === i._id
                      ? null
                      : classes.none
                    : classes.none
                }
              >
                {i.productDetails.map((p) => (
                  <CartProducts
                    // key={index}
                    id={p._id}
                    quantity={p.quantity}
                    image={p.image}
                    title={p.productName}
                    // {data.variantName}
                    //  promo={promocodes}
                    prize={p.rate}
                    orderPage={true}
                  />
                ))}
                <div className="order-footer">
                  <h4>Delivery charge: {i.deliveryCharge}</h4>
                  <h4>Grant total: {i.grantTotal}</h4>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

// i.productDetails.map((t) => (

//   {/* <img
// src={ProductImg}
// className={classes.img}
// alt="" */}
// {/* width="150vw" */}
// {/* /> */}
// <div>
//   <Typography
//     variant="h5"
//     align="center"
//     style={{ color: "rgba(188,135,0,1)" }}
//   >
//     {t.variantName}
//   </Typography>
//   <Typography variant="h6" align="center">
//     {t.productName}
//   </Typography>
// </div>
// <Typography variant="h6" align="center">
//   &#x20B9; {i.total}
// </Typography>
// <Typography
//   variant="h6"
//   align="center"
//   style={{ color: "rgba(5,153,55,1)" }}
// >
//   Delivered On Nov 12 <br />
//   Order Id : {i.orderId}
// </Typography>
//   {/*<Typography
// variant="h6"
// align="center"
// style={{ color: "rgba(188,135,0,1)" }}
// >
// View
// </Typography>*/}

// ))
