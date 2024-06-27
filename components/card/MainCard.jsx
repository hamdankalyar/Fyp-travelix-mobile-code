import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import RatingSection from "./RatingSection";
import CardTitle from "./CardTitle";

import PriceTag from "./PriceTag";
import Favorite from "./Favorite";
import { useNavigation } from "@react-navigation/native";
import FeatureIconData from "./featureSection/FeatureIconData";
const MainCard = ({ cardData }) => {
  const navigation = useNavigation();
  useEffect(() => {
    // Log the cardData to the console
    // console.log("Card Data:", cardData);
  }, [cardData]);
  return (
    <View style={styles.sectionLayout}>
      <LinearGradient
        style={styles.CardGradientLayout}
        locations={[0, 1]}
        colors={["#ffff", "rgb(240, 240, 240)"]}
      >
        <Pressable
          style={styles.CardPressable}
          // onPress={() => { navigation.navigate("DetailScreen"); }}
        >
          <Image
            style={styles.CardImg}
            contentFit="cover"
            source={{ uri: cardData.images[0] }}
          />
          <View style={styles.rightSection}>
            <View>
              <View>
                <RatingSection
                  rating={cardData.rating}
                  noOfReviews={cardData.noOfReviews}
                />
                <CardTitle
                  title={cardData.carModel}
                  city={`${cardData.location}, Pakistan`}
                />
              </View>
              <View style={styles.featureSection}>
                {cardData.features.map((data, index) => (
                  <FeatureIconData key={index} icon={data} />
                ))}
              </View>
            </View>

            <PriceTag price={cardData.price} />
            <Favorite />
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default MainCard;

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
  },
  rightSection: {
    paddingLeft: 14,
    paddingVertical: 10,
  },
  // Styles for the Image components
  CardImg: {
    width: "40%",
    height: "100%",
  },
  featureSection: {
    marginTop: 12,
    flexDirection: "row",
    gap: 5, // This will add spacing between the icons
    justifyContent: "flex-start", // This will distribute spacing evenly
    alignItems: "center", // Ensures vertical alignment is centered
    flexWrap: "wrap",
  },
});
