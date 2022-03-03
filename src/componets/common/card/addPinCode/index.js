import React from "react";
import { Dialog, DialogContent,TextField } from "@material-ui/core";

export default function AddPincode(props) {
  const { children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup} onClos={() => setOpenPopup(false)} maxWidth={2000}>
      <DialogContent>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
