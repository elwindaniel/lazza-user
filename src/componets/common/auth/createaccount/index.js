import React, { useState } from "react";
import NavigationBar from "../../navigationBar";
import HeaderBackgroungImg from "../../../../assets/allProduct/allProductbanner.png";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import "./createAccount.css";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Axios from "../../../../api/axios";
import { user } from "../../../../api/constants";

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function CreateAccount() {
  const CREATE_USER_API = `${user.createUser}`;

  const [error, setError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  function submit(e) {
    e.preventDefault();
    setError(false);

    if (data.password === confirmPassword) {
      Axios.post(CREATE_USER_API, data)
        .then((res) => {
          history.push("/otp/" + res.data._id);
        })
        .catch((error) => {
          //console.log("error", error);
          setError(true);
        });
    } else {
      setPasswordError(true);
    }
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  function handleconfirmPass(e) {
    setConfirmPassword(e.target.value);
    setPasswordError(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <div>
      <div className="createAccount_header">
        <NavigationBar background={true} />
      </div>
      <div
        className="createAccount_heading"
        style={{
          height: "120px",
          fontFamily: "Open Sans Condensed",
        }}
      >
        <Grid
          container
          className="mt-3 min-height-5mvh"
          justify="center"
          alignItems="center"
        >
          <h3>CREATE AN ACCOUNT</h3>
        </Grid>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} Validate onSubmit={(e) => submit(e)}>
            <Collapse in={error}>
              <Alert severity="error">
                This phone number is already exists!
              </Alert>
            </Collapse>
            <Collapse in={passwordError} style={{ paddingBottom: 15 }}>
              <Alert severity="error">
                Password and Confirm Password is not same!
              </Alert>
            </Collapse>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={data.name}
                  onChange={(e) => handle(e)}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => handle(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  minlength="10"
                  maxlength="10"
                  value={data.phoneNumber}
                  onChange={(e) => handle(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => handle(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Conform_password"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => handleconfirmPass(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Collapse in={error}>
              <Alert severity="error">
                This phone number is already exists!
              </Alert>
            </Collapse>
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
              Create Account
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default CreateAccount;
