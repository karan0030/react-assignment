import React from "react";
import ResultOutput from "../../components/ResultOutput/ResultOutput";
import GaugeChart from "react-gauge-chart";
import banner from "../../assets/banner.svg";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
const Result = () => {
    const navigate = useNavigate();
  const startQuiz=()=>{
    navigate("/home", { replace: true });
  }
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
                percent={1 / 3}
                textColor={"black"}
              />
            </div>
          </div>
        </div>
        <ResultOutput count={1} isCorrect={true} />
        <ResultOutput count={2} isCorrect={false} />

        <div className="result_button_wrap text-center mt-5">
          <Button
            className="next_button"
            text={"Start Again"}
            action={() => {startQuiz()}}
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
