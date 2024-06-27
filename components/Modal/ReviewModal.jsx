// ReviewsModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import ReviewCard from '../../components/card/ReviewCard'; // adjust the path as necessary
import { Colors } from "../../constants/styles";
import { SafeAreaView } from 'react-native';

const ReviewsModal = ({ reviews, modalVisible, setModalVisible }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {reviews.length > 0 ? (
                            <>
                                <Text style={styles.modalText}>Reviews</Text>
                                <FlatList
                                    data={reviews}
                                    renderItem={({ item }) => <ReviewCard feedback={item} />}
                                    keyExtractor={item => item._id}
                                />
                            </>
                        ) : (
                            <Text style={styles.noReviewsText}>No reviews written</Text>
                        )}
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,

        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',

    },
    buttonClose: {
        backgroundColor: Colors.blueShadeColor,
        padding: 10,
        elevation: 2,
        marginTop: 10,
        borderRadius: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 20,
        fontFamily: "SF-Pro-Text-Bold",
    },
});

export default ReviewsModal;
