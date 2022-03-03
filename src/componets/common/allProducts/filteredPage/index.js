import { useState, useEffect } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  LinearProgress,
} from "@material-ui/core";
import "../allProducts.css";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../../navigationBar";
import { Typography, Grid } from "@material-ui/core";
import HeadBannerImg from "../../../../assets/allProduct/allProductbanner.png";
import { filter } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import Card from "../../card/card";
import Pagination from "@material-ui/lab/Pagination";
import SnackBar from "../../snackBar";
import Searchimg from "../../../../assets/sorry.gif";

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

function Filtered(props) {
  const filtername = props.match.params.filtername;
  const filterId = props.match.params.filterid;
  const filterGroupId = props.match.params.filterGpId;
  //console.log("filterId cate filterId ==>>", props);

  const get_productsbyfilterId_API = `${filter.productGetByFilterGroupId}/`;

  const [productList, setProductList] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currntPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(50);

  const classes = useStyles();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await Axios.get(get_productsbyfilterId_API + filterGroupId).then(
          (res) => {
            setLoading(true);
            if (res.data.length > 0) {
              setProductList(res.data);
              setLoading(false);
            } else {
              setProductList([]);
              setLoading(false);
            }
          }
        );
      } catch (e) {
        //console.log(e);
      }
    };
    fetchPost();
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

  const pageChangeFn = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <div className="allProduct_header">
          <NavigationBar background={true} />
        </div>
        <div
          className="allProduct_heading"
          style={{
            backgroundImage: `url(${HeadBannerImg})`,
            height: "120px",
          }}
        >
          <Typography variant="h2" align="center">
            {filtername}
          </Typography>
        </div>
        <SnackBar />
        {loading ? <LinearProgress color="secondary" /> : null}
        {loading ? null : (
          <div>
            <Grid container justify="center" className={classes.body}>
              {currentPost && currentPost.length ? (
                currentPost.map((data) => {
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
                      />
                    </div>
                  );
                })
              ) : loading ? null : (
                <div>
                  {" "}
                  <Typography variant="h5" align="center">
                    Sorry! No products found under {filtername}
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
          </div>
        )}
      </MuiThemeProvider>
    </div>
  );
}

export default Filtered;
