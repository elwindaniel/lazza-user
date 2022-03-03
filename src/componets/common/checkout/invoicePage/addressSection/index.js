import { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import Axios from "../../../../../api/axios";
import SessionCheck from "../../../../../api/SessionCheck";
import { user } from "../../../../../api/constants";

export default function AddressSesion() {
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;

  const [userData, setUserData] = useState();
  const [userDataLoading, setUserDataLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserDataLoading(true);
        await Axios.get(user.getUserbyUserid + "/" + userId).then((res) => {
          //console.log("get user ==>>", res);
          if (res.data) {
            setUserData(res.data);
            setUserDataLoading(false);
          }
          setUserDataLoading(false);
        });
      } catch (e) {
        //console.log(e);
      }
    };
    fetchUser();
  }, []);

  return (
    <Paper elevation={0}>
      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
        }}
      >
        Shipping Address
      </Typography>
    </Paper>
  );
}
