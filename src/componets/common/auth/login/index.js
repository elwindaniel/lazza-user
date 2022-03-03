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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SessionCheck from "../../../../api/SessionCheck";
import Axios from "../../../../api/axios";
import { user } from "../../../../api/constants";
import { useDispatch } from "react-redux";
import { addPincode, getCartCount } from "../../../../redux/actions";

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
  if (SessionCheck.getLoggedinUserId()) { props.history.push("/"); }
  const [error, setError] = React.useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    userType: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  function submit(e) {
    e.preventDefault();
    SessionCheck.basicJWTAuthentication(
      data.email,
      data.password,
      data.userType
    )
      .then((res) => {
        if (res.data !== undefined) {
          SessionCheck.setSessionForJWt(res.data.token);
          getUser();
          dispatch(getCartCount());
        }
      })
      .catch((error) => {
        //console.log("error");
        setError(true);
      });
  }

  const dispatch = useDispatch();

  const getUser = async () => {
    const userdetails = SessionCheck.getLoggedinUserId();
    const userId = userdetails.userId;
    try {
      await Axios.get(`${user.getUserbyUserid}/` + userId).then((res) => {
        let addressIndex = parseInt(res.data.defaultAddress);
        if (res.data.address.length > 0) {
          if (
            res.data.address[addressIndex].zipcode &&
            res.data.address[addressIndex].zipcode !== "undefined"
          ) {
            dispatch(addPincode(res.data.address[addressIndex].zipcode));
            dispatch(getCartCount());
          }
        }
        props.history.push("/");
      });
    } catch (e) {
      //console.log(e);
    }
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const classes = useStyles();

  return (
    <div className="min-height-80vh">
      <div className="createAccount_header">
        <NavigationBar />
      </div>
      <Grid
        container
        className="mt-3 min-height-5mvh"
        justify="center"
        alignItems="center"
      >
        <h3>LOGIN</h3>
      </Grid>
      <Container
        style={{ marginBottom: "60px" }}
        component="main"
        maxWidth="xs"
      >
        {/* <CssBaseline /> */}
        <div>
          <form className={classes.form} Validate onSubmit={(e) => submit(e)}>
            <Collapse in={error}>
              <Alert severity="error">Invalid user name or password!</Alert>
            </Collapse>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Phone Number"
              name="email"
              autoComplete="email"
              value={data.email}
              onChange={(e) => handle(e)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
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
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={"/forgotPassword"} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={"/createAccount"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
