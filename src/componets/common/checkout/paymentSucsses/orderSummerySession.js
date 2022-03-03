import { useEffect } from "react";
import { Grid, h5 } from "@material-ui/core";
import SessionCheck from "../../../../api/SessionCheck";
import { useDispatch, useSelector } from 'react-redux';

export default function OrderSummerySession({ cartData, promo }) {
  let totalPrice = 0;
  let total = 0;
  const token = SessionCheck.checkSession();
  let stockingPoint = useSelector((state) => state.userInfoReducer.stockingPointDetails);
  let itemPrizeTot = 0;
  let deliveryCharge = 0;
  let grandTotal = 0;

  itemPrizeTot = stockingPoint.subtotal;
  deliveryCharge = stockingPoint.delivery;
  grandTotal = localStorage.getItem("promoCodeWithOffer");


  return (
    <div className="">
      <Grid container justify="space-between">
        <h5>Item(s) Subtotal:</h5>
        <h5>
          {cartData && cartData.length ? cartData.map((data) => {
            let prize = token ? data.rate : data.price;
            let mulPrize = data.quantity * prize;
            total = total + mulPrize;
          }) : null}
          ₹ {itemPrizeTot}
        </h5>
      </Grid>

      <Grid container justify="space-between">
        <h5>Shipping:</h5>
        <h5>₹ {deliveryCharge}</h5>
      </Grid>

      <Grid className="pb-3 border-bottom" container justify="space-between">
        <h5>Total with offer:</h5>
        <h5>
          {cartData && cartData.length ? cartData.map((data) => {
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
          }) : null}
          ₹ {grandTotal}
        </h5>
      </Grid>

      <Grid className="mt-3" container justify="space-between">
        <h5 className="font-size-lg font-weight-bold font-arial text-uppercase">
          Grand Total:
        </h5>
        <h5 className="font-size-lg font-weight-bold font-arial text-uppercase">
          ₹ {grandTotal}
        </h5>
      </Grid>
    </div>
  );
}
