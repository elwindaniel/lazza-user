import React from "react";
import styles from './cancellationpolicy.css';
import CancellationPolicyImg from "../../../assets/cancellation.png";

function CancellationPolicy() {
    return (
        <>
            <div className="row privcycontainer">

                <div className="col-lg-4 headerblock"></div>
                <div className="col-lg-8 headerblock">Cancellation Policy</div>
                <div className="col-lg-4">
                    <img
                        src={CancellationPolicyImg}
                        style={{ width: "100%", marginTop: "0px" }}
                    ></img>
                </div>
                <div className="col-lg-8">

                    <p>SAS has the complete right and discretion to cancel any orders, and reserve the right to cancel any order for any reasons, including for the following reasons:</p>

                    <p>a) Quantity available for purchase, errors in pricing, errors in product information, or any other issues identified by our internal team or any alert against fraudulent transactions.
                    <br />b) SAS hold the right to cancel any Cash On Delivery orders, if it is not verified within 24 hours as in the Cash On Delivery Policy. Company reserves its right to cancel such Cash On Delivery Order at any point of time if the Company is not satisfied with the information provided by the customer.
                    <br />c) SJ Group will notify the customer if your order is cancelled fully, or partially or if any other additional requirements required to accept your order.
                    <br />d) If cancellation is initiated by customers before dispatch of product for any reason, full refund may be made except bank charges.
                    <br />e) Customer cannot get refund if the order/product once dispatched to the customer.</p>

                </div>
            </div>
        </>
    );
}

export default CancellationPolicy;
