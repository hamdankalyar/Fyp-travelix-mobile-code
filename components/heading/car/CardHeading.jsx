import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, Border, FontFamily, FontSize, Padding } from "../../../constants/GlobalStyles";
import { Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const CardHeading = ({ heading, subHeading,navigating }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.SectionHeading}>
      <View>
        <Text style={styles.Heading}>
          {heading}
        </Text>
        <Text style={styles.SubHeading}>
          {subHeading}
        </Text>
      </View>
      <Pressable onPress={() => {
        navigation.navigate(navigating)
      }}>
        <Text style={styles.seeAll}>See all</Text>
      </Pressable>
    </View>
  )
}

export default CardHeading

const styles = StyleSheet.create({

  SectionHeading: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 21
  },
  Heading: {
    lineHeight: 23,
    fontSize: FontSize.size_lg,
    color: Color.text,
    letterSpacing: 0.2,
    fontFamily: FontFamily.SFBold,
    fontWeight: "900",
  },

  SubHeading: {
    lineHeight: 17,
    color: Color.placeholderColor,
    fontFamily: FontFamily.SFRegular,
    fontSize: FontSize.size_smi,
    marginTop: 4,
    letterSpacing: 0.2,
  },
  seeAll: {
    color: Color.buttonAndIcons,
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    letterSpacing: 0.2,
    fontFamily: FontFamily.SFMedium,
    fontWeight: "500",
  },
})