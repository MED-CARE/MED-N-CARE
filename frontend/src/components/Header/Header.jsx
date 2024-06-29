import React, { useEffect } from "react";
import "./header.css";
import logo from "../../../public/assets/logo.png";
import user from "../../../public/assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function Header() {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token", "name", "email"]);
  const fullName = cookies["name"] || "";
  const firstName = fullName.split(" ")[0];
  return (
    <>
      <div className="header-wrapper">
        <header className="container">
          <div className="header-left">
            <ul>
              <li onClick={() => navigate("/")}>
                <img src={logo} alt="" />
              </li>
              {cookies["token"] ? (
                <Link className="link" to={"/myorder"}>
                  <li>My orders</li>
                </Link>
              ) : (
                <></>
              )}

              <li>Book Appointment</li>
              <li>Pharmacy</li>
              <Link className="link" to={"/labtests"}>
                <li>Lab Tests</li>
              </Link>
            </ul>
          </div>
          <div className="header-right">
            {cookies["token"] ? (
              <>
                {" "}
                <img
                  src={user}
                  alt=""
                  className="user-icon"
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
                <p>{firstName}</p>{" "}
              </>
            ) : (
              <>
                <button className="signin" onClick={() => navigate("/signup")}>
                  Sign Up
                </button>
                <button className="login" onClick={() => navigate("/login")}>
                  Login
                </button>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
