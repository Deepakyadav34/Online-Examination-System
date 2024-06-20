import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminHome.css";

import {
  FaUser,
  FaGraduationCap,
  FaClipboardList,
  FaChartBar,
  FaHome,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa"; // Import necessary icons
import "./Admin.css";

import styles from "../Teacher/Dashboard.module.css";

import teacherPhoto from "./Rahul sir image.jpeg.jpg"; // Import the image

const teacher = {
  name: "Admin",
  UserId: "admin2101",
  email: "admin@gmail.com",
  photoUrl: teacherPhoto, // Use the imported image
};

function AdminDashboard() {
  const [selectedYear, setSelectedYear] = useState("");
  const [results, setResults] = useState([]);
  const [profileImage, setProfileImage] = useState(teacher.photoUrl);

  useEffect(() => {
    const fetchResults = async () => {
      if (selectedYear) {
        const response = await fetch(
          `/api/results?year=${encodeURIComponent(selectedYear)}`
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Failed to fetch results");
        }
      }
    };

    fetchResults();
  }, [selectedYear]); // Trigger fetch on year change

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
      // Store the image URL in local storage
      localStorage.setItem("teacherPhoto", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Check if the teacher profile image is available in local storage and update it
  useEffect(() => {
    const storedImage = localStorage.getItem("teacherPhoto");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  return (
    <div className="dashboard">
      <aside className={styles.sidebar}>
        <nav className="Navbar">
          <div className="teacher-info">
            <label htmlFor="profileImage">
              <img
                src={profileImage}
                alt="Teacher"
                className="teacher-photo"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }} // Set width and height
              />
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </label>
            <div className="teacher-details">
              <span>{teacher.name}</span>
              <br />
              <span>UseId: {teacher.UserId}</span>
              <br />
              <span>Email: {teacher.email}</span> {/* Add the email */}
            </div>
          </div>
        </nav>

        <ul style={{ marginTop: "30px" }}>
          <li>
            <Link
              to="/adminHome"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaHome style={{ color: "white" }} /> Home
            </Link>
          </li>
          <li style={{ marginTop: "30px" }}>
            <Link
              to="/admins"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaCheckCircle style={{ color: "purple" }} /> Approvals
            </Link>
          </li>
          <li style={{ marginTop: "30px" }}>
            <Link
              to="/teacher-details"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaUser style={{ color: "orange" }} /> Teacher Details
            </Link>
          </li>
          <li style={{ marginTop: "30px" }}>
            <Link
              to="/studentDetails"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              <FaGraduationCap style={{ color: "#9370db" }} /> Student Details
            </Link>
          </li>
          <li style={{ marginTop: "30px" }}>
            <Link
              to="/examDetails"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              <FaClipboardList style={{ color: "green" }} /> Exam Details
            </Link>
          </li>
          <li style={{ marginTop: "30px" }}>
            <Link
              to="/resultAnalysis"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              <FaChartBar style={{ color: "red" }} /> Result Analysis
            </Link>
          </li>
          <li style={{ marginTop: "30px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <FaSignOutAlt
                style={{ color: "red" }}
                className={styles.logoutIcon}
              />{" "}
              Logout
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default AdminDashboard;
