import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
const PriceDetailsCard = ({ rentDays, price }) => {

    return (
        <View style={styles.container}>
            <LinearGradient
                locations={[0, 1]}
                colors={["#d9dddd", "rgb(240, 240, 240)"]}
                style={styles.CardGradientLayout}
            >
                <View style={styles.topSection}>
                    <Text style={styles.headingText}>Price Details </Text>
                </View>

                <View style={styles.section}>
                    <Text >{`Rent Price (${rentDays} day) `}</Text>
                    <Text>{`${rentDays * price} Rs `}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.innerText} >Total Price</Text>
                    <Text style={styles.priceTag}>{`${rentDays * price} Rs`}</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    CardGradientLayout: {
        padding: 20,
        borderRadius: 10,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    section: {

        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center',
    },
    innerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
    },
    priceTag: {
        color: '#70DAD3',
        fontSize: 16,
        fontWeight: 'bold',
    }

});


export default PriceDetailsCard;
