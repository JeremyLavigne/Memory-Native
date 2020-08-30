import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight } from 'react-native';
//import Navigation from '../navigation/Navigation';

export default function Home(props) {

    const [ difficulty, setDifficulty ] = useState(1)

    const handlePressStart = () => {
        console.log("Here we go, in difficulty ", difficulty)
        props.navigation.navigate('Game', { difficulty: difficulty })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>

            <View >
                <Text style={styles.title}>Welcome into the best Memory Game ever!</Text>
            </View>

            <View>
                <View>
                    <Text style={styles.difficultyTitle}>Choose a difficulty</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                    <TouchableHighlight 
                        style={difficulty === 1 ? styles.difficultyButtonChosen : styles.difficultyButton}
                        onPress={() => setDifficulty(1)}
                    >
                        <Button 
                            title="1" 
                            color='black'
                            onPress={() => setDifficulty(1)}
                        />
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={difficulty === 2 ? styles.difficultyButtonChosen : styles.difficultyButton}
                        onPress={() => setDifficulty(2)}
                    >
                        <Button 
                            title="2" 
                            color='black'
                            onPress={() => setDifficulty(2)}
                        />
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={difficulty === 3 ? styles.difficultyButtonChosen : styles.difficultyButton}
                        onPress={() => setDifficulty(3)}
                    >
                        <Button 
                            title="3" 
                            color='black'
                            onPress={() => setDifficulty(3)}
                        />
                    </TouchableHighlight>

                </View>
            </View>

            <View>
                <TouchableHighlight style={styles.startButton} onPress={() => handlePressStart()}>
                    <Button 
                        title="Start" 
                        color='black'
                        onPress={() => handlePressStart()}
                    />
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    difficultyButton: {
        width: 60,
        height: 60,
        margin: 10,
        justifyContent: 'center',
        borderRadius:20,
        backgroundColor : "#3f5"
    },
    difficultyButtonChosen: {
        width: 60,
        height: 60,
        margin: 10,
        justifyContent: 'center',
        borderRadius:20,
        borderWidth: 3,
        borderColor: 'black',
        backgroundColor : "yellow"
    },
    difficultyTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 27,
        textAlign: 'center'
    },
    startButton: {
        backgroundColor : "orange",
        borderRadius:20,
        width: 100,
        justifyContent: 'center',
        height: 60
    }
  });