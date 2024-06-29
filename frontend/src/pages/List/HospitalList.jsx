import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./list.css";
import { useCookies } from 'react-cookie';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token", "lat", "long"]);
  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8080/api/hospital/nearbyonlyhospital?lat=${
        cookies["lat"] || 22.569859
      }&long=${cookies["long"] || 88.364241}`
    );
    if (response.data.success) {
      setLoading(false);
      setHospitals(response.data.hospitals);
    } else {
      setLoading(false);
      toast.error("Something went wrong fetching hospital.");
    }
  };

  return (
   <>
   <section className="container">
        <p className="sub-title-middle">Top Hospitals near you</p>

        <div className="container">
          <div className="hospital-list">
            {loading ? (
              <p>Loading...</p>
            ) : hospitals && hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <Link
                  key={hospital._id}
                  to={`/hospital/${hospital._id}`}
                  className="link"
                >
                  <Card hospital={hospital} />
                </Link>
              ))
            ) : (
              <p>No hospitals found near your location.</p>
            )}
          </div>
        </div>
      </section>
   </>
  );
}

export default HospitalList;
