import React, { useEffect } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Axios from "../../../../api/axios";
import { API_URL, cart } from "../../../../api/constants";
import SessionCheck from "../../../../api/SessionCheck";
import { remove, update } from "cart-localstorage";
import { useDispatch } from "react-redux";
import { getCartCount } from "../../../../redux/actions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { round } from '../../../../utils/lodash';

const useStyles = makeStyles(() => ({
  stockAlert: {
    marginTop: 20,
  },
}));

function CartCard(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(parseInt(props.quantity));

  const dispatch = useDispatch();

  const token = SessionCheck.checkSession();
  let userId;
  if (token) {
    const userdetails = SessionCheck.getLoggedinUserId();
    userId = userdetails.userId;
  }

  const IsMD = useMediaQuery("(min-width:768px)");
  const IsXS = useMediaQuery("(min-width:375px)");

  const deletefn = (id) => {
    //console.log("id", id);
    if (token) {
      Axios.delete(`${cart.deleteCartbyId}/` + userId + "?cartId=" + id).then(
        (res) => {
          props.onSelect();
          dispatch(getCartCount());
        }
      );
    } else {
      remove(props.id);
      props.onSelect();
    }
  };

  const quantityUpdate = (quantity) => {
    let postData = {
      cartId: props.id,
      quantity: quantity,
    };

    if (token) {
      //console.log("token", token);
      Axios.put(`${cart.updateCartquantity}/` + userId, postData).then(
        (res) => {
          props.onSelect();
        }
      );
    } else {
      update(props.id, "quantity", quantity);
    }
  };

  const addCount = () => {
    setCount(Math.max(count + 1));
    let temp = count + 1;
    quantityUpdate(temp);
    props.onSelect();
  };

  const subtrCount = () => {
    setCount(Math.max(count - 1, 1));
    let ct = count - 1;
    if (ct > 0) {
      quantityUpdate(ct);
    } else {
      quantityUpdate(count);
    }
    props.onSelect();
  };

  let promoValue;
  let totalPrize;

  useEffect(() => {
    totalPrize = props.prize * count;
    // console.log("total ==>>", totalPrize);
  }, [count]);

  return (
    <div className="row product-list justify-content-between">
      <div
        className={`row align-items-center col-md-10 ${
          IsXS ? "flex-nowrap" : " "
        }`}
      >
        <img
          src={`${API_URL}/${props.image}`}
          alt=""
          width="25%"
          style={{ minWidth: "150px" }}
        />

        <div
          className={`pl-md-3 `}
          style={{ marginLeft: IsMD ? "0px" : "14px" }}
        >
          <div className="mt-1">
            <span
              className={`font-weight-bold sub-header border-0  ${
                IsMD ? "font-size-lg" : ""
              }`}
            >
              &#x20B9; {props.prize}{" "}
            </span>
            per item
          </div>

          <h3 className={`${IsMD ? "font-size-lg" : "font-size-xs"}`}>
            {props.title}
          </h3>

          {props.promo ? (
            props.promo.variantName === props.title ? (
              <h6 className="font-arial text-uppercase bg-accent p-2 rounded">
                {props.promo.promotionalCode}{" "}
                {props.promo.status === "percentage" ? (
                  <>{props.promo.value}% </>
                ) : (
                  <>Rs {props.promo.value} </>
                )}{" "}
                Off
              </h6>
            ) : //  {props.promoCodes.variantName}

            null
          ) : null}

          <div
            className="row border align-items-center  flex-nowrap"
            style={{
              maxWidth: "148px",
              position: "relative",
              left: "18px",
              top: "10px",
            }}
          >
            <div className=" bg-light-gray">
              <IconButton aria-label="reduce" onClick={subtrCount}>
                <RemoveIcon />
              </IconButton>
            </div>
            <div className="text-center" style={{ minWidth: "50px" }}>
              {count}
            </div>
            <div className=" bg-light-gray">
              <IconButton
                aria-label="increase"
                onClick={addCount}
                disabled={!props.isStockAvailable}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
          {!props.isStockAvailable && (
            <Alert severity="warning" className={classes.stockAlert}>
              This Product is Not Available Near Your Location at{" "}
              {props.pincode}
            </Alert>
          )}
        </div>
      </div>

      <div
        className={`${IsMD ? "" : "row mt-4 align-items-center ml-auto gx-3 "}`}
      >
        {IsMD ? (
          <IconButton
            className=" align-items-end d-flex justify-content-end mb-3"
            aria-label="delete"
            onClick={() => deletefn(props.id)}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          <a
            className="mr-5 mx-md-0"
            onClick={() => deletefn(props.id)}
            style={{ color: "red" }}
          >
            Remove
          </a>
        )}

        <div className="text-right mx-2 mx-md-0">Item Total</div>
        <div className="text-right sub-header border-0 mt-0 font-weight-bold font-size-lg">
          {/* &#x20B9; 
          {props.promo ? props.promo.variantName === title? if(promo.status === "percentage"){

          } else {

          }
          : (totalPrize = props.prize * count) : (totalPrize = props.prize * count)} */}
          {(() => {
            totalPrize = props.prize * count;
            // <p>{totalPrize}</p>;
            if (props.promo) {
              if (props.promo.variantName === props.title) {
                if (props.promo.status === "percentage") {
                  let a = count * props.prize;
                  promoValue = a * (props.promo.value / 100);
                  totalPrize -= promoValue;
                } else {
                  promoValue = props.promo.value;
                  totalPrize -= promoValue;
                }
              }
            }
            // return totalPrize;
          })()}
          &#x20B9; {round(totalPrize)}
        </div>
      </div>
    </div>
  );
}

export default CartCard;
