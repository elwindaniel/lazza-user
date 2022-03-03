import React from "react";
import "./rangeOfProducts.css";
import { makeStyles } from "@material-ui/core/styles";

import { WrpListItems } from "./randeofProductlist";

import { Link, IconButton, Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({}));

function RageOfProduct() {
  const classes = useStyles();
  return (
    <div className="wrpClass">
      {/* <div className="headingtextclass">WIDE RANGE OF OUR PRODUCTS<br /><Link to="/allProduct"><button className="blkbtnxy">GO TO PRODUCT LIST</button></Link></div> */}
      <div className="headingtextclass">WIDE RANGE OF OUR PRODUCTS<br /><a href="/allProduct" className="blkbtnxy" >GO TO PRODUCT LIST</a></div>

      <div className="wrpmenuList">
        <Grid container justify="center" className="wrpBody">
          <List />
        </Grid>
      </div>
    </div>
  );
}

export default RageOfProduct;
const List = () => (
  <>
    {WrpListItems.map((menu) => (
      <div className="wrpCard">
        <Link
          href={menu.url}
          style={{ outline: "none", textDecoration: "none" }}
          underline="none"
        >
          <div className="wrpCardImgDiv">
            <img src={menu.wrpImg} />
          </div>
        </Link>
        <Link
          href={menu.url}
          style={{ outline: "none", textDecoration: "none" }}
          underline="none"
        >
          <div className="titleTextclass" style={{ color: "#000000" }}>
            {menu.wrpTitle}
          </div>
        </Link>
      </div>
    ))}
  </>
);
