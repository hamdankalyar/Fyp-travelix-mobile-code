import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

const RoomsAndBeds = () => {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  return (
    <View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>Rooms</Text>
        <Pressable style={styles.numberCotainer}>
          <Pressable
            onPress={() => setRooms(Math.max(1, rooms - 1))}
            style={styles.plusMinusContainer}
          >
            <Text style={styles.plusMinusText}>-</Text>
          </Pressable>

          <Text style={styles.numberText}>{rooms}</Text>

          <Pressable
            onPress={() => setRooms(rooms + 1)}
            style={styles.plusMinusContainer}
          >
            <Text style={styles.plusMinusText}>+</Text>
          </Pressable>
        </Pressable>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>Adults</Text>
        <Pressable style={styles.numberCotainer}>
          <Pressable
            onPress={() => setAdults(Math.max(1, adults - 1))}
            style={styles.plusMinusContainer}
          >
            <Text style={styles.plusMinusText}>-</Text>
          </Pressable>

          <Text style={styles.numberText}>{adults}</Text>

          <Pressable
            onPress={() => setAdults(adults + 1)}
            style={styles.plusMinusContainer}
          >
            <Text style={styles.plusMinusText}>+</Text>
          </Pressable>
        </Pressable>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>Children</Text>
        <Pressable style={styles.numberCotainer}>
          <Pressable
            onPress={() => setChildren(Math.max(0, children - 1))}
            style={styles.plusMinusContainer}
          >
            <Text style={styles.plusMinusText}>-</Text>
          </Pressable>

          <Text style={styles.numberText}>{children}</Text>

          <Pressable
            onPress={() => setChildren(children + 1)}
            style={styles.plusMinusContainer}
          >
            <Text style={styles.plusMinusText}>+</Text>
          </Pressable>
        </Pressable>
      </View>
    </View>
  );
};

export default RoomsAndBeds;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rowText: {
    color: Colors.textColor,
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Regular",
  },
  numberCotainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  numberText: {
    color: Colors.buttonAndIcons,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  plusMinusText: {
    color: Colors.buttonAndIcons,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    // paddingHorizontal: 6,
    flex: 1,
  },
  plusMinusContainer: {
    // flex: 1,
    backgroundColor: "#E8F3F3",
    // borderWidth: 0.5,
    width: 26,
    height: 26,
    borderRadius: 50,
    justifyContent: "center", // Center content vertically
    alignItems: "center",
  },
});
