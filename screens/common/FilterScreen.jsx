// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Pressable,
//   TextInput,
// } from "react-native";
// import { Slider } from "@miblanchard/react-native-slider";
// import { AntDesign } from "@expo/vector-icons";
// import PriceSlider from "../../components/input/PriceSlider";
// import { Colors } from "../../constants/styles";
// import { Feather } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import Type from "../../components/button/Type";
// import { useNavigation } from "@react-navigation/native";
// import useHotels from "../../hook/useHotels";

// const features = ["Deluxe Suite", "Executive Suite"];
// const ratings = [1, 2, 3, 4, 5];

// const FilterScreen = ({ setFilterDataa }) => {
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedRating, setSelectedRating] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState([]);
//   const [filterData, setFilterData] = useState({
//     city: selectedCity,
//     rooms: selectedFeatures,
//     ratings: selectedRating,
//     priceRange: priceRange,
//   });

//   const [priceRange, setPriceRange] = useState([0, 99999]);

//   const toggleFeature = (feature) => {
//     if (selectedFeatures.includes(feature)) {
//       setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
//     } else {
//       setSelectedFeatures([...selectedFeatures, feature]);
//     }
//   };

//   const handlePress = (rating) => {
//     if (selectedRating.includes(rating)) {
//       setSelectedRating(selectedRating.filter((item) => item !== rating));
//     } else {
//       setSelectedRating([...selectedRating, rating]);
//     }
//   };

//   const handleValueChange = (low, high) => {
//     setPriceRange([low, high]);
//   };

//   const handleReset = () => {
//     setSelectedCity("");
//     setSelectedRating([]);
//     setSelectedFeatures([]);

//     setPriceRange([0, 99999]);

//     // console.log(priceRange, selectedCity, selectedFeatures, selectedRating);
//   };
//   // ! jahanzaib changes 
//   // const handleShowResult = () => {
//   //   setFilterData({
//   //     city: selectedCity,
//   //     rooms: selectedFeatures,
//   //     ratings: selectedRating,
//   //     priceRange: priceRange,
//   //   });
//   //   // onFilter(filterData);
//   //   // console.log(filterData);
//   // };

//   const handleShowResult = () => {
//     const newFilterData = {
//       city: selectedCity,
//       rooms: selectedFeatures,
//       ratings: selectedRating,
//       priceRange: priceRange,
//     };
//     console.log("Updating filter data:", newFilterData);
//     setFilterData(newFilterData);  // Update local state
//     setFilterDataa(newFilterData); // Update parent state
//   };

//   // useEffect(() => {
//   //   setFilterData({
//   //     city: selectedCity,
//   //     rooms: selectedFeatures,
//   //     ratings: selectedRating,
//   //     priceRange: priceRange,
//   //   });
//   // }, [selectedCity, selectedFeatures, selectedRating, priceRange]);
//   useEffect(() => {
//     const newFilterData = {
//       city: selectedCity,
//       rooms: selectedFeatures,
//       ratings: selectedRating,
//       priceRange: priceRange,
//     };
//     setFilterData(newFilterData); // Ensure this only updates the local state
//   }, [selectedCity, selectedFeatures, selectedRating, priceRange]);

//   useEffect(() => {
//     setFilterDataa(filterData);
//   }, [filterData]);
//   useEffect(() => {
//     console.log("Price Range updated in FilterScreen:", priceRange);
//   }, [priceRange]);

//   useEffect(() => {
//     console.log("Filter data updated in FilterScreen:", filterData);
//   }, [filterData]);

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//       <View style={styles.MainContainer}>
//         <View style={styles.HeaderContainer}>
//           {/* <Pressable
//             onPress={() => {
//               navigation.goBack();
//             }}
//           >
//             <AntDesign name="left" size={20} color="black" />
//           </Pressable> */}
//           <Text style={[styles.title18, { width: "90%", textAlign: "center" }]}>
//             Advance Filter
//           </Text>
//         </View>

//         <Text style={[styles.title16, { marginTop: 15, marginBottom: 10 }]}>
//           Enter City Name
//         </Text>

//         <View style={styles.cityInput}>
//           <TextInput
//             style={styles.cityInputBox}
//             placeholder="Enter City Name"
//             onChangeText={(text) => setSelectedCity(text)}
//             value={selectedCity}
//           />
//         </View>

//         <Text style={[styles.title16, { marginTop: 15, marginBottom: 10 }]}>
//           Rating
//         </Text>

//         <View style={styles.facilitesContainer}>
//           {ratings.map((rating, index) => (
//             <Type
//               key={index}
//               text={rating}
//               status={selectedRating.includes(rating) ? "active" : "disable"}
//               onPress={() => handlePress(rating)}
//             />
//           ))}
//         </View>

