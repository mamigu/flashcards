import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {black, purple, white} from '../utils/colors'

export default function TextButton({children, onClick, btnStyle={}, txtStyle={}}) {
    return (
        <TouchableOpacity style={[styles.androidBtn, btnStyle]} onPress={onClick}>
            <Text style={[styles.btnText, txtStyle]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    androidBtn: {
        backgroundColor: black,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingBottom: 20,
        paddingTop: 20,
        paddingRight: 30,
        paddingLeft: 30,
    }
})

