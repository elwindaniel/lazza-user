export const addPincode = (pin) => {
  return { type: "ADDPINCODE", payload: pin };
};

export const removePincode = () => {
  return { type: "REMOVEPINCODE" };
};

export const snackBar = (
  snackBarStatus,
  snacBarType,
  snackBarMessage,
  action
) => {
  return {
    type: "snacBar",
    snacBarType: snacBarType,
    message: snackBarMessage,
    status: snackBarStatus,
    action: action,
  };
};

export const getCartCount = () => {
  // console.log("getCartCount Action");
  return {
    type: "CARTCOUNT",
  };
};

export const addCartStockingPoints = (addCartDetails) => {
  return { type: "ADD_CART_DETAILS", payload: addCartDetails };
};
export const selectedPromCodeIndex = (promoCodeObject) => {
  return { type: "SELECTED_PROMO_INDEX", payload: promoCodeObject };
};
