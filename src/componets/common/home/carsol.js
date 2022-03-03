import Axios from "../../../api/axios";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { banner, API_URL } from "../../../api/constants";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom";
import strawberry from "../../../assets/wrpImages/strawberry.png";
import berries from "../../../assets/wrpImages/berries.png";
import { Link } from "react-router-dom";
import "./home.css";
//import Banner2 from "../../../assets/homeBanners/HomeBanner2.jpg";

function HomeCarsol() {
  const [index, setIndex] = useState(0);
  const [carsolBanner, setCarsolBanner] = useState();

  const get_banners = `${banner.getBanner}`;
  //const Base_URL = `${}`
  //console.log("banner carsol comp===>>",get_banners);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    Axios.get(get_banners)
      .then((res) => {
        // console.log("banner carsol comp===>>", res.data);
        setCarsolBanner(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [get_banners]);

  const history = useHistory();

  const IsMob = useMediaQuery("(min-width:800px)");

  return (
    <div className="cersoleDiv">
      {/* 
        <div className="Carouselclassimg1">
          <img src={berries} />
          <img src={strawberry} />
        </div> 
      */}
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {carsolBanner && carsolBanner.length
          ? carsolBanner.map((data) => {
              return data.position === "top" ? (
                <Carousel.Item>
                  <a href={`${data.url}`}>
                    <img
                      src={
                        IsMob
                          ? `${API_URL}/${data.webImagePath}`
                          : `${API_URL}/${data.imagePath}`
                      }
                      alt=""
                      width="100%"

                      //height="20%"
                      // height="600vh"
                    />
                  </a>
                </Carousel.Item>
              ) : null;
            })
          : null}
      </Carousel>
    </div>
  );
}

export default HomeCarsol;
