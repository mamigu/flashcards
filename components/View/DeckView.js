import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {connect} from "react-redux";
import TextButton from "../TextButton";
import {gray, white, black} from "../../utils/colors";

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        backgroundColor: white
    },
})

class DeckView extends Component {
    static navigationOptions = ({navigation}) => {
        const {title} = navigation.state.params;

        return {
            title: `${title}`
        };
    }

    state = {
        bounceValue: new Animated.Value(1)
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.bounceValue, {duration: 200, toValue: 1.15}),
            Animated.spring(this.state.bounceValue, {toValue: 1, friction: 4})
        ]).start()
    }

    navigateToAddCard = () => {
        this.props.navigation.navigate('AddCard', {title: this.props.title});
    }

    navigateToStartQuiz = () => {
        this.props.navigation.navigate("QuizView", {questions: this.props.decks[this.props.title].questions});
    }

    render() {
        const {title, decks} = this.props;

        return (
            <View style={style.container}>
                <Animated.Text style={[{fontSize: 48}, {transform: [{scale: this.state.bounceValue}]}]}>{title}</Animated.Text>
                <Animated.Text style={[{fontSize: 24, color: gray},{transform: [{scale: this.state.bounceValue}]}]}>{decks[title].questions.length} cards</Animated.Text>
                <TextButton onClick={this.navigateToAddCard}
                            txtStyle={{color: black}}
                            btnStyle={{backgroundColor: white, borderColor: black, borderWidth: 3}} >
                    Add Card
                </TextButton>
                <TextButton onClick={this.navigateToStartQuiz}>
                    Start Quiz
                </TextButton>
            </View>
        )
    }

}


function mapStateToProps(state, {navigation}) {
    const {title} = navigation.state.params;

    return {
        ...state,
        title,
    }
}

export default connect(mapStateToProps)(DeckView);