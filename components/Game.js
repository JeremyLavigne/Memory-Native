import React from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight } from 'react-native';

export default function Game(props) {

    const difficulty = props.navigation.state.params.difficulty

    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>

            <View >
                <Text style={styles.title}>You are playing at level {difficulty}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 27,
        textAlign: 'center'
    }
});