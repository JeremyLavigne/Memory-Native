import React from 'react';
import { StyleSheet, View, Image } from 'react-native';



export default function Game(props) {

    const difficulty = props.navigation.state.params.difficulty

    const images = {
        image1: require('../images/card1.png'),
        image2: require('../images/card2.png'),
        image3: require('../images/card3.png'),
        image4: require('../images/card4.png'),
        image5: require('../images/card5.png'),
        image6: require('../images/card6.png'),
        image7: require('../images/card7.png'),
        image8: require('../images/card8.png'),
        image9: require('../images/card9.png'),
        image10: require('../images/card10.png'),
        image11: require('../images/card11.png'),
        image12: require('../images/card12.png'),
        image13: require('../images/card13.png'),
        image14: require('../images/card14.png'),
        image15: require('../images/card15.png'),
    };

    const shuffle = (imgs) => {
        const shuffledImgs = [];

        let keyIndice = 1
        while (imgs.length > 0) {
            const indice = Math.floor(Math.random() * imgs.length);
            shuffledImgs.push({key: keyIndice, image: imgs[indice]});
            keyIndice ++;
            imgs.splice(indice,1)
        }

        return shuffledImgs;
    }

    let imagesToUse = []
    switch (difficulty) {
        case 1: imagesToUse = [images.image1, images.image1, images.image2, images.image2, images.image3, images.image3]; break;
        case 2: imagesToUse = [images.image4, images.image4, images.image5, images.image5, images.image6, images.image6, images.image7, images.image7, images.image9, images.image9, images.image10, images.image10]; break;
        case 3: imagesToUse = [images.image4, images.image4, images.image5, images.image5, images.image6, images.image6, images.image7, images.image7, images.image9, images.image9, images.image10, images.image10, images.image11, images.image11, images.image12, images.image12, images.image14, images.image14]; break;
        default: imagesToUse = [images.image1, images.image1, images.image2, images.image2, images.image3, images.image3]; break;
    } 

    const imagesToDisplay = shuffle(imagesToUse)

    
    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                {imagesToDisplay.map(obj => 
                <Image
                    key={obj.key}
                    style={styles.memoCard}
                    source={obj.image}
                />
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
    }
});