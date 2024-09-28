const quizData = [
    {
      id: 1,
      question: "The full form of CSS is",
      questionImage:'',
      options: [
        "Cascading Style Sheets",
        "Coloured Special Sheets",
        "Color and Style Sheets",
        "None of the above"
      ],
      answer: [0]
    },
    {
        id: 2,
        question: "The full form of CSS is",
        questionImage:'',
        options: [
          "Cascading Style Sheets",
          "Coloured Special Sheets",
          "Color and Style Sheets",
          "None of the above"
        ],
        answer: [0]
      },
      {
        id: 3,
        question: "The full form of CSS is",
        questionImage:'',
        options: [
          "Cascading Style Sheets",
          "Coloured Special Sheets",
          "Color and Style Sheets",
          "None of the above"
        ],
        answer: [0]
      },
    ];

    const getQuestions=()=>{
        const questions = quizData.map((data)=> ({  id: data.id, question: data.question, options: data.options , questionImage: data.image  }));
        return questions;
    }

    const getAnswers=()=>{
        const questions = quizData.map((data)=> ({  id: data.id, answer: data.answer  }));
        return questions;
    }

    export {getQuestions , getAnswers}