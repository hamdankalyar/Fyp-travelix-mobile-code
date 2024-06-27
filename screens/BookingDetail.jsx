import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { Platform } from "react-native";
import { useState } from "react";
import React from "react";
import { Input, VStack, Box, Select, CheckIcon } from "native-base";
import LargButton from "../ui/LargButton";
import CountriesArr from "../utilities/CountriesArr";

const BookingDetail = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [gender, setGender] = React.useState("Male");
  const [userData, setUserData] = useState({
    title: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    cnicNo: "",
    email: "",
    phone: "",
  });

  const handleUserData = (input, value) => {
    setUserData((preData) => ({ ...preData, [input]: value }));
  };

  const handleNext = () => {
    const titleIsValid = userData.title.length >= 2;
    const nameIsValid = userData.name.length > 3;
    const surnameIsValid = userData.surname.length > 3;
    const dateOfBirthIsValid = userData.dateOfBirth.length >= 6;
    const cnicNoIsValid = userData.cnicNo.length > 11;
    const emailIsValid =
      userData.email.includes("@") && userData.email.length > 6;
    const phoneIsValid = userData.phone.length > 8;

    
    navigation.navigate("PaymentScreen");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView>
        <View style={{ padding: 20 }}>
          <VStack space={5} alignItems="center">
            <VStack space={4} alignItems="flex-start" flexDirection={"row"}>
              <View style={{ width: "20%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>Title</Text>
                <Input
                  variant="rounded"
                  placeholder="Mr./Mrs."
                  value={userData.title}
                  onChangeText={(value) => handleUserData("title", value)}
                />
              </View>
              <View style={{ width: "40%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>Given name</Text>
                <Input
                  variant="rounded"
                  placeholder="name"
                  value={userData.name}
                  onChangeText={(value) => handleUserData("name", value)}
                />
              </View>
              <View style={{ width: "40%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>Surname</Text>
                <Input
                  variant="rounded"
                  placeholder="surname"
                  value={userData.surname}
                  onChangeText={(value) => handleUserData("surname", value)}
                />
              </View>
            </VStack>
            <VStack space={4} alignItems="flex-start" flexDirection={"row"}>
              <View style={{ width: "100%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>DOB</Text>
                <Input
                  variant="outline"
                  placeholder="DD/MM/YYYY"
                  value={userData.dateOfBirth}
                  onChangeText={(value) => handleUserData("dateOfBirth", value)}
                />
              </View>
            </VStack>
            <VStack space={4} alignItems="flex-start" flexDirection={"row"}>
              <View style={{ width: "100%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>Gender</Text>

                <Select
                  selectedValue={gender}
                  accessibilityLabel="Choose gender"
                  placeholder="Choose gender"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setGender(itemValue)}
                >
                  <Select.Item defaultValue label="Male" value="male" />
                  <Select.Item label="Female" value="female" />
                </Select>
              </View>
            </VStack>
            <VStack space={4} alignItems="flex-start" flexDirection={"row"}>
              <View style={{ width: "100%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>Country</Text>
                <Box>
                  <Select
                    selectedValue={selectedCountry}
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder="Choose Service"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                  >
                    {CountriesArr.map((country, index) => (
                      <Select.Item
                        key={index}
                        label={country}
                        value={country}
                      />
                    ))}
                  </Select>
                </Box>
              </View>
            </VStack>
            <VStack space={4} alignItems="flex-start" flexDirection={"row"}>
              <View style={{ width: "100%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>CNIC No.</Text>
                <Input
                  variant="rounded"
                  placeholder="xxxxx-xxxxxxx-x"
                  value={userData.cnicNo}
                  onChangeText={(value) => handleUserData("cnicNo", value)}
                />
              </View>
            </VStack>
            <VStack space={4} alignItems="flex-start" flexDirection={"row"}>
              <View style={{ width: "50%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>Email</Text>
                <Input
                  variant="rounded"
                  placeholder="abc@gmail.com"
                  value={userData.email}
                  onChangeText={(value) => handleUserData("email", value)}
                />
              </View>
              <View style={{ width: "50%", display: "flex", gap: 10 }}>
                <Text style={styles.labelText}>Phone</Text>
                <Input
                  variant="rounded"
                  placeholder="+92 *********"
                  value={userData.phone}
                  onChangeText={(value) => handleUserData("phone", value)}
                />
              </View>
            </VStack>

            <LargButton text="Next" onPress={handleNext} />
          </VStack>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({});
