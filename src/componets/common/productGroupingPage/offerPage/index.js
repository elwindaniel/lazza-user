import { useEffect, useState } from "react";
import NavigationBar from "../../navigationBar";
import Greyoffer from "../../../../assets/greyoffer.png";
import whiteoffer from "../../../../assets/offers-white .png";
import location from "../../../../assets/location.png";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "../../../../api/axios";
import Card from "../../card/card";
import { offerZone, promoCode } from "../../../../api/constants";
import SessionCheck from "../../../../api/SessionCheck";
import "./offerStyle.css";
import offernew from "../../../../assets/offernew.png";
import BannerDialog from '../../BannerDialog';

const useStyles = makeStyles((theme) => ({
  divroot: {
    marginRight: "20px",
    transition: "transform 450ms",
  },
  title: {
    paddingLeft: "40px",
    paddingTop: "30px",
    paddingBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "5%",
    },
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  divroot: {
    marginRight: "20px",

    //transition: "transform 450ms",
  },
  body: {
    width: "90%",
    minHeight: "55vh",
    marginLeft: "68px",
  },
}));

export default function OfferPage() {
  const url = "master/getOfferZone";
  const myOffer_URL = `${offerZone.getMyOffers}/`;
  const promoProducts_URL = `${offerZone.getPromoProducts}`;
  const getAllPromo_URL = `${promoCode.getAllPromocode}`;

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState();
  const [myOffersLoading, setMyOffersLoading] = useState(true);
  const [promoProductsLoading, setPromoProductsLoading] = useState(true);
  const [promoProductsList, setPromoProductsList] = useState();
  const [myOfferList, setMyOfferList] = useState();

  const [promoCodesLoading, setPromoCodesLoading] = useState(true);
  const [promoCodeList, setPromoCodeList] = useState();

  const token = SessionCheck.checkSession();
  let userId;
  if (token) {
    const userdetails = SessionCheck.getLoggedinUserId();
    userId = userdetails.userId;
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        await Axios.get(`${url}`).then((res) => {
          //   console.log("ressss++>>", res);
          setProductList(res.data);
          setLoading(false);
        });
      } catch (e) {
        // console.log(e);
      }
    };

    fetchPost();
  }, [url]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setPromoCodesLoading(true);
        await Axios.get(getAllPromo_URL).then((res) => {
          // console.log("promo code ressss++>>", res);
          setPromoCodeList(res.data);
          setPromoCodesLoading(false);
        });
      } catch (e) {
        // console.log(e);
      }
    };

    fetchPost();
  }, [getAllPromo_URL]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setPromoProductsLoading(true);
        await Axios.get(promoProducts_URL).then((res) => {
          // console.log("promotion ressss++>>", res);
          setPromoProductsList(res.data);
          setPromoProductsLoading(false);
        });
      } catch (e) {
        // console.log(e);
      }
    };

    fetchPost();
  }, [promoProducts_URL]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setMyOffersLoading(true);
        await Axios.get(myOffer_URL + userId).then((res) => {
          // console.log("my offer ressss++>>", res);
          setMyOfferList(res.data);
          setMyOffersLoading(false);
        });
      } catch (e) {
        // console.log(e);
      }
    };

    fetchPost();
  }, [myOffer_URL, userId]);

  return (
    <>
      <div className="offerMainBody">
        <BannerDialog src={offernew} />
        {myOffersLoading ? null : myOfferList && myOfferList.length ? (
          <div className="offerBody">
            <div className="offerBodyImg" style={{ textAlign: "center" }}>
              <img src={whiteoffer} />
              <div
                style={{
                  fontSize: 35,
                  fontWeight: "bold",

                  fontFamily: "Open Sans Condensed",
                }}
              >
                ON YOUR SPECIAL DAY
              </div>
            </div>
            <div>
              <Grid container justify="center" className="cardBody">
                {myOfferList.map((data) => (
                  <div className="divroot">
                    <Card
                      key={data._id}
                      id={data._id}
                      imgsrc={data.productImage}
                      title={data.productName}
                      ProductName={data.product}
                      offer={data.offers}
                      filterGp={data.filterGroups}
                      //prize="800.00"
                      disMrp={data.discountPrice}
                      mrp={data.regularPrice}
                      varient={data.variants}
                      variantId={data.variantId}
                      description={data.description}
                      // giveResponce={(e) => responce(e)}
                    />
                  </div>
                ))}
              </Grid>
            </div>
          </div>
        ) : null}

        <div
          style={{ backgroundColor: "rgb(234 234 234)", textAlign: "center" }}
        >
          {promoProductsLoading ? null : promoProductsList &&
            promoProductsList.length ? (
            <>
              <div className="offerBody">
                <div className="offerBodyImg" style={{ textAlign: "center" }}>
                  <img src={Greyoffer}></img>
                  <div
                    style={{
                      fontSize: 35,
                      fontWeight: "bold",

                      fontFamily: "Open Sans Condensed",
                    }}
                  >
                    ON PROMOTION
                  </div>
                </div>
                <Grid container justify="center" className="cardBody">
                  {promoProductsList.map((data) => (
                    <div className="divroot">
                      <Card
                        key={data._id}
                        id={data._id}
                        imgsrc={data.productImage}
                        title={data.productName}
                        ProductName={data.product}
                        offer={data.offers}
                        filterGp={data.filterGroups}
                        //prize="800.00"
                        disMrp={data.discountPrice}
                        mrp={data.regularPrice}
                        varient={data.variants}
                        variantId={data.variantId}
                        description={data.description}
                        // giveResponce={(e) => responce(e)}
                      />
                    </div>
                  ))}
                </Grid>
              </div>
            </>
          ) : null}
        </div>

        <>
          {loading ? null : (
            <div className="offerBody">
              <div className="offerBodyImg" style={{ textAlign: "center" }}>
                <img src={whiteoffer} />
                <div
                  style={{
                    fontSize: 35,
                    fontWeight: "bold",

                    fontFamily: "Open Sans Condensed",
                  }}
                >
                  OTHER OFFERS
                </div>
              </div>

              <div>
                <Grid container justify="center" className="cardBody">
                  {productList && productList.length
                    ? productList.map((data) => (
                        <div className="divroot">
                          <Card
                            key={data._id}
                            id={data._id}
                            imgsrc={data.productImage}
                            title={data.productName}
                            ProductName={data.product}
                            offer={data.offers}
                            filterGp={data.filterGroups}
                            //prize="800.00"
                            disMrp={data.discountPrice}
                            mrp={data.regularPrice}
                            varient={data.variants}
                            variantId={data.variantId}
                            description={data.description}
                            // giveResponce={(e) => responce(e)}
                          />
                        </div>
                      ))
                    : null}
                </Grid>
              </div>
            </div>
          )}
        </>
        <></>
      </div>
    </>
  );
}
