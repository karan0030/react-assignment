import React, { useEffect, useState } from 'react';
import ProgressCircle from '../../components/progressCircle/ProgressCircle';
import './quiz.css';
import banner from '../../assets/banner.svg'
import {getAllQuestions} from '../../service/questions'
import { useNavigate } from "react-router-dom"

const Quiz = () => {
  const navigate = useNavigate();
 
  const [currentQuestion,setCurrentQuestion] = useState(1);
  const [questions,setQuestions] = useState();
  const [totalQuestions , setTotalQuestions] = useState(0);

  const loadQuestions = async()=>{
    const allQuestion = await getAllQuestions();
    setQuestions(allQuestion.questions);
    setTotalQuestions(allQuestion.total);
  }
  useEffect(()=>{
    loadQuestions();
  },[])

  const handleNext=()=>{
    if(currentQuestion === totalQuestions ){
      navigate("/result", { replace: true });
    }
    setCurrentQuestion(currentQuestion + 1);

  }


  return (
    <div className='quiz-background'>
      <div className='d-flex align-items-center'>
        <div className='banner'>
          <img src={banner} alt="banner" />
        </div>      
      </div>
      <div className='question-body'>
        <div className="question_progress_circle_wrap ">
          <div className="question_progress_circle">
            <ProgressCircle current={currentQuestion} total={totalQuestions} />
          </div>
        </div>
      </div>

     
       
      
    </div>
  )
}

export default Quiz
