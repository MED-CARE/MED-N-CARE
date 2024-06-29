import React, { useEffect, useState } from "react";
// import "./login.css";
import logo from "../../../public/assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCookies } from "react-cookie";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [cookies, setCookie] = useCookies(["token", "userid", "name", "email", "lat", "long", "phoneNumber", "address"])
  
  useEffect(() => {
    if (cookies["token"]) {
      navigate("/");
    }
  }, []);

  const requestLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
  const signup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        console.log(response.data)
        setCookie("token", response.data.token);
        setCookie("name", response.data.name);
        setCookie("userid", response.data.userid);
        setCookie("email", response.data.email);
        setCookie("phoneNumber", response.data.phoneNumber);
        setCookie("lat", response.data.location.lat);
        setCookie("long", response.data.location.long);
        setCookie("address", response.data.address);
        setEmail("");
        setPassword("");
        navigate(`/`);
        setLoading(false);
      } else {
        toast.error(response.data.message || "Login failed");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred during Login");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="logo">
            <img src={logo} alt="" width={"80px"} /> <p>Login</p>
          </div>
          <form className="signup-form" onSubmit={signup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              {loading ? <>Logging in...</> : <>Login</>}
            </button>
          </form>{" "}
          <div className="terms">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
