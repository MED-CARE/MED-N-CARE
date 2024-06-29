import React from "react";
import { useCookies } from "react-cookie";
import location from "../../../public/assets/location.png"
import "./card.css";

function Card({ hospital }) {
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
    hospital.lat,
    hospital.long
  ).toFixed(2);
  return (
    <>
      <div className="hospital-card">
        <img className="hospital-img" src={`http://localhost:8080/${hospital.image[0]}`} alt="" />
        <div className="card-details">
            <h3>{hospital.name}</h3>
        <p>{hospital.address}</p>
        <div className="location">
            <img src={location} alt="" width={"18px"}/>
        {!cookie["lat"] ? <></>: <p>{distance} km away</p>}
        </div>
        </div>
        
      </div>
    </>
    // <div className="hospital-card">
    //   <div className="hospital-card-header">
    //     <h2>{hospital.name}</h2>
    //     <p>{hospital.city}, {hospital.state}</p>
    //   </div>
    //   <div className="hospital-card-body">
    //     <p>{hospital.desc}</p>
    //     <p><strong>Address:</strong> {hospital.address}</p>
    //     <p><strong>Phone:</strong> {hospital.phoneNumber}</p>
    //     <p><strong>Email:</strong> <a href={`mailto:${hospital.email}`}>{hospital.email}</a></p>
    //     <p><strong>Website:</strong> <a href={hospital.website} target="_blank" rel="noopener noreferrer">{hospital.website}</a></p>
    //     <p><strong>Facilities:</strong> {hospital.facilities.join(", ")}</p>
    //     {hospital.image.map((imagePath, index) => (
    //       <img
    //         key={index}
    //         src={`http://localhost:8080/${imagePath}`}
    //         alt={`${hospital.name} image ${index + 1}`}
    //         className="hospital-image"
    //       />
    //     ))}
    //   </div>
    //   <div className="hospital-card-footer">
    //     <p>Rating: {hospital.rating}</p>
    //     <p><a href={hospital.gmapLink} target="_blank" rel="noopener noreferrer">View on Map</a></p>
    //   </div>
    // </div>
  );
}

export default Card;
