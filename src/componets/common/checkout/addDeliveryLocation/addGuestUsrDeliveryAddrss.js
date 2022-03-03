import {
  Container,
  CssBaseline,
  Collapse,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#795548",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddGuestUsrDeliveryAddrss({ onSelect }) {
  let guestUserAddress = localStorage.getItem("guestUserAddress");
  guestUserAddress = guestUserAddress ? JSON.parse(guestUserAddress) : [];

  const [error] = React.useState(false);

  const [initialGuestUser, setInitialGuestUser] = useState({
    name: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    street: "",
    city: "",
    district: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const classes = useStyles();

  function handle(e) {
    const newdata = { ...initialGuestUser };
    newdata[e.target.id] = e.target.value;
    setInitialGuestUser(newdata);
  }

  function submit(e) {
    e.preventDefault();
    guestUserAddress.push(initialGuestUser);
    localStorage.setItem("guestUserAddress", JSON.stringify(guestUserAddress));
    onSelect();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} Validate onSubmit={(e) => submit(e)}>
          <Collapse in={error}>
            <Alert severity="error">This phone number is already exists!</Alert>
          </Collapse>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                value={initialGuestUser.name}
                onChange={(e) => handle(e)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                value={initialGuestUser.phoneNumber}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addressLine1"
                label="Address"
                name="addressLine1"
                autoComplete="addressLine1"
                value={initialGuestUser.addressLine1}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addressLine2"
                label="Landmark"
                name="addressLine2"
                autoComplete="addressLine2"
                minlength="10"
                maxlength="10"
                value={initialGuestUser.addressLine2}
                onChange={(e) => handle(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
                type="street"
                name="street"
                autoComplete="street"
                value={initialGuestUser.street}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                value={initialGuestUser.city}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="district"
                label="District"
                name="district"
                autoComplete="district"
                value={initialGuestUser.district}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                value={initialGuestUser.state}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zipcode"
                label="Zipcode"
                name="zipcode"
                autoComplete="zipcode"
                value={initialGuestUser.zipcode}
                onChange={(e) => handle(e)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                style={{
                  color: "#5d4037",
                  outline: "none",
                  marginTop: "20px",
                }}
                className={classes.submit}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  color: "#5d4037",
                  outline: "none",
                  marginTop: "20px",
                }}
                className={classes.submit}
              >
                Add
              </Button>
              <Collapse in={error}>
                <Alert severity="error">
                  This phone number is already exists!
                </Alert>
              </Collapse>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
