import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SessionCheck from "../../../../../api/SessionCheck";
import Axios from "../../../../../api/axios";
import { user } from "../../../../../api/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function DelivLocationCard(props) {
  const token = SessionCheck.checkSession();

  const editData = () => {
    props.onSelect();
  };

  const classes = useStyles();
  const defaultIndex =
    props.user === "signedUser" ? parseInt(props.defaultAddress) : 0;

  const userData = {
    defaultAddress: "",
  };

  const defaultAddresssChangeFn = (id, index) => {
    console.log("default Addrescahnfge", index);
    userData.defaultAddress = index.toString();
    Axios.put(changeDefaultAddURL + userId, userData).then((res) => {
      console.log("default addreess res==>>", res);

      props.onSuccessEdit();
    });
  };
  const userdetails = SessionCheck.getLoggedinUserId();
  const changeDefaultAddURL = `${user.editUserDataWithid}/`;
  const userId = userdetails.userId;

  return (
    <Card
      className={classes.root}
      elevation={defaultIndex === props.index ? 2 : 0}
      style={{
        backgroundColor:
          defaultIndex === props.index ? "#E0E0E0" : "transparent",
        borderWidth: 2,
        borderColor: "rgba(188,135,0,100%)",
      }}
    >
      <div className="row" style={{ fontSize: "1.3rem" }}>
        <div className="col">
          <div>{props.name}</div>
          <div>{props.addressLine1}</div>
          <div>{props.street}</div>
          <div>
            {props.city},{props.district}
          </div>
          <div>{props.state},India</div>
          <div>Pin: {props.zipcode}</div>
          <div>{props.phoneNumber}</div>
        </div>

        <div
          className="col text-right"
          style={{ fontSize: "1rem", color: "red" }}
        >
          <div className="">
            {props.orderPage ? null : defaultIndex === props.index ? (
              <div>
                {token ? (
                  <div>
                    {" "}
                    <span
                      style={{
                        color: "green",
                        fontSize: "2rem",
                        position: "relative",
                        top: "5px",
                        left: "5px",
                      }}
                    >
                      &#10003;
                    </span>{" "}
                    Deliver to this address
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                style={{
                  cursor: "pointer",
                  marginBottom: "2px",
                }}
                onClick={() => defaultAddresssChangeFn(props.id, props.index)}
              >
                {token ? "Deliver to this address" : null}
              </div>
            )}
          </div>

          <div>
            {token ? (
              props.orderPage ? null : (
                <div onClick={() => editData()}>Edit this address</div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
