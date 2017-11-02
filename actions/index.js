import * as ActionConstants from '../constants/ActionConstants'
import * as StorageApi from "../utils/StorageApi";

export function submitNewDeck(title) {
    return (dispatch) => {
        return StorageApi.saveDeckTitle(title)
            .then(() => {
                dispatch
                (
                    {
                        type: ActionConstants.SUBMIT_NEW_DECK,
                        data: title
                    }
                )
            }
        )
    }
}

export function loadCurrentState() {
    return (dispatch) => {
        return StorageApi.loadCurrentState()
            .then(results => {
                dispatch({
                    type: ActionConstants.LOAD_APP_STATE,
                    data: results ? results : {}
                })
            })
    }
}

export function addCardToDeck(deckTitle, card) {
    return (dispatch) => {
        return StorageApi.addCardToDeck(deckTitle, card)
            .then(results => {
                dispatch
                (
                    {
                        type: ActionConstants.ADD_CARD_TO_DECK,
                        data: {
                            title: deckTitle,
                            card
                        }
                    }
                )
            })
    }

}

export function setLocalNotification() {
    return (dispatch) => {
        return StorageApi.setLocalNotification()
            .then(() => {
                dispatch
                (
                    {
                        type: ActionConstants.SET_LOCAL_NOTIFICATIONS
                    }
                )
            })
    }
}

export function clearLocalNotification() {
    return (dispatch) => {
        return StorageApi.clearLocalNotification()
            .then(() => {
                dispatch
                (
                    {
                        type: ActionConstants.CLEAR_LOCAL_NOTIFICATION
                    }
                )
            })
    }
}