import React, { useEffect, useState } from "react";
import ResultOutput from "../../components/ResultOutput/ResultOutput";
import GaugeChart from "react-gauge-chart";
import banner from "../../assets/banner.svg";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../service/questions";
import { setResetQuiz } from "../../action";
const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { answerResponses, totalQuestions } = useSelector((state) => state);

  const [correctanswer, setCorrectAnswer] = useState(0);
  const [correctResponses, setCorrectResponses] = useState();

  const computeResult = () => {
    if (!correctResponses || !answerResponses) {
      return;
    }
    let count = 0;
    for (let key in answerResponses) {
      const answer = correctResponses[key]?.sort();
      const userAnswer = answerResponses[key]?.option?.sort();
      const check = answer.every((value, index) => value === userAnswer[index]);
      if (check) {
        count++;
      }
    }
    setCorrectAnswer(count);
  };

  useEffect(() => {
    const allAnswers = getAnswers();
    setCorrectResponses(allAnswers);
    console.log("service", allAnswers);
    console.log("store", answerResponses);
    computeResult(allAnswers);
  }, [answerResponses]);

  useEffect(() => {
    computeResult();
  }, [correctResponses]);
  
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

  const startQuiz = () => {
    dispatch(setResetQuiz());
    navigate("/home", { replace: true });
  };
  return (
    <div className="question_screen_wrap">
      <div className="d-flex align-items-center">
        <div className="banner">
          <img src={banner} alt="banner" />
        </div>
      </div>

      <div className="question_screen_body">
        <h3 className="mt-4 text-bold text-center">Your Result</h3>

        <div className="d-flex justify-content-center align-items-center">
          <div className="col-5">
            <div
              className="text-center mt-4"
              style={{ width: 300, height: 250 }}
            >
              <GaugeChart
                id="gauge-chart3"
                nrOfLevels={5}
                percent={correctanswer / totalQuestions}
                textColor={"black"}
              />
            </div>
          </div>
        </div>
        <ResultOutput count={correctanswer} isCorrect={true} />
        <ResultOutput
          count={totalQuestions - correctanswer}
          isCorrect={false}
        />

        <div className="result_button_wrap text-center mt-5">
          <Button
            className="next_button"
            text={"Start Again"}
            action={() => {
              startQuiz();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
