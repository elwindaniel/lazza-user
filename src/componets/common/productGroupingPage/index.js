import { useEffect, useState } from "react";
import NavigationBar from "../navigationBar";
import "./productGroupingComp.css";
import HeadBannerImg from "../../../assets/allProduct/allProductbanner.png";
import { Grid, Typography } from "@material-ui/core";
// import { homePageGouping } from "../../../api/constants";
import Axios from "../../../api/axios";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Card from "../card/card";
import SnackBarComp from "../snackBar";
import OfferPage from "./offerPage";

const useStyles = makeStyles((theme) => ({
  divroot: {
    marginRight: "20px",
    //transition: "transform 450ms",
  },
  pagination: {
    "& > *": {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
    },
  },
  body: {
    minHeight: "55vh",
    //paddingTop: "30px",
  },
}));

export default function ProductGroupingComponent(props) {
  const groupName = props.match.params.groupName;
  const url = "master/get" + groupName;
  //   console.log("url==>>", url);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState();
  const [currntPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(50);

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
        console.log(e);
      }
    };

    fetchPost();
  }, [url]);

  const classes = useStyles();

  const indexOfLastPost = currntPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  let currentPost;
  let paginationquotient;
  let paginationRemainter;
  let PaginationLength = 0;

  if (loading === false) {
    currentPost = productList.slice(indexOfFirstPost, indexOfLastPost);

    paginationquotient = Math.floor(productList.length / postPerPage);
    paginationRemainter = productList.length % postPerPage;

    if (paginationRemainter > 0) {
      PaginationLength = paginationquotient + 1;
    } else {
      PaginationLength = paginationquotient;
    }
  }

  const pageChangeFn = (event, value) => {
    setCurrentPage(value);
  };

  //   function responce(a) {
  //     console.log("aaaa++>>", a);
  //     if (a === "Sucess") {
  //       sucessSnackBarOpenHandle();
  //     }
  //   }

  return (
    <div>
      {/* <div className="productGrouping_header">
        <NavigationBar background={true} />
      </div> */}
      {/* <div
        className="productGrouping_heading"
        style={{ backgroundImage: `url(${HeadBannerImg})`, height: '120px' }}
      >
        <Typography
          variant="h2"
          style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: 2 }}
        >
          {groupName}
        </Typography>
      </div> */}

      <SnackBarComp />
      {groupName === "OfferZone" ? (
        <OfferPage />
      ) : loading ? null : (
        <div>
          <Grid container justify="center" className={classes.body}>
            {currentPost && currentPost.length
              ? currentPost.map((data) => {
                  return (
                    <div className={classes.divroot}>
                      {/* <Card
                        key={data._id}
                        id={data._id}
                        imgsrc={data.productImage}
                        title={data.productName}
                        offer={data.offers}
                        filterGp={data.filterGroups}
                        //prize="800.00"
                        disMrp={data.discountPrice}
                        mrp={data.regularPrice}
                        varient={data.variants}
                        description={data.description}
                        //   giveResponce={(e) => responce(e)}
                      /> */}
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
                  );
                })
              : null}
          </Grid>
          <div className={classes.pagination}>
            <Pagination
              count={PaginationLength}
              shape="rounded"
              onChange={pageChangeFn}
            />
          </div>
        </div>
      )}
    </div>
  );
}
