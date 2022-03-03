import React, { useState } from "react";
import NavigationBar from "../../navigationBar";
import HeaderBackgroungImg from "../../../../assets/allProduct/allProductbanner.png";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import Axios from "../../../../api/axios";
import { otp } from "../../../../api/constants";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 36,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
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
    height: "40vh",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  accountHeader: {
    fontFamily: "Open Sans Condensed"
  }
}));

export default function OtpScreen(props) {
  const otpRequest_apl = `${otp.requestPhoneVerificationOTP}`;
  const otpVerify_apl = `${otp.verifyPhoneVerificationOTP}`;
  let userid = props.match.params.userid;

  const [error, setError] = React.useState(false);

  const getOtp = () => {
    //otpRequest
    Axios.post(otpRequest_apl, { userId: userid })
      .then((res) => {
        //console.log("otpRequest==>", res);
      })
      .catch((error) => {
        //console.log("error", error);
      });
  };

  const [data, setData] = useState({
    otp: "",
    userId: userid,
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(otpVerify_apl, data)
      .then((res) => {
        //console.log("otpVerify==>", res);
        props.history.push("/additionalinfo/" + userid);
      })
      .catch((error) => {
        //console.log("error", error);
        setError(true);
      });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  const classes = useStyles();

  return (
    <div>
      <div className="createAccount_header">
        <NavigationBar />
      </div>
      <div
        className="createAccount_heading"
        style={{
          // backgroundImage: `url(${HeaderBackgroungImg})`,
          height: "120px",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h2" align="center" className={classes.accountHeader}>
            Enter OTP
          </Typography>
        </ThemeProvider>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {
            <form className={classes.form} Validate onSubmit={(e) => submit(e)}>
              <Collapse in={error}>
                <Alert severity="error">Invalid OTP</Alert>
              </Collapse>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="otp"
                label="otp"
                name="otp"
                autoComplete="otp"
                value={data.otp}
                onChange={(e) => handle(e)}
                autoFocus
              />

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
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={getOtp} variant="body2">
                    Resend OTP
                  </Link>
                </Grid>
              </Grid>
            </form>
          }
        </div>
      </Container>
    </div>
  );
}
