// export const API_URL = "https://creditt3.com/lazza/api/";
// export const API_URL = "http://lazza.efcynt.com/lazza/api/";
// export const API_URL = "http://lazzalive.efcynt.com/lazza/api/";
// export const API_URL = "https://lazza.co.in/lazza/api/";

export const API_URL = "http://lazzaadminv2.efcynt.com/lazza/api/";
// export const API_URL = "http://localhost:8000/lazza/api/";

// test
// export const API_URL = "http://lazzaadminv2.efcynt.com/lazza/api/";

export const user = {
  createUser: "user/createUser",
  getUserbyUserid: "user/getUserById",
  editUserDataWithid: "user/EditUserById",
  editAddress: "user/editAddressByAddressId",
  delectAddress: "user/deleteAddress",
  addNewAddress: "user/addNewAddress",
  resetPassword: "user/resetPassword",
};

export const banner = {
  getBanner: "master/getActiveBanner",
};

export const search = {
  getSearch: "user/keyWordSearch",
};

export const category = {
  getCattegory: "master/getActiveCategory",
  getSubCattegorybyCatId: "master/getSubCategoryByCategoryId",
};

export const product = {
  getAllProduct: "master/getAllProduct",
  getProductsByCategoryId: "master/productGetByCategoryId",
  getProductsBySubCategoryId: "master/productGetBySubCategoryId",
};

export const cart = {
  addToCart: "master/addToCart",
  getCart: "user/getCartDetails",
  deleteCartbyId: "user/deleteCart",
  updateCartquantity: "user/updateCartQuantity",
  getCartCount: "user/cartCount",
};

export const homePageGouping = {
  getOfferZone: "master/getOfferZone",
  getBestSeller: "master/getBestSeller",
};

export const offerZone = {
  getMyOffers: "user/myOffers",
  getPromoProducts: "user/getPromoProducts",
};

export const payNow = {
  payNow: "user/payNow",
  payU: "user/pay",
};

export const order = {
  createOrder: "master/createOrder",
  getOrdersByUserId: "master/getOrdersByUserId",
  getOrderById: "master/getOrderById",
  getcartDetails: "user/getCartDetails",
  getPromoCodeDetails: "user/calculatePromocode"
};
export const filter = {
  getAllFilterGroup: "master/getAllFilterGroup",
  getAllFilter: "master/getAllFilter",
  productGetByFilterId: "master/productGetByFilterIdd",

  productGetByFilterGroupId: "master/productGetByFilterGroupId",
  getAllActiceFilterbyGroupId: "master/getAllActiveFilterbyGroupId",
  productGetByFilterGroupId: "master/productGetByFilterId",
};
export const otp = {
  requestPhoneVerificationOTP: "user/requestPhoneVerificationOTP",
  verifyPhoneVerificationOTP: "user/verifyPhoneVerificationOTP",
};
export const forgotPassword = {
  forgotPasswordUsingPhoneNumber: "user/forgotPasswordUsingPhoneNumber",
  verifyForgotPasswordOTP: "user/verifyForgotPasswordOTP",
};
export const contactUs = {
  contactUs: "/contactUs",
};
export const promoCode = {
  getAllPromocode: "master/getAllPromoCode",
};
