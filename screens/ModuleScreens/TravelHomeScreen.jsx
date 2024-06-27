import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  Modal,
  Alert,
} from "react-native";


import {
  Color,
  Border,
  FontFamily,
  FontSize,
} from "../../constants/GlobalStyles";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import TravelCard from "../../components/card/ModuleCards/TravelCards";
import useTours from "../../hook/useTours";
import { ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import FilterScreen from "../common/TravelFilterScreen"; // Import your FilterScreen component

// import CardHeading from "../../components/heading/car/CardHeading";
// import TravelData from '../../data/TravelData.json';

const TravelHomeScreen = () => {
  const [searchTourName, setSearchTourName] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { tours, loading: toursLoading, error: toursError } = useTours();
  const [filteredTours, setFilteredTours] = useState({});
  const [filterData, setFilterData] = useState({});

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
    // console.log(priceRange, selectedCity, selectedFeatures, selectedRating);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Cars data when the screen comes into focus
      console.log("Focus Called");
      // console.log("userselect", filterData);
      console.log("Tour data", JSON.stringify(tours, null, 2));

      setFilteredTours(tours);
      console.log("Stored");
    }, [tours])
  );

  useEffect(() => {
    const filteredByName = tours.filter((tour) =>
      tour.title.toLowerCase().includes(searchTourName.toLowerCase())
    );
    setFilteredTours(filteredByName);
  }, [searchTourName]);



  useEffect(() => {
    console.log("Filtering tours based on user selections", filterData);

    let filtered = tours; // Start with all tours

    // Filter by city
    if (filterData.city) {
      filtered = filtered.filter(tour =>
        tour.place.toLowerCase().includes(filterData.city.toLowerCase())
      );
    }

    // Filter by price range
    if (filterData.priceRange) {
      filtered = filtered.filter(tour =>
        tour.price >= filterData.priceRange[0] && tour.price <= filterData.priceRange[1]
      );
    }

    // // Filter by ratings
    // if (filterData.ratings && filterData.ratings.length > 0) {
    //   filtered = filtered.filter(tour =>
    //     filterData.ratings.some(rating => tour.rating >= rating)
    //   );
    // }
    // Filter by ratings
    if (filterData.ratings && filterData.ratings.length > 0) {
      filtered = filtered.filter(tour =>
        filterData.ratings.includes(tour.rating) // Use includes to match any of the selected ratings
      );
    }
    console.log(`Filtered ${filtered.length} tours after applying filters.`);
    setFilteredTours(filtered.length ? filtered : []);

  }, [filterData, tours]);

  if (toursLoading) {
    return <ActivityIndicator size="large" color={Color.primaryColor} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          style={[styles.icon, styles.searchIcon]}
          source={require("../../assets/icons/searchicon.png")}
        />
        <TextInput
          placeholder="Find your Tour..."
          style={styles.input}
          onChangeText={(text) => setSearchTourName(text)}
          value={searchTourName}
        />

        <Pressable onPress={toggleFilterModal}>
          <Image
            style={[styles.icon, styles.filterIcon]}
            source={require("../../assets/icons/filtericon.png")}
          />
        </Pressable>
      </View>

      <TravelCard cardData={filteredTours} listDirection={false} />

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

export default TravelHomeScreen;

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
});
