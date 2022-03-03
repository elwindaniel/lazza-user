import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import SessionCheck from "../../../api/SessionCheck";
import { addPincode } from '../../../redux/actions';
import cookie from "react-cookies";
import { useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    paddingTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
  customLink: {
    paddingLeft: theme.spacing(),
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    paddingLeft: theme.spacing(2)
  },
  dialogActions: {
    flexDirection: 'column',
    color: "#F27321",
    width: "85%",
    margin: "auto",
    textAlign: "center"
  },
  dialogContent: {
    display: "flex",
    alignItems: 'flex-end',
  }
}));

export default function PincodeToggler() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [pincode, setPincode] = React.useState('');
  const [isValidPincode, setIsValidPincode] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const token = SessionCheck.checkSession();

  useEffect(() => {
    setIsValidPincode(pincode.length === 6)
  }, [pincode]);

  const setPincodeAndReload = () => {
    let newPincode = pincode || "682020";
    if (newPincode.length === 6) {
      setIsValidPincode(true);
      if (token) {
        dispatch(addPincode(newPincode));
      } else {
        cookie.save("pincode", newPincode, { path: "/" });
        dispatch(addPincode(newPincode));
      }
      // history.push('/');
      window.location.reload();
    } else {
      setIsValidPincode(false);
    }
  }

  return (
    <div className={classes.root}>
      <Dialog
        open={dialogOpen}
        onClose={() => {}}
        aria-labelledby="form-dialog-title"
      >
        {!isValidPincode ? (
          <Alert severity="error">Enter Valid Pincode!</Alert>
        ) : null}
        <DialogTitle id="form-dialog-title" disableTypography className={classes.dialogTitle}>
          <Typography component="div">Enter Pincode of Delivery Location</Typography>
          <IconButton aria-label="close" onClick={() => setPincodeAndReload()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            required
            autoFocus
            margin="dense"
            id="pinCode"
            label="Pincode"
            type="text"
            fullWidth
            onChange={(e) => setPincode(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => setPincodeAndReload()}
            color="primary"
            style={{ backgroundColor: "#ff9100", outline: "none", marginLeft: "10px" }}
          >
            Continue
          </Button>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
         Providing a Pincode will ensure the correct display of stock availability and deliverability of your order
        </DialogActions>
      </Dialog>
      { open && 
        <Alert severity="warning" color="warning" onClose={() => setOpen(false)}>
          Unable to find delivery in your location? You can try another location by
          <Link href="#" className={classes.customLink} onClick={() => setDialogOpen(true)}>
            clicking here
          </Link>
        </Alert>
      }
    </div>
  );
}