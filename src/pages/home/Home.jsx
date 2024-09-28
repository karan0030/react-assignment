import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import logo from "../../assets/logo.svg";
import quizIcon from "../../assets/quiz-icon.svg";
import Button from "../../components/button/Button";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackNavigation = (event) => {
      event.preventDefault();
      // Prevent the user from navigating back
      navigate("/home", { replace: true });
    };

    window.history.pushState(null, "", window.location.href); // Push state to prevent back navigation
    window.addEventListener("popstate", handleBackNavigation); // Catch back/forward button press

    return () => {
      window.removeEventListener("popstate", handleBackNavigation); // Cleanup event listener
    };
  }, [navigate]);

  return (
    <div className="home-container  container-fluid">
      <div className="row p-0 m-0">
        <div className="col-12 my-4 text-center">
          <img src={logo} className="logo" alt="logo" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="quiz-container mt-5 col-12 text-center">
          <img className="p-2 mt-5 quiz-logo" src={quizIcon} alt="quizlogo" />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="col-5 btn-start m3-5">
          <Button
            className="home_screen_start w-100 px-2"
            text={"Start"}
            action={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
