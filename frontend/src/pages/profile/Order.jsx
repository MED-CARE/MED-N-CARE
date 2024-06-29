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
    return <div className="container no-order">No orders available.</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Processing':
        return 'blue';
      case 'Completed':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="logo">
            <img src={logo} alt="" width={"80px"} /> <p>Your Orders</p>
          </div>
          <form className="order-wrapper">
            <div className="items">
              {orderData.map((order) => (
                <div key={order._id} className="order-item">
                  <div className="order-thumbnail">
                    {order.prescription && order.prescription.length > 0 ? (
                      order.prescription.map((prescription, index) => (
                        <a
                          key={index}
                          href={`http://localhost:8080/${prescription}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`http://localhost:8080/${prescription}`}
                            alt={``}
                            width="100px"
                          />
                        </a>
                      ))
                    ) : (
                      <p>No prescription</p>
                    )}
                  </div>
                  <div className="order-details">
                    <p>{order.pharmacy && order.pharmacy.name}</p>
                  </div>
                  <p style={{ color: getStatusColor(order.status) }}>
                    {order.status}
                  </p>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Order;
