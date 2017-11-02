import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Text, StyleSheet} from "react-native";
import DeckCard from "../DeckCard";
import {loadCurrentState, setLocalNotification} from "../../actions/index";

import {white} from "../../utils/colors";

const styles = StyleSheet.create({
    textContainer: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white
    }
});

class DeckListView extends Component {

    componentWillMount() {
        this.props.loadCurrentState();
    }

    renderItem = ({item}) => {
        const deck = this.props.decks[item];
        return (<DeckCard title={deck.title} numCards={deck.questions.length} onPress={this.onCardPress.bind(this, deck.title)}/>);
    }

    onCardPress = (title) => {
        this.props.navigation.navigate('DeckView', {title: title})
    }

    render() {
        const decks = Object.keys(this.props.decks);

        return (
            <View style={{flex: 1}}>
                {decks.length > 0  ? (
                    <FlatList data={decks}
                              renderItem={this.renderItem}
                              keyExtractor={(item, index) => index}/>
                ) : <Text style={styles.textContainer}>There are no decks currently</Text>}

            </View>
        )
    }
}

function mapStateToProps(state) {
    const {decks} = state;

    return {
        decks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCurrentState: () => dispatch(loadCurrentState()),
        setLocalNotification: () => dispatch(setLocalNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView);