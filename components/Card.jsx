import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";

import React from "react";
import { Colors } from "../constants/styles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Card = ({ item, key, index }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelectedDate = (date, itemS) => {
    toggleModal();
    navigation.navigate("DetailsScreen", {
      id: itemS.key,
      dateStr: date,
    });
  };

  return (
    <TouchableOpacity onPress={toggleModal}>
      <View style={styles.cardContainer} key={item.key}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={item.images[index]} // Use the getImage function here
              style={styles.image}
            />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.duration}>{item.duration}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text>
              <Text style={styles.currency}>PKR</Text>
              <Text style={styles.amount}>{item.amount}</Text>
            </Text>
          </View>
        </View>
      </View>

      <Modal
        key={key}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Available Dates</Text>
          {item.availableDates.map((date, index) => (
            <TouchableOpacity onPress={() => handleSelectedDate(date, item)}>
              <Text key={index} style={styles.dateText}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.buttonClose} onPress={toggleModal}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  currency: {
    fontSize: 12,
  },
  cardContainer: {
    backgroundColor: Colors.lightBlueShade,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: 300,
    margin: 10,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 0.4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    flex: 0.6,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "SF-Pro-Text-Bold",
  },
  duration: {
    color: Colors.placeholderColor,
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Light",
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: "SF-Pro-Text-Medium",
    marginBottom: 20,
  },
  amount: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 5,
    fontWeight: "bold",
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  dateText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
  },
  buttonClose: {
    backgroundColor: Colors.textColor,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    fontFamily: "SF-Pro-Text-Heavy",
    color: Colors.gradientButton,
    fontWeight: "bold",
    textAlign: "center",
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  countButton: {
    marginHorizontal: 10,
    fontSize: 20,
    color: Colors.primary,
  },
});
