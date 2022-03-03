import React, { useState } from "react";

import { ThemeProvider, createMuiTheme, Paper } from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles } from "@material-ui/core/styles";
import "./failure.css";
import failureimg from "../../../../assets/failureimg.png";
import { useDispatch } from "react-redux";

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
  container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
}));

export default function ContactUs(props) {
  const [error, setError] = React.useState(false);
  const [restPw, setRestPw] = React.useState(false);

  const [data, setData] = useState({
    name: "",
    phoneNumber: "", // email or phoneNumber is mandatory
    email: "", // email or phoneNumber is mandatory,
    subject: "",
    message: "",
  });

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
      className="container"
      // style={{
      //   backgroundColor: "#ffffff",
      // }}
    >
      <div className="divfailimg">
        <img src={failureimg} className="failimg"></img>
      </div>

      {/* <CssBaseline /> */}
    </div>
  );
}
