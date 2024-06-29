import React from "react";
import "./labtest.css";
function Labtest() {
  return (
    <>
      <div className="container">
        <p className="sub-title-middle">Lab Tests at your home</p>
        <ul className="flex lab-test">
          <li>
            <img
              src="https://onemg.gumlet.io/Safe_38x38_labs_oe5ieq.png?format=auto"
              alt=""
            />
            <p>100% safe & Hygenic</p>
          </li>
          <li>
            <img
              src="https://onemg.gumlet.io/new_color_images/Lab_delivery_2x.png?format=auto"
              alt=""
            />
            <p>Home Sample Pick Up</p>
          </li>
          <li>
            <img
              src="https://onemg.gumlet.io/new_color_images/Lab_online_report_2x.png?format=auto"
              alt=""
            />
            <p>View Online Reports</p>
          </li>
          <li>
            <img
              src="https://onemg.gumlet.io/new_color_images/Lab_offer_2x.png?format=auto"
              alt=""
            />
            <p>Best Prices Guaranteed</p>
          </li>
        </ul>
        <p className="sub-title-middle">Choose your nearest lab</p>

      </div>
    </>
  );
}

export default Labtest;
