import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";

import {
  Color,
  Border,
  FontFamily,
  FontSize,
} from "../../constants/GlobalStyles";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

import CarCard from "../../components/card/ModuleCards/CarCards";
import useCars from "../../hook/useCars";
import { ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import FilterScreen from "../common/CarFilterScreen"; // Import your FilterScreen component

const CarHomeScreen = ({ navigation }) => {
  const [searchCarName, setSearchCarName] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { cars, loading: carsLoading, error: carsError } = useCars();
  const [filteredCars, setFilteredCars] = useState({});
  const [filterData, setFilterData] = useState({});

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
    // console.log(priceRange, selectedCity, selectedFeatures, selectedRating);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Cars data when the screen comes into focus
      console.log("Focus Called");


      setFilteredCars(cars);
      console.log("Stored");
    }, [cars])
  );

  // price, vehicleType, location, rating, vehicleModel

  useEffect(() => {
    const filteredByName = cars.filter((car) =>
      car.vehicleModel.toLowerCase().includes(searchCarName.toLowerCase())
    );
    setFilteredCars(filteredByName);
  }, [searchCarName]);


  //  ! old one 
  // useEffect(() => {
  //   console.log("Filtering cars with filter data:", filterData);

  //   if (!Object.keys(filterData).length) {
  //     console.log("No filter applied, showing all cars");
  //     setFilteredCars(cars);
  //   } else {
  //     // Apply the filter logic
  //     let filtered = cars;

  //     // Filter by city if a city is selected
  //     if (filterData.city) {
  //       filtered = filtered.filter(car =>
  //         car.location.toLowerCase().includes(filterData.city.toLowerCase())
  //       );
  //     }

  //     // Filter by car types if any car type is selected
  //     if (filterData.carTypes && filterData.carTypes.length > 0) {
  //       filtered = filtered.filter(car =>
  //         filterData.carTypes.includes(car.vehicleType)
  //       );
  //     }

  //     // Filter by price range
  //     if (filterData.priceRange) {
  //       filtered = filtered.filter(car =>
  //         car.price >= filterData.priceRange[0] && car.price <= filterData.priceRange[1]
  //       );
  //     }

  //     // Filter by ratings if any rating is selected
  //     if (filterData.ratings && filterData.ratings.length > 0) {
  //       filtered = filtered.filter(car =>
  //         filterData.ratings.some(rating => car.rating >= rating)
  //       );
  //     }

  //     console.log(`Filtered ${filtered.length} cars after applying filters.`);
  //     setFilteredCars(filtered.length ? filtered : []);
  //   }
  // }, [filterData, cars]);

  useEffect(() => {
    console.log("Filtering cars with filter data:", filterData);

    if (!Object.keys(filterData).length) {
      console.log("No filter applied, showing all cars");
      setFilteredCars(cars);
    } else {
      let filtered = cars;

      // Filter by city
      if (filterData.city) {
        filtered = filtered.filter(car =>
          car.location.toLowerCase().includes(filterData.city.toLowerCase())
        );
      }

      // Filter by car types
      if (filterData.carTypes && filterData.carTypes.length > 0) {
        filtered = filtered.filter(car =>
          filterData.carTypes.includes(car.vehicleType)
        );
      }

      // Filter by price range
      if (filterData.priceRange) {
        filtered = filtered.filter(car =>
          car.price >= filterData.priceRange[0] && car.price <= filterData.priceRange[1]
        );
      }

      // Filter by ratings
      if (filterData.ratings && filterData.ratings.length > 0) {
        filtered = filtered.filter(car =>
          filterData.ratings.includes(car.rating)
        );
      }

      console.log(`Filtered ${filtered.length} cars after applying filters.`);
      setFilteredCars(filtered.length ? filtered : []);
    }
  }, [filterData, cars]);


  if (carsLoading) {
    return <ActivityIndicator size="large" color={Color.primaryColor} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons style={{ marginRight: 3 }} name="chevron-back-outline" size={34} color="#70dad3" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Image
            style={[styles.icon, styles.searchIcon]}
            source={require("../../assets/icons/searchicon.png")}
          />
          <TextInput
            placeholder="Find your Car..."
            style={styles.input}
            onChangeText={(text) => setSearchCarName(text)}
            value={searchCarName}
          />

          <Pressable onPress={toggleFilterModal}>
            <Image
              style={[styles.icon, styles.filterIcon]}
              source={require("../../assets/icons/filtericon.png")}
            />
          </Pressable>
        </View>
      </View>

      {/* <HotelCard cardData={filteredHotels} listDirection={false} /> */}
      <CarCard cardData={filteredCars} listDirection={false} />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={toggleFilterModal}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
          </View>
          {/* <FilterScreen /> */}
          <FilterScreen setFilterDataa={setFilterData} />
        </View>
      </Modal>
    </View>
  );
};

export default CarHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  searchBar: {
    borderRadius: Border.br_53xl,
    backgroundColor: Color.colorWhitesmoke,
    borderColor: Color.colorGainsboro,
    borderWidth: 0.8,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  input: {
    flex: 1, // Take up all available space
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.SFRegular,
    letterSpacing: 0.3,
    paddingVertical: 0,
  },

  icon: {
    height: 22,
    width: 22,
  },

  searchIcon: {
    marginRight: 15, // Add some margin to the right of the search icon
  },

  filterIcon: {
    marginLeft: 10, // Add some margin to the left of the filter icon
  },
  modalContainer: {
    flex: 1,
    // height:200,
    justifyContent: "center",
  },

  modalHeader: {
    alignItems: "flex-end",
    paddingRight: 10,
    paddingTop: 200,
    // backgroundColor:"red"
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  }
});
