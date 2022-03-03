// import { useEffect } from "react";
import Axios from "../../api/axios";
import { cart } from "../../api/constants";
import SessionCheck from "../../api/SessionCheck";
import { list } from "cart-localstorage";

const cartDetls = {
  count: 0,
};

const token = SessionCheck.checkSession();
let userId;
if (token) {
  const userdetails = SessionCheck.getLoggedinUserId();
  userId = userdetails.userId;
}

const cartCount = () => {
  //   console.log("cart count fn");
  if (token) {
    // console.log("cart count fn token", userId);
    Axios.get(`${cart.getCartCount}/` + userId).then((res) => {
      //   console.log("cart count==>>", res);
      if (res.data.cartCount) {
        cartDetls.count = res.data.cartCount;
      } else {
        cartDetls.count = 0;
      }
    });
  } else {
    // console.log("non signedin usser cound==>>", list().length);
    if (list() && list().length) {
      cartDetls.count = list().length;
    } else {
      cartDetls.count = 0;
    }
  }
};

const cartReducer = (state = cartDetls, action) => {
  switch (action.type) {
    case "CARTCOUNT":
      cartCount();
    default:
      return state;
  }
  //   return state;
};

export default cartReducer;