//         <Text style={[styles.title16, { marginTop: 15, marginBottom: 10 }]}>
//           Price Range
//         </Text>
//         {/* <PriceSlider
//           min={1}
//           max={99999}
//           initialValues={priceRange}
//           onValuesChange={(values) => setPriceRange(values)}

//         /> */}



//         <View style={styles.facilities}>
//           <Text style={styles.title16}>Room Type</Text>
//         </View>
//         <View style={styles.facilitesContainer}>
//           {features.map((feature, index) => (
//             <Type
//               key={index}
//               text={feature}
//               status={selectedFeatures.includes(feature) ? "active" : "disable"}
//               onPress={() => toggleFeature(feature)}
//             />
//           ))}
//         </View>
//         <View style={styles.footerSection}>
//           <TouchableOpacity
//             onPress={handleReset}
//             style={styles.resetIconContainer}
//           >
//             <Feather
//               name="rotate-ccw"
//               size={20}
//               color={Colors.buttonAndIcons}
//             />
//             <Text style={styles.title16}>Reset all</Text>
//           </TouchableOpacity>

//           <LinearGradient
//             style={styles.typeContainer}
//             locations={[0, 1]}
//             colors={["#70DAD3", "#35B5AE"]}
//           >
//             <TouchableOpacity
//               onPress={handleShowResult}
//               style={styles.touchable}
//             >
//               <Text style={styles.buttonText}>Show Result</Text>
//             </TouchableOpacity>
//           </LinearGradient>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default FilterScreen;

// const styles = StyleSheet.create({
//   scrollViewContainer: {
//     flexGrow: 1,
//     backgroundColor: "white",
//   },
//   MainContainer: {
//     marginHorizontal: 15,
//     marginTop: 15,
//     paddingBottom: 50,
//   },
//   cityInput: {
//     borderRadius: 10,

//     borderColor: "#8ae1db",
//     borderWidth: 1,
//     // height: 48,
//     padding: 10,
//   },
//   HeaderContainer: {
//     flexDirection: "row",
//     marginBottom: 15,
//   },
//   touchable: {
//     width: "100%",
//   },
//   title18: {
//     fontFamily: "SF-Pro-Semibold",
//     fontSize: 18,
//     color: Colors.textColor,
//     fontWeight: "bold",
//   },
//   title16: {
//     fontFamily: "SF-Pro-Semibold",
//     fontSize: 16,
//     color: Colors.textColor,
//     fontWeight: "bold",
//   },
//   facilities: {
//     marginTop: 15,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   linkText: {
//     fontFamily: "SF-Pro-Text-Medium",
//     fontSize: 14,
//     fontWeight: "bold",
//     color: Colors.buttonAndIcons,
//   },
//   facilitesContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 6,
//   },
//   footerSection: {
//     marginTop: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   resetIconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   typeContainer: {
//     borderRadius: 20,
//     overflow: "hidden",
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     elevation: 2,
//   },
//   // Styles for dropdown
//   dropdown: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//   },
//   dropdownText: {
//     fontSize: 16,
//   },
//   dropdownContent: {
//     marginTop: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     overflow: "hidden",
//   },
//   dropdownItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     backgroundColor: "#fff",
//   },
// });


// import React, { useState, useEffect } from "react";
// import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
// import { Slider } from "@miblanchard/react-native-slider";
// import Type from "../../components/button/Type";
// import { StyleSheet } from "react-native";
// const features = ["Deluxe Suite", "Executive Suite"];
// const ratings = [1, 2, 3, 4, 5];

// const FilterScreen = ({ setFilterDataa }) => {
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedRating, setSelectedRating] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 99999]);

//   const handleShowResult = () => {
//     const newFilterData = {
//       city: selectedCity,
//       rooms: selectedFeatures,
//       ratings: selectedRating,
//       priceRange: priceRange,
//     };
//     setFilterDataa(newFilterData);
//   };

//   useEffect(() => {
//     setFilterDataa({
//       city: selectedCity,
//       rooms: selectedFeatures,
//       ratings: selectedRating,
//       priceRange: priceRange,
//     });
//   }, [selectedCity, selectedFeatures, selectedRating, priceRange]);

