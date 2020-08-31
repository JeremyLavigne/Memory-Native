import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { images } from '../images/images';


export default function Game(props) {

    const shuffle = (cards) => {
        const shuffledCards = [];

        while (cards.length > 0) { // While there is still something in array
            const indice = Math.floor(Math.random() * cards.length); // Pick one
            shuffledCards.push(cards[indice]); // Push in new Array
            cards.splice(indice,1) // Remove it
        }

        return shuffledCards;
    }

    const pickRandom = (numberOfPairs) => {
        const cards = [];
        const alreadyPickedIndex = [];
        let id = 1;
        let pairId = 1;

        for (let i=0 ; i < numberOfPairs; i++) {

            let index = 0;
            do {
                index = Math.floor(Math.random() * 13);
            }while (alreadyPickedIndex.includes(index))

            alreadyPickedIndex.push(index)

            cards.push({
                id: id, pairId: pairId, image: images[index], hidden: true, disabled: null, isTried: false, isSucceded: false
            });
            cards.push({
                id: id+1, pairId: pairId, image: images[index], hidden: true, disabled: null, isTried: false, isSucceded: false
            });

            id += 2;
            pairId ++;
        }

        const shuffledCards = shuffle(cards);

        return shuffledCards;
    }

    // -------------------------------------------------------------------------
    const difficulty = props.navigation.state.params.difficulty;
    const cardBack = require('../images/cardBack.png')

    const [ playingCards, setPlayingCards ] = useState(pickRandom(difficulty*3));
    const [ count, setCount] = useState(0)
    const [ gameOver, setGameOver] = useState(false)


    // -------------------------------------------------------------------------
    // Turn the clicked card and disabled it
    const tryACard = (cardId) => {
        const cards = [...playingCards]
        const newPlayingCards = cards.map((card) => (Number(card.id) === Number(cardId)) ? 
            { id: card.id, pairId: card.pairId, image: card.image, hidden: false, disabled: "disabled", isTried: true, isSucceded: false} :
            card )
        if (checkWin()) {
            setGameOver(true)
        }
        return newPlayingCards
    }

    // Turn back the missed ones
    const turnBackMissedAndTryACard = (cardId) => {
        const cards = [...playingCards]
        
        const newPlayingCards = cards.map((card) => card.isTried ? 
            { id: card.id, pairId: card.pairId, image: card.image, hidden: true, disabled: null, isTried: false, isSucceded: false} :
            card )

        return newPlayingCards.map((card) => (Number(card.id) === Number(cardId)) ? 
        { id: card.id, pairId: card.pairId, image: card.image, hidden: false, disabled: "disabled", isTried: true, isSucceded: false} :
        card )
    }

    // 
    const validatePairAndTryACard = (cardId) => {
        const cards = [...playingCards]
        
        const newPlayingCards = cards.map(card => (card.isTried) ? 
        { id: card.id, pairId: card.pairId, image: card.image, hidden: false, disabled: "disabled", isTried: false, isSucceded: true} : 
            card)

        return newPlayingCards.map((card) => (Number(card.id) === Number(cardId)) ? 
        { id: card.id, pairId: card.pairId, image: card.image, hidden: false, disabled: "disabled", isTried: true, isSucceded: false} :
        card )
    }

    // Return true if the two returned cards form a pair
    const pairFound = () => {
        const cards = [...playingCards]
        
        const returnedCards = cards.filter(card => card.isTried ? card : null)
        return (returnedCards[0].pairId === returnedCards[1].pairId) 

    }

    const checkWin = () => {
         for (let i = 0; i < playingCards.length-1 ; i++) {
            if (playingCards[i].hidden) {
                return false
            }
        }
        return true
    }


    // -------------------------------------------------------------------------
    const handlePressCard = (cardId) => {

        if (count < 2) {
            setPlayingCards(tryACard(cardId))
            setCount(count + 1)
        } else {
            if (pairFound()) {
                setPlayingCards(validatePairAndTryACard(cardId))
                setCount(1)
            } else {
                setPlayingCards(turnBackMissedAndTryACard(cardId))
                setCount(1)
            }
        }
    }

    
    // -------------------------------------------------------------------------
    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
            { !gameOver ?
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                {playingCards.map(card => 
                <TouchableOpacity 
                    key={card.id} 
                    style={styles.memoCard} 
                    onPress={() => handlePressCard(card.id)}
                >
                    {card.hidden ?
                    <Image
                        style={styles.image} 
                        source={cardBack}
                    />
                    :
                    <Image
                        style={styles.image} 
                        source={card.image}
                        disabled={card.disabled}
                    />
                    }
                </TouchableOpacity>
                )}
            </View>
            :
            <Text style={styles.title}>BRAVO !</Text>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 27,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    memoCard: {
        width: '30%',
        height: 80,
        margin: 5,
        resizeMode: 'contain'        
    }
});