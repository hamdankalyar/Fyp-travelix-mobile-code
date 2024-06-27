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
import { Alert } from 'react-native';

const TourDetailScreen = ({ route, navigation }) => {



  const [modalVisible, setModalVisible] = useState(false);
  const [reviewsModalVisible, setReviewsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [placeName, setPlaceName] = useState('');
  const { coordinates: placeCoordinates, isLoading: isPlaceLoading } = useGeocoding(placeName);



  const { fetchTourById } = useTours();
  const [place, setPlace] = useState(null);
  const { id } = route.params;
  useEffect(() => {

    console.log('Place Coordinates:', placeCoordinates);
  }, [placeCoordinates]);

  useEffect(() => {
    const getTourDetails = async () => {
      setIsLoading(true); // Start loading
      const tourDetails = await fetchTourById(id);
      if (tourDetails) {

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
          {(isPlaceLoading) ? (
            <View style={styles.smallLoader}>
              <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
          ) : (
            placeCoordinates && (
              <View style={styles.map}>
                <MapView
                  style={{ flex: 1, width: '100%', height: 300, borderRadius: 10 }}
                  initialRegion={{
                    latitude: (placeCoordinates.latitude),
                    longitude: (placeCoordinates.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >

                  <Marker
                    coordinate={placeCoordinates}
                    title={`Place: ${place.place}`}
                  />

                </MapView>
              </View>
            )
          )}

          <LargeButton
            text={"Book Now"}
            // onPress={() => {
            //   navigation.navigate("TourBookingScreen", { place: place });
            // }}
            onPress={() => {
              if (place.personsAllowed === 0) {
                Alert.alert("No seats left", "Sorry, there are no seats available for this tour.");
              } else {
                navigation.navigate("TourBookingScreen", { place: place });
              }
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
