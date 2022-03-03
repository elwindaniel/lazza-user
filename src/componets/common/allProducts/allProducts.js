import React, { useEffect, useState } from "react";
import "./allProducts.css";
import NavigationBar from "../navigationBar";
import HeadBannerImg from "../../../assets/allProduct/allProductbanner.png";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Button,
} from "@material-ui/core";
import { Typography, Grid, Divider, Paper, Slider } from "@material-ui/core";
import Category from "./categoryProduct.js";
import Tabs from "@material-ui/core/Tabs";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "../card/card";
import Axios from "../../../api/axios";
import { API_URL, category, product, filter } from "../../../api/constants";
import Pagination from "@material-ui/lab/Pagination";
import SnackBarComp from "../snackBar";
import FilterComponent from "./filter";
import {
  FilterCenterFocusOutlined,
  FilterVintage,
  FilterListTwoTone,
} from "@material-ui/icons";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton } from "@material-ui/core";
import FilterImg4 from "../../../assets/allProduct/4.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useSelector } from "react-redux";
import cookie from "react-cookies";
import SessionCheck from "../../../api/SessionCheck";
// import Button from "@material-ui/core/Button";
import PincodeToggler from './pincodeToggler';

const drawerWidth = 100;
let theme = createMuiTheme({
  typography: {
    h2: {
      //fontFamily: "Spicy Rice",
      //fontWeightMedium: 100,
      fontSize: 37,
    },
  },
  drawer: {
    width: drawerWidth,
    marginTop: "40px",
    flexShrink: 0,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
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
    padding: "1rem",
    // width: "90vW",
    display: "flex",
    // justifyContent: "space-between",
    flexFlow: "wrap",
  },
  flex1: {
    display: "flex",
    width: "98%",
    // justifyContent: "center",
    // justifyItems: "center",
  },
  flex: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    paddingLeft: theme.spacing(17),
    paddingRight: theme.spacing(10),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(12),
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(2),
    },
  },
  filterDrawer: {
    height: "100vh",
    backgroundColor: "rgba(255,255,255,1)",
    // [theme.breakpoints.down("md")]: {
    //   position: "absolute",
    //   zIndex: 90,
    //   borderRight: "none",
    // },
  },
  drawerClosed: {
    display: "none",
  },
  button: {
    marginLeft: 20,
  },
  priceRangeDiv: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(3),
  },
}));

