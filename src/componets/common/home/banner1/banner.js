import React, { useEffect, useState } from "react";
import BannerImg from "../../../../assets/homeBanners/midBanner.png";
import "./banner.css";
import { banner, API_URL } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Divider, Grid } from "@material-ui/core";
// import bannersubpic1 from "../../../../assets/wrpImages/bannersubpic1.png";
// import bannersubpic2 from "../../../../assets/wrpImages/bannersubpic2.png";

function MidBanner({ positon }) {
  const [middleBanner, setMiddleBanner] = useState();
  const get_banners = `${API_URL}${banner.getBanner}`;
  //console.log(get_banners, "get_banners");

  useEffect(() => {
    Axios.get(get_banners)
      .then((res) => {
        //console.log("banner carsol comp===>>", res.data);
        setMiddleBanner(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [get_banners]);

  const IsMob = useMediaQuery("(min-width:800px)");

  return (
    <>
      <div className="banner">
        {middleBanner && middleBanner.length
          ? middleBanner.map((data) => {
              return data.position === positon ? (
                <img
                  src={
                    IsMob
                      ? `${API_URL}/${data.webImagePath}`
                      : `${API_URL}/${data.imagePath}`
                  }
                  alt=""
                  width="100%"
                />
              ) : null;
            })
          : null}
        {/*{middleBanner && middleBanner.length
        ? middleBanner.map((data) => {
            data.position === "bottom" ? {} : null;
          })
        : null}*/
        /*<img src={BannerImg} alt="" width="100%" />*/}
        {/* <div style={{ backgroundColor: "#be9621" }} className="yellowBaner">
          <Grid container>
            <Grid item xs={12} md={4}>
              <div className="bannersubimg">
                <div className="banners1">
                  <img src={bannersubpic2}></img>
                </div>
                <div className="banners2">
                  <img src={bannersubpic1}></img>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={8}>
              <div className="awesomeDeals">
                <div
                  className="headingtextclass "
                  style={{ color: "#ffffff", fontWeight: "bold" }}
                >
                  AWESOME PARTY DEALS
                </div>

                <div className="offerButton">
                  <button
                    className="buttonClass"
                    style={{ color: "#ffffff", backgroundColor: "#000000" }}
                  >
                    More
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div> */}
      </div>
    </>
  );
}

export default MidBanner;
