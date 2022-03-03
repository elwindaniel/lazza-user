import { useState, useEffect } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import "../allProducts.css";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../../navigationBar";
import { Typography, Grid } from "@material-ui/core";
import HeadBannerImg from "../../../../assets/allProduct/allProductbanner.png";
import { product } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import Card from "../../card/card";
import Pagination from "@material-ui/lab/Pagination";
import SnackBar from "../../snackBar";
import { useSelector } from "react-redux";
import cookie from "react-cookies";
import SessionCheck from "../../../../api/SessionCheck";

let theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 37,
    },
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  divroot: {
    marginRight: "20px",
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
    minHeight: "60vh",
    paddingTop: "30px",
  },
}));

function SubCategory(props) {
  const catId = props.match.params.cateId;
  const subCateId = props.match.params.subcateid;
  const subCateName = props.match.params.subcatename;

  const get_productsbySubCatId_API = `${product.getProductsBySubCategoryId}`;

  const [productList, setProductList] = useState(true);
  const [loading, setLoading] = useState();
  const [currntPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(50);

  const classes = useStyles();
  const token = SessionCheck.checkSession();
  let pincodeRedux = useSelector((state) => state.userInfoReducer.pincode);
  const pincode = token ? pincodeRedux : cookie.load("pincode");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        //console.log(
        //   "url ==>>",
        //   get_productsbySubCatId_API + "/" + catId + "/" + subCateId
        // );
        await Axios.get(
          get_productsbySubCatId_API + "/" + catId + "/" + subCateId + "?pincode=" + pincode
        ).then((res) => {
          //console.log("sub cate res", res);
          setLoading(true);
          if (res.data.length > 0) {
            setProductList(res.data);
            setLoading(false);
          } else {
            setProductList([]);
            setLoading(false);
          }
        });
      } catch (e) {
        //console.log(e);
      }
    };
    fetchPost();
  }, [subCateId, catId, get_productsbySubCatId_API]);

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

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <SnackBar />
        {loading ? null : (
          <div className="mt-80px">
            <h3 className="text-center pt-4"> {subCateName}</h3>
            <Grid
              container
              justify="center"
              className={classes.body}
            //style={{ paddingTop: "30px" }}
            >
              {currentPost && currentPost.length
                ? currentPost.map((data) => {
                  //console.log("mapdata==>>", data);
                  return (
                    <div className={classes.divroot}>
                      <Card
                        key={data._id}
                        id={data._id}
                        imgsrc={data.productImage}
                        title={data.productName}
                        ProductName={data.product}
                        filterGp={data.filterGroups}
                        offer={data.offers}
                        disMrp={data.discountPrice}
                        mrp={data.regularPrice}
                        varient={data.variants}
                        variantId={data.variantId}
                        description={data.description}
                        status={data.status}
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
      </MuiThemeProvider>
    </div>
  );
}

export default SubCategory;
