// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
//     TextInput,
// } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import PriceSlider from "../../components/input/PriceSlider";
// import { Colors } from "../../constants/styles";
// import { Feather } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import Type from "../../components/button/Type";

// const ratings = [1, 2, 3, 4, 5];

// const TravelFilterScreen = ({ setFilterDataa }) => {
//     const [selectedCity, setSelectedCity] = useState("");
//     const [selectedRating, setSelectedRating] = useState([]);
//     const [filterData, setFilterData] = useState({
//         city: selectedCity,
//         ratings: selectedRating,
//         priceRange: priceRange,
//     });

//     const [priceRange, setPriceRange] = useState([2000, Infinity]);

//     const handlePress = (rating) => {
//         if (selectedRating.includes(rating)) {
//             setSelectedRating(selectedRating.filter((item) => item !== rating));
//         } else {
//             setSelectedRating([...selectedRating, rating]);
//         }
//     };

//     const handleValueChange = (low, high) => {
//         setPriceRange([low, high]);
//     };

//     const handleReset = () => {
//         setSelectedCity("");
//         setSelectedRating([]);
//         setPriceRange([100, 999999]);
//         // console.log(priceRange, selectedCity, selectedFeatures, selectedRating);
//     };

//     const handleShowResult = () => {
//         setFilterData({
//             city: selectedCity,
//             ratings: selectedRating,
//             priceRange: priceRange,
//         });
//         // onFilter(filterData);
//         // console.log(filterData);
//     };

//     useEffect(() => {
//         setFilterDataa(filterData);
//     }, [filterData]);

//     // price, vehicleType, location, rating, vehicleModel

//     return (
//         <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//             <View style={styles.MainContainer}>
//                 <View style={styles.HeaderContainer}>
//                     <Text style={[styles.title18, { width: "90%", textAlign: "center" }]}>
//                         Advance Filter
//                     </Text>
//                 </View>

//                 <Text style={[styles.title16, { marginTop: 15, marginBottom: 10 }]}>
//                     Location
//                 </Text>

//                 <View style={styles.cityInput}>
//                     <TextInput
//                         style={styles.cityInputBox}
//                         placeholder="Enter City Name"
//                         onChangeText={(text) => setSelectedCity(text)}
//                         value={selectedCity}
//                     />
//                 </View>

//                 <Text style={[styles.title16, { marginTop: 15, marginBottom: 10 }]}>
//                     Rating
//                 </Text>

//                 <View style={styles.facilitesContainer}>
//                     {ratings.map((rating, index) => (
//                         <Type
//                             key={index}
//                             text={rating}
//                             status={selectedRating.includes(rating) ? "active" : "disable"}
//                             onPress={() => handlePress(rating)}
//                         />
//                     ))}
//                 </View>

//                 <Text style={[styles.title16, { marginTop: 15, marginBottom: 10 }]}>
//                     Price Range
//                 </Text>
//                 <PriceSlider
//                     min={1}
//                     max={9999999}
//                     initialValues={priceRange}
//                     onValuesChange={(values) => setPriceRange(values)}
//                     handlePriceChange={handleValueChange}
//                 />

//                 <View style={styles.footerSection}>
//                     <TouchableOpacity
//                         onPress={handleReset}
//                         style={styles.resetIconContainer}
//                     >
//                         <Feather
//                             name="rotate-ccw"
//                             size={20}
//                             color={Colors.buttonAndIcons}
//                         />
//                         <Text style={styles.title16}>Reset all</Text>
//                     </TouchableOpacity>

//                     <LinearGradient
//                         style={styles.typeContainer}
//                         locations={[0, 1]}
//                         colors={["#70DAD3", "#35B5AE"]}
//                     >
//                         <TouchableOpacity
//                             onPress={handleShowResult}
//                             style={styles.touchable}
//                         >
//                             <Text style={styles.buttonText}>Show Result</Text>
//                         </TouchableOpacity>
//                     </LinearGradient>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// export default TravelFilterScreen;

// const styles = StyleSheet.create({
//     scrollViewContainer: {
//         flexGrow: 1,
//         backgroundColor: "white",
//     },
//     MainContainer: {
//         marginHorizontal: 15,
//         marginTop: 15,
//         paddingBottom: 50,
//     },
//     cityInput: {
//         borderRadius: 10,

