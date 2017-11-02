import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {gray, white} from "../utils/colors";

export default function DeckCard({title, numCards, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={{fontSize: 20}}>{title}</Text>
            <Text style={{fontSize: 16, color: gray}}>{numCards} cards</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
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
})