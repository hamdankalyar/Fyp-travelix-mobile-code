import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Colors } from "../../constants/styles";
import LargeButton from "../../ui/LargButton";
import useCars from "../../hook/useCars";
import ReviewCard from "../../components/card/ReviewCard";
import { ActivityIndicator } from 'react-native';
import CarDetailHeader from "../DetailScreenHeaders/CarDetailHeader";


const CarDetailScreen = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewsModalVisible, setReviewsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { fetchCarById } = useCars();
    const [place, setPlace] = useState(null);
    const { id } = route.params;

    const getCarDetails = async (carId) => {
        setIsLoading(true); // Start loading
        const carDetails = await fetchCarById(carId);
        console.log("asdffghhjkg;jkluoiyturyretywq", JSON.stringify(carDetails, null, 2))
        setPlace(carDetails);
        setIsLoading(false); // Stop loading

    };

    useEffect(() => {
        getCarDetails(id);

    }, [id]);

    const handleBack = () => {
        navigation.goBack();
    };
    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
        );
    }

    if (!place) {
        return <Text style={styles.noItemFound}>No Item Found!</Text>;
    }

    return (

        <FlatList
            ListHeaderComponent={
                <CarDetailHeader
                    place={place}
                    handleBack={handleBack}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    setReviewsModalVisible={setReviewsModalVisible}
                    reviewsModalVisible={reviewsModalVisible}
                />
            }
            data={place.feedbacks.slice(0, 2)}
            renderItem={({ item }) => <ReviewCard feedback={item} />}
            keyExtractor={(item) => item._id}
            ListFooterComponent={<View style={styles.bookNowButton}>
                <LargeButton
                    text={"Book Now"}
                    onPress={() => {
                        // navigation.navigate("MyBooking", { place: place });
                        navigation.navigate("MyBooking", { place: place });
                    }}
                />
            </View>}
            ListEmptyComponent={
                <Text style={styles.noReviewsText}>No reviews written</Text>
            }
            showsVerticalScrollIndicator={false}
        />






    );
};

export default CarDetailScreen;

const styles = StyleSheet.create({

    bookNowButton: {
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 20,
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noReviewsText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: Colors.textColor,
    },

});
