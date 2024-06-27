import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const HotelDateRoom = () => {
  return (
    <View style={styles.DateAndRoomContainer}>
      <View>
        <View style={styles.iconSection}>
          <MaterialIcons
            name="date-range"
            size={20}
            color={Colors.buttonAndIcons}
          />
          <Text style={styles.dimText13}>Select Date</Text>
        </View>
        <Text style={styles.title16}>26,Dec - 29,Dec</Text>
      </View>
      <View style={styles.line}></View>
      <View>
        <View style={styles.iconSection}>
          <Ionicons name="bed-sharp" size={20} color={Colors.buttonAndIcons} />
          <Text style={styles.dimText13}>Number of Rooms</Text>
        </View>
        <Text style={styles.title16}>1 Room - 2 Adults</Text>
      </View>
    </View>
  );
};

export default HotelDateRoom;

const styles = StyleSheet.create({
  DateAndRoomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: Colors.placeholderColor,
    marginHorizontal: 10,
  },
  iconSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  title16: {
    fontFamily: "SF-Pro-Semibold",
    fontSize: 16,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  dimText13: {
    fontFamily: "SF-Pro-Text-Regular",
    fontSize: 13,
    color: Colors.placeholderColor,
    // fontWeight: 'bold',
  },
});
