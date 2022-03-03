import React, { useEffect, useState } from "react";
import Searchimg from "../../../assets/sorry.gif";
import NavigationBar from "../navigationBar";
import HeadBannerImg from "../../../assets/allProduct/allProductbanner.png";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  LinearProgress,
} from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";
//import ProdImg from "../../../assets/Product img.png";
import Card from "../card/card";
// import Card from "../card";
import Axios from "../../../api/axios";
import { search } from "../../../api/constants";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "@material-ui/lab/Alert";
import SnackBarComp from "../snackBar";
import { useSelector } from "react-redux";
import cookie from "react-cookies";
import SessionCheck from "../../../api/SessionCheck";
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";

let theme = createMuiTheme({
  typography: {
    h2: {
      //fontFamily: "Spicy Rice",
      //fontWeightMedium: 100,
      fontSize: 37,
    },
  },
});

theme = responsiveFontSizes(theme);

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
    paddingTop: "30px",
  },
  customLink: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 20
  }
}));

function SearchView(props) {
  const [productList, setProductList] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currntPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(50);
  const history = useHistory();

  const search_API = `${search.getSearch}/`;

  let Searchname = props.match.params.name;

  const token = SessionCheck.checkSession();
  let pincodeRedux = useSelector((state) => state.userInfoReducer.pincode);
  const pincode = token ? pincodeRedux : cookie.load("pincode");

  // console.log(search_API + Searchname, "props");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await Axios.get(search_API + Searchname + "?pincode=" + pincode).then((res) => {
          // console.log("all_products_API==>>", res);

          if (res.data.length > 0) {
            setProductList(res.data);
            setLoading(false);
          } else {
            setProductList([]);
            setLoading(false);
          }
        });
      } catch (e) {
        // console.log(e);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currntPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  let currentPost;
  let paginationquotient;
  let paginationRemainter;
  let PaginationLength = 0;

  if (loading == false) {
    currentPost = productList.slice(indexOfFirstPost, indexOfLastPost);

    paginationquotient = Math.floor(productList.length / postPerPage);
    paginationRemainter = productList.length % postPerPage;

    if (paginationRemainter > 0) {
      PaginationLength = paginationquotient + 1;
    } else {
      PaginationLength = paginationquotient;
    }
  }

  const classes = useStyles();

  const pageChangeFn = (event, value) => {
    setCurrentPage(value);
  };
  let varentsArray = [];

  return (
    <div className="min-height-80vh">
      <MuiThemeProvider theme={theme}>
        <div className="allProduct_header">
          <NavigationBar background={true} />
        </div>
        <Grid
          container
          className="mt-3 min-height-5mvh"
          justify="center"
          alignItems="center"
        >
          <h3>SEARCH RESULT</h3>
        </Grid>
        <SnackBarComp />
        {loading ? <LinearProgress color="secondary" /> : null}(
        <div>
          <Grid container justify="center" className={classes.body}>
            {currentPost && currentPost.length ? (
              currentPost.map((data) => {
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
                      // giveResponce={(e) => responce(e)}
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
                      status={data.status}
                    />
                  </div>
                );
              })
            ) : loading ? null : (
              <div>
                {" "}
                <Typography variant="h5" align="center">
                  Sorry! Search is not match with any products
                </Typography>
                <img
                  src={Searchimg}
                  alt="loggin"
                  Style={"width:450px;height:450px;"}
                />
              </div>
            )}
          </Grid>
          <div className={classes.pagination}>
            <Pagination
              count={PaginationLength}
              shape="rounded"
              onChange={pageChangeFn}
            />
          </div>
          <Link href="#" className={classes.customLink} onClick={() => history.push('/allProduct')}>
            Not found what you are looking for? Click to see more products
          </Link>
        </div>
        )
      </MuiThemeProvider>
    </div>
  );
}

export default SearchView;
