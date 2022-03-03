const initialState = {
  pincode: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDPINCODE":
      return { ...state, pincode: action.payload };
    case "REMOVEPINCODE":
      return { ...state, pincode: "" };
    case "ADD_CART_DETAILS":
      return { ...state, stockingPointDetails: action.payload };
    case "SELECTED_PROMO_INDEX":
      return { ...state, selectedPromo: action.payload };

  }

  return state;
};

export default userReducer;
