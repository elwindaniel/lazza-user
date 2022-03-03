import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import { user } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import SessionCheck from "../../../../api/SessionCheck";
import { Formik, Field, Form } from "formik";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 500,
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgba(250,250,250,100%)",
  },
}));

function AddDeliveryLocation({ onSelect, onEdit }) {
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;
  const GET_URLId = `${user.getUserbyUserid}/${onEdit}`;
  const Edit = `${user.editAddress}/${onEdit}`;
  const addaddress_API = `${user.addNewAddress}/${userId}`;
  const [error, setError] = useState(false);
  const classes = useStyles();

  const [initialValues, setinitialValues] = useState({
    address: [
      {
        addressLine1: "",
        addressLine2: "",
        street: "",
        city: "",
        district: "",
        state: "",
        country: "",
        zipcode: "",
      },
    ],
  });

  let guestUserAddress = localStorage.getItem("guestUserAddress");
  guestUserAddress = guestUserAddress ? JSON.parse(guestUserAddress) : {};

  const submit = (values) => {
    //console.log(values);
    if (onEdit == null) {
      if (userId) {
        Axios.put(addaddress_API, values)
          .then((res) => {
            onSelect();
          })
          .catch((error) => {
            //console.log("error==>>", error);
            setError(true);
          });
      } else {
        onSelect();
      }
    } else {
      if (userId) {
        Axios.put(Edit, values)
          .then((res) => {
            onSelect();
          })
          .catch((error) => {
            //console.log("error==>>", error);
            setError(true);
          });
      }
    }
  };

  useEffect(() => {
    Axios.get(GET_URLId)
      .then((res) => {
        // console.log(res, "GET_URLId");
        setinitialValues(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [GET_URLId]);

  function backfn() {
    onSelect();
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <CssBaseline />
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Collapse in={error}>
                <Alert severity="error">
                  This phone number is already exists!
                </Alert>
              </Collapse>

              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="addressLine1"
                  label="Address"
                  name={`address.${0}.addressLine1`}
                  value={values.addressLine1}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`address.${0}.addressLine1`, value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.addressLine2`}
                  required
                  fullWidth
                  id="addressLine2"
                  label="Landmark"
                  value={values.addressLine2}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`address.${0}.addressLine2`, value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.street`}
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  value={values.street}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`address.${0}.street`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.city`}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  value={values.city}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`address.${0}.city`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.district`}
                  required
                  fullWidth
                  id="district"
                  label="District"
                  value={values.district}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`address.${0}.district`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.state`}
                  required
                  fullWidth
                  id="state"
                  label="State"
                  value={values.state}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`address.${0}.state`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.zipcode`}
                  required
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  value={values.zipcode}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`address.${0}.zipcode`, value);
                  }}
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
                  onClick={backfn}
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
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default AddDeliveryLocation;
