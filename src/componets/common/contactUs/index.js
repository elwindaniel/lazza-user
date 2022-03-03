import React, { useState } from "react";
import NavigationBar from "../navigationBar";
import HeaderBackgroungImg from "../../../assets/allProduct/allProductbanner.png";
import { ThemeProvider, createMuiTheme, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Img from "../../../assets/contactus.png";
import ContactIce from "../../../assets/contactIce.png";
import mail from "../../../assets/icon/mail.png";
import map from "../../../assets/icon/map.png";
import phone from "../../../assets/icon/phone.png";
import { contactUs } from "../../../api/constants";
import Axios from "../../../api/axios";
import { makeStyles } from "@material-ui/core/styles";
import contactoffernew from "../../../assets/contactoffernew.png";
import contactOFFERIMG from "../../../assets/contactimg.png";
import { useDispatch } from "react-redux";
import BannerDialog from '../BannerDialog';

//import classes from "*.module.css";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: "Spicy Rice",
      //fontWeightMedium: 100,
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
    padding: theme.spacing(4),
    backgroundColor: "#ffffff",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#795548",
  },
  container: {
    width: "90%",
    margin: "5%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    height: "40vh",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    width: "44.33px",
    align: "center",
    marginLeft: "45%",
    marginTop: "20px",
  },
  imgg: {
    width: "35.33px",
    marginTop: "13px",
    marginLeft: "45%",
  },
  text: {
    color: "#000000",
    marginTop: "20px",
    marginBottom: "20px",
  },
  boxborder: {
    border: "1px solid #7a7474",
    margin: "20px",
    width: "90%",
    padding: "20px",
  },
  yellowborder: {
    width: "76%",
    margin: "10%",
    border: "1px solid #b19d25",
    padding: "20px",
  },
}));

export default function ContactUs(props) {
  const [error, setError] = React.useState(false);
  const [restPw, setRestPw] = React.useState(false);
  const ContactUS = `${contactUs.contactUs}`;
  const [data, setData] = useState({
    name: "",
    phoneNumber: "", // email or phoneNumber is mandatory
    email: "", // email or phoneNumber is mandatory,
    subject: "",
    message: "",
  });

  function submit(e) {
    // console.log("ContactUs submit==>>", data);
    e.preventDefault();
    Axios.post(ContactUS, data)
      .then((res) => {
        //console.log("responce==>>", res);
        // resetForm({ values: "" });
      })
      .catch((error) => {
        //console.log("error==>>", error);
        setError(true);
      });
    // setRestPw(true);
  }

  const dispatch = useDispatch();

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  function editSuccess() {
    setRestPw(false);

    // props.onSuccessEdit();
  }

  const classes = useStyles();

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      {/* <div className="createAccount_header">
        <NavigationBar />
      </div> */}
      {/* <div
        className="createAccount_heading"
        style={{
          backgroundImage: `url(${HeaderBackgroungImg})`,
          height: "120px",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h2" align="center">
            Contact Us
          </Typography>
        </ThemeProvider>
      </div> */}
      <BannerDialog src={contactoffernew} />
      <div
        style={{
          textAlign: "center",
          fontFamily: "Open Sans Condensed",
          fontSize: "30px",
          paddingTop: "3%",
          fontWeight: 500,
        }}
      >
        CONTACT US
      </div>
      <div className={classes.container}>
        <form Validate onSubmit={(e) => submit(e)}>
          <div className={classes.boxborder}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                {/* <Paper className={classes.paper} elevation={0}> */}
                {/* <img src={contactOFFERIMG} alt="" style={{ width: "250px" }} /> */}
                <img src={contactOFFERIMG} alt="" style={{ width: "80%" }} />
                {/* </Paper> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <Paper className={classes.paper} elevation={0}> */}
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name :"
                      fullWidth
                      variant="outlined"
                      value={data.name}
                      onChange={(e) => handle(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number :"
                      fullWidth
                      variant="outlined"
                      value={data.phoneNumber}
                      onChange={(e) => handle(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email :"
                      fullWidth
                      variant="outlined"
                      value={data.email}
                      onChange={(e) => handle(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="subject"
                      label="Subject :"
                      fullWidth
                      variant="outlined"
                      value={data.subject}
                      onChange={(e) => handle(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="message"
                      label="Message :"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={8}
                      value={data.message}
                      onChange={(e) => handle(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      //color="primary"
                      style={{
                        backgroundColor: "#000000",
                        outline: "none",
                        width: "163px",
                        height: "43px",
                        color: "#ffffff",
                      }}
                      className={classes.submit}
                    //onClick={(e) => submit(e)}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                {/* </Paper> */}
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
      <div
      // className="createAccount_heading"
      // style={{
      //   backgroundImage: `url(${ContactIce})`,
      //   width: "99.4%",
      //   marginLeft: "0.3%",
      //   marginBottom: "0.3%",
      //   overflow: "hide",

      //   // marginLeft: "10%",
      // }}
      >
        <Grid
          container
          spacing={1}
          style={{
            align: "center",
            width: "99.4%",
            marginLeft: "0.3%",
          }}
        >
          <Grid item xs={12} sm={4}>
            <div className={classes.yellowborder}>
              <img src={map} className={classes.imgg} alt="" />
              <br />
              <h5 align="center" className={classes.text}>
                Administrative Office:
                <br />
                28/3030
                <br />
                Cheruparambathu Road
                <br />
                Kadavanthara
                <br />
                Cochin - 682 020
              </h5>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.yellowborder}>
              <img src={mail} className={classes.img} alt="" />
              <br />
              <h5 variant="h6" align="center" className={classes.text}>
                Administration:
                <br />
                admin@lazza.co.in
                <br /> <br />
                Sales:
                <br />
                sales@lazza.co.in
              </h5>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.yellowborder}>
              <img src={phone} className={classes.img} alt="" />
              <br />
              <h5 variant="h6" align="center" className={classes.text}>
                India:
                <br />
                + 91 9946037777
                <br /> <br />
                {/* United Arab Emirates */}
                <br />
                {/* +971 55 698 2528 */}
              </h5>
            </div>
          </Grid>
        </Grid>
      </div>
      <CssBaseline />

      {/* <div className={classes.paper}></div> */}
    </div>
  );
}
