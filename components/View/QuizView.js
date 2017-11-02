import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from "react-redux";
import TextButton from "../TextButton";
import {black, green, red, white} from '../../utils/colors';
import {clearLocalNotification, setLocalNotification} from "../../actions/index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: white,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        backgroundColor: white,
    },
    text: {
        fontSize: 32,
        padding: 20,
    },
    smallText: {
        padding: 10,
        fontSize: 16,
        color: red
    }
});

class QuizView extends Component {

    state = {
        currentIndex: 0,
        numberCorrect: 0,
        numberIncorrect: 0,
        showQuestion: true,
    }

    onNext = (isCorrect) => {
        let nextIndex = this.state.currentIndex + 1;
        nextIndex === this.props.questions.length && this.props.clearLocalNotification().then(this.props.setLocalNotification);

        this.setState({
            currentIndex: nextIndex,
            numberCorrect: isCorrect ? this.state.numberCorrect + 1 : this.state.numberCorrect,
            numberIncorrect: isCorrect ? this.state.numberIncorrect : this.state.numberIncorrect + 1
        })
    }

    flipFlop = () => {
        this.setState({showQuestion: !this.state.showQuestion});
    }

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    }

    restart = () => {
        this.setState({
            currentIndex: 0,
            numberCorrect: 0,
            numberIncorrect: 0,
            showQuestion: true,
        });
    }

    render() {
        const {questions} = this.props;

        if(this.state.currentIndex === questions.length) {
            return (
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>Correct: {this.state.numberCorrect}</Text>
                    <Text style={styles.text}>Incorrect: {this.state.numberIncorrect}</Text>
                    <TextButton txtStyle={{color: black}}
                                btnStyle={{backgroundColor: white, borderColor: black, borderWidth: 3}}
                                onClick={this.restart}>
                        Restart
                    </TextButton>
                    <TextButton onClick={this.goBack}>
                        Go Back
                    </TextButton>
                </View>
            );
        }
        const card = questions[this.state.currentIndex];
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.state.currentIndex + 1} / {questions.length}</Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>{this.state.showQuestion ? card.question : card.answer}</Text>
                    <Text style={styles.smallText} onPress={this.flipFlop}>{this.state.showQuestion ? "Answer" : "Question"}</Text>
                    <TextButton btnStyle={{backgroundColor: green, width: 300}} onClick={this.onNext.bind(this, true)}>
                        Correct
                    </TextButton>
                    <TextButton btnStyle={{backgroundColor: red, width: 300}} onClick={this.onNext.bind(this, false)}>
                        Incorrect
                    </TextButton>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, {navigation}) {
    const {questions} = navigation.state.params;
    return {
        questions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLocalNotification: () => dispatch(setLocalNotification()),
        clearLocalNotification: () => dispatch(clearLocalNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);