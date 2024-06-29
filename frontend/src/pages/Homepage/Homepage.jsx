import React, { useEffect, useState } from "react";
import "./homepage.css";
import locationIcon from "../../../public/assets/location.png";
import searchIcon from "../../../public/assets/search.png";
import Hospital from "../../../public/assets/Hospital.png";
import Clinic from "../../../public/assets/Clinic.jpg";
import Nursinghome from "../../../public/assets/Nursinghome.jpg";
import Pharmacy from "../../../public/assets/Pharmacy.jpg";
import newsletter from "../../../public/assets/newsletter.jpg";
import email from "../../../public/assets/email.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Card from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import PharmacyCard from "../../components/Card/PharmacyCard";

function Homepage() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token", "lat", "long"]);
  const [loading, setLoading] = useState(false);
  const [nearbyHospital, setNearybyHospital] = useState([]);
  const [nearbyPharmacies, setNearybyPharmacies] = useState([]);
  const [userLocality, setUserLoacality] = useState("Kolkata");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState({ lat: null, long: null });
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchHospital();
    fetchPharmacy();
    fetchLoactionData();
  }, []);
  useEffect(() => {
    fetchHospital();
    fetchPharmacy();
   
  }, [location]);

  const fetchLoactionData = async () => {
    setFetching(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation({ lat, long });

          try {
            const response = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
            );
            if (response.status === 200) {
              setUserLoacality(response.data.city || "Unknown location");
              setFetching(false);
            }
          } catch (error) {
            console.error("Error fetching location data", error);
            toast.error("Error fetching location data.");
          }
        },
        (error) => {
          console.error("Error getting location", error);
          toast.error("Error getting location.");
        }
      );
    } else {
      console.error("Geolocation is not supported by the browser.");
      toast.error("Geolocation is not supported by the browser.");
    }
  };

  const fetchHospital = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8080/api/hospital/nearby?lat=${
        location.lat
      }&long=${location.long}`
    );
    if (response.data.success) {
      setLoading(false);
      setNearybyHospital(response.data.hospitals);
    } else {
      setLoading(false);
      
    }
  };

  const fetchPharmacy = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8080/api/pharmacy/nearby?lat=${
        location.lat
      }&long=${ location.long}`
    );
    if (response.data.success) {
      setLoading(false);
      setNearybyPharmacies(response.data.pharmacy);
    } else {
      setLoading(false);
      // toast.error("Something went wrong fetching pharmacies.");
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${search}`);
    }
  };

  return (
    <>
      <div className="hero-wrapper">
        <section className="hero">
          <div className="hero-content">
            <h1>MED & CARE</h1>
            <p>Transforming health through innovation</p>
          </div>
          <form action="" className="hero-search">
            <div className="location">
              <img src={locationIcon} alt="" width={"16px"} />
              <input
                type="text"
                name=""
                readOnly
                value={fetching ? "Fetching..." : userLocality}
                placeholder="Location"
              />
            </div>
            <div className="search">
              <img src={searchIcon} alt="" width={"18px"} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                placeholder="Search for hospitals, pharmacy all across India"
              />
            </div>
          </form>
        </section>
      </div>

      <br />
      <br />
      <br />
      <section className="container">
        <p className="sub-title-left">Explore Category </p>
        <div className="category">
          <ul>
            <Link className="link" to={"/hospital"}>
              <li>
                <img src={Hospital} alt="" width={"100%"} />
                <p>Hospital</p>
              </li>
            </Link>
            <Link className="link" to="/nursinghome">
              <li>
                <img src={Nursinghome} alt="" width={"100%"} />
                <p>Nursing Homes</p>
              </li>
            </Link>
            <Link className="link" to="/clinic">
              <li>
                <img src={Clinic} alt="" width={"100%"} />
                <p>Clinics</p>
              </li>
            </Link>
            <Link className="link" to="/pharmacy">
              <li>
                <img src={Pharmacy} alt="" width={"100%"} />
                <p>Pharmacies</p>
              </li>
            </Link>
          </ul>
        </div>
      </section>

      <section className="container">
        <p className="sub-title-middle">Top Hospitals near {userLocality}</p>
        <div className="container">
          <div className="hospital-list">
            {loading ? (
              <p>Loading...</p>
            ) : nearbyHospital && nearbyHospital.length > 0 ? (
              nearbyHospital.map((hospital) => (
                <Link
                  key={hospital._id}
                  to={`/hospital/${hospital._id}`}
                  className="link"
                >
                  <Card hospital={hospital} />
                </Link>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </section>

      <section className="container">
        <p className="sub-title-middle">Top Pharmacies near {userLocality}</p>
        <div className="container">
          <div className="hospital-list">
            {loading ? (
              <p>Loading...</p>
            ) : nearbyPharmacies && nearbyPharmacies.length > 0 ? (
              nearbyPharmacies.slice(0, 6).map((pharmacy) => (
                <Link
                  key={pharmacy._id}
                  to={`/pharmacy/${pharmacy._id}`}
                  className="link"
                >
                  <PharmacyCard pharmacy={pharmacy} />
                </Link>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="newsletter">
          <div className="newsletter-left">
            <img src={newsletter} alt="" />
          </div>
          <div className="newsletter-right">
            <h2>Subscribe to our Newsletter!</h2>
            <p>Subscribe to our news letter and stay updated.</p>
            <div className="email-box">
              <img src={email} alt="" width={"25px"} />
              <input type="email" placeholder="Your email" />
            </div>
            <div className="subscribe-btn">
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
