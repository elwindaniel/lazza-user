import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  ButtonGroup,
  Paper,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { API_URL } from "../../../api/constants";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./card.css";
import SessionCheck from "../../../api/SessionCheck";
import Axios from "../../../api/axios";
import { cart, user } from "../../../api/constants";
import cookie from "react-cookies";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { addPincode } from "../../../redux/actions";
import AddPincode from "./addPinCode";

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
  discountPrice: {
    height: 75,
  },
}));

const MAX_LENGTH = 28;

const ProductCarts = (props) => {
  const classes = useStyles();

  const [productData, setProductData] = useState({
    productId: props.id,
    productName: props.title,
    offer: props.offer,
    img: props.imgsrc,
    discountPrice: props.disMrp,
    regularPrice: props.mrp,
  });
  const [isDropdownOptions, setIsDropdownOptions] = useState(false);
  const [varientList, setVarientList] = useState(props.varient);
  const [openPopup, setOpenPopup] = useState(false);
  const [addPinPopOpen, setAddPinPopOpen] = useState(false);

  const changeVariant = (index) => {
    let temp = varientList[0];
    varientList[0] = varientList[index + 1];
    varientList[index + 1] = temp;
    setIsDropdownOptions(!isDropdownOptions);
    setProductData({
      productId: varientList[0]._id,
      productName: varientList[0].variantName,
      offer: varientList[0].offers,
      // offer: "true",
      img: varientList[0].imagePath,
      discountPrice: varientList[0].discountPrice,
      regularPrice: varientList[0].regularPrice,
    });
  };

  const pincodehandleClickOpen = () => {
    //console.log("pincode open!!")
    setAddPinPopOpen(true);
    // if (token) {
    //   // pincode = useSelector((state) => state.pincode);
    //   if (pincode !== "") {
    //     setChangePincode(pincode);
    //     setAddCartOpen(true);
    //   } else {
    //     setPincodeOpen(true);
    //   }
    //   // setPincodeOpen(true);
    //   // setAddCartOpen(true);
    // } else {
    //   console.log("else Part!!!");
    //   if (pin.pincode && pin.pincode !== "undefined") {
    //     console.log("else Part pin!!!");
    //     setAddCartOpen(true);
    //   } else {
    //     console.log("else Part pin else!!!");
    //     setPincodeOpen(true);
    //   }
    // }
  };

  return (
    <div className={classes.divroot}>
      <Card className={classes.root} elevation={3}>
        <Grid container justify="space-between" style={{ width: "100%" }}>
          {productData.offer ? (
            <div className="offer">
              <div className="offer_subDiv">Offer</div>
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
            <div
              style={{
                width: "75px",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <img
                src={`${API_URL}/${varientList[0].imagePath}`}
                alt=""
                height="40px"
              />
            </div>
            {varientList[1] ? (
              <ExpandMoreIcon
                style={{
                  color: "rgba(194,141,3,100%)",
                }}
                fontSize="large"
              />
            ) : null}
            {varientList[1] && isDropdownOptions ? (
              <div className="varientDropdownOptions">
                {varientList.slice(1, 7).map((data, index) => (
                  <div
                    className="varientDropdownOptionsName"
                    onClick={() => changeVariant(index)}
                  >
                    <div
                      style={{
                        width: "80px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`${API_URL}/${data.imagePath}`}
                        alt=""
                        height="28px"
                      />
                    </div>
                    <Typography
                      variant="h6"
                      align="center"
                      component="p"
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      {data.variantName.substring(0, MAX_LENGTH)}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Grid>
        <CardMedia
          className={classes.media}
          image={`${API_URL}/${productData.img}`}
          title="Image 1"
          onClick={() => setOpenPopup(true)}
        />
        <CardContent>
          <Paper
            className={classes.paper}
            elevation={0}
            style={{ color: "#6d4c41" }}
          >
            <Grid container spacing={1} justify="center">
              <Grid item>
                <Typography
                  onClick={() => setOpenPopup(true)}
                  variant="h6"
                  align="center"
                  component="p"
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "rgba(188,135,0,1)",
                    cursor: "pointer",
                  }}
                >
                  {productData.productName.substring(0, MAX_LENGTH)}
                </Typography>
              </Grid>
              <Grid
                container
                justify="space-evenly"
                alignItems="center"
                className={classes.discountPrice}
              >
                {productData.offer ? (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="h4"
                        color="initial"
                        component="p"
                        align="center"
                      >
                        &#x20B9;
                        {productData.discountPrice}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="p"
                        align="center"
                        style={{ textDecorationLine: "line-through" }}
                      >
                        &#x20B9;
                        {productData.regularPrice}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      color="initial"
                      component="p"
                      align="center"
                    >
                      &#x20B9;
                      {productData.regularPrice}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ff9100",
                    color: "#fff",
                    outline: "none",
                    letterSpacing: "1px",
                  }}
                  onClick={pincodehandleClickOpen}
                >
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </CardContent>
      </Card>
      <AddPincode openPopup={addPinPopOpen} setAddPinPopOpen></AddPincode>
    </div>
  );
};

export default ProductCarts;
