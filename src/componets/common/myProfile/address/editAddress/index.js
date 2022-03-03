import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import { user } from "../../../../../api/constants";
import Axios from "../../../../../api/axios";
import SessionCheck from "../../../../../api/SessionCheck";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 500,
    padding: theme.spacing(2),
    textAlign: "center",
    //color: theme.palette.text.secondary,
    backgroundColor: "rgba(250,250,250,100%)",
  },
}));

function EditDeliveryLocation({
  address,
  onSuccess,
  onSelect,
  onEdit,
  addressLine1,
  addressLine2,
  street,
  city,
  district,
  state,
  zipcode,
}) {
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;
  const GET_URLId = `${user.getUserbyUserid}/${onEdit}`;
  const Edit = `${user.editAddress}/${onEdit}`;
  const addaddress_API = `${user.addNewAddress}/${userId}`;
  const [error, setError] = useState(false);
  const classes = useStyles();

  const [initialValues, setinitialValues] = useState({
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    street: street,
    city: city,
    district: district,
    state: state,
    country: "",
    zipcode: zipcode,
  });
  const submit = (values, { resetForm }) => {
    Axios.put(Edit, values)
      .then((res) => {
        // console.log("responce==>>", res);
        // resetForm({ values: "" });
        onSuccess();
      })
      .catch((error) => {
        // console.log("error==>>", error);
        setError(true);
      });
  };

  function backfn() {
    onSuccess();
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <CssBaseline />
      <Formik
        initialValues={initialValues}
        // enableReinitialize={true}
        onSubmit={submit}
      >
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
                  name={`addressLine1`}
                  value={values.addressLine1}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`addressLine1`, value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`addressLine2`}
                  required
                  fullWidth
                  id="addressLine2"
                  label="Landmark"
                  value={values.addressLine2}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`addressLine2`, value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`street`}
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  value={values.street}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`street`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`city`}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  value={values.city}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`city`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`district`}
                  required
                  fullWidth
                  id="district"
                  label="District"
                  value={values.district}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`district`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`state`}
                  required
                  fullWidth
                  id="state"
                  label="State"
                  value={values.state}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`state`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`zipcode`}
                  required
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  value={values.zipcode}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`zipcode`, value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  //type="submit"
                  fullWidth
                  variant="contained"
                  //color="primary"
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
                  //color="primary"
                  style={{
                    color: "#5d4037",
                    outline: "none",
                    marginTop: "20px",
                  }}
                  className={classes.submit}
                >
                  Edit
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

export default EditDeliveryLocation;
