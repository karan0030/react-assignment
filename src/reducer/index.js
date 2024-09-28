const initialState = {
    answerResponses: {}, // question as key, answer as value
    currentQuestion: null,
    totalQuestions: 0,
    allQuestions: [],
  };
  
  function addReducer(state = initialState, action) {
    console.log('reducer, ', action, action.payload)
    switch (action.type) {
      case "SET_ANSWERS":
        return {
          ...state,
          answerResponses: {
            ...state.answerResponses,
            [action.payload.key]: action.payload.value,
          },
        };
        case "SET_ALL_ANSWERS_NULL":
          return {
            ...state,
            answerResponses: {},
          };  
      case "SET_TOTAL_QUESTIONS":
        return { ...state, totalQuestions: action.payload };
      case "SET_CURRENT_QUESTION":
        if(!action.payload ){
          return { ...state, currentQuestion: '' };
        }
        return { ...state, currentQuestion: action.payload };
      case "SET_ALL_QUESTIONS":
        return { ...state, allQuestions: action.payload };
      case "SET_RESET_QUIZ":
        return {...state , currentQuestion: null, answerResponses: {}}  
      default:
        return state;
    }
  }
  
  export default addReducer;
  