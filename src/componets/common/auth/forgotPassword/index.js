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
import { forgotPassword } from "../../../../api/constants";
import RestPw from "./restPassword";

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
}));

export default function Login(props) {
  const [error] = React.useState(false);
  const [restPw, setRestPw] = React.useState(false);
  const forgotPasswordUsingPhoneNumber = `${forgotPassword.forgotPasswordUsingPhoneNumber}`;
  const [data, setData] = useState({
    phoneNumber: "",
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(forgotPasswordUsingPhoneNumber, data)
      .then((res) => {
        //console.log("otpVerify==>", res);

        setRestPw(true);
      })
      .catch((error) => {
        //console.log("error", error);
        setRestPw(false);
      });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  function editSuccess() {
    setRestPw(false);
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
          height: "120px",
        }}
      >
        <Grid
          container
          className="mt-3 min-height-5mvh"
          justify="center"
          alignItems="center"
        >
          <h3>FORGOT PASSWORD</h3>
        </Grid>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {restPw ? (
            <RestPw onPhonumber={data} onSuccess={() => editSuccess()} />
          ) : (
            <form className={classes.form} Validate onSubmit={(e) => submit(e)}>
              <Collapse in={error}>
                <Alert severity="error">Invalid Phone Number</Alert>
              </Collapse>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                value={data.phoneNumber}
                onChange={(e) => handle(e)}
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                //color="primary"
                style={{
                  //color: "#5d4037",
                  backgroundColor: "rgba(233,182,52,1)",
                  outline: "none",
                }}
                className={classes.submit}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href={"/login"} variant="body2">
                    Back
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
