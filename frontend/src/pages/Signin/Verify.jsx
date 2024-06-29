import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import axios from "axios";
import logo from "../../../public/assets/logo.png";
import "./signin.css";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { useCookies } from "react-cookie";
function Verify() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const [cookies, setCookie] = useCookies(["token", "name", "email"])
  
  useEffect(() => {
    if (cookies["token"]) {
      navigate("/");
    }
  }, []);
  const verify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/user/verify", {
        otp: Number(otp),
        email: email,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/resend", {
        email: email,
      });
      if (response.data.success) {
        toast.success("OTP has been resent to your email.");
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while resending OTP.");
    }
  };

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="logo">
            <img src={logo} alt="" width={"80px"} /> <p>Verify</p>
          </div>
          <form className="signup-form" onSubmit={verify}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              renderSeparator={<span>&nbsp;&nbsp;&nbsp;</span>}
              renderInput={(props) => <input {...props} />}
            />
            <button type="submit" disabled={loading}>
              {loading ? <>Verifying...</> : <>Verify</>}
            </button>
          </form>
          <p className="resend" onClick={resendOtp}>
            Resend OTP?
          </p>
        </div>
      </div>
    </>
  );
}

export default Verify;
