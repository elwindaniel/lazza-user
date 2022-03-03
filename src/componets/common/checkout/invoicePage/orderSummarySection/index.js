import { Grid } from "@material-ui/core";

export default function OrderSummarySection({ grantTotal, deliveryCharge, total }) {
  return (
    <div className="">
      <Grid container justify="space-between">
        <h5>Item(s) Subtotal:</h5>
        <h5> ₹ {total} </h5>
      </Grid>

      <Grid container justify="space-between">
        <h5>Shipping:</h5>
        <h5>₹ {deliveryCharge}</h5>
      </Grid>

      <Grid className="pb-3 border-bottom" container justify="space-between">
        <h5>Total with offer:</h5>
        <h5> ₹ {grantTotal} </h5>
      </Grid>

      <Grid className="mt-3" container justify="space-between">
        <h5 className="font-size-lg font-weight-bold font-arial text-uppercase">Grand Total:</h5>
        <h5 className="font-size-lg font-weight-bold font-arial text-uppercase">₹ {grantTotal} </h5>
      </Grid>
    </div>
  );
}
