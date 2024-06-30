import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Signin from "./pages/Signin/Signin";
import Login from "./pages/Login/Login";
import Verify from "./pages/Signin/Verify";
import Profile from "./pages/profile/Profile";
import Footer from "./components/Footer/Footer";
import HospitalDetails from "./pages/HospitalDetails/HospitalDetails";
import PharmacyDetails from "./pages/PharmacyDetails/PharmacyDetails";
import useScrollToTop from "./hooks/useScrollToTop";
import PharmacyList from "./pages/List/PharmacyList";
import ClinicList from "./pages/List/ClinicList";
import NursinghomeList from "./pages/List/NursinghomeList";
import HospitalList from "./pages/List/HospitalList";
import Search from "./pages/SearchPage/Search";
import Order from "./pages/profile/Order";
import Labtest from "./pages/Labtest/Labtest";
import Pharmacy from "./pages/Pharmacy/Pharmacy";
import OwnerRegistration from "./pages/Signin/OwnerRegistration";
function App() {
  useScrollToTop();

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/verify/:email" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myorder" element={<Order />} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />
        <Route path="/pharmacy/:id" element={<PharmacyDetails />} />
        <Route path="/hospital" element={<HospitalList />} />
        <Route path="/nursinghome" element={<NursinghomeList />} />
        <Route path="/clinic" element={<ClinicList />} />
        <Route path="/pharmacy" element={<PharmacyList />} />
        <Route path="/pharmacy-page" element={<Pharmacy />} />
        <Route path="/search" element={<Search />} />
        <Route path="/labtests" element={<Labtest />} />
        <Route path="/owner" element={<OwnerRegistration />} />
        
      </Routes>
      <Footer />

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
