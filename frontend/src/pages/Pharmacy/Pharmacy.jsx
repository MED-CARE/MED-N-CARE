import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import PharmacyCard from '../../components/Card/PharmacyCard';

function Pharmacy() {
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
    <div className="container">
        <p className="sub-title-middle">Book Medicines from your nearby Pharmacies</p>
        <ul className="flex lab-test">
          <li>
            <img
              src="https://onemg.gumlet.io/Safe_38x38_labs_oe5ieq.png?format=auto"
              alt=""
            />
            <p>100% safe & Trusted</p>
          </li>
          <li>
            <img
              src="https://onemg.gumlet.io/new_color_images/Lab_delivery_2x.png?format=auto"
              alt=""
            />
            <p>Delivery within a single day</p>
          </li>
          <li>
            <img
              src="https://onemg.gumlet.io/new_color_images/Lab_online_report_2x.png?format=auto"
              alt=""
            />
            <p>2 time Confirmation</p>
          </li>
          <li>
            <img
              src="https://onemg.gumlet.io/new_color_images/Lab_offer_2x.png?format=auto"
              alt=""
            />
            <p>Best Prices Guaranteed</p>
          </li>
        </ul>
        <p className="sub-title-middle">Pharmacies near you</p>

        <div className="container">
          <div className="hospital-list">
            {loading ? (
              <p>Loading...</p>
            ) : pharmacies && pharmacies.length > 0 ? (
              pharmacies.map((pharmacy) => (
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
      </div>
    </>
  )
}

export default Pharmacy