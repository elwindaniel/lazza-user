import React from "react";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    cursor: "pointer",
  },
}));

function CategoryProduct(props) {
  const history = useHistory();

  const classes = useStyles();

  return (
    <div className="categoryProduct">
      {/* <Avatar
        alt=""
        src={props.imgsrc}
        className={classes.large}
        onClick={
          props.page === "cate"
            ? () => history.push("/c/" + props.title + "/" + props.catId)
            : () =>
                history.push(
                  "/sc/" +
                    props.title +
                    "/" +
                    props.catId +
                    "/" +
                    props.subCateId
                )
        }
      /> */}
      <img
        src={props.imgsrc}
        alt=""
        className={classes.large}
        onClick={
          props.page === "cate"
            ? () => history.push("/c/" + props.title + "/" + props.catId)
            : () =>
                history.push(
                  "/sc/" +
                    props.title +
                    "/" +
                    props.catId +
                    "/" +
                    props.subCateId
                )
        }
      />

      <Typography
        variant="subtitle1"
        align="left"
        className="text-uppercase"
        style={{
          marginTop: "15px",
          fontSize: "15px",
          fontFamily: "Arial",
          fontWeight: "520",
          cursor: "pointer",
        }}
        onClick={
          props.page === "cate"
            ? () => history.push("/c/" + props.title + "/" + props.catId)
            : () => history.push("/sc/" + props.title + "/" + props.subCateId)
        }
      >
        {props.title}
      </Typography>
    </div>
  );
}

export default CategoryProduct;
