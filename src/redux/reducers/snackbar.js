const initialState = {
  status: false,
  message: "",
};

const snackBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "snacBar":
      return {
        ...state,
        snacBarType: action.snacBarType,
        message: action.message,
        status: action.status,
        action: action.action,
      };
    default:
      return state;
  }
};

export default snackBarReducer;
