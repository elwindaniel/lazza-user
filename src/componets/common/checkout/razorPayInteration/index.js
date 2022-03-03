import { useState, useEffect } from "react";
import { payNow, user } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography, Grid } from "@material-ui/core";
import SessionCheck from "../../../../api/SessionCheck";
import InvoicePage from "../invoicePage";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

export default function RazorPayIntegration({
  totalAmount,
  cartDetails,
  promoCodes,
  stockingPoint,
  orderPage,
}) {
  // console.log("paynow!!!!!!", totalAmount, "==>>", stockingPoint);
  const [data] = useState({
    amount: totalAmount * 100,
    currency: "INR",
  });
  const [loading, setLoading] = useState(true);
  const [resultId, setResultId] = useState();

  const token = SessionCheck.checkSession();
  let userId;
  if (token) {
    const userdetails = SessionCheck.getLoggedinUserId();
    userId = userdetails.userId;
  }
  // const [userDetails, setUserDetails] = useState();
  const get_userbyuserid_API = `${user.getUserbyUserid}/`;
  const [userLoading, setUserLoading] = useState(true);
  const [paymentSucessFlag, setPaymentSucessFlag] = useState(false);
  const [razorpayPaymentId, setRazorpayPaymentId] = useState();

  let userName = "";
  let userEmail = "";
  let userPhoneNum;

  useEffect(() => {
    const postamount = async () => {
      try {
        await Axios.post(`${payNow.payNow}`, data).then((res) => {
          setLoading(true);
          //console.log("paynow==>>", res.data.id);
          setResultId(res.data.id);
          if (res.data.id) {
          }
          setLoading(false);
        });
      } catch (e) {
        //console.log(e);
      }
    };
    postamount();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        await Axios.get(get_userbyuserid_API + userId).then((res) => {
          setUserLoading(true);
          //console.log("user res ==>>", res);
          userName = res.data.name;
          userEmail = res.data.email;
          userPhoneNum = res.data.phoneNumber;
          loadRazorpay();
          setUserLoading(false);
        });
      } catch (e) {
        //console.log(e);
      }
    };
    const getGustUser = async () => {
      try {
        let guestAddress = localStorage.getItem("guestUserAddress");
        guestAddress = guestAddress ? JSON.parse(guestAddress) : null;
        //console.log("gustUser pay", guestAddress);
        userName = guestAddress.name;
        userPhoneNum = guestAddress.phoneNumber;
        loadRazorpay();
      } catch (e) {
        //console.log(e);
      }
    };
    if (token) {
      getUser();
    } else {
      getGustUser();
    }
  }, []);

  function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = displayRazorpay;
  }

  function displayRazorpay() {
    var options = {
      // key: "rzp_test_ObML5nuhfWyo0u", // Enter the Key ID generated from the Dashboard
      key: "rzp_test_VaCs5XJKtwDPlR", // Enter the Key ID generated from the Dashboard

      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Lazza",
      description: "Test Transaction",
      image:
        "https://sgp1.digitaloceanspaces.com/quickcompany/trademark/7b2f6bb4db230276.jpg",
      order_id: { resultId }, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: "https://lazza.meantr.com/paymentsuccess/qrwwy",
      // callback_url: "https://creditt3.com/lazza/api/user/paymentsuccess/",
      callback_url:
        "http://lazzalive.efcynt.com/lazza/api/user/paymentsuccess/",

      // handler: function (response) {
      //   console.log("payment response", response);
      //   alert(response.razorpay_payment_id);
      //   alert(response.razorpay_order_id);
      //   alert(response.razorpay_signature);
      //   const paymentObject = new window.Razorpay(options);
      //   paymentObject.close();
      // },
      handler: function (response) {
        //console.log("payment response", response);
        setRazorpayPaymentId(response.razorpay_payment_id);
        var paymentObject = new window.Razorpay(options);
        //console.log("payment Object", paymentObject);
        paymentObject.close();
        setPaymentSucessFlag(true);
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userPhoneNum,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <div>
      {loading ? (
        <WaitComponet />
      ) : !paymentSucessFlag ? (
        <WaitComponet />
      ) : orderPage ? (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: "60vh" }}
        >
          <CheckCircleRoundedIcon style={{ fontSize: 60, paddingBottom: 10 }} />
          <Typography align="center" varient="h2" style={{ fontSize: 25 }}>
            Your Order has been placed sucessfully
          </Typography>
        </Grid>
      ) : null
      // <InvoicePage
      //   payment={paymentSucessFlag}
      //   cartDetails={cartDetails}
      //   promocodes={promoCodes}
      //   total={totalAmount}
      //   razorpayPaymentId={razorpayPaymentId}
      //   stockingPoint={stockingPoint}
      // />
      }
    </div>
  );
}

function WaitComponet() {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "50vh" }}
    >
      <CircularProgress />
      <Typography varient="h4" style={{ marginTop: 10 }}>
        Please wait while we are procesing your request...
      </Typography>
    </Grid>
  );
}
