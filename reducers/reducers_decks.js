import * as ActionConstants from '../constants/ActionConstants';

export default function(state = {}, action) {
    switch(action.type) {
        case ActionConstants.LOAD_APP_STATE:
            return {
                ...action.data
            };
        case ActionConstants.SUBMIT_NEW_DECK:
            return {
                ...state,
                [action.data]: {
                    title: action.data,
                    questions: []
                }
            };
        case ActionConstants.ADD_CARD_TO_DECK:
            var questions = state[action.data.title].questions.slice();
            questions.push(action.data.card);
            return {
                ...state,
                [action.data.title]: {
                    title: action.data.title,
                    questions: questions
                }
            };
        default:
            return state;
    }
}