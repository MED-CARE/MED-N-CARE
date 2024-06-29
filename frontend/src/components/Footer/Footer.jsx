import React from 'react'
import './footer.css'
import logo from "../../../public/assets/logo.png";

import googleplay from "../../../public/assets/googleplay.png";
import ios from "../../../public/assets/ios.png";
function Footer() {
  return (
    <>
        <div className="download-app">
            <div className="container">
                <div className="download-app-container">
                    <p>For better experience, download the Med&Care app now</p>
                    <div className="playstore">
                        <img src={googleplay} alt="" />
                        <img src={ios} alt="" />
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className='logo'>
                        <img src={logo} alt="" />
                        <p className='style'>MED & CARE</p>
                        <p className='copyright'>&#169; 2024 Aoife13, copyrights reserved</p>
                    </div>
                    <div className="feature">
                        <p>Quick Links</p>
                        <ul>
                            <li>About Us</li>
                            <li>Features</li>
                            <li>Pharmacy</li>
                            <li>Nearby Hospitals</li>
                            <li>Book Appointment</li>
                        </ul>
                    </div>
                    <div className="locations">
                        <p>Locations</p>
                        <ul>
                            <li>Siliguri</li>
                            <li>Kolkata</li>
                            <li>Pune</li>
                            <li>Bangalore</li>
                            <li>Chennai</li>
                        </ul>
                    </div>
                    <div className="contactus">
                        <p>Contact Us</p>
                        <ul>
                            <li>Help & Support</li>
                            <li>Partner with us</li>
                            <li>Terms and Conditions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer