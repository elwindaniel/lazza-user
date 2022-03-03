import { useState, useEffect } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import "../allProducts.css";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../../navigationBar";
import { Typography, Grid, Tabs } from "@material-ui/core";
import HeadBannerImg from "../../../../assets/allProduct/allProductbanner.png";
import { API_URL, category, product } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import CategoryProduct from "../categoryProduct";
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
    minHeight: "55vh",
  },
}));

function CategoryPage(props) {
  const cateId = props.match.params.categoryid;
  const cateName = props.match.params.categoryname;

  const get_subCategory_API = `${category.getSubCattegorybyCatId}`;
  const get_productsbyCatId_API = `${product.getProductsByCategoryId}`;

  const [subCategoryList, setSubCategoryList] = useState();
  const [productList, setProductList] = useState(true);
  const [loading, setLoading] = useState();
  const [currntPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(50);

  const classes = useStyles();

  const token = SessionCheck.checkSession();
  let pincodeRedux = useSelector((state) => state.userInfoReducer.pincode);
  const pincode = token ? pincodeRedux : cookie.load("pincode");

  useEffect(() => {
    Axios.get(get_subCategory_API + "/" + cateId)
      .then((res) => {
        if (res.data.length > 0) {
          setSubCategoryList(res.data);
        } else {
          setSubCategoryList([]);
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [get_subCategory_API, cateId]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await Axios.get(get_productsbyCatId_API + "/" + cateId + "?pincode=" + pincode).then((res) => {
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
  }, [cateId, get_productsbyCatId_API]);

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
            <h3 className="text-center pt-4">{cateName}</h3>
            <Grid
              container
              justify="center"
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              <Tabs
                variant="scrollable"
                scrollButtons="on"
                aria-label="scrollable auto tabs example"
                className="allProduct_category_list"
              >
                {subCategoryList && subCategoryList.length
                  ? subCategoryList.map((data) => (
                      <CategoryProduct
                        imgsrc={`${API_URL}/${data.imagePath}`}
                        title={data.subCategoryName}
                        catId={data.categoryId}
                        subCateId={data._id}
                        page={"subCate"}
                      />
                    ))
                  : null}
              </Tabs>
            </Grid>
            <Grid container justify="center" className={classes.body}>
              {currentPost && currentPost.length
                ? currentPost.map((data) => {
                    return (
                      <div className={classes.divroot}>
                        <Card
                          key={data._id}
                          id={data._id}
                          imgsrc={data.productImage}
                          title={data.productName}
                          ProductName={data.product}
                          offer={data.offers}
                          filterGp={data.filterGroups}
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

export default CategoryPage;
