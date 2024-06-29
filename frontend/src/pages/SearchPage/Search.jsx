import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import "./search.css";
import Card from "../../components/Card/Card";
import { calculateDistance } from "../../utils/distance";

import PharmacyCard from "../../components/Card/PharmacyCard";

function Search() {
  const [hospitalResults, setHospitalResults] = useState([]);
  const [pharmacyResults, setPharmacyResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      fetchSearchResults(query);
    }
  }, [location]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      // Fetch hospitals
      const hospitalResponse = await axios.get(
        `http://localhost:8080/api/hospital/search?query=${query}`
      );

      // Fetch pharmacies
      const pharmacyResponse = await axios.get(
        `http://localhost:8080/api/pharmacy/search?query=${query}`
      );

      setHospitalResults(hospitalResponse.data.hospitals || []);
      setPharmacyResults(pharmacyResponse.data.pharmacy || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Search Results</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {hospitalResults.length > 0 && (
              <>
                <h3>Hospitals</h3>
                <div className="hospital-list">
                  {hospitalResults.map((hospital) => (
                    <Link
                      key={hospital._id}
                      to={`/hospital/${hospital._id}`}
                      className="link"
                    >
                      <div key={hospital._id}>
                        <Card hospital={hospital} />
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {pharmacyResults.length > 0 && (
              <>
                <h3>Pharmacies</h3>
                <div className="hospital-list">
                  {pharmacyResults.map((pharmacy) => (
                    <div key={pharmacy._id}>
                      <Link
                        key={pharmacy._id}
                        to={`/pharmacy/${pharmacy._id}`}
                        className="link"
                      >
                        <PharmacyCard pharmacy={pharmacy} />
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
            {hospitalResults.length === 0 && pharmacyResults.length === 0 && (
              <p>No results found</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Search;
