import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const generateCaptcha = () => {
  const characters =
    "@!#$%&*2B3C4D5F6G7H8J9KaLcMeNrPtQyRhSnbTxUaVdWvXbYdZaaAbScDdDeVfFgGhEiGjEkGlBmEnGoYpHqHr12s2t3u4v5w7x1y08z4";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userCaptcha !== captcha) {
      alert("CAPTCHA does not match, please try again.");
      setCaptcha(generateCaptcha());
      setUserCaptcha("");
      return;
    }

    try {
      let response;
      if (role === "admin") {
        // Assuming admin credentials are predefined
        if (userId === "admin@gmail.com" && password === "admin@123") {
          navigate("/admin");
          return;
        } else {
          throw new Error("Invalid admin credentials.");
        }
      } else {
        // For student and teacher roles, login via API
        response = await axios.post("http://localhost:3001/login", {
          userId,
          password,
        });
      }

      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token); // Assuming the server sends back a token on successful authentication

      switch (role) {
        case "student":
          navigate("/sidebar");
          break;
        case "teacher":
          navigate("/dashboard");
          break;
        default:
          console.error("Invalid role specified");
          alert("An error occurred: Invalid role specified.");
      }
    } catch (error) {
      // More nuanced error handling based on the server response
      if (error.response) {
        switch (error.response.status) {
          case 401: // Unauthorized
            alert("Your user ID or password is incorrect. Please try again.");
            break;
          case 404: // Not Found
            alert("User not found. Please register if you haven't.");
            break;
          default:
            alert(`Login error: ${error.response.statusText}`);
        }
      } else {
        console.error("Login failed:", error);
        alert("Login error: An unexpected error occurred.");
      }
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserCaptcha("");
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-image"></div>
        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            <h1 style={{ color: "black", fontSize: "40px" }}>
              <b>Online Examination System</b>
            </h1>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Email Id"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="captcha-container">
              <div className="captcha">{captcha}</div>
              <button
                type="button"
                className="refresh"
                onClick={handleRefreshCaptcha}
              >
                <FontAwesomeIcon icon={faSync} />
              </button>
              <input
                style={{ marginTop: "15px", marginLeft: "10px", height: "40px" }}
                type="text"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                placeholder="Enter CAPTCHA"
              />
            </div>
            <div className="button-group">
              <button type="submit">Login</button>
              {role !== "admin" && (
                <button type="button" onClick={handleRegisterClick} style={{ marginTop: "30px" }}>
                  Register
                </button>
              )}
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                style={{ width: "100%", marginTop: "30px" }}
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
