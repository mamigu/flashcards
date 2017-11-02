import {combineReducers} from "redux";
import DeckReducer from './reducers_decks';

export default combineReducers({
    decks: DeckReducer,
})