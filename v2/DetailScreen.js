import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Colors } from "../../constants/styles";
import LargeButton from "../../ui/LargButton";
import ReviewCard from "../../components/card/ReviewCard";
import { ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import useTours from "../../hook/useTours";
import TourDetailHeader from "../DetailScreenHeaders/TourDetailHeader";
import useGeocoding from '../../hook/useGeocoding';


const TourDetailScreen = ({ route, navigation }) => {



    const [modalVisible, setModalVisible] = useState(false);
    const [reviewsModalVisible, setReviewsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // States for city and place coordinates
    const [cityName, setCityName] = useState('');
    const [placeName, setPlaceName] = useState('');


    const { coordinates: cityCoordinates, isLoading: isCityLoading } = useGeocoding(cityName);
    const { coordinates: placeCoordinates, isLoading: isPlaceLoading } = useGeocoding(placeName);



    const { fetchTourById } = useTours();
    const [place, setPlace] = useState(null);
    const { id, dateStr } = route.params;
    useEffect(() => {
        console.log('City Coordinates:', cityCoordinates);
        console.log('Place Coordinates:', placeCoordinates);
    }, [cityCoordinates, placeCoordinates]);

    useEffect(() => {
        const getTourDetails = async () => {
            setIsLoading(true); // Start loading
            const tourDetails = await fetchTourById(id);
            if (tourDetails) {
                setCityName(tourDetails.city); // set the city name for geocoding
                setPlaceName(tourDetails.place); // set the place name for geocoding
            }
            setPlace(tourDetails);
            setIsLoading(false); // Stop loading
        };

        getTourDetails();
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
                <TourDetailHeader
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
                    {(isCityLoading || isPlaceLoading) ? (
                        <View style={styles.smallLoader}>
                            <ActivityIndicator size="large" color={Colors.primaryColor} />
                        </View>
                    ) : (
                        cityCoordinates && placeCoordinates && (
                            <View style={styles.map}>
                                <MapView
                                    style={{ flex: 1, width: '100%', height: 300, borderRadius: 10 }}
                                    initialRegion={{
                                        latitude: (cityCoordinates.latitude + placeCoordinates.latitude) / 2,
                                        longitude: (cityCoordinates.longitude + placeCoordinates.longitude) / 2,
                                        latitudeDelta: Math.abs(cityCoordinates.latitude - placeCoordinates.latitude) * 2,
                                        longitudeDelta: Math.abs(cityCoordinates.longitude - placeCoordinates.longitude) * 2,
                                    }}
                                >
                                    <Marker
                                        coordinate={cityCoordinates}
                                        title={`City: ${place.city}`}
                                    />
                                    <Marker
                                        coordinate={placeCoordinates}
                                        title={`Place: ${place.place}`}
                                    />
                                    <Polyline
                                        coordinates={[cityCoordinates, placeCoordinates]}
                                        strokeColor="#000" // black
                                        strokeWidth={3}
                                    />
                                </MapView>
                            </View>
                        )
                    )}

                    <LargeButton
                        text={"Book Now"}
                        onPress={() => {
                            navigation.navigate("TourBookingScreen", { place: place });
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

export default TourDetailScreen;

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
