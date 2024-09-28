import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllQuestions } from "../../service/questions";
import "./home.css";
import logo from "../../assets/logo.svg";
import quizIcon from "../../assets/quiz-icon.svg";
import Button from "../../components/button/Button";
import {
  setAllQuestions,
  setTotalQuestions,
  setCurrentQuestion,
  setAllAnswersEmpty,
} from "../../action";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadQuestions = async () => {
    const allQuestions = await getAllQuestions();
    //load in store
    dispatch(setAllQuestions(allQuestions.questions));
    dispatch(setTotalQuestions(allQuestions.total));
    dispatch(setCurrentQuestion(allQuestions.questions[0]));
    dispatch(setAllAnswersEmpty());
  };

  useEffect(() => {
    loadQuestions();
  }, []);
  const startQuiz = () => {
    navigate("/quiz", { replace: true });
  };
  useEffect(() => {
    // Handle back/forward button
    const handlePopState = () => {
      navigate("/"); // Route to home page
    };

    // Handle reload
    const handleBeforeUnload = (event) => {
      navigate("/"); // Route to home page
    };

    // Listen to popstate (for back/forward buttons)
    window.addEventListener("popstate", handlePopState);

    // Listen to beforeunload (for reload)
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
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
            action={() => {
              startQuiz();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
