import { Paper } from "@material-ui/core";

export default function AddressSesion({ address }) {
  return (
    <Paper elevation={0}>
      <h>{address.addressLine1},</h>
      <h5>{address.street},</h5>
      <h5>{address.addressLine2},</h5>
      <h5>
        {address.city},{address.district}
      </h5>
      <h5>
        {address.state},{address.zipcode}
      </h5>
    </Paper>
  );
}
