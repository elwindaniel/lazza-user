import React from "react";
import HomeCarsol from "./carsol";
import OurHistory from "./ourHistory/ourHistory";
import Features from "./featuresSection/featuresSection";
import Banner from "./banner1/banner";
import RangeOfProducts from "./rangeOfProducts/rageOfProduct";
import ProductScrllList from "./productScrollList/productScrollList";
import NavigationBar from "../navigationBar";
import { homePageGouping } from "../../../api/constants";
import SnackBar from "../snackBar";

function HomePage() {
  return (
    <div>
      {/* <NavigationBar /> */}
      <HomeCarsol />
      <SnackBar />
      {/* <ProductScrllList
        title="Offer Zone"
        url={homePageGouping.getOfferZone}
        routeName="OfferZone"
      />
      <ProductScrllList
        title="Best Seller"
        url={homePageGouping.getBestSeller}
        routeName="BestSeller"
      />
      <ProductScrllList title="For You" routeName="foryou" /> */}
      {/* <OurHistory />
      <Features />
     */}
      <RangeOfProducts />
      <Banner positon="middle" />
      <Banner positon="bottom" />
    </div>
  );
}

export default HomePage;
