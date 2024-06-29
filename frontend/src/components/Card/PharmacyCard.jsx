import React from "react";
import { useCookies } from "react-cookie";
import location from "../../../public/assets/location.png"
import "./card.css";

function PharmacyCard({ pharmacy }) {
    const [cookie] = useCookies("lat", "long")
  //haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const distance = calculateDistance(
    cookie["lat"] ,
    cookie["long"] ,
    pharmacy.lat,
    pharmacy.long
  ).toFixed(2);
  return (
    <>
      <div className="hospital-card">
        <img className="hospital-img" src={`http://localhost:8080/${pharmacy.storePic[0]}`} alt="" />
        <div className="card-details">
            <h3>{pharmacy.name}</h3>
        <p>{pharmacy.address}</p>
        <div className="location">
            <img src={location} alt="" width={"18px"}/>
        {!cookie["lat"] ? <></>: <p>{distance} km away</p>}
        </div>
        </div>
        
      </div>
    </>
    
  );
}

export default PharmacyCard;
