import ballIcon from '../assets/ball.svg';
const quizData = [
    {
      id: 1,
      question: "Select number less than 5.",
      questionImage:'',
      isMulti:false,
      options: [
        "6",
        "8",
        "3",
        "None of the above"
      ],
      answer: [2]
    },
    {
        id: 2,
        question: "Select number less than 5.",
        questionImage:'',
        isMulti:true,
        options: [
            "6",
            "1",
            "3",
            "None of the above"
      ],
      answer: [1,2]
      },
      {
        id: 3,
        question: "Identify the object in photo",
        questionImage:  ballIcon,
        isMulti:false,
        options: [
          "car",
          "bag",
          "ball",
          "None of the above"
        ],
        answer: [2]
      },
    ];

    const getQuestions=()=>{
        const questions = quizData.map((data)=> ({  id: data.id, question: data.question, options: data.options , questionImage: data.questionImage, isMulti: data.isMulti  }));
        return questions;
    }

    const getAnswers=()=>{
        const questions = quizData.map((data)=> ({  id: data.id, answer: data.answer  }));
        return questions;
    }

    export {getQuestions , getAnswers}