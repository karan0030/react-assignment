import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProgressCircle from "../../components/progressCircle/ProgressCircle";
import "./quiz.css";
import banner from "../../assets/banner.svg";
import { useNavigate } from "react-router-dom";
import Option from "../../components/option/Option";
import Button from "../../components/button/Button";
import { setCurrentQuestion, setAnswer } from "../../action";

const Quiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentQuestion, totalQuestions, allQuestions } = useSelector(
    (state) => state
  );

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [selectOptions, setSelectedOption] = useState([]);
  const [reload, setReload] = useState(true);

  const startTime = new Date();

  function timeDifference(startDate, endDate) {
    // Ensure the input is of Date type
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Get the difference in milliseconds
    const diffInMs = Math.abs(end - start);

    // Convert to different units
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  }

  const markResponse = () => {
    const endTime = new Date();
    const timeTaken = timeDifference(startTime, endTime);
    const id = currentQuestion.id;
    const data = {
      key: id,
      value: { option: selectOptions, time: timeTaken },
    };
    dispatch(setAnswer(data));
  };

  const handleNext = () => {
    markResponse();
    if (currentQuestionNumber < totalQuestions - 1) {
      dispatch(setCurrentQuestion(allQuestions[currentQuestionNumber + 1]));
      setCurrentQuestionNumber(
        (currentQuestionNumber) => currentQuestionNumber + 1
      );
    } else {
      navigate("/result", { replace: true });
    }
    setSelectedOption([]);
  };
  const isSelected = (id) => {
    return selectOptions.includes(id);
  };

  const onSelectOption = (id, multipleAllowed) => {
    if (selectOptions.includes(id)) {
      if (multipleAllowed) {
        const filterefOptions = selectOptions.filter((option) => option !== id);
        console.log("here multi filter", filterefOptions);
        setSelectedOption(filterefOptions);
      }
    } else {
      if (multipleAllowed) {
        console.log("here else not include", selectOptions);
        const options = selectOptions;
        options.push(id);
        setSelectedOption(options);
      } else {
        setSelectedOption([id]);
      }
    }
    setReload(!reload);
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
    <div className="quiz-background">
      <div className="d-flex align-items-center">
        <div className="banner">
          <img src={banner} alt="banner" />
        </div>
      </div>
      <div className="question-body">
        <div className="question_progress_circle_wrap ">
          <div className="question_progress_circle">
            <ProgressCircle
              current={currentQuestionNumber + 1}
              total={totalQuestions}
            />
          </div>
        </div>
        {!currentQuestion && (
          <div>
            <h3 className="mt-5 text-center">Loading !!!!</h3>
          </div>
        )}
        {currentQuestion && (
          <>
            <div className="mt-4 question-head p-4">
              <h4 className="text-bold">{currentQuestion?.question} </h4>
            </div>
            {currentQuestion?.questionImage && (
              <img
                src={currentQuestion.questionImage}
                alt="ques-img"
                className=" p-2 mx-auto"
                width={150}
              />
            )}
            <div className="px-3">
              {currentQuestion?.options?.map((data, id) => (
                <Option
                  key={id}
                  id={id}
                  text={data}
                  selected={isSelected(id)}
                  onSelectAction={() => {
                    onSelectOption(id, currentQuestion?.isMulti);
                  }}
                />
              ))}
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-5 btn-start">
                <Button
                  className="home_screen_start w-100 px-2"
                  text={
                    currentQuestionNumber === totalQuestions ? "submit" : "next"
                  }
                  action={() => {
                    handleNext();
                  }}
                  disabled={selectOptions?.length === 0}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
