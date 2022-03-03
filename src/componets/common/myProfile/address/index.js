import { useEffect, useState } from "react";
import "./address.css";
import {
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
  // TextField,
  // Card,
  // CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SessionCheck from "../../../../api/SessionCheck";
import Axios from "../../../../api/axios";
import { user } from "../../../../api/constants";
import AddDeliveryLocation from "../../checkout/addDeliveryLocation";
import EditDeliveryLocation from "./editAddress";
import DeleteAddress from './deleteAddress';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(9),
    [theme.breakpoints.down("md")]: {
      // display: "flex",
      // justifyContent: "center",
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  addAddressPaper: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: "rgba(233,182,53,1)",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      //paddingLeft: 10,
    },
  },
  addressPaper: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      //paddingLeft: 10,
    },
  },
  addDeliveryAddress: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      //paddingLeft: 10,
    },
  },
}));

export default function ManegeAddress(props) {
  const get_userbyuserid_API = `${user.getUserbyUserid}/`;
  const DELETE_URL = `${user.delectAddress}/`;
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;
  const [loading, setLoading] = useState(true);
  const [addAddressFlag, setAddAddressFlag] = useState(false);

  const [userDetails, setUserDetails] = useState();

  function handleDeliveryLocation() {
    setAddAddressFlag(!addAddressFlag);
    getUser();
  }
  const getUser = async () => {
    try {
      await Axios.get(get_userbyuserid_API + userId).then((res) => {
        setLoading(true);
        // console.log("address user res ==>>", res);
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
          // console.log("address user res ==>>", res);
          setUserDetails(res.data);
          setLoading(false);
        });
      } catch (e) {
        // console.log(e);
      }
    };
    fetchUser();
  }, []);
  const [edit, setEdit] = useState(false);
  const [eId, seteId] = useState();
  const [eAddressLine1, seteAddressLine1] = useState();
  const [eAddressLine2, seteAddressLine2] = useState();
  const [eStreet, seteStreet] = useState();
  const [eCity, seteCity] = useState();
  const [eDistrict, seteDistrict] = useState();
  const [eState, seteState] = useState();
  const [eCountry, seteCountry] = useState();
  const [eZipcode, seteZipcode] = useState();
  const editData = (
    id,
    addressLine1,
    addressLine2,
    street,
    city,
    district,
    state,
    country,
    zipcode
  ) => {
    // console.log("edit eId ==>", id);
    // console.log("edit eAddressLine1 ==>", addressLine1);
    // console.log("edit eAddressLine2 ==>", addressLine2);

    setEdit(true);
    seteId(id);
    seteAddressLine1(addressLine1);
    seteAddressLine2(addressLine2);
    seteStreet(street);
    seteCity(city);
    seteDistrict(district);
    seteState(state);
    seteCountry(country);
    seteZipcode(zipcode);
  };
  function editSuccess() {
    setEdit(false);
    getUser();
    // props.onSuccessEdit();
  }

  const delectData = (id) => {
    // console.log("edit eId ==>", id);
    Axios.delete(DELETE_URL + id)
      .then((res) => {
        //onSelect();
        // console.log("deleted");
        getUser();
      })
      .catch((err) => {
        // console.log(err);
        //setErrorOpen(true);
      });
  };

  const classes = useStyles();
  return (
    <div className="pb-3">
      <h2 className="sub-header border-0">My addresses</h2>
      {loading ? null : (
        <div>
          {edit ? (
            <div className={classes.addDeliveryAddress}>
              <EditDeliveryLocation
                // address={userDetails}
                //onSelect={handleDeliveryLocation}
                onEdit={eId}
                addressLine1={eAddressLine1}
                addressLine2={eAddressLine2}
                street={eStreet}
                city={eCity}
                district={eDistrict}
                state={eState}
                zipcode={eZipcode}
                onSuccess={() => editSuccess()}
              />
            </div>
          ) : addAddressFlag ? (
            <div className={classes.addDeliveryAddress}>
              <AddDeliveryLocation onSelect={handleDeliveryLocation} />
            </div>
          ) : userDetails.address.length > 0 ? (
            <div>
              {userDetails.address.map((res, index) => (
                <div>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    className="border-bottom p-3 mb-3"
                  >
                    <Grid
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <h5>{res.addressLine1}</h5>
                      <h5>{res.street},</h5>
                      <h5>{res.city}</h5>
                      <h5>{res.addressLine2}</h5>
                      <h5>{res.state}</h5>
                      <h5>Pin: {res.zipcode}</h5>
                    </Grid>

                    <Grid
                      direction="column"
                      justify="flex-end"
                      alignItems="flex-end"
                    >
                      <h5
                        className="cursor text-right"
                        onClick={() =>
                          editData(
                            res._id,
                            res.addressLine1,
                            res.addressLine2,
                            res.street,
                            res.city,
                            res.district,
                            res.state,
                            res.country,
                            res.zipcode
                          )
                        }
                      >
                        Edit this address
                      </h5>
                      <DeleteAddress deleteData={() => delectData(res._id)} totalCount={userDetails.address.length} />
                    </Grid>
                  </Grid>
                </div>
              ))}
              <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
              >
                <Button
                  onClick={handleDeliveryLocation}
                  style={{
                    color: "#fff",
                    backgroundColor: "#000",
                    fontsize: "1.4rem",
                  }}
                >
                  Add New Address
                </Button>
              </Grid>
            </div>
          ) : userDetails.address.length == 0 ? (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <h4>You have not added any address yet!</h4>
              <Button
                onClick={handleDeliveryLocation}
                style={{
                  color: "#fff",
                  backgroundColor: "#000",
                  fontsize: "1.4rem",
                }}
              >
                Add New Address
              </Button>
            </Grid>
          ) : null}
        </div>
      )}
    </div>
  );
}
