import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Colors } from "../../constants/styles";
import LargeButton from "../../ui/LargButton";
import useHotels from "../../hook/useHotels";
import ReviewCard from "../../components/card/ReviewCard";
import { ActivityIndicator } from 'react-native';
import useGeocoding from '../../hook/useGeocoding';

import HotelDetailHeader from "../DetailScreenHeaders/HotelDetailHeader";
import MapView, { Marker } from 'react-native-maps';

const HotelDetailScreen = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewsModalVisible, setReviewsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { fetchHotelById } = useHotels();
    const [place, setPlace] = useState(null);
    const { id, dateStr } = route.params;

    const { coordinates: hotelCoordinates, isLoading: isHotelLoading } = useGeocoding(place?.location);

    const getHotelDetails = async (hotelId) => {
        setIsLoading(true); // Start loading
        const hotelDetails = await fetchHotelById(hotelId);
        console.log(hotelDetails);
        setPlace(hotelDetails);
        setIsLoading(false); // Stop loading
    };

    useEffect(() => {
        getHotelDetails(id);
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
                <HotelDetailHeader
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
            ListFooterComponent={
                <View style={styles.bookNowButton}>
                    {isHotelLoading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color={Colors.primaryColor} />
                        </View>
                    ) : (
                        hotelCoordinates && (
                            <View style={styles.map}>
                                <MapView
                                    style={{ flex: 1, width: "100%", height: 300, borderRadius: 10 }}
                                    initialRegion={{
                                        latitude: hotelCoordinates.latitude,
                                        longitude: hotelCoordinates.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                >
                                    <Marker
                                        coordinate={hotelCoordinates}
                                        title={place.hotelName}
                                        description={place.location}
                                    />
                                </MapView>
                            </View>
                        )
                    )}
                    <LargeButton
                        text={"Book Now"}
                        onPress={() => {
                            navigation.navigate("HotelBookingScreen", { place: place });
                        }}
                    />
                </View>
            }

            ListEmptyComponent={
                <Text style={styles.noReviewsText}>No reviews written</Text>
            }
            showsVerticalScrollIndicator={false}
        />

    );
};

export default HotelDetailScreen;

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
        marginTop: 5,
        fontSize: 14,
        color: Colors.textColor,
    },
    map: {
        marginVertical: 20,
        height: 300,
        width: "100%",

    },
    smallLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        height: 300,
        width: "100%",
        backgroundColor: "lightgrey",
    }
});
