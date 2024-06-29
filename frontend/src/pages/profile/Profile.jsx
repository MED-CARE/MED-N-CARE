import React, { useEffect, useState } from "react";
// import "./signin.css";
import "./profile.css";
import logo from "../../../public/assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function Profile() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "name",
    "email",
    "phoneNumber",
    "lat",
    "long",
    "address"
  ]);
  const [name, setName] = useState(cookies["name"]);
  const [email, setEmail] = useState(cookies["email"]);
  const [phoneNumber, setPhonenumber] = useState(cookies["phoneNumber"]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, long: null });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!cookies["token"]) {
      navigate("/");
    }
    fetchUserDetails();
  }, []);
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${cookies["email"]}`
      );
      setName(response.data.user.name);
      setPhonenumber(response.data.user.phoneNumber);
      setAge(response.data.user.age);
      setGender(response.data.user.gender);
      setHeight(response.data.user.biodata.height);
      setWeight(response.data.user.biodata.weight);
      setBloodGroup(response.data.user.biodata.bloodGroup || "");
      setAddress(response.data.user.address);
      if (response.data.success) {
        setCookie("name", response.data.user.name);
        setCookie("phoneNumber", response.data.user.phoneNumber);
        setLoading(false);
      } else {
        toast.error(response.data.message || "Fetching failed");
        setLoading(false);
      }
    } catch (error) {
      // toast.error("An error occurred while fetching user details");
      console.log(error);
      setLoading(false);
    }
  };

  const updateLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation({ lat, long });
          setCookie("lat", lat);
          setCookie("long", long);
        },
        (error) => {
          console.error("Error getting location", error);
          toast.error("Error getting location.");
        }
      );
    } else {
      console.error("Geolocation is not supported by the browser.");
      toast.error("Geolocation is not supported by the browser.");
    }
  };
  const update = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/user/update",
        {
          name,
          email,
          phoneNumber,
          age,
          gender,
          height,
          weight,
          bloodGroup,
          address,
        }
      );

      if (response.data.success) {
        toast.success("Profile Updated!");
        setCookie("address", address)
        await fetchUserDetails();
        setLoading(false);
      } else {
        toast.error(response.data.message || "Update failed");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred during update");
      console.log(error);
      setLoading(false);
    }
  };
  const logout = async () => {
    //clear cookies
    removeCookie("name");
    removeCookie("userid");
    removeCookie("phoneNumber");
    removeCookie("email");
    removeCookie("lat");
    removeCookie("long");
    removeCookie("token");
    removeCookie("address")
    navigate("/");
  };
  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="logo">
            <img src={logo} alt="" width={"80px"} /> <p>Your Profile</p>
          </div>
          {/* <p>Edit your details here.</p> */}
          <form className="signup-form profile-form" onSubmit={update}>
            <div className="name">
              <lable>Name</lable>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="name">
              <label>Email</label>{" "}
              <input
                disabled
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="name">
              <label>Phone number</label>
              <input
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>
            <div className="name">
              <label>Address:</label>
              <textarea
                rows={"5"}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>{" "}
            <div className="name">
              <label>Blood Group</label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                placeholder="Blood Group"
              />
            </div>
            <div className="small-label">
              <div className="name">
                <label>Age:</label>
                <input
                  style={{ marginLeft: "14px", paddingRight: "25px" }}
                  className="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                />
              </div>
              <div className="name">
                <label>Gender</label>
                <input
                  className="age"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Gender"
                />
              </div>
            </div>
            <div className="small-label">
              <div className="name">
                <label>Height:</label>
                <input
                  className="age"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Height"
                />
              </div>
              <div className="name">
                <label>Weight</label>
                <input
                  className="age"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Weight"
                />
              </div>
            </div>
            <div className="profile-button">
              <button onClick={updateLocation} className="update-location">
                {loading ? <>Changing...</> : <>Change Location</>}
              </button>
              <button type="submit" className="update">
                {loading ? <>Updating...</> : <>Update</>}
              </button>
              <button className="logout" onClick={logout}>
                Logout
              </button>
            </div>
          </form>{" "}
        </div>
      </div>
    </>
  );
}

export default Profile;
