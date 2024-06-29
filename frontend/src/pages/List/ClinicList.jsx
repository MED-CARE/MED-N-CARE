import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./list.css";
import { useCookies } from 'react-cookie';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

function ClinicList() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token", "lat", "long"]);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hospital/nearbyonlyclinic?lat=${
          cookies["lat"] || 22.569859
        }&long=${cookies["long"] || 88.364241}`
      );
      if (response.data.success) {
        setLoading(false);
        setClinics(response.data.clinics);
      } else {
        setLoading(false);
        console.error("Error fetching clinics:", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching clinics:", error);
    }
  };

  return (
    <>
      <section className="container">
        <p className="sub-title-middle">Top Clinics near you</p>

        <div className="container">
          <div className="hospital-list">
            {loading ? (
              <p>Loading...</p>
            ) : clinics && clinics.length > 0 ? (
              clinics.map((clinic) => (
                <Link
                  key={clinic._id}
                  to={`/hospital/${clinic._id}`}
                  className="link"
                >
                  <Card hospital={clinic} />
                </Link>
              ))
            ) : (
              <p>No clinics found near your location.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ClinicList;