const AirbnbSlider = withStyles({
  root: {
    color: "#3a8589",
    height: 3,
    padding: "13px 0",
  },
  thumb: {
    height: 74,
    width: 30,
    backgroundColor: "transparent",
    backgroundImage:
      "url(https://lh3.googleusercontent.com/-bMp8o8JfJqY/YFtU3owP1FI/AAAAAAAAD7A/uwFqd35ZJ2IvhHer3cMmtY5R7ulpMFE8wCK8BGAsYHg/s0/2021-03-24.png?authuser=0)",
    marginTop: -29,
    marginLeft: -13,
    borderRadius: 0,
    hover: "none",
    "& .bar": {
      height: 9,
      width: 1,
      marginLeft: 1,
      marginRight: 1,
    },
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: 85,

    "& *": {
      background: "transparent",
      color: "#000",
      fontSize: "15px",
    },
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return <span {...props} />;
}

function AllProducts() {
  const [categoryList, setCategoryList] = useState();
  const [productList, setProductList] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState();
  const [currntPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(50);
  const [openPriceRangeDialog, setOpenPriceRangeDialog] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [value, setValue] = React.useState([0, 2000]);

  const get_category_API = `${category.getCattegory}`;
  const all_products_API = `${product.getAllProduct}`;

  const GetCategory = async () => {
    try {
      await Axios.get(get_category_API).then((res) => {
        if (res.data.length > 0) {
          setCategoryList(res.data);
        } else {
          setCategoryList([]);
        }
      });
    } catch (e) {
      //console.log(e);
    }
  };

  useEffect(() => {
    GetCategory();
  }, []);

  const token = SessionCheck.checkSession();
  let pincodeRedux = useSelector((state) => state.userInfoReducer.pincode);
  const pincode = token ? pincodeRedux : cookie.load("pincode");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await Axios.get(
          all_products_API +
            "?filters=" +
            selectedFilters +
            "&minPrice=" +
            value[0] +
            "&maxPrice=" +
            value[1] +
            "&pincode=" + pincode
        ).then((res) => {
          //console.log("all_products_API==>>", res);
          // setLoading(true);
          if (res.data.length > 0) {
            setProductList(res.data);
            setLoading(false);
          } else {
            setProductList([]);
            setLoading(false);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchPosts();
  }, [selectedFilters, value, pincode]);

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

  const classes = useStyles();

  const pageChangeFn = (event, value) => {
    setCurrentPage(value);
  };
  const openFilter = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const filterClose = () => {
    setOpen(false);
  };
  const handleOpenPriceRangeDialog = () => {
    openPriceRangeDialog
      ? setOpenPriceRangeDialog(false)
      : setOpenPriceRangeDialog(true);
  };

  const handleClosePriceRangeDialog = (value) => {
    setOpenPriceRangeDialog(false);
  };

  function filterChange(filterId, filterGpId) {
    let fltrs = [...selectedFilters];
    let justChecked = filterId;
    let foundInTheState = fltrs.indexOf(justChecked);

    if (foundInTheState === -1) {
      fltrs.push(justChecked);
    } else {
      fltrs.splice(foundInTheState, 1);
    }
    setSelectedFilters(fltrs);
  }

  function filterGroupExpand() {
    setSelectedFilters([]);
  }

  const priceRangeHandleChange = (event, newValue) => {
    setValue(newValue);
    // console.log("new value ==>>", newValue);
  };

  return (
    <div className="allProduct">
      <MuiThemeProvider theme={theme}>
        <div
          className="bg-light-gray w-100 mt-80px"
          // className="allProduct_header"
        />
        <SnackBarComp />
        <PincodeToggler />
        {loading ? null : (
          <div>
            <div className={classes.flex1}>
              <Grid
                className="mt-3"
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
                  {categoryList && categoryList.length
                    ? categoryList.map((data) => (
                        <Category
                          key={data._id}
                          imgsrc={`${API_URL}/${data.imagePath}`}
                          title={data.categoryName}
                          catId={data._id}
                          page={"cate"}
                        />
                      ))
                    : null}
                </Tabs>
              </Grid>
            </div>
            {/* <Grid container direction="column">
              <Grid container justify="flex-end">
                <Button
                  // className={classes.button}
                  onClick={openFilter}
                  startIcon={<FilterListTwoTone />}
                  style={{ marginRight: 15, outline: "none" }}
                >
                  filter
                </Button>
              </Grid>
              <Divider
                variant="middle"
                style={{
                  marginLeft: 15,
                  marginRight: 10,
                  backgroundColor: "#fff",
                }}
              />
            </Grid> */}
            <Grid container justify="center">
              <Grid conatiner justify="flex-end">
                <div className={classes.filterDrawer} style={{ marginTop: 23 }}>
                  <div className="">
                    <div
                      onClick={handleOpenPriceRangeDialog}
                      className=" filter-container p-2"
                      style={{ backgroundImage: `url(${FilterImg4})` }}
                    >
                      <div
                        onClick={handleOpenPriceRangeDialog}
                        className=" filter-dropdown row flex-nowrap align-items-center align-self-center"
                      >
                        <div className="mt-n15 filter-text">Price Range</div>
                        <IconButton style={{ color: "white" }}>
                          <ExpandLessIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                    </div>
                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={openPriceRangeDialog}
                      onClose={handleClosePriceRangeDialog}
                    >
                      <DialogTitle className="bg-accent text-white">
                        Price Range
                      </DialogTitle>
                      <DialogContent>
                        <div
                          className="mt-3 pt-3"
                          style={{
                            height: 90,
                            // marginTop: 20
                            margin: 20,
                          }}
                        >
                          <AirbnbSlider
                            ThumbComponent={AirbnbThumbComponent}
                            getAriaLabel={(index) =>
                              index === 0 ? "Minimum price" : "Maximum price"
                            }
                            // style={{
                            //   color: "#be9509",
                            //   minWidth: "300px",
                            // }}
                            className="sliderrimg"
                            value={value}
                            onChange={priceRangeHandleChange}
                            valueLabelDisplay="on"
                            max={2000}
                            min={0}
                          />
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: "#000", color: "#fff" }}
                          onClick={handleClosePriceRangeDialog}
                        >
                          Apply
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <FilterComponent
                    filterSelect={filterChange}
                    filterGroupExpand={filterGroupExpand}
                    selectedFilters={selectedFilters}
                  />
                </div>
              </Grid>

              <Grid
                style={{ marginLeft: "12px" }}
                container
                xs={8}
                md={8}
                lg={10}
                xl={9}
                justify="flex-start"
              >
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
                  : null}
              </Grid>
            </Grid>
            {/* <div className={classes.flex}>
              <>
                <div className={classes.filterDrawer} style={{ marginTop: 36 }}>
                  <div className="">
                    <div
                      onClick={handleOpenPriceRangeDialog}
                      className=" filter-container p-2"
                      style={{ backgroundImage: `url(${FilterImg4})` }}
                    >
                      <div
                        onClick={handleOpenPriceRangeDialog}
                        className=" filter-dropdown row flex-nowrap align-items-center align-self-center"
                      >
                        <div className="mt-n15 filter-text">Price Range</div>
                        <IconButton style={{ color: "white" }}>
                          <ExpandLessIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                    </div>
                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={openPriceRangeDialog}
                      onClose={handleClosePriceRangeDialog}
                    >
                      <DialogTitle className="bg-accent text-white">
                        Price Range
                      </DialogTitle>
                      <DialogContent>
                        <div
                          className="mt-3 pt-3"
                          style={{
                            height: 90,
                            // marginTop: 20
                            margin: 20,
                          }}
                        >
                          <AirbnbSlider
                            ThumbComponent={AirbnbThumbComponent}
                            getAriaLabel={(index) =>
                              index === 0 ? "Minimum price" : "Maximum price"
                            }
                            style={{
                              color: "#be9509",
                              minWidth: "300px",
                            }}
                            value={value}
                            onChange={priceRangeHandleChange}
                            valueLabelDisplay="on"
                            max={2000}
                            min={0}
                          />
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: "#000", color: "#fff" }}
                          onClick={handleClosePriceRangeDialog}
                        >
                          Apply
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <FilterComponent
                    filterSelect={filterChange}
                    filterGroupExpand={filterGroupExpand}
                    selectedFilters={selectedFilters}
                  />
                </div>
                <div className={classes.body}>
                  {" "}
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
                </div>
              </>
            </div> */}
            {/* <div className={classes.flex}>
              <div
                className={open ? classes.filterDrawer : classes.drawerClosed}
                classes={{
                  paper: classes.drawerPaper,
                }}
                style={{ marginTop: 30 }}
              >
                <div className="">
                  <div
                    onClick={handleOpenPriceRangeDialog}
                    className=" filter-container p-2"
                    style={{ backgroundImage: `url(${FilterImg4})` }}
                  >
                    <div
                      onClick={handleOpenPriceRangeDialog}
                      className=" filter-dropdown row flex-nowrap align-items-center align-self-center"
                    >
                      <div className="mt-n15 filter-text">Price Range</div>
                      <IconButton style={{ color: "white" }}>
                        <ExpandLessIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>
                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={openPriceRangeDialog}
                    onClose={handleClosePriceRangeDialog}
                  >
                    <DialogTitle className="bg-accent text-white">
                      Price Range
                    </DialogTitle>
                    <DialogContent>
                      <div
                        className="mt-3 pt-3"
                        style={{
                          height: 90,
                          // marginTop: 20
                          margin: 20,
                        }}
                      >
                        <AirbnbSlider
                          ThumbComponent={AirbnbThumbComponent}
                          getAriaLabel={(index) =>
                            index === 0 ? "Minimum price" : "Maximum price"
                          }
                          style={{
                            color: "#be9509",
                            minWidth: "300px",
                          }}
                          value={value}
                          onChange={priceRangeHandleChange}
                          valueLabelDisplay="on"
                          max={2000}
                          min={0}
                        />
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#000", color: "#fff" }}
                        onClick={handleClosePriceRangeDialog}
                      >
                        Apply
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

                <FilterComponent
                  filterSelect={filterChange}
                  filterGroupExpand={filterGroupExpand}
                  selectedFilters={selectedFilters}
                />
              </div>
              <Grid container justify="flex-start" className={classes.body}>
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
            </div> */}
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

export default AllProducts;
