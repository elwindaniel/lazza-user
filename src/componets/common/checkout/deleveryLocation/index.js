import { useState } from "react";
import "./deliveryLocation.css";
import EditDeliveryLocation from "../../myProfile/address/editAddress";
import DelivLocationCard from "./card";

function DeliveryLocation(props) {
  const [edit, setEdit] = useState(false);
  const [eId, seteId] = useState();
  const [eAddressLine1, seteAddressLine1] = useState();
  const [eAddressLine2, seteAddressLine2] = useState();
  const [eStreet, seteStreet] = useState();
  const [eCity, seteCity] = useState();
  const [eDistrict, seteDistrict] = useState();
  const [eState, seteState] = useState();
  // const [eCountry, seteCountry] = useState();
  const [eZipcode, seteZipcode] = useState();

  const editData = (
    id,
    addressLine1,
    addressLine2,
    street,
    city,
    district,
    state,
    country,
    zipcode
  ) => {
    setEdit(true);
    seteId(id);
    seteAddressLine1(addressLine1);
    seteAddressLine2(addressLine2);
    seteStreet(street);
    seteCity(city);
    seteDistrict(district);
    seteState(state);
    // seteCountry(country);
    seteZipcode(zipcode);
  };

  function editSuccess() {
    setEdit(false);
    props.onSuccessEdit();
  }

  function defaltAddresChild() {
    props.onSuccessEdit();
  }

  function child(data) {
    //console.log(data, "child!!!!");
    editData(
      data._id,
      data.addressLine1,
      data.addressLine2,
      data.street,
      data.city,
      data.district,
      data.state,
      data.country,
      data.zipcode
    );
  }

  return (
    <>
      {edit ? (
        <EditDeliveryLocation
          onEdit={eId}
          addressLine1={eAddressLine1}
          addressLine2={eAddressLine2}
          street={eStreet}
          city={eCity}
          district={eDistrict}
          state={eState}
          zipcode={eZipcode}
          onSuccess={() => editSuccess()}
        />
      ) : (
        <div>
          {props.address.address && props.address.address.length
            ? props.address.address.map((data, index) => (
                <DelivLocationCard
                  key={index}
                  id={data._id}
                  index={index}
                  user={props.user}
                  defaultAddress={props.address.defaultAddress}
                  addressLine1={data.addressLine1}
                  street={data.street}
                  city={data.city}
                  district={data.district}
                  state={data.state}
                  country="India"
                  zipcode={data.zipcode}
                  name={data.name}
                  phoneNumber={data.phoneNumber}
                  onSelect={() => child(data)}
                  onSuccessEdit={defaltAddresChild}
                />
              ))
            : null}
          {props.address && props.address.length
            ? props.address.map((data) => (
                <DelivLocationCard
                  id={data._id}
                  user={props.user}
                  defaultAddress={props.address.defaultAddress}
                  addressLine1={data.addressLine1}
                  street={data.street}
                  city={data.city}
                  district={data.district}
                  state={data.state}
                  country="India"
                  zipcode={data.zipcode}
                  name={data.name}
                  phoneNumber={data.phoneNumber}
                  onSelect={() => child(data)}
                />
              ))
            : null}
        </div>
      )}
    </>
  );
}

export default DeliveryLocation;
