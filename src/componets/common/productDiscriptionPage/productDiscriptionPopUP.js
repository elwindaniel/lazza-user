import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./productDiscriptionPage.css";

function ProductDiscriptionPopUP(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      open={openPopup}
      onClose={() => setOpenPopup(false)}
      maxWidth={2000}
    >
      {/*<DialogTitle>
        <IconButton align="right">
          <CloseIcon />
        </IconButton>
      </DialogTitle>*/}
      <DialogContent className="product_content">
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDiscriptionPopUP;
