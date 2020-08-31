import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { images } from '../images/images';


export default function Game(props) {

    // -------------------------------------------------------------------------
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


    // -------------------------------------------------------------------------
    // Turn the clicked card and disabled it
    const tryACard = (cardId) => {
        const cards = [...playingCards]
        const newPlayingCards = cards.map((card) => (Number(card.id) === Number(cardId)) ? 
            { id: card.id, pairId: card.pairId, image: card.image, hidden: false, disabled: "disabled", isTried: true, isSucceded: false} :
            card )

        return newPlayingCards
    }

    // Turn back the missed ones
    const turnBackMissed = () => {
        const cards = [...playingCards]
        
        const newPlayingCards = cards.map((card) => card.isTried ? 
            { id: card.id, pairId: card.pairId, image: card.image, hidden: true, disabled: null, isTried: false, isSucceded: false} :
            card )
        return newPlayingCards
    }

    // Return true if the two returned cards form a pair
    const pairFound = () => {
        const cards = [...playingCards]
        // Watch only the two card which are just tried (not those who are already won)
        const returnedCards = cards.filter(card => (card.hidden && !card.isSucceded) ? null : card)

        if (returnedCards[0].pairId === returnedCards[1].pairId) {
            setPlayingCards(cards.map(card => (card.hidden && !card.isSucceded) ? 
            { id: card.id, pairId: card.pairId, image: card.image, hidden: false, disabled: "disabled", isTried: false, isSucceded: true} : 
                card))
            return true
        }
        return false
    }


    // -------------------------------------------------------------------------
    const handlePressCard = (cardId) => {

        let newPlayingCards = [...playingCards]

        if (count < 2) {
            newPlayingCards = tryACard(cardId)
            setCount(count + 1)
        } else {
            if (pairFound()) {
                setCount(0)
            } else {
                newPlayingCards = turnBackMissed()
                setCount(0)
            }
        }

        setPlayingCards(newPlayingCards)
    }

    
    // -------------------------------------------------------------------------
    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>

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

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 27,
        textAlign: 'center'
    },
    memoCard: {
        width: '30%',
        height: 80,
        borderWidth: 2,
        margin: 5,
        borderRadius: 3,
        borderColor: 'black',
        resizeMode: 'contain'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});