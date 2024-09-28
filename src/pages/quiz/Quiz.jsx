import React, { useEffect, useState } from "react";
import ProgressCircle from "../../components/progressCircle/ProgressCircle";
import "./quiz.css";
import banner from "../../assets/banner.svg";
import { getAllQuestions } from "../../service/questions";
import { useNavigate } from "react-router-dom";
import Option from "../../components/option/Option";
import Button from "../../components/button/Button";

const Quiz = () => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState();
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [selectOptions, setSelectedOption] = useState([]);
  const [reload, setReload] = useState(true);
  const loadQuestions = async () => {
    const allQuestions = await getAllQuestions();
    console.log("all", allQuestions);
    setQuestions(allQuestions.questions);
    setTotalQuestions(allQuestions.total);
    setCurrentQuestion(allQuestions.questions[currentQuestionNumber]);
  };
  useEffect(() => {
    loadQuestions();
  }, []);
  const handleNext = () => {
    console.log('quest count', currentQuestionNumber, totalQuestions)
    if (currentQuestionNumber < totalQuestions -1 ) {
      setCurrentQuestion(questions[currentQuestionNumber + 1]);
      setCurrentQuestionNumber(currentQuestionNumber => currentQuestionNumber + 1);
     
    }else{
      navigate("/result", { replace: true });
    }
 
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
    console.log("click", id, selectOptions);
  };

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
        {(!questions || questions?.legth === 0) && <h3>Loading !!!!</h3>}
        {currentQuestion && (
          <>
            <div className="mt-4 question-head p-4">
              <h4 className="text-bold">{currentQuestion?.question} </h4>
            </div>
            {currentQuestion?.questionImage && <img src={currentQuestion.questionImage} alt="ques-img"  className=" p-2 mx-auto" width={150} />}
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
                  text={currentQuestionNumber === totalQuestions ? 'submit' : 'next' }
                  action={() => {handleNext()}}
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
