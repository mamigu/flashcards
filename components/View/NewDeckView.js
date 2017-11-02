import React, {Component} from "react";
import {Text, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux'

import {black, white} from '../../utils/colors';
import TextButton from "../TextButton";
import {submitNewDeck} from "../../actions/index";

class NewDeckView extends Component {

    state = {
        textInput: '',
    }

    submitQuestion = () => {
        //Update Redux
        this.props.submitNewDeck(this.state.textInput);
        //Navigate home
        this.goHome();

    }

    goHome = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.questionText}>What is the title of your new deck?</Text>
                <TextInput style={styles.questionInput} placeholder={'Deck Title'} value={this.state.textInput} onChangeText={(text) => this.setState({textInput: text})} />
                <TextButton onClick={this.submitQuestion}>
                    Submit
                </TextButton>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        backgroundColor: white
    },
    questionText: {
        fontSize: 32,
        padding: 20,
    },
    questionInput: {
        width: 400,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: black,
        margin: 50
    }
})

function mapStateToProps(state) {
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitNewDeck: (title) => dispatch(submitNewDeck(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView);