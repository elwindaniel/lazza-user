import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import { forgotPassword } from "../../../../../api/constants";
import Axios from "../../../../../api/axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Formik, Field, Form } from "formik";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 500,
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgba(250,250,250,100%)",
  },
}));

function RestPassword({ onSuccess, onPhonumber }) {
  const RestPw = `${forgotPassword.verifyForgotPasswordOTP}`;
  const [error, setError] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const [initialValues] = useState({
    phoneNumber: onPhonumber.phoneNumber,
    otp: "",
    password: "",
  });
  const submit = (values, { resetForm }) => {
    Axios.post(RestPw, values)
      .then((res) => {
        if (res.data === true) { history.push("/login"); }
        onSuccess();
      })
      .catch((error) => {
        //console.log("error==>>", error);
        setError(true);
      });
  };
  function backfn() {
    onSuccess();
  }

  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  return (
    <Paper className={classes.paper} elevation={0}>
      <CssBaseline />
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Collapse in={error}>
                <Alert severity="error">Check your OTP !</Alert>
              </Collapse>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="otp"
                  name="otp"
                  autoComplete="otp"
                  value={values.email}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`otp`, value);
                  }}
                  autoFocus
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
                    setFieldValue(`password`, value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
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
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "rgba(233,182,52,1)",
                    outline: "none",
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
                    backgroundColor: "rgba(233,182,52,1)",
                    outline: "none",
                  }}
                  className={classes.submit}
                >
                  Update
                </Button>
                <Collapse in={error}>
                  <Alert severity="error">Check your OTP!</Alert>
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
