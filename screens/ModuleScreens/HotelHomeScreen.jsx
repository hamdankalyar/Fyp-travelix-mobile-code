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
import { ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import HotelCard from "../../components/card/ModuleCards/HotelCard";
import useHotels from "../../hook/useHotels";

import { AntDesign } from "@expo/vector-icons";
import FilterScreen from "../common/FilterScreen"; // Import your FilterScreen component

const HotelHomeScreen = ({ navigation }) => {
    const [searchHotelName, setSearchHotelName] = useState("");
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const { hotels, loading: hotelsLoading, error: hotelsError } = useHotels();
    const [filteredHotels, setFilteredHotels] = useState({});
    const [filterData, setFilterData] = useState({});

    const toggleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible);
        // console.log(priceRange, selectedCity, selectedFeatures, selectedRating);
    };

    useFocusEffect(
        React.useCallback(() => {
            // Fetch hotels data when the screen comes into focus
            console.log("Focus Called");
            // console.log("userselect", filterData);
            console.log("Hotesls data", JSON.stringify(hotels, null, 2));

            setFilteredHotels(hotels);
            console.log("Stored");
        }, [hotels])
    );
    useEffect(() => {
        const filteredByName = hotels.filter((hotel) =>
            hotel.hotelName.toLowerCase().includes(searchHotelName.toLowerCase())
        );
        setFilteredHotels(filteredByName);
    }, [searchHotelName]);

    // ! old logic
    // useEffect(() => {
    //     console.log("UseEffect called");

    //     if (!Object.keys(filterData).length) {
    //         // If no filter is applied, display all hotels
    //         setFilteredHotels(hotels);
    //     } else {
    //         // Apply the filter logic
    //         const filtered = hotels.filter((hotel) => {
    //             if (
    //                 filterData.city &&
    //                 hotel.location
    //                     .toLowerCase()
    //                     .includes(filterData.city.toLowerCase()) &&
    //                 filterData.rooms &&
    //                 filterData.rooms.includes(hotel.roomType) &&
    //                 filterData.priceRange &&
    //                 hotel.price >= filterData.priceRange[0] &&
    //                 hotel.price <= filterData.priceRange[1] &&
    //                 filterData.ratings &&
    //                 filterData.ratings.some((rating) => hotel.rating >= rating)
    //             ) {
    //                 return true; // Include the hotel if any of the conditions is true
    //             } else {
    //                 return false;
    //             }
    //         });
    //         // setFilteredHotels(filtered);
    //         if (!(filtered.length == 0)) {
    //             setFilteredHotels(filtered);
    //         } else if (filtered.length === 0) {
    //             // Alert.alert("Title", "No hotel matched the criteria");
    //             setFilteredHotels(filtered);
    //         }
    //     }
    // }, [filterData, hotels]);

    // ! new gpt working logic 
    // useEffect(() => {
    //     console.log("UseEffect called");

    //     if (!Object.keys(filterData).length) {
    //         // If no filter is applied, display all hotels
    //         setFilteredHotels(hotels);
    //     } else {
    //         // Apply the filter logic
    //         let filtered = hotels;

    //         // Filter by city if a city is selected
    //         if (filterData.city) {
    //             filtered = filtered.filter(hotel =>
    //                 hotel.location.toLowerCase().includes(filterData.city.toLowerCase())
    //             );
    //         }

    //         // Filter by room types if any room type is selected
    //         if (filterData.rooms && filterData.rooms.length > 0) {
    //             filtered = filtered.filter(hotel =>
    //                 filterData.rooms.includes(hotel.roomType)
    //             );
    //         }

    //         // Filter by price range
    //         if (filterData.priceRange) {
    //             filtered = filtered.filter(hotel =>
    //                 hotel.price >= filterData.priceRange[0] && hotel.price <= filterData.priceRange[1]
    //             );
    //         }

    //         // Filter by ratings if any rating is selected
    //         if (filterData.ratings && filterData.ratings.length > 0) {
    //             filtered = filtered.filter(hotel =>
    //                 filterData.ratings.some(rating => hotel.rating >= rating)
    //             );
    //         }

    //         setFilteredHotels(filtered.length ? filtered : []);
    //     }
    // }, [filterData, hotels]);
    // ! new working logic
    // useEffect(() => {
    //     console.log("UseEffect called");

    //     if (!Object.keys(filterData).length) {
    //         // If no filter is applied, display all hotels
    //         setFilteredHotels(hotels);
    //     } else {
    //         // Apply the filter logic
    //         let filtered = hotels;

    //         // Filter by city if a city is selected
    //         if (filterData.city) {
    //             filtered = filtered.filter(hotel =>
    //                 hotel.location.toLowerCase().includes(filterData.city.toLowerCase())
    //             );
    //         }

    //         // Filter by room types if any room type is selected
    //         if (filterData.rooms && filterData.rooms.length > 0) {
    //             filtered = filtered.filter(hotel =>
    //                 filterData.rooms.includes(hotel.roomType)
    //             );
    //         }

    //         // Filter by price range
    //         if (filterData.priceRange) {
    //             filtered = filtered.filter(hotel =>
    //                 hotel.price >= filterData.priceRange[0] && hotel.price <= filterData.priceRange[1]
    //             );
    //         }

    //         // Filter by ratings if any rating is selected
    //         if (filterData.ratings && filterData.ratings.length > 0) {
    //             filtered = filtered.filter(hotel =>
    //                 filterData.ratings.some(rating => hotel.rating >= rating)
    //             );
    //         }

    //         setFilteredHotels(filtered.length ? filtered : []);
    //     }
    // }, [filterData, hotels]);


    useEffect(() => {
        console.log("Filter Data used for filtering:", filterData);

        if (!Object.keys(filterData).length) {
            setFilteredHotels(hotels);
        } else {
            let filtered = hotels;

            if (filterData.city) {
                filtered = filtered.filter(hotel => hotel.location.toLowerCase().includes(filterData.city.toLowerCase()));
            }

            if (filterData.rooms && filterData.rooms.length > 0) {
                filtered = filtered.filter(hotel => filterData.rooms.includes(hotel.hotelChain));
            }

            if (filterData.priceRange) {
                console.log("Applying price filter with range:", filterData.priceRange);
                filtered = filtered.filter(hotel => hotel.price >= filterData.priceRange[0] && hotel.price <= filterData.priceRange[1]);
            }

            // if (filterData.ratings && filterData.ratings.length > 0) {
            //     filtered = filtered.filter(hotel => filterData.ratings.some(rating => hotel.rating >= rating));
            // }
            // Filter by ratings: Ensure only hotels with selected ratings are shown
            if (filterData.ratings && filterData.ratings.length > 0) {
                filtered = filtered.filter(hotel => filterData.ratings.includes(hotel.rating));
            }

            // console.log("Filtered results:", filtered);
            setFilteredHotels(filtered.length ? filtered : []);
        }
    }, [filterData, hotels]);

    if (hotelsLoading) {
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
                        placeholder="Find your Hotel..."
                        style={styles.input}
                        onChangeText={(text) => setSearchHotelName(text)}
                        value={searchHotelName}
                    />

                    <Pressable onPress={toggleFilterModal}>
                        <Image
                            style={[styles.icon, styles.filterIcon]}
                            source={require("../../assets/icons/filtericon.png")}
                        />
                    </Pressable>
                </View>
            </View>

            <HotelCard cardData={filteredHotels} listDirection={false} />

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
        width: "90%",
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

export default HotelHomeScreen;
