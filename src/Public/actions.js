import * as data from '../utils/Data'
import * as t from './actionTypes';

export const handleInitialData = (currentUserId) => {
    return (dispatch) => {
        data._getQuestions()
        .then( (questions) => 
             dispatch({ type: t.SET_QUESTIONS, questions})
        );
        data._getUsers()
        .then((users) => {
            dispatch({ type: t.SET_USERS, users });
            dispatch({ type: t.SET_CURRENT_USER, currentUser: users[currentUserId]});
        });
    }
}

const saveCurrentAnswer = (answer) => {
    return {
      type: t.SAVE_CURRENT_ANSWER,
      answer  
    };
}
export const selectAnswer = (userId, questionId, selectedOption, callBack) => {
    return dispatch => {
        const answer = { qid: questionId, 
                         answer: selectedOption, 
                         authedUser: userId};
         data._saveQuestionAnswer(answer)
        .then(() => {
            dispatch(saveCurrentAnswer(answer));
            callBack();
            }
        );
    }
}

export const saveNewQuestion = (userId, optionOne, optionTwo, callBack) => {
    return dispatch => {
        const question = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: userId
        }
        data._saveQuestion(question)
        .then((question) => {
            dispatch({ type: t.SAVE_NEW_QUESTION, question });
            callBack();
        });
    }
}
