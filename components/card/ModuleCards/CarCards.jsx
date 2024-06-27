import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import RatingSection from "../RatingSection";
import CardTitle from "../CardTitle";

import PriceTag from "../PriceTag";
import Favorite from "../Favorite";
import { useNavigation } from "@react-navigation/native";


const MainCard = ({ cardData }) => {
  const navigation = useNavigation();
  useEffect(() => {
    // Log the cardData to the console
    // console.log("Card Data:", cardData);
  }, [cardData]);
  const displayFeatures = cardData.features.slice(0, 3); // Get the first three features

  return (
    <View style={styles.sectionLayout}>
      <LinearGradient
        style={styles.CardGradientLayout}
        locations={[0, 1]}
        colors={["#ffff", "rgb(240, 240, 240)"]}
      >
        <Pressable
          style={styles.CardPressable}
          onPress={() => {
            navigation.navigate("CarDetailScreen", { id: cardData._id });
          }}
        >
          <Image
            style={styles.CardImg}
            resizeMode="cover"
            source={{ uri: `${cardData.images[0]}`   }}
          />
          <View style={styles.rightSection}>
            <View>
              <View>
                <RatingSection
                  rating={parseFloat(cardData.rating).toFixed(1)}
                  
                  noOfReviews={cardData.noOfReviews}
                />
                <CardTitle
                  title={cardData.vehicleModel}
                  city={`${cardData.location}, Pakistan`}
                />
              </View>
              <View style={styles.featureSection}>

                {displayFeatures.map((feature, index) => (
                  <Text key={index} style={styles.featureText}>
                    {feature}
                  </Text>
                ))}

              </View>
            </View>

            <PriceTag price={cardData.price} />
            {/* <Favorite /> */}
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const CarCard = ({ cardData, listDirection }) => {
  return (
    <FlatList
      data={cardData}
      horizontal={listDirection}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <MainCard cardData={item} />}
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
    />
  );
};

export default CarCard;

const styles = StyleSheet.create({
  // Styles for the Section
  sectionLayout: {
    minHeight: 200,
    marginTop: 21,
    width: 350,
    flexDirection: "row",
    marginRight: 10,
    borderRadius: 20,
    overflow: "hidden",
  },

  // Styles for the LinearGradient component
  CardGradientLayout: {
    flex: 1,
  },

  // Styles for the Pressable component
  CardPressable: {
    flex: 1,
    flexDirection: "row",
    minHeight: 200, // Moved minHeight here from sectionLayout
  },
  rightSection: {
    paddingLeft: 14,
    paddingVertical: 10,
    flex: 1, // Ensure this takes up the remaining space
  },
  // Styles for the Image components
  CardImg: {
    width: "40%",

  },
  featureSection: {
    marginTop: 12,
    flexDirection: "row",
    gap: 5, // This will add spacing between the icons
    justifyContent: "flex-start", // This will distribute spacing evenly
    alignItems: "center", // Ensures vertical alignment is centered
    flexWrap: "wrap",
  },
  featureText: {
    fontSize: 12,
    color: "#000",
    padding: 5,

  }
});
