

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { FontSize, FontFamily, Color, Border } from '../constants/GlobalStyles';
import CardHeading from '../components/heading/car/CardHeading';
import CarCard from '../components/card/ModuleCards/CarCards';
import TravelCard from '../components/card/ModuleCards/TravelCards';
import HotelCard from '../components/card/ModuleCards/HotelCard';
import useTours from '../hook/useTours';
import useCars from '../hook/useCars';
import useHotels from '../hook/useHotels';

const MainScreen = () => {
  const { tours, loading: toursLoading, error: toursError, refetch: refetchTours } = useTours();
  const { cars, loading: carsLoading, error: carErrors, refetch: refetchCars } = useCars();
  const { hotels, loading: hotelsLoading, error: hotelsError, refetch: refetchHotels } = useHotels();

  const [refreshing, setRefreshing] = useState(false);



  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      refetchTours(),
      refetchCars(),
      refetchHotels(),
    ]).then(() => setRefreshing(false))
      .catch((error) => {
        console.error("Failed to refresh data:", error);
        setRefreshing(false);
      });
  }, [refetchHotels, refetchCars, refetchTours]);


  return (
    <View style={styles.homeScreen} >
      <ScrollView
        style={{ width: "100%" }}
        horizontal={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Color.primaryColor]} // Customize the color of the refresh indicator
          />
        }
      >
        <Image
          style={styles.homeScreenChild}
          resizeMode="contain"
          source={require("../assets/Ballons.jpg")}
        />
        <Text style={styles.travelix}>Travelix</Text>
        <Text style={styles.exploreStayDrive}>
          Explore, Stay, Drive, Discover.
        </Text>
        <Text style={styles.seamlessTravelExperiences}>
          Seamless travel experiences with hotels, car rentals, and exploration services.
        </Text>

        <View style={styles.cardContainer}>
          <CardHeading
            heading="Cars"
            subHeading={`${cars.length} cars`}
            navigating="CarHomeScreen"
          />
          {carsLoading ? (
            <ActivityIndicator size="large" color={Color.primaryColor} />
          ) : (
            <CarCard cardData={cars} listDirection={true} />
          )}

          <CardHeading
            heading="Travel Packages"
            subHeading={`${tours.length} travel packages`}
            navigating="TravelHomeScreen"
          />
          {toursLoading ? (
            <ActivityIndicator size="large" color={Color.primaryColor} />
          ) : (
            <TravelCard cardData={tours} listDirection={true} />
          )}

          <CardHeading
            heading="Hotels"
            subHeading={`${hotels.length} hotels`}
            navigating="HotelHomeScreen"
          />
          <View style={styles.hotelContainer}>

            {hotelsLoading ? (
              <ActivityIndicator size="large" color={Color.primaryColor} />
            ) : (
              <HotelCard cardData={hotels} listDirection={true} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  homeScreenChild: {
    width: "100%",
    height: 250,
  },
  travelix: {
    position: "absolute",
    top: 24,
    left: 16,
    color: Color.colorWhite,
    fontSize: 20,
    fontFamily: FontFamily.SFBold,
  },

  menuItem: {
    position: "absolute",
    top: 231,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 104,
    borderRadius: 7,
    backgroundColor: Color.buttonAndIcons,
    borderColor: Color.backgroundColor,
    borderWidth: 1,
  },
  menuText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.SFSemibold,
  },
  exploreStayDrive: {
    position: "absolute",
    top: 101,
    color: Color.colorWhite,
    fontSize: 20,
    fontFamily: FontFamily.SFBold,
    left: 27,
    textAlign: "center",
  },
  seamlessTravelExperiences: {
    position: "absolute",
    top: 133,
    left: 16,
    color: Color.colorWhite,
    fontSize: 16,
    fontFamily: FontFamily.SFProDisplay,
    textAlign: "center",
  },
  cardContainer: {
    width: "100%", // Ensure the container takes the full width
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically
    paddingHorizontal: 15,
  },
  hotelContainer: {
    marginBottom: 20,
  }
});


export default MainScreen;
