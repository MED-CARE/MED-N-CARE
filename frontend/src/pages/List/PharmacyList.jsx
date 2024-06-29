import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./list.css";
import { useCookies } from 'react-cookie';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import PharmacyCard from '../../components/Card/PharmacyCard';

function PharmacyList() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token", "lat", "long"]);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    setLoading(true);
    try {
      setLoading(true);
    const response = await axios.get(
      `http://localhost:8080/api/pharmacy/nearby?lat=${
        cookies["lat"] || 22.569859
      }&long=${cookies["long"] || 88.364241}`
    );
    if (response.data.success) {
      setLoading(false);
      setPharmacies(response.data.pharmacy);
    } else {
      setLoading(false);
      toast.error("Something went wrong fetching pharmacies.");
    }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching pharmacies:", error);
    }
  };

  return (
    <>
    <section className="container">
        <p className="sub-title-middle">Top Pharmacies near you</p>

        <div className="container">
          <div className="hospital-list">
            {loading ? (
              <p>Loading...</p>
            ) : pharmacies && pharmacies.length > 0 ? (
              pharmacies.slice(0, 6).map((pharmacy) => (
                <Link
                  key={pharmacy._id}
                  to={`/pharmacy/${pharmacy._id}`}
                  className="link"
                >
                  <PharmacyCard pharmacy={pharmacy} />
                </Link>
              ))
            ) : (
              <p>No pharmacies found near your location.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PharmacyList;
