import React, {Component} from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {StackNavigator, TabNavigator} from "react-navigation";
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Constants} from 'expo';

import reducer from './reducers';
import DeckListView from "./components/View/DeckListView";
import NewDeckView from './components/View/NewDeckView';
import {black, white} from './utils/colors';
import DeckView from "./components/View/DeckView";
import AddCard from "./components/View/AddCard";
import QuizView from './components/View/QuizView';
import {setLocalNotification} from "./actions/index";

function FlashCardStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);

    return result;
};

const Tabs = TabNavigator({
    DeckListView: {
        screen: DeckListView,
        navigationOptions: {
            tabBarLabel: 'Decks',
        }
    },
    NewDeck: {
        screen: NewDeckView,
        navigationOptions: {
            tabBarLabel: 'New Deck',
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: white,
        style: {
            height: 56,
            backgroundColor: black,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }

});

const MainNavigation = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Card',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black
            }
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            title: "Quiz",
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black
            }
        }
    }
});

const composeEnhancers = window.__REDUX_DEVTOOOLS_EXTENSION__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));

export default class App extends Component {
    componentWillMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <FlashCardStatusBar backgroundColor={black} barStyle={'light-content'}/>
                    <MainNavigation/>
                </View>
            </Provider>

        );
    }
}