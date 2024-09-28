import { getQuestions } from "../data/mockData"

const allQuesions = getQuestions();

export const getQuestionById=(id)=>{
    const question =  allQuesions.filter((data)=> data.id === id-1);
    if(!question || question.length === 0){
        return 
    }
    return question && new Promise((resolve) =>  { setTimeout(()=>{resolve(question)},3000)  });
}
export const getAllQuestions =()=>{
    return new Promise((resolve)=>{ setTimeout(()=>{ resolve({questions:allQuesions, total:allQuesions.length } )},3000)})
}

export const getCountTotalQuestions=()=>{
    return allQuesions.length;
}

export const showResult=()=>{
    const correct = 1;
    const incorrect = 2;
    const total = 3;
    return {correct, incorrect, total};
}


