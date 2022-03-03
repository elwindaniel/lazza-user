import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userInfo from "./userInfo";
import snackBar from "./snackbar";
import cart from "./cart";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfoReducer"],
};

const rootReducer = combineReducers({
  userInfoReducer: userInfo,
  snackBarReducer: snackBar,
  cartReducer: cart,
});

export default persistReducer(persistConfig, rootReducer);
