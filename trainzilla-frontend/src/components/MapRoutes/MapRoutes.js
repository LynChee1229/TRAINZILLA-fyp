import React, { useState } from "react";
import '../../styles/css/mapRoute.sass';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import transit from "../../styles/Images/transit map.jpg"
import kelana from "../../styles/Images/kelana-jaya.png"
import sungai from "../../styles/Images/sungai.png"
import port from "../../styles/Images/port.png"
import seremban from "../../styles/Images/seremban.png"

const data = [
  {transit},
  {kelana},
  {sungai},
  {port},
  {seremban}
];

function MapRoute() {
  const [selectedImg, setSelectedImg] = useState(data[0]);

  return (
    <div className="App">
    <Header/>
      <div className="box">
        <div className="left">
            <p class="titleLine">Main Map & Time table</p>
          {data.map((img, index) => (
            <div className = "inLeft"
              style={{ backgroundColor: selectedImg === img ? "rgb(87, 158, 240)": "" }}
              key={index}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>
        <img src={selectedImg} alt="Selected" className="right" />

      </div>
      <p className="one">Transit Map</p>
      <p className="two">Kelana Jaya</p>
      <p className="three">Sungai Buloh</p>
      <p className="four">Port Klang</p>
      <p className="five">Seremban</p>

    <Footer/>
    </div>
  );
}

export default MapRoute