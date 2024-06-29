import React, { useEffect, useState } from "react";
import "./profile.css";
import logo from "../../../public/assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Order() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "name",
    "userid",
    "email",
    "phoneNumber",
  ]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cookies["token"]) {
      navigate("/");
    } else {
      fetchOrder();
    }
  }, []);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/order/getorders",
        {
          email: cookies["email"],
        }
      );
      setLoading(false);
      if (response.data.success) {
        console.log(response.data.orders);
        setOrderData(response.data.orders);
      } else {
        toast.error("Error fetching orders.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching orders.");
      console.error("Error fetching orders:", error);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!orderData || orderData.length === 0) {
    return <div className="container">No orders available.</div>;
  }

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="logo">
            <img src={logo} alt="" width={"80px"} /> <p>Your Orders</p>
          </div>
          {/* <p>Edit your details here.</p> */}
          <form className="signup-form profile-form">
            <div className="items">
              {orderData.map((order) => (
                <div key={order._id} className="order-item">
                  <p>{order.pharmacy && order.pharmacy.name}</p>

                  <p>{order.instruction}</p>
                  <p>{order.status}</p>
                </div>
              ))}
            </div>
          </form>{" "}
        </div>
      </div>
    </>
  );
}

export default Order;