//         borderColor: "#8ae1db",
//         borderWidth: 1,
//         // height: 48,
//         padding: 10,
//     },
//     HeaderContainer: {
//         flexDirection: "row",
//         marginBottom: 15,
//     },
//     touchable: {
//         width: "100%",
//     },
//     title18: {
//         fontFamily: "SF-Pro-Semibold",
//         fontSize: 18,
//         color: Colors.textColor,
//         fontWeight: "bold",
//     },
//     title16: {
//         fontFamily: "SF-Pro-Semibold",
//         fontSize: 16,
//         color: Colors.textColor,
//         fontWeight: "bold",
//     },
//     facilities: {
//         marginTop: 15,
//         marginBottom: 10,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     linkText: {
//         fontFamily: "SF-Pro-Text-Medium",
//         fontSize: 14,
//         fontWeight: "bold",
//         color: Colors.buttonAndIcons,
//     },
//     facilitesContainer: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         gap: 6,
//     },
//     footerSection: {
//         marginTop: 15,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     resetIconContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 5,
//     },
//     buttonText: {
//         color: "white",
//         textAlign: "center",
//         fontSize: 16,
//     },
//     typeContainer: {
//         borderRadius: 20,
//         overflow: "hidden",
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         elevation: 2,
//     },
//     // Styles for dropdown
//     dropdown: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#ccc",
//         padding: 10,
//         borderRadius: 5,
//     },
//     dropdownText: {
//         fontSize: 16,
//     },
//     dropdownContent: {
//         marginTop: 5,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 5,
//         overflow: "hidden",
//     },
//     dropdownItem: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: "#ccc",
//         backgroundColor: "#fff",
//     },
// });


import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import Type from "../../components/button/Type";
import { Colors } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

const ratings = [1, 2, 3, 4, 5];

const TravelFilterScreen = ({ setFilterDataa }) => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedRating, setSelectedRating] = useState([]);
    const [priceRange, setPriceRange] = useState([2000, 500000]);
    const [validRange, setValidRange] = useState([true, true]); // Tracks validity of min and max price inputs

    const handlePriceInputChange = (index, value) => {
        const numValue = parseInt(value, 10) || 0; // Default to 0 if parse fails
        let newRange = [...priceRange];
        newRange[index] = numValue;

        // Update slider and input validation
        setPriceRange(newRange);
        validateRange(newRange, index);
    };

    const validateRange = (range, index) => {
        let isValidMin = range[0] >= 0 && range[0] <= 1000000;
        let isValidMax = range[1] >= 0 && range[1] <= 1000000;
        if (range[0] > range[1]) {
            isValidMin = index === 1 ? false : isValidMin;
            isValidMax = index === 0 ? false : isValidMax;
        }
        setValidRange([isValidMin, isValidMax]);
    };

    const handleShowResult = () => {
        if (validRange[0] && validRange[1]) {
            const newFilterData = {
                city: selectedCity,
                ratings: selectedRating,
                priceRange: priceRange,
            };
            setFilterDataa(newFilterData);
        }
    };

    useEffect(() => {
        setFilterDataa({
            city: selectedCity,
            ratings: selectedRating,
            priceRange: priceRange,
        });
    }, [selectedCity, selectedRating, priceRange]);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.MainContainer}>
                <View style={styles.HeaderContainer}>
                    <Text style={styles.title18}>Advance Filter</Text>
                </View>

                <Text style={styles.title16}>Location</Text>
                <TextInput
                    style={styles.cityInput}
                    placeholder="Enter City Name"
                    onChangeText={setSelectedCity}
                    value={selectedCity}
                />

                <Text style={styles.title16}>Rating</Text>
                <View style={styles.facilitiesContainer}>
                    {ratings.map((rating, index) => (
                        <Type
                            key={index}
                            text={`${rating} Stars`}
                            status={selectedRating.includes(rating) ? "active" : "disable"}
                            onPress={() => {
                                const newRatings = selectedRating.includes(rating)
                                    ? selectedRating.filter(item => item !== rating)
                                    : [...selectedRating, rating];
                                setSelectedRating(newRatings);
                            }}
                        />
                    ))}
                </View>

                <Text style={styles.title16}>Price Range</Text>
                <Slider
                    value={priceRange}
                    onValueChange={(values) => {
                        setPriceRange(values);
                        validateRange(values, -1);
                    }}
                    maximumValue={1000000}
                    minimumValue={0}
                    step={1}
                    minimumTrackTintColor="#08adad"
                    maximumTrackTintColor="#ceebeb"
                    thumbTintColor="#08adad"
                />
                <View style={styles.priceInputContainer}>
                    <TextInput
                        style={[styles.priceInput, !validRange[0] && styles.invalidInput]}
                        value={String(priceRange[0])}
                        onChangeText={text => handlePriceInputChange(0, text)}
                        keyboardType="numeric"
                    />
                    <Text> to </Text>
                    <TextInput
                        style={[styles.priceInput, !validRange[1] && styles.invalidInput]}
                        value={String(priceRange[1])}
                        onChangeText={text => handlePriceInputChange(1, text)}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity onPress={handleShowResult} style={styles.resultButton}>
                    <Text style={styles.buttonText}>Show Result</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: "white",
    },
    MainContainer: {
        marginHorizontal: 15,
        marginTop: 15,
        paddingBottom: 50,
    },
    cityInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    HeaderContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    title18: {
        fontFamily: "SF-Pro-Semibold",
        fontSize: 18,
        color: Colors.textColor,
        fontWeight: "bold",
    },
    title16: {
        fontFamily: "SF-Pro-Semibold",
        fontSize: 16,
        color: Colors.textColor,
        fontWeight: "bold",
        marginBottom: 10,
    },
    facilitiesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    priceInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceInput: {
        width: 80,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    invalidInput: {
        borderColor: 'red',
    },
    resultButton: {
        backgroundColor: '#08adad',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default TravelFilterScreen;
