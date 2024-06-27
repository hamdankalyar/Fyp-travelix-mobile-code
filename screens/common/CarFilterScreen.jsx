



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

const features = ["Sedan", "SUV", "Bus"];
const ratings = [1, 2, 3, 4, 5];

const CarFilterScreen = ({ setFilterDataa }) => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [priceRange, setPriceRange] = useState([200, 999999]);
    const [validRange, setValidRange] = useState([true, true]); // Tracks validity of min and max price inputs

    const handlePriceInputChange = (index, value) => {
        const numValue = parseInt(value, 10) || 0; // Default to 0 if parse fails
        let newRange = [...priceRange];
        newRange[index] = numValue;

        // Update slider and input validation
        setPriceRange(newRange);
        validateRange(newRange, index);
    };

    const handleRatingPress = (rating) => {
        setSelectedRating(prevRatings => {
            const isAlreadySelected = prevRatings.includes(rating);
            if (isAlreadySelected) {
                return prevRatings.filter(r => r !== rating);
            } else {
                return [...prevRatings, rating];
            }
        });
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
                carTypes: selectedFeatures,
                ratings: selectedRating,
                priceRange: priceRange,
            };
            setFilterDataa(newFilterData);
        }
    };

    useEffect(() => {
        setFilterDataa({
            city: selectedCity,
            carTypes: selectedFeatures,
            ratings: selectedRating,
            priceRange: priceRange,
        });
    }, [selectedCity, selectedFeatures, selectedRating, priceRange]);

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
                    {/* {ratings.map((rating, index) => (
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
                    ))} */}
                    {ratings.map((rating, index) => (
                        <Type
                            key={index}
                            text={`${rating} Stars`}
                            status={selectedRating.includes(rating) ? "active" : "disable"}
                            onPress={() => handleRatingPress(rating)}
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

                <Text style={styles.title16}>Car Type</Text>
                <View style={styles.facilitiesContainer}>
                    {features.map((feature, index) => (
                        <Type
                            key={index}
                            text={feature}
                            status={selectedFeatures.includes(feature) ? "active" : "disable"}
                            onPress={() => {
                                const newFeatures = selectedFeatures.includes(feature)
                                    ? selectedFeatures.filter(item => item !== feature)
                                    : [...selectedFeatures, feature];
                                setSelectedFeatures(newFeatures);
                            }}
                        />
                    ))}
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
    sliderText: {
        textAlign: 'center',
        marginVertical: 10,
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
    }
});

export default CarFilterScreen;
