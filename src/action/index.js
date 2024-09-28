import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_TOTAL_QUESTIONS,
    SET_ALL_QUESTIONS,
   SET_ALL_ANSWERS_NULL,
   SET_RESET_QUIZ
  } from "./actionTypes";
  
  export function setAnswer(payload) {
    return {
      type: SET_ANSWERS,
      payload,
    };
  }

  export function setAllAnswersEmpty(){
    return{
      type:SET_ALL_ANSWERS_NULL,
    }
  }
  export function setResetQuiz(){
    return {
      type: SET_RESET_QUIZ,
    }
  }
  
  export function setTotalQuestions(payload) {
    return {
      type: SET_TOTAL_QUESTIONS,
      payload,
    };
  }
  
  export function setCurrentQuestion(payload) {
    return {
      type: SET_CURRENT_QUESTION,
      payload,
    };
  }
  
  export function setAllQuestions(payload) {
    return {
      type: SET_ALL_QUESTIONS,
      payload,
    };
  }
  