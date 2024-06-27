import { StyleSheet, Text, View, Image, TextInput,Pressable } from 'react-native';
import React from 'react';
import { Color, Border, FontFamily, FontSize, Padding } from "../../../constants/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
const Searchbar = ({ placeholder }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.searchBar}>
      <Image
        style={[styles.icon, styles.searchIcon]}
        source={require("../../../assets/icons/searchicon.png")}
      />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
      />
      <Pressable onPress={() => { navigation.navigate("FilterScreen"); }}>

        <Image
          style={[styles.icon, styles.filterIcon]}
          source={require("../../../assets/icons/filtericon.png")}
        />
      </Pressable>
    </View>
  )
}

export default Searchbar;

const styles = StyleSheet.create({



  searchBar: {
    

    borderRadius: Border.br_53xl,
    backgroundColor: Color.colorWhitesmoke,
    borderColor: Color.colorGainsboro,
    borderWidth: 0.8,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    paddingHorizontal: 10, // Add some padding
    flexGrow: 1, // Allow the bar to grow to fill the available space
  },

  input: {
    flex: 1, // Take up all available space
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.SFRegular,
    letterSpacing: 0.3,
    paddingVertical:0,
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
});
