import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { snackBar } from "../../../redux/actions/index";
import Button from "@material-ui/core/Button";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackBar() {
  // console.log("snackBaer");
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(false);

  const status = useSelector((state) => state.snackBarReducer.status);
  const type = useSelector((state) => state.snackBarReducer.snacBarType);
  const message = useSelector((state) => state.snackBarReducer.message);
  const action = useSelector((state) => state.snackBarReducer.action);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    // setOpen(false);
    dispatch(snackBar(false, "", ""));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={status}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          action={
            action === "changePincode" ? (
              <Link href="#" style={{ color: "#eceff1", outline: "none" }}>
                Want to try another location?
              </Link>
            ) : // <Button color="inherit" size="small">
            //   Want to try another location?
            // </Button>
            null
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
