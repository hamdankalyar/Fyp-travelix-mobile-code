import React from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import Card from "./Card";
const DisplayCard = ({ items }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item,index }) => <Card item={item} key={item.key}  index={index}/>}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

export default DisplayCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});
