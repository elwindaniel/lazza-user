import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Home from "./componets/common/home";
import CartContainer from "./componets/common/cartContainer/cartContainer";
import Footer from "./componets/common/footer/footer";
import ProductView from "./componets/common/productDiscriptionPage";
import AllProduct from "./componets/common/allProducts/allProducts";
import AboutAs from "./componets/common/aboutAs/aboutAs";
import ContactUs from "./componets/common/contactUs";
import CreateAccount from "./componets/common/auth/createaccount";
import { CssBaseline } from "@material-ui/core";
import Login from "./componets/common/auth/login";
import OTP from "./componets/common/auth/otpScreen";
import ForgetPassword from "./componets/common/auth/forgotPassword";
import CheckOut from "./componets/common/checkout/checkOut";
import MyProfile from "./componets/common/myProfile";
import SubCategory from "./componets/common/allProducts/subCategory";
import CategoryPage from "./componets/common/allProducts/categoryPage";
import Filtered from "./componets/common/allProducts/filteredPage";
import AdditionalInfo from "./componets/common/auth/createaccount/addtionalInfo";
import PaymentSucess from "./componets/common/checkout/paymentSucsses";
import ProductGroupingPage from "./componets/common/productGroupingPage";
import SerachViews from "./componets/common/searchView";
import LinkPayPage from "./componets/common/linkPayPage";
import "react-chat-widget/lib/styles.css";
import SessionCheck from "./api/SessionCheck";
import { user } from "./api/constants";
import PrivacyPolicy from "./componets/common/privacyPolicy";
import TermsandConditions from "./componets/common/termsandConditions";
import Axios from "./api/axios";
import { useDispatch } from "react-redux";
import { addPincode, getCartCount } from "./redux/actions";
import Header from "./componets/common/navigationBar";
import CancellationPolicy from "./componets/common/cancellationPolicy";
import Invoice from "./componets/common/checkout/invoicePage";
import Failure from "./componets/common/home/failurePage/failure";
import TagManager from 'react-gtm-module'
const tagManagerArgs = {
  gtmId: 'GTM-PBFMZ8T'
}
TagManager.initialize(tagManagerArgs)
function App() {
  const get_userbyuserid_API = `${user.getUserbyUserid}/`;

  const token = SessionCheck.checkSession();
  let userId;
  if (token) {
    const userdetails = SessionCheck.getLoggedinUserId();
    userId = userdetails.userId;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Axios.get(get_userbyuserid_API + userId).then((res) => {
          let addressIndex = parseInt(res.data.defaultAddress);
          if (res.data.address.length > 0) {
            if (
              res.data.address[addressIndex].zipcode &&
              res.data.address[addressIndex].zipcode !== "undefined"
            ) {
              dispatch(addPincode(res.data.address[addressIndex].zipcode));
            }
          }
        });
      } catch (e) {
        //console.log(e);
      }
    };
    fetchUser();
    dispatch(getCartCount());
  }, [userId]);

  return (
    <>
      <Header />
      <div>
        <CssBaseline />

        {/* <header className="App-header"></header> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/shoppingCart" component={CheckOut} />
          <Route exact path="/productView" component={ProductView} />
          <Route exact path="/allProduct" component={AllProduct} />
          <Route exact path="/aboutUs" component={AboutAs} />
          <Route exact path="/contactUs" component={ContactUs} />
          <Route exact path="/createAccount" component={CreateAccount} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/otp" component={OTP} />
          <Route exact path="/search/:name" component={SerachViews} />
          <Route exact path="/forgotPassword" component={ForgetPassword} />
          <Route exact path="/privacypolicy" component={PrivacyPolicy} />
          <Route
            exact
            path="/termsandconditions"
            component={TermsandConditions}
          />
          <Route
            exact
            path="/cancellationpolicy"
            component={CancellationPolicy}
          />
          <Route exact path="/checkout" component={CheckOut} />
          <Route exact path="/myprofile" component={MyProfile} />
          <Route exact path="/myprofile/:case" component={MyProfile} />
          <Route
            exact
            path="/sc/:subcatename/:cateId/:subcateid"
            component={SubCategory}
          />
          <Route
            exact
            path="/fp/:filtername/:filterGpId"
            component={Filtered}
          />
          <Route
            exact
            path="/c/:categoryname/:categoryid"
            component={CategoryPage}
          />
          <Route
            exact
            path="/additionalinfo/:userid"
            component={AdditionalInfo}
          />
          <Route exact path="/otp/:userid" component={OTP} />
          <Route
            exact
            path="/paymentsuccess/:token"
            component={PaymentSucess}
          />
          <Route exact path="/pg/:groupName" component={ProductGroupingPage} />
          <Route exact path="/paypage/:token" component={LinkPayPage} />
          <Route exact path="/invoice/:orderId" component={Invoice} />
          <Route exact path="/failure" component={Failure} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
