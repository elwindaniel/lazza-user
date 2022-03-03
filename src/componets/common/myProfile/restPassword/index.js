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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
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

function RestPassword({ onSuccess, onSelect }) {
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;
  const RestPw = `${user.resetPassword}/${userId}`;
  const [error, setError] = useState(false);
  const classes = useStyles();

  const [initialValues, setinitialValues] = useState({
    oldPassword: "",
    newPassword: "",
    userType: "user",
  });
  const submit = (values, { resetForm }) => {
    Axios.put(RestPw, values)
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
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowPassword = () => {
    //console.log(showPassword,"ShowPassword")
    setShowPassword(!showPassword);
  };
  const handleClickShowNewPassword = () => {
    //console.log(showPassword,"ShowPassword")
    setShowNewPassword(!showNewPassword);
  };
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
                <Alert severity="error">Old Password is incorrect !</Alert>
              </Collapse>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="oldPassword"
                  label="old Password"
                  name={`oldPassword`}
                  type={showPassword ? "text" : "password"}
                  value={values.oldPassword}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`oldPassword`, value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          //onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`newPassword`}
                  required
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  value={values.newPassword}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`newPassword`, value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          //onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
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
                  Update
                </Button>
                <Collapse in={error}>
                  <Alert severity="error">Old Password is incorrect !</Alert>
                </Collapse>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
export default RestPassword;
