import * as t from './actionTypes';

const INITIAL_STATE = { currentUser: null, users: [], questions: [] }

const publicReducer = (state={INITIAL_STATE}, action) => {
    
    switch (action.type) {
        case t.SET_CURRENT_USER:
            return {...state, currentUser: action.currentUser}
        case t.SET_USERS:
            return {...state, users: action.users }
        case t.SET_QUESTIONS:
            return {...state, questions: action.questions}
        case t.SAVE_CURRENT_ANSWER:
            const {answer, qid, authedUser} = action.answer
            // console.log(`currentUser: ${JSON.stringify(state.currentUser)}`)
            // console.log(`CurrentQuestions: ${JSON.stringify(state.questions[qid])}`)
            console.log(`Users: ${JSON.stringify(state.users[authedUser])}`)
            return { 
                    ...state, 
                     currentUser: {...state.currentUser, 
                                    answers: {...state.currentUser.answers, [qid]: answer
                                    },
                                },
                     questions: {...state.questions,
                                    [qid]: {...state.questions[qid], 
                                            [answer]: {
                                                ...state.questions[qid][answer],
                                               votes: state.questions[qid][answer].votes.concat([authedUser])
                                            }
                                        }
                                },
                    users: {...state.users,
                        [authedUser]: {...state.users[authedUser],
                            answers: {
                                ...state.users[authedUser].answers,
                                [qid]: answer
                            }
                        }    
                    } 
            }
        case t.SAVE_NEW_QUESTION:
            const { question } = action;
            return {
                ...state,
                currentUser: { ...state.currentUser,
                    questions:{ ...state.currentUser.questions,
                                question
                    }               
                },
                questions: { ...state.questions,
                    [question.id]: question
                }
            }
        default:
            return INITIAL_STATE;
    }
}
export default publicReducer;