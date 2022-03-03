import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "../../../../api/axios";
import { API_URL, cart } from "../../../../api/constants";
import SessionCheck from "../../../../api/SessionCheck";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  mainPaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
  },
  img: {
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  imgPaper: {
    paddingLeft: theme.spacing(1.5),
    textAlign: "center",
  },
  dataPaper: {
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(2),
  },
}));

export default function MobileCartCard(props) {
  const [count, setCount] = React.useState(parseInt(props.quantity));

  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;

  const deletefn = (id) => {
    Axios.delete(
      `${cart.deleteCartbyId}` + "/" + userId + "?cartId=" + id
    ).then((res) => {
      props.onSelect();
    });
  };

  const addCount = () => {
    setCount(Math.max(count + 1));
  };

  const subtrCount = () => {
    setCount(Math.max(count - 1, 1));
  };
  const classes = useStyles();
  return (
    <Paper className={classes.mainPaper} elevation={1}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {" "}
          <Paper className={classes.imgPaper} elevation={0}>
            <img
              src={`${API_URL}/${props.imgsrc}`}
              alt=""
              className={classes.img}
            />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          {" "}
          <Paper className={classes.dataPaper} elevation={0}>
            <Typography
              variant="subtitle1"
              component="p"
              style={{ color: "#ff9800", fontSize: "26px" }}
            >
              {props.title}
            </Typography>
            <Typography variant="h5" color="initial" component="p">
              &#x20B9;
              {props.prize}
            </Typography>

            <Grid container item alignItems="center">
              <Grid container item xs={9} alignItems="center">
                <IconButton
                  aria-label="delete"
                  style={{ outline: "none", marginRight: "10px" }}
                  onClick={subtrCount}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h5" align="center">
                  {count}
                </Typography>
                <IconButton
                  aria-label="delete"
                  style={{ outline: "none", marginLeft: "10px" }}
                  onClick={addCount}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid container item xs={3}>
                <IconButton
                  aria-label="delete"
                  style={{ outline: "none" }}
                  onClick={() => deletefn(props.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
