import React, {Component} from 'react';
import {connect} from "react-redux";
import {TextInput, KeyboardAvoidingView, StyleSheet} from "react-native";
import {NavigationActions} from 'react-navigation';

import {black, white} from "../../utils/colors";
import TextButton from "../TextButton";
import {addCardToDeck} from "../../actions/index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        backgroundColor: white,
    },
    inputField: {
        width: 300,
        height: 44,
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: black,
    }
});

class AddCard extends Component {

    state = {
        questionInput: '',
        answerInput: '',
    };

    addCard = () => {
        //Save card
        this.props.addCardToDeck(this.props.title, {question: this.state.questionInput, answer: this.state.answerInput});

        //Navigate back
        this.props.navigation.dispatch(NavigationActions.back());
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput style={styles.inputField}
                           placeholder={'Question'}
                           value={this.state.questionInput}
                           onChangeText={(text) => this.setState({questionInput: text})} />
                <TextInput style={styles.inputField}
                           placeholder={'Answer'}
                           value={this.state.answerInput}
                           onChangeText={(text) => this.setState({answerInput: text})}/>
                <TextButton onClick={this.addCard}>
                    Submit
                </TextButton>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    const {title} = navigation.state.params;

    return {
        title,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addCardToDeck: (title, card) => dispatch(addCardToDeck(title, card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);