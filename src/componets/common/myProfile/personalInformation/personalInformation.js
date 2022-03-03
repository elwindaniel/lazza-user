import React, { useEffect, useState } from "react";
import { Typography, Avatar, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./personalinfo.css";
import SessionCheck from "../../../../api/SessionCheck";
import Axios from "../../../../api/axios";
import { user } from "../../../../api/constants";
import RestPassword from "../restPassword";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(9),
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      paddingLeft: theme.spacing(8),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  personalinfo: {
    padding: 10,
    [theme.breakpoints.down("md")]: {
      padding: 0,
      //paddingLeft: 10,
    },
  },
  personalinfo_user: {
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
    // width: 160,
    marginTop: "30px",
    paddingLeft: "30px",
    [theme.breakpoints.down("md")]: {
      marginTop: 10,
      paddingLeft: 0,
    },
  },
  personalinfo_editEmail: {
    marginTop: 20,
    padding: 30,
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  personalinfo_editMobilePhone: {
    padding: 30,
    [theme.breakpoints.down("md")]: {
      padding: 0,
      paddingTop: 20,
    },
  },
}));

export default function PersonalInformation() {
  const get_userbyuserid_API = `${user.getUserbyUserid}/`;
  const userdetails = SessionCheck.getLoggedinUserId();
  const [loading, setLoading] = useState(true);
  const [rest, setRest] = useState(false);
  const userId = userdetails.userId;
  // console.log("user id === ...>>", userdetails);

  const [userDetails, setUserDetails] = useState();
  const fetchUser = async () => {
    try {
      await Axios.get(get_userbyuserid_API + userId).then((res) => {
        setLoading(true);
        // console.log("user res ==>>", res);
        setUserDetails(res.data);
        setLoading(false);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Axios.get(get_userbyuserid_API + userId).then((res) => {
          setLoading(true);
          // console.log("user res ==>>", res);
          setUserDetails(res.data);
          setSelectedDate(res.data.bday);
          setLoading(false);
        });
      } catch (e) {
        // console.log(e);
      }
    };
    fetchUser();
  }, []);
  const rePassword = () => {
    setRest(true);
  };
  function editSuccess() {
    setRest(false);
    fetchUser();
    // props.onSuccessEdit();
  }

  const [selectedDate, setSelectedDate] = React.useState();

  const classes = useStyles();

  return (
    <div>
      {loading ? null : (
        <div>
          <div className="col px-0">
            <h3 className="sub-header border-0">Personal Information</h3>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <div className="text-right">
                <br></br>
                <a className="cursor" onClick={() => rePassword()}>
                  Change Password
                </a>
              </div>
            </Grid>
          </div>

          {/* <div
            //className="personalinfo_user"
            className={classes.personalinfo_user}
          >
            <Avatar
              alt={userDetails.name}
              src="/static/images/avatar/1.jpg"
              className={classes.large}
            />
            <div>
              <Typography variant="h6" style={{ paddingLeft: 20 }}>
                {userDetails.name}
              </Typography>
            </div>
          </div> */}

          {rest ? (
            <RestPassword onSuccess={() => editSuccess()} />
          ) : (
            <div>
              <Grid>
                <Grid
                  container
                  direction="row"
                  spacing={3}
                  style={{ marginBottom: "10px" }}
                >
                  <Grid item md={5}>
                    <h5>Email Id</h5>
                    <TextField
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstname"
                      value={userDetails.email}
                    />
                  </Grid>

                  <Grid item md={5}>
                    <h5>Mobile Number</h5>
                    <TextField
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstname"
                      value={userDetails.phoneNumber}
                    />
                  </Grid>
                </Grid>
                <hr />
                <Grid
                  container
                  direction="row"
                  spacing={3}
                  style={{ marginTop: "10px" }}
                >
                  <Grid item md={5}>
                    {userDetails.bday && userDetails.bday.length ? (
                      <div>
                        <h5>Birthday</h5>
                        <TextField
                          id="date"
                          variant="outlined"
                          fullWidth="true"
                          // label="Choose your birthdate"
                          style={{ width: "350px" }}
                          type="date"
                          defaultValue={userDetails.bday.slice(0, 10)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item md={5}>
                    {userDetails.bdaySpouse ? (
                      <div>
                        <h5>Spouse Birthday</h5>
                        <TextField
                          id="date"
                          variant="outlined"
                          fullWidth="true"
                          // label="Choose your birthdate"
                          style={{ width: "350px" }}
                          type="date"
                          defaultValue={userDetails.bdaySpouse.slice(0, 10)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  spacing={3}
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <Grid item md={5}>
                    {userDetails.anniversary ? (
                      <div>
                        <h5>Anniversary</h5>
                        <TextField
                          id="date"
                          variant="outlined"
                          fullWidth="true"
                          style={{ width: "350px" }}
                          type="date"
                          defaultValue={userDetails.anniversary.slice(0, 10)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item md={5}></Grid>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6}>
                  {userDetails.bday && userDetails.bday.length ? (
                    <div className={classes.personalinfo_editMobilePhone}>
                      <div className="personalinfo_editEmailtext">
                        <Typography variant="h6">Birthday</Typography>
                      </div>

                      <div className="personalinfo_emailTextfield">
                        <TextField
                          id="date"
                          variant="outlined"
                          fullWidth="true"
                          style={{ width: "350px" }}
                          type="date"
                          defaultValue={userDetails.bday.slice(0, 10)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                  {userDetails.bdaySpouse ? (
                    <div className={classes.personalinfo_editMobilePhone}>
                      <div className="personalinfo_editEmailtext">
                        <Typography variant="h6">Spouse Birthday</Typography>
                      </div>
                      <div className="personalinfo_emailTextfield">
                        <TextField
                          id="date"
                          variant="outlined"
                          fullWidth="true"
                          style={{ width: "350px" }}
                          type="date"
                          defaultValue={userDetails.bdaySpouse.slice(0, 10)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                  {userDetails.anniversary ? (
                    <div className={classes.personalinfo_editMobilePhone}>
                      <div className="personalinfo_editEmailtext">
                        <Typography variant="h6">Anniversary</Typography>
                      </div>
                      <div className="personalinfo_emailTextfield">
                        <TextField
                          id="date"
                          variant="outlined"
                          fullWidth="true"
                          style={{ width: "350px" }}
                          type="date"
                          defaultValue={userDetails.anniversary.slice(0, 10)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </Grid> */}
              </Grid>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
