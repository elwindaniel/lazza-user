import React from "react";
import "../createAccount.css";
import NavigationBar from "../../../navigationBar";
import HeaderBackgroungImg from "../../../../../assets/allProduct/allProductbanner.png";
import { useTheme, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Typography, Paper, Box, Grid, Link, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Axios from "../../../../../api/axios";
import { user } from "../../../../../api/constants";
import { useHistory } from "react-router-dom";

const mutheme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 36,
    },
  },
  palette: {
    primary: { 
      main: "rgba(233,182,52,1)"
    }
  },
});

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "150px",
  },
  paper: {
    padding: theme.spacing(2),
    height: "65vh",
    backgroundColor: "transparent",
  },
  accountHeader: {
    fontFamily: "Open Sans Condensed"
  },
  dateTextField: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black"
    }
  }
}));

export default function AdditionalInfo(props) {
  //console.log("addtional info == >>", props);
  const bday_API = `${user.editUserDataWithid}/`;
  const userId = props.match.params.userid;
  //console.log("userid==>>", userId);

  const classes = useStyles();
  const history = useHistory();

  const [data, setData] = React.useState({
    bday: new Date("2014-08-18T21:11:54"),
    bdaySpouse: new Date("2014-08-18T21:11:54"),
    anniversary: new Date("2014-08-18T21:11:54"),
  });

  function handleChange(e, date, id) {
    //console.log("e==>", e, "==>", date, "==>", id);
    const newdata = { ...data };
    newdata[id] = e;
    setData(newdata);
  }

  function submit() {
    Axios.put(bday_API + userId, data)
      .then((res) => {
        //console.log("bday ==>>", res);
        history.push("/login");
      })
      .catch((error) => {
        //console.log(error);
        history.push("/login");
      });
  }

  const theme = useTheme();

  const IsMD = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <div className="createAccount_header">
        <NavigationBar background={true} />
      </div>
      <div
        className="createAccount_heading"
        style={{
          // backgroundImage: `url(${HeaderBackgroungImg})`,
          height: "120px",
        }}
      >
        <ThemeProvider theme={mutheme}>
          <Typography variant="h2" align="center" className={classes.accountHeader}>
            Create Account
          </Typography>
        </ThemeProvider>
      </div>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}></Box>
        <Box p={1} flexGrow={2}>
          <Paper className={classes.paper} elevation={0}>
            <Typography variant="h5" align="center">
              Additional Information
            </Typography>
            <Typography
              variant="h6"
              align="center"
              style={{ paddingTop: "20px" }}
            >
              Let us know a little more about yourselves so that we can
              personalize offers on your special days
            </Typography>

            <ThemeProvider theme={mutheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  container
                  spacing={3}
                  justify="center"
                  style={{ paddingTop: "20px" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    justify={IsMD ? "center" : "flex-end"}
                  >
                    <KeyboardDatePicker
                      autoOk
                      format="dd/MMM/yyyy"
                      margin="normal"
                      id="bday"
                      name="bday"
                      label="My Birthday"
                      value={data.bday}
                      onChange={(e, date) => handleChange(e, date, "bday")}
                      TextFieldComponent={(props) => <TextField {...props} disabled className={classes.dateTextField} />}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    justify={IsMD ? "center" : "flex-start"}
                  >
                    <KeyboardDatePicker
                      autoOk
                      format="dd/MMM/yyyy"
                      margin="normal"
                      id="bdaySpouse"
                      label="Birthday of Spouse"
                      value={data.bdaySpouse}
                      onChange={(e, date) => handleChange(e, date, "bdaySpouse")}
                      TextFieldComponent={(props) => <TextField {...props} disabled className={classes.dateTextField} />}
                    />
                  </Grid>
                  <Grid item xs={12} container justify="center">
                    <KeyboardDatePicker
                      autoOk
                      format="dd/MMM/yyyy"
                      margin="normal"
                      id="anniversary"
                      label="Anniversay"
                      value={data.anniversary}
                      onChange={(e, date) => handleChange(e, date, "anniversary")}
                      TextFieldComponent={(props) => <TextField {...props} disabled className={classes.dateTextField} />}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: "rgba(233,182,52,1)",
                      outline: "none",
                    }}
                    className={classes.submit}
                    onClick={submit}
                  >
                    Save
                  </Button>
                </Grid>
                <Link href={"/"} variant="body2">
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ paddingTop: "20px" }}
                  >
                    Skip
                  </Typography>
                </Link>
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </Paper>
        </Box>
        <Box p={1} flexGrow={1}></Box>
      </Box>
    </div>
  );
}
