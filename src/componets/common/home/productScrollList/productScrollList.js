import { useState, useEffect } from "react";
import "./productScrollList.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// import ProdImg from "../../../../assets/Product img.png";
import Card from "../../card/card";
import Tabs from "@material-ui/core/Tabs";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography, Link } from "@material-ui/core";
import Axios from "../../../../api/axios";

/*const theme = createMuiTheme({
    typography: {
      h2: {
        fontFamily: "Spicy Rice",
        //fontWeightMedium: 100,
        fontSize: 30,
      },
    },
  });*/

const useStyles = makeStyles((theme) => ({
  divroot: {
    marginRight: "20px",
    transition: "transform 450ms",
  },
  title: {
    paddingLeft: "35px",
    paddingTop: "20px",
    paddingBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "5%",
    },
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  product_row_list: {
    display: "flex",
    overflowX: "scroll",
    paddingLeft: theme.spacing(2),
  },
}));

function ProductScrollList({ title, url, routeName }) {
  const theme = useTheme();
  //console.log('url==>>', url)
  //console.log('route name==>>', routeName)
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState();
  const [localProductList, setLocalProductList] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      if (url !== undefined) {
        try {
          // console.log("fetchData!!!!>");
          await Axios.get(`${url}`).then((res) => {
            setLoading(true);
            //console.log('fetchData offer==>>', res)
            if (res.data.length > 0) {
              setProductList(res.data);
              setLoading(false);
            } else {
              setProductList([]);
              setLoading(false);
            }
            // setLoading(false);
          });
        } catch (e) {
          //console.log(e)
        }
      } else if (routeName === "foryou") {
        //console.log('for you !!')
        setLoading(true);
        let a = JSON.parse(localStorage.getItem("foryou"));
        //console.log('for you ==>>', a)
        setLocalProductList(a);
        setLoading(false);
      }
    };
    fetchPost();
    // url ? fetchPost() : null;
  }, [url, routeName]);

  const IsActive = useMediaQuery(theme.breakpoints.down("md"));

  const classes = useStyles();
  return (
    <div className="product_row">
      {url || routeName === "foryou" ? (
        loading ? null : (localProductList && localProductList.length > 6) ||
          (productList && productList.length > 6) ? (
          <div>
            <div className={classes.titleDiv}>
              <Typography
                variant="h5"
                align="left"
                className={classes.title}
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {title}
              </Typography>
              <Link
                href={"/pg/" + routeName}
                variant="subtitle1"
                className={classes.title}
                style={{
                  paddingRight: "35px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                view all
              </Link>
            </div>
            {IsActive ? (
              <div
                //className="product_row_list"
                className={classes.product_row_list}
              >
                {routeName === "foryou"
                  ? localProductList && localProductList.length
                    ? localProductList.map((data) => {
                        // console.log("for Ypu ==> data =+>>", data);
                        return (
                          <div className={classes.divroot}>
                            {/* <Card
                              key={data.productId}
                              id={data.productId}
                              imgsrc={data.image}
                              title={data.productName}
                              offer={data.offers}
                              disMrp={data.discountPrice}
                              mrp={data.rate}
                              varient={data.variants}
                              description={data.description}
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
                    : null
                  : productList && productList.length
                  ? productList.map((data) => {
                      //console.log('offer data==>>', data)
                      return (
                        <div className={classes.divroot}>
                          {/* <Card
                          key={data._id}
                          id={data._id}
                          imgsrc={data.productImage}
                          title={data.productName}
                          offer={data.offers}
                          disMrp={data.discountPrice}
                          mrp={data.regularPrice}
                          varient={data.variants}
                          description={data.description}
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
              </div>
            ) : (
              <Tabs
                // value={value}
                //onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                aria-label="scrollable auto tabs example"
                //className="allProduct_category_list"
                style={{ margin: "0px", padding: "0px" }}
              >
                {routeName === "foryou"
                  ? localProductList && localProductList.length
                    ? localProductList.map((data) => {
                        // console.log("for Ypu ==> data =+>>", data);
                        return (
                          <div className={classes.divroot}>
                            {/* <Card
                              key={data.productId}
                              id={data.productId}
                              imgsrc={data.image}
                              title={data.productName}
                              offer={data.offers}
                              disMrp={data.discountPrice}
                              mrp={data.rate}
                              varient={data.variants}
                              description={data.description}
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
                    : null
                  : productList && productList.length
                  ? productList.map((data) => (
                      <div className={classes.divroot}>
                        {/* <Card
                          key={data._id}
                          id={data._id}
                          imgsrc={data.productImage}
                          title={data.productName}
                          offer={data.offers}
                          disMrp={data.discountPrice}
                          mrp={data.regularPrice}
                          varient={data.variants}
                          description={data.description}
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
                    ))
                  : null}
              </Tabs>
            )}
          </div>
        ) : null
      ) : null}
    </div>
  );
}

export default ProductScrollList;
