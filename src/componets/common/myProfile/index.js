import React, { useEffect, useState } from "react";
import NavigationBar from "../navigationBar";
import "./myProfile.css";
import {
  makeStyles,
  responsiveFontSizes,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Typography, Paper, Grid, AppBar, Toolbar } from "@material-ui/core";
import PersonalInformation from "./personalInformation/personalInformation";
import ManegeAddress from "./address";
import MyOrder from "./myOrder";
//import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
//import ContactMailIcon from '@material-ui/icons/ContactMail';
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import SessionCheck from "../../../api/SessionCheck";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Axios from "../../../api/axios";
import { user } from "../../../api/constants";

let theme = createMuiTheme({});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  myProfile_sidebar: {
    height: "75vh",
    flex: 0.2,
    //color: "white",
    width: 270,
    margin: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    backgroundColor: "rgba(232, 230, 199, .7)",
    //border-style: "solid",
    borderStyle: "solid",
    borderWidth: "2px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  optionPaper: {
    paddingTop: theme.spacing(2),
    backgroundColor: "transparent",
    //cursor: "pointer",
  },
  subOptionPaper: {
    paddingLeft: theme.spacing(2),
    backgroundColor: "transparent",
    //cursor: "pointer",
  },
  subOption: {
    paddingTop: theme.spacing(1.5),
    //cursor: "pointer",
  },
  detailPaper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    backgroundColor: "transparent",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    background: "rgba(28, 28, 28, 100%)",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  bottomAppbarIcons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export default function MyProfile(props) {
  const get_userbyuserid_API = `${user.getUserbyUserid}/`;
  const userdetails = SessionCheck.getLoggedinUserId();

  const userId = userdetails.userId;
  let caseValue = props.match.params.case;
  // console.log(caseValue, "props")
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [userDetails, setUserDetails] = useState();
  const history = useHistory();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  function getContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <PersonalInformation />;

      case 1:
        return <ManegeAddress />;

      case 2:
        return <MyOrder />;

      case 3:
        SessionCheck.removeSession();
        history.push("/");

      default:
        return <>{caseValue == "2" ? <MyOrder /> : <PersonalInformation />}</>;
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Axios.get(get_userbyuserid_API + userId).then((res) => {
          // console.log("Recieved user: " + res.data);
          setUserDetails(res.data);
        });
      } catch (e) {
        // console.log(e);
      }
    };
    fetchUser();
  }, []);

  const IsMD = useMediaQuery("(min-width:800px)");
  const [expand, setExpand] = useState(false);
  const expandLess = () => {
    setExpand(!expand);
  };
  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        className="bg-light-gray  mt-80px"
        style={{ boxSizing: "border-box", minHeight: "70vh" }}
      >
        <Grid item md={3} className=" m-md-4 m-1 pd-px bg-white ">
          <h5 className="sub-header ">{userDetails?.name}</h5>

          <div className=" pt-2 border-bottom">
            <h5>Account Settings</h5>
            <div className="col pl-2">
              <h5 className="cursor" onClick={() => handleChange(0)}>
                Personal Information
              </h5>
              <h5 className="cursor" onClick={() => handleChange(1)}>
                Manage Address
              </h5>
            </div>
          </div>

          <div className=" pt-2 border-bottom">
            <h5 className="cursor" onClick={() => handleChange(2)}>
              My Orders
            </h5>
          </div>

          <h5 className="cursor pt-2" onClick={() => handleChange(3)}>
            Logout
          </h5>
        </Grid>

        <Grid
          item
          md
          className="m-md-4 m-1 ml-md-0 pd-px bg-white 

"
        >
          {getContent(value)}
        </Grid>
        {/* <div >
            <div
             
            >
              <div >
                <Typography variant="h6" style={{ cursor: "pointer" }}>
                  Account Settings
                </Typography>
              </div>
              <Paper className={classes.subOptionPaper} elevation={0}>
                <div className={classes.subOption}>
                  <Typography
                    variant="h6"
                    onClick={() => handleChange(0)}
                    //onClick={setValue(0)}
                    style={{ cursor: "pointer" }}
                  >
                    Personal Information
                  </Typography>
                </div>
                <div className={classes.subOption}>
                  <Typography
                    variant="h6"
                    onClick={() => handleChange(1)}
                    //onClick={setValue(1)}
                    style={{ cursor: "pointer" }}
                  >
                    Manage Address{" "}
                  </Typography>
                </div>
              </Paper>
              <Paper className={classes.optionPaper} elevation={0}>
                <Typography
                  variant="h6"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleChange(2)}
                >
                  My Orders
                </Typography>
              </Paper>
              <Paper className={classes.optionPaper} elevation={0}>
                <Typography
                  variant="h6"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleChange(3)}
                >
                  Log out
                </Typography>
              </Paper>lass
            </div>
          </div> */}
        {/*<MenuIcon />*/}
      </Grid>
      <AppBar
        position="fixed"
        //color="primary"
        //color="rgba(28, 28, 28, 100%)"
        className={classes.appBar}
      >
        <Toolbar>
          <div className={classes.bottomAppbarIcons}>
            <PersonIcon fontSize="large" onClick={() => handleChange(0)} />
            <RoomOutlinedIcon
              fontSize="large"
              onClick={() => handleChange(1)}
            />
            <AssignmentTurnedInIcon
              fontSize="large"
              onClick={() => handleChange(2)}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