//   return (
//     <ScrollView>
//       <View>
//         <Text>Enter City Name</Text>
//         <TextInput
//           placeholder="Enter City Name"
//           onChangeText={setSelectedCity}
//           value={selectedCity}
//         />
//         <Text>Rating</Text>
//         {ratings.map((rating, index) => (
//           <Type
//             key={index}
//             text={rating}
//             status={selectedRating.includes(rating) ? "active" : "disable"}
//             onPress={() => {
//               const newRatings = selectedRating.includes(rating)
//                 ? selectedRating.filter((item) => item !== rating)
//                 : [...selectedRating, rating];
//               setSelectedRating(newRatings);
//             }}
//           />
//         ))}
//         <Text>Price Range</Text>
//         <Slider
//           value={priceRange}
//           onValueChange={setPriceRange}
//           maximumValue={99999}
//           minimumValue={0}
//           step={1}
//         />
//         <Text>
//           {priceRange[0].toFixed(0)} - {priceRange[1].toFixed(0)}
//         </Text>
//         <Text>Room Type</Text>
//         {features.map((feature, index) => (
//           <Type
//             key={index}
//             text={feature}
//             status={selectedFeatures.includes(feature) ? "active" : "disable"}
//             onPress={() => {
//               const newFeatures = selectedFeatures.includes(feature)
//                 ? selectedFeatures.filter((item) => item !== feature)
//                 : [...selectedFeatures, feature];
//               setSelectedFeatures(newFeatures);
//             }}
//           />
//         ))}
//         <TouchableOpacity onPress={handleShowResult}>
//           <Text>Show Result</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "white",
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   textInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   sliderContainer: {
//     marginBottom: 20,
//   },
//   sliderText: {
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   typeContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   typeButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     margin: 2,
//   },
//   typeButtonText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   typeButtonActive: {
//     backgroundColor: '#70DAD3',
//   },
//   typeButtonTextActive: {
//     color: 'white',
//   },
//   resultButton: {
//     backgroundColor: '#08adad',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   resultButtonText: {
//     fontSize: 16,
//     color: 'white',
//     fontWeight: 'bold',
//   }
// });



// export default FilterScreen;


import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import Type from "../../components/button/Type";

const features = ["Delux", "Exective", "Luxury"];
const ratings = [1, 2, 3, 4, 5];

const FilterScreen = ({ setFilterDataa }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 99999]);

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
  const handleShowResult = () => {
    const newFilterData = {
      city: selectedCity,
      rooms: selectedFeatures,
      ratings: selectedRating,
      priceRange: priceRange,
    };
    setFilterDataa(newFilterData);
  };

  useEffect(() => {
    setFilterDataa({
      city: selectedCity,
      rooms: selectedFeatures,
      ratings: selectedRating,
      priceRange: priceRange,
    });
  }, [selectedCity, selectedFeatures, selectedRating, priceRange]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Filter Options</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>City Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter City Name"
          onChangeText={setSelectedCity}
          value={selectedCity}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rating</Text>
        <View style={styles.typeContainer}>
          {/* {ratings.map((rating, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                const newRatings = selectedRating.includes(rating)
                  ? selectedRating.filter(item => item !== rating)
                  : [...selectedRating, rating];
                setSelectedRating(newRatings);
              }}
              style={[styles.typeButton, selectedRating.includes(rating) && styles.typeButtonActive]}
            >
              <Text style={[styles.typeButtonText, selectedRating.includes(rating) && styles.typeButtonTextActive]}>
                {rating} Stars
              </Text>
            </TouchableOpacity>
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
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Price Range</Text>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          maximumValue={99999}
          minimumValue={0}
          step={1}
          minimumTrackTintColor="#08adad"
          maximumTrackTintColor="#ceebeb"
          thumbTintColor="#08adad"
        />
        <Text style={styles.sliderText}>{priceRange[0].toFixed(0)} - {priceRange[1].toFixed(0)}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hotel Type</Text>
        <View style={styles.typeContainer}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                const newFeatures = selectedFeatures.includes(feature)
                  ? selectedFeatures.filter(item => item !== feature)
                  : [...selectedFeatures, feature];
                setSelectedFeatures(newFeatures);
              }}
              style={[styles.typeButton, selectedFeatures.includes(feature) && styles.typeButtonActive]}
            >
              <Text style={[styles.typeButtonText, selectedFeatures.includes(feature) && styles.typeButtonTextActive]}>
                {feature}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={handleShowResult} style={styles.resultButton}>
        <Text style={styles.resultButtonText}>Show Results</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
  },
  typeButtonText: {
    fontSize: 14,
    color: '#333',
  },
  typeButtonActive: {
    backgroundColor: '#70DAD3',
  },
  typeButtonTextActive: {
    color: 'white',
  },
  resultButton: {
    backgroundColor: '#08adad',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  resultButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  }
});

export default FilterScreen;


