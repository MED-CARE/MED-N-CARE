import React, { useEffect, useState } from "react";
import "./signin.css";
import logo from "../../../public/assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function OwnerRegistration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: null, long: null });
  const [cookies, setCookie] = useCookies([
    "token",
    "name",
    "email",
    "lat",
    "long",
  ]);
  useEffect(() => {
    if (cookies["token"]) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          console.log(location.lat)
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by the browser.");
    }
  }, [email]);
  const signup = async (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber || !password) {
      toast.error("All fields are required!");
      return;
    }
    if (!terms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          name,
          email,
          phoneNumber,
          password,
          lat: location.lat, // Include latitude
          long: location.long, // Include longitude
        }
      );

      if (response.data.success) {
        toast.success("Signup successful!");

        setName("");
        setEmail("");
        setPhonenumber("");
        setPassword("");
        setTerms(false);
        navigate(`/verify/${email}`);
        setLoading(false);
      } else {
        toast.error(response.data.message || "Signup failed");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred during signup");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="logo">
            <img src={logo} alt="" width={"80px"} /> <p>Register as Pharmacist</p>
          </div>
          {/* <p>Create accout with your email today for free!</p> */}
          <form className="signup-form" onSubmit={signup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              {loading ? <>Signing in...</> : <>Register</>}
            </button>
          </form>{" "}
          <div className="terms">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label>Agree to Terms & Conditions</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default OwnerRegistration;
