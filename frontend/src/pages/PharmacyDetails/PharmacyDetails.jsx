import React, { useEffect, useState } from "react";
import "./pharmacyDetails.css";
import location from "../../../public/assets/location.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

function PharmacyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pharmacyDetails, setPharmacyDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [cookies] = useCookies([
    "token",
    "userid",
    "name",
    "phoneNumber",
    "email",
    "address",
  ]);
  const [bookingPortal, setBookingPortal] = useState(false);
  const [prescription, setPrescription] = useState([]);
  const [instruction, setInstructions] = useState("");
  const [adr, setAdr] = useState(cookies["address"]);
  const [phno, setphno] = useState(cookies["phoneNumber"]);
  const [isSubscription, setIsSubscription] = useState(false);
  const [subscriptionFrequency, setSubscriptionFrequency] = useState("");

  useEffect(() => {
    fetchPharmacyDetails();
  }, []);

  const fetchPharmacyDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/pharmacy/getById/${id}`
      );

      if (response.data.success) {
        setLoading(false);
        setPharmacyDetails(response.data.pharmacy);
      } else {
        setLoading(false);
        toast.error("Error fetching pharmacy details.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error fetching pharmacy details.");
    }
  };

  const bookAppointment = async () => {
    setBookingPortal(true);
  };

  const handlePrescriptionChange = (e) => {
    setPrescription([...e.target.files]);
  };

  const submitBookAppointment = async (e) => {
    e.preventDefault();
    try {
      setBookLoading(true);
      const formData = new FormData();

      const userId = cookies.userid;
      const userName = cookies.name;
      const userEmail = cookies.email;
      const userPhoneNumber = phno;
      const userAddress = adr;

      if (
        !userId ||
        !userName ||
        !userEmail ||
        !userPhoneNumber ||
        !userAddress
      ) {
        toast.error("User information is incomplete.");
        setBookLoading(false);
        return;
      }

      formData.append("userId", userId);
      formData.append("pharmacyId", id);
      formData.append("instruction", instruction);
      formData.append("name", userName);
      formData.append("email", userEmail);
      formData.append("phoneNumber", userPhoneNumber);
      formData.append("address", userAddress);
      formData.append("isSubscription", isSubscription);
      if (isSubscription) {
        formData.append("subscriptionFrequency", subscriptionFrequency);
      }

      // Append prescription files
      for (let i = 0; i < prescription.length; i++) {
        formData.append("prescription", prescription[i]);
      }

      const response = await axios.post(
        "http://localhost:8080/api/order/place",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setBookLoading(false);
        navigate("/myorder")
      } else {
        toast.error("Failed to place order. Please try again.");
        setBookLoading(false);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
      setBookLoading(false);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!pharmacyDetails) {
    return <div className="container">No details available.</div>;
  }

  const {
    name,
    email,
    phoneNumber,
    storePic,
    type,
    desc,
    specialized,
    address,
    city,
    state,
    pincode,
    website,
    rating,
  } = pharmacyDetails;

  return (
    <>
      <div className="container">
        <section>
          <strong className="title">{name}</strong>
          <div className="flex">
            <div className="rating">
              <p>{rating}</p>
              <p>⭐⭐⭐⭐</p>
              <p>160 Ratings</p>
              <p>☑️ Verified</p>
            </div>
            <div className="type">
              {type &&
                type.length > 0 &&
                type.map((t, index) => (
                  <span key={index} className="type-item">
                    {t}
                  </span>
                ))}
            </div>{" "}
          </div>
          <div className="location">
            <img src={location} alt="" width={"18px"} />
            <p>{city}, </p>
            <p>{state},</p>
            <p>{pincode}</p>
          </div>
          <div className="flex">
            <div className="phone">
              <div className="call">
                📞
                {phoneNumber}
              </div>

              <div className="whatsapp">💬 Chat</div>
              <div className="top-rated">🌠 Top rated</div>
              <div className="share">🔗 Share</div>
              <div className="heart">💓</div>
            </div>
            {cookies.token ? (
              <div className="booknow">
                <button>Enquire Now</button>
                <p>Get free details instantly via email</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </section>
        <section className="page-main">
          <div className="photo">
            <p className="sub-title">Photos</p>
            <div className="gallery">
              {storePic &&
                storePic.length > 0 &&
                storePic.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8080/${img}`}
                    alt={`${name} image ${index + 1}`}
                    className=""
                  />
                ))}
            </div>
          </div>
          <div className="details">
            <p className="sub-title">Address</p>
            <p>{address}</p>
            <div className="address-flex">
              {" "}
              <img src={location} alt="" width={"18px"} />
              <p>
                {city}, {state}, {pincode}
              </p>
            </div>
            {email ? <p> 📧 Email: {email}</p> : <></>}
            <p> 📞 Phone number: {phoneNumber}</p>
            <p>
              {" "}
              ↗️{" "}
              <a href="https://googlemaps.com" target="_blank">
                Get Direction
              </a>
            </p>
            <p>
              {" "}
              {website && (
                <a href={website} target="_blank">
                  🌐 Visit Website
                </a>
              )}
            </p>
          </div>
        </section>

        <section className="page-main">
          <div className="specialization">
            <p className="sub-title">💬 Specialization</p>
            <div className="type">
              {specialized &&
                specialized.length > 0 &&
                specialized.map((s, index) => (
                  <span key={index} className="type-item">
                    {s}
                  </span>
                ))}
            </div>
          </div>
        </section>

        <section className="page-main">
          <div className="desc">
            <p className="sub-title">Description</p>
            <p>{desc}</p>
          </div>
        </section>
        <section className="call-banner">
          <div className="banner-left">
            <strong className="title">{name}</strong>
            <p>
              {city}, {state}, {pincode}
            </p>
          </div>
          <div className="banner-right">
            <div className="booknow">
              <button onClick={bookAppointment}>Order now</button>
            </div>
          </div>
        </section>
        <section className="">
          {bookingPortal &&
            (!cookies.token ? (
              <p className="alert">Please login to book an appointment.</p>
            ) : cookies.address === "undefined" || cookies.address === "" || cookies.address === null ? (
              <p className="alert">Please update your profile to book an appointment.</p>
            ) : (
              <form
                onSubmit={submitBookAppointment}
                className="appointment-form"
              >
                <div className="appointment-inputs">
                  <div className="appointment-input">
                    <label htmlFor="prescription">Add Prescription</label>
                    <input
                      type="file"
                      multiple
                      onChange={handlePrescriptionChange}
                      required
                    />
                  </div>
                  <div className="appointment-input">
                    <label htmlFor="instruction">Add Instructions</label>
                    <textarea
                      id="instruction"
                      name="instruction"
                      value={instruction}
                      onChange={(e) => setInstructions(e.target.value)}
                      required
                    />
                  </div>
                  <div className="appointment-input">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      rows={6}
                      name="address"
                      value={adr}
                      onChange={(e) => setAdr(e.target.value)}
                      required
                    />
                  </div>
                  <div className="appointment-input">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phno}
                      onChange={(e) => setphno(e.target.value)}
                      required
                    />
                  </div>
                  <div className="appointment-input">
                    <label htmlFor="subscription">
                      Make it a subscription
                    </label>
                      <input
                        type="checkbox"
                        id="subscription"
                        name="subscription"
                        checked={isSubscription}
                        onChange={(e) => setIsSubscription(e.target.checked)}
                      />
                  </div>
                  {isSubscription && (
                    <div className="appointment-input">
                      <label htmlFor="frequency">Subscription Frequency</label>
                      <select
                        id="frequency"
                        name="frequency"
                        value={subscriptionFrequency}
                        onChange={(e) => setSubscriptionFrequency(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select frequency</option>
                        <option value="1">Every month</option>
                        <option value="2">Every 2 months</option>
                        <option value="3">Every 3 months</option>
                        <option value="6">Every 6 months</option>
                      </select>
                    </div>
                  )}
                  <button type="submit">
                    {bookLoading ? "Placing Order..." : "Place Order"}
                  </button>
                  <p className="confirm">(By placing order, our executive will call you to confirm your order).</p>
                </div>
              </form>
            ))}
        </section>
      </div>
    </>
  );
}

export default PharmacyDetails;
