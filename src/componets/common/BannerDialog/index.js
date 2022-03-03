import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import serviceAreasImage from "../../../assets/serviceAreas.png";

export default function DeleteAddress({ src }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img src={src} style={{ width: "100%", marginTop: "75px" }} onClick={handleClickOpen}></img>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ padding: 10 }}>
          <img src={serviceAreasImage} style={{ width: "100%", borderRadius: 10 }}></img>
        </DialogContent>
      </Dialog>
    </div>
  );
}