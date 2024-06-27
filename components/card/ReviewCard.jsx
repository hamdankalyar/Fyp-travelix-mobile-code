import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontSize, FontFamily, Color, Border } from "../../constants/GlobalStyles";
const ReviewCard = ({ feedback }) => {

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<AntDesign key={i} name="star" size={19} color={Color.bookMark} />);
        }
        return stars;
    };
    if(feedback.length == 0){
        return <Text>No reviews written</Text>
    }
  
    return (
        <View style={styles.card}>
            <View style={styles.userInfo}>
                <Image source={{ uri: feedback.user.image }} style={styles.userImage} />
                <View style={styles.headingRating}>
                    <Text style={styles.userName}>{feedback.user.name}</Text>
                    <View style={styles.rating}>{renderStars(feedback.rating)}</View>
                </View>
            </View>
            <Text style={styles.reviewText}>{feedback.comment}</Text>
            {feedback.response && (
                <View style={styles.responseContainer}>
                    <Text style={styles.responseLabel}>{`Response from ${feedback.response.owner.name}:`}</Text>
                    <Text style={styles.responseText}>{feedback.response.comment}</Text>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 0,
        padding: 0,
        marginHorizontal: 20,
        marginBottom: 30,
    },
    headingRating: {
        flex: 1,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: 'lightgray',
    },
    userName: {
        fontSize: 15,
        color: Color.textColor,
        fontFamily: FontFamily.SFMedium,

    },
    owner: {
        fontSize: 12,
        color: Color.textColor,
        textAlign: 'center',
    },
    rating: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    reviewText: {
        fontSize: 14,
        fontFamily: "SF-Pro-Text-Light",
        color: Color.textColor,
        marginTop: 15,
    },
    responseContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
    },
    responseLabel: {
        fontSize: 14,
        fontFamily: "SF-Pro-Text-Medium",
        color: Color.textColor,
        marginBottom: 5,
    },
    responseText: {
        fontSize: 14,
        fontFamily: "SF-Pro-Text-Light",
        color: Color.textColor,
    },
});

export default ReviewCard;
