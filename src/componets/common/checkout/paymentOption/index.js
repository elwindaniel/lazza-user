import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Divider,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SessionCheck from "../../../../api/SessionCheck";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    padding: theme.spacing(2),
    backgroundColor: "rgba(250,250,250,100%)",
  },
  priceDetailsPaper: {
    padding: theme.spacing(2),
    backgroundColor: "rgba(250,250,250,100%)",
  },
  prizeDetailsPaper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: "rgba(250,250,250,100%)",
  },
}));

function PaymentOption(props) {
  const token = SessionCheck.checkSession();
  const classes = useStyles();
  //console.log(props, "props");
  let stockingPoint = useSelector(
    (state) => state.userInfoReducer.stockingPointDetails
  );
  // console.log(stockingPoint, "stockingPoint");
  const [value, setValue] = React.useState("female");

  let total = 0;
  let quantity = 0;
  let itemPrizeTot = 0;
  let deliveryCharge = 0;
  let grandTotal = 0;
  let promoValue = props.promoCodes ? props.promoCodes.value : 0;
  let subtotal = props.subtotal;
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function setTotalValue(value) {
    localStorage.setItem("promoCodeWithOffer", value);
    return value;
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={
              <div className="font-size-lg ">
                Pay by Card/UPI/Net Banking/Wallet
              </div>
            }
          />
        </RadioGroup>
      </FormControl>
      <Paper className={classes.priceDetailsPaper} elevation={0}>
        <Grid container justify="space-between">
          {props.cartDetails && props.cartDetails.length
            ? props.cartDetails.map((data, index) => {
                // console.log(data, "cartDetails");

                // let rate = data.discountPrice
                //                     ? data.discountPrice
                //                     : data.rate;
                let price = token
                  ? data.discountPrice
                    ? data.discountPrice
                    : data.rate
                  : data.price;
                const name = token ? data.variantName : data.name;
                let mulPrize = data.quantity * price;
                if (props.promoCodes) {
                  if (name === props.promoCodes.variantName) {
                    if (props.promoCodes.status === "percentage") {
                      let a =
                        mulPrize - mulPrize * (props.promoCodes.value / 100);
                      total = total + a;
                    } else {
                      let a = mulPrize - props.promoCodes.value;
                      total = total + a;
                    }
                  } else {
                    total = total + mulPrize;
                  }
                } else {
                  total = total + mulPrize;
                }
                // itemPrizeTot = itemPrizeTot + mulPrize;
                itemPrizeTot = stockingPoint?.subtotal;
                deliveryCharge = stockingPoint?.delivery || 0;

                grandTotal = stockingPoint?.grant;
                quantity = index + 1;
              })
            : null}
          <Grid item>
            <Paper className={classes.prizeDetailsPaper} elevation={0}>
              <div className="font-size-lg ">Sub-Total ({quantity} Item)</div>{" "}
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.prizeDetailsPaper} elevation={0}>
              <div className="font-size-lg ">₹{subtotal}</div>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid item>
            <Paper className={classes.prizeDetailsPaper} elevation={0}>
              <div className="font-size-lg ">Delivery Charge</div>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.prizeDetailsPaper} elevation={0}>
              <div className="font-size-lg ">
                {stockingPoint && stockingPoint.delivery
                  ? stockingPoint.delivery
                  : deliveryCharge}
              </div>
            </Paper>
          </Grid>
        </Grid>
        {props.promoCodes ? (
          <Grid container justify="space-between">
            <Grid item>
              <Paper className={classes.prizeDetailsPaper} elevation={0}>
                <h5 className="font-weight-bold text-uppercase ">
                  {props.promoCodes.promotionalCode}
                </h5>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.prizeDetailsPaper} elevation={0}>
                <h5 className=" ">
                  {props.promoCodes.variantName}{" "}
                  {props.promoCodes.status === "percentage" ? (
                    <>{props.promoCodes.value}% </>
                  ) : (
                    <>Rs {props.promoCodes.value} </>
                  )}{" "}
                  Off
                </h5>
              </Paper>
            </Grid>
          </Grid>
        ) : null}
        <Divider />
        <Grid container justify="space-between">
          <Grid item>
            <Paper className={classes.prizeDetailsPaper} elevation={0}>
              <div className="font-size-lg font-weight-bold font-arial text-uppercase">
                Grand Total
              </div>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.prizeDetailsPaper} elevation={0}>
              <div className="font-size-lg font-weight-bold font-arial text-uppercase">
                ₹
                {setTotalValue(deliveryCharge + subtotal)}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
}

export default PaymentOption;
