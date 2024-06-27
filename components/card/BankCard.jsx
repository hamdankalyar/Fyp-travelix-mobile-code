import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Iconify } from "react-native-iconify";
import { LinearGradient } from "expo-linear-gradient";

//ADD localhost address of your server
const API_URL = "http://192.168.18.41:3000";

const BankCard = ({ navigation, setModalVisible }) => {
    const onpress = () => { setModalVisible(true) }
    return (
        <View style={styles.container}>
            <LinearGradient
                locations={[0, 1]}
                colors={["#d9dddd", "rgb(240, 240, 240)"]}
                style={styles.CardGradientLayout}
            >
                <View style={styles.topSection}>
                    <Text style={styles.headingText}>Pay with </Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.stripeSection}>
                        <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2L0 14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0L2 0ZM8.226 5.385C7.642 5.385 7.289 5.549 7.289 5.978C7.289 6.446 7.896 6.652 8.649 6.908C9.877 7.323 11.493 7.871 11.5 9.901C11.5 11.868 9.924 13 7.63 13C6.59501 12.9967 5.57142 12.7838 4.621 12.374V9.758C5.547 10.264 6.716 10.638 7.631 10.638C8.248 10.638 8.689 10.473 8.689 9.967C8.689 9.449 8.031 9.212 7.236 8.926C6.026 8.49 4.5 7.94 4.5 6.11C4.5 4.165 5.988 3 8.226 3C9.16129 2.99138 10.0895 3.16283 10.96 3.505V6.088C10.122 5.638 9.064 5.385 8.226 5.385Z" fill="black" />
                        </Svg>
                        <Text>Stripe</Text>
                    </View>
                    <Pressable onPress={onpress}>
                        <Iconify icon='gridicons:add-outline' size={30} color='black' />
                    </Pressable>

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
        paddingHorizontal: 10,
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
    },
    stripeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }

});


export default BankCard;
