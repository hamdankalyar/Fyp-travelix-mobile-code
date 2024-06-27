import React, { Component, useState } from 'react'
import { Text, View } from 'react-native'
import Searchbar from '../../components/input/car/Searchbar'
import { Iconify } from 'react-native-iconify'
import { StyleSheet } from 'react-native'
import MainHeading from '../../components/MainHeading'
import SubHeading from '../../components/SubHeading'
import CardHeading from '../../components/heading/car/CardHeading'
import cardDataJSON from "../../data/carCard.json";
import Card from '../../components/card/ModuleCards/CarCards'


function SearchResult() {
    const [cardData, setCardData] = useState(cardDataJSON);
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Iconify icon='uis:angle-left' size={40} color='black' />
                <Searchbar placeholder='hello' />
            </View>
            <View style={styles.mainContent}>
                <CardHeading heading='Deal Near You' subHeading='213 Cars in lahore' />
                <Card cardData={cardData} />
            </View>
        </View>
    )

}
// create a stylesheet 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // changed from 'space-between'
        alignItems: 'center',
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    mainContent: {

        paddingHorizontal: 15,
    }
});

export default SearchResult
