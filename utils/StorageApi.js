import {AsyncStorage} from "react-native";
import {Permissions, Notifications} from 'expo';
const FLASHCARD_KEY = "Udacity:flashcards";
const NOTIFICATION_KEY = 'Udacity:notifications';

function createLocalNotification() {
    return {
        title: 'Study your flashcards!',
        body: "Don't forget to your flashcards for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification() {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({status}) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();
                        let tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(20);
                        tomorrow.setMinutes(0);

                        Notifications.scheduleLocalNotificationAsync(
                            createLocalNotification(),
                            {
                                time: tomorrow,
                                repeat: 'day',
                            }
                        )
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                })
        })
}

export function loadCurrentState() {
    return AsyncStorage.getItem(FLASHCARD_KEY)
        .then(results => {
            let data = JSON.parse(results);
            return data !== null ? data : {};
        });
}

export function getDeck(deckId) {
    return AsyncStorage.getItem(FLASHCARD_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            return data[deckId];
        })
}

export function saveDeckTitle(title) {
    return AsyncStorage.getItem(FLASHCARD_KEY)
        .then(results => {
            let data = JSON.parse(results);
            data = {
                ...data,
                [title]: {
                    title,
                    questions: []
                }
            };

            AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(data));
        })
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(FLASHCARD_KEY)
        .then(results => {
            let data = JSON.parse(results);
            let questions = data[title].questions;
            questions.push(card);

            AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(data));
        });
}