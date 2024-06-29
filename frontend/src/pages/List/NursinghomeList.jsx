import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./list.css";
import { useCookies } from 'react-cookie';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

function NursinghomeList() {
  const [nursingHomes, setNursingHomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token", "lat", "long"]);

  useEffect(() => {
    fetchNursingHomes();
  }, []);

  const fetchNursingHomes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hospital/nearbyonlynursinghome?lat=${
          cookies["lat"] || 22.569859
        }&long=${cookies["long"] || 88.364241}`
      );
      if (response.data.success) {
        setLoading(false);
        setNursingHomes(response.data.nursingHomes);
      } else {
        setLoading(false);
        console.error("Error fetching nursing homes:", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching nursing homes:", error);
    }
  };

  return (
    <>
      <section className="container">
        <p className="sub-title-middle">Top Nursing Homes near you</p>

        <div className="container">
          <div className="hospital-list">
            {loading ? (
              <p>Loading...</p>
            ) : nursingHomes && nursingHomes.length > 0 ? (
              nursingHomes.map((nursingHome) => (
                <Link
                  key={nursingHome._id}
                  to={`/hospital/${nursingHome._id}`}
                  className="link"
                >
                  <Card hospital={nursingHome} />
                </Link>
              ))
            ) : (
              <p>No nursing homes found near your location.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default NursinghomeList;
