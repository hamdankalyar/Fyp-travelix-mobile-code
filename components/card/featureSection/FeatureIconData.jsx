import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
  Padding,
} from "../../../constants/GlobalStyles";
import { Iconify } from "react-native-iconify";
const FeatureIconData = ({ icon }) => {

  const featureName = (iconName) => {
    switch (iconName) {
      case '⚙️ Automatic transmission':
        return 'Automatic';
      case 'Sedan':
        return 'Sedan';
      case 'manual':
        return 'Manual';
      case '🌬️ Air conditioning':
        return 'AC';
      case 'Cultural experience 🏛️':
        return 'Cultural Experience';
      case 'Food':
        return 'Food';
      case 'City guide included 🗺️':
        return 'City Guide';
      case '🌐 Free Wi-Fi':
        return 'WIFI';
      case '🏋️‍♀️ Gym':
        return 'Gym';
      case '🚗 Valet parking':
        return 'Parking';
      case '🛏️ King-sized bed':
        return 'King-sized Bed';
      case '📺 Flat-screen TV':
        return 'Flat-screen TV';
      case '🍳 Complimentary breakfast':
        return 'Complimentary Breakfast';
      case '🏊‍♂️ Access to swimming pool':
        return 'Swimming Pool Access';
      case '📍 GPS navigation':
        return '📍 GPS Navigation';
      case '📱 Bluetooth connectivity':
        return '📱 Bluetooth Connectivity';
      case '👶 Child seat available upon request':
        return 'Child Seat Available';
      case '🛣️ Unlimited mileage':
        return 'Unlimited Mileage';
      case '🆘 Roadside assistance':
        return 'Roadside Assistance';
      case '5-star hotel accommodation 🏨':
        return '5-star Hotel Accommodation';
      case 'Private chauffeur service 🚗':
        return 'Private Chauffeur Service';
      case 'Spa and wellness treatments 💆':
        return 'Spa and Wellness Treatments';
      case 'Gourmet dining experiences 🍷':
        return 'Gourmet Dining Experiences';
      case 'Exclusive access to cultural events 🎭':
        return 'Exclusive Access to Cultural Events';
      case 'Luxurious cruise or yacht trip ⛴️':
        return 'Luxurious Cruise or Yacht Trip';
      case 'Personalized concierge service 🤵':
        return 'Personalized Concierge Service';
      case 'Private tours of historic sites 🏛️':
        return 'Private Tours of Historic Sites';
      case 'Helicopter tours of scenic landscapes 🚁':
        return 'Helicopter Tours of Scenic Landscapes';
      case 'Round-the-clock room service 🍽️':
        return 'Round-the-clock Room Service';
      default:
        return iconName; // Return the original name if no match is found
    }
  };
  
  const renderIcon = (iconName) => {

    switch (iconName) {
      case 'Sedan':
        // return <Iconify icon='game-icons:race-car' size={20} color='#70dad3' />;
        return <Iconify icon='game-icons:gear-stick' size={20} color='#70dad3' />;
      case '⚙️ Automatic transmission':
        return <Iconify icon='mdi:automatic' size={20} color='#70dad3' />;
      case 'manual':
        return <Iconify icon='game-icons:gear-stick' size={20} color='#70dad3' />;
      case '🌬️ Air conditioning':
        return <Iconify icon='material-symbols:mode-cool' size={20} color='#70dad3' />;
      case 'Cultural experience 🏛️':
        return <Iconify icon='maki:landmark' size={20} color='#70dad3' />;
      case 'Food 🍳':
        return <Iconify icon='mdi:food-outline' size={20} color='#70dad3' />;
      case 'City guide included 🗺️':
        return <Iconify icon='ic:twotone-map' size={20} color='#70dad3' />;
      case '🌐 Free Wi-Fi':
        return <Iconify icon='ic:outline-wifi' size={20} color='#70dad3' />;
      case '🏋️‍♀️ Gym':
        return <Iconify icon='mdi:gym' size={20} color='#70dad3' />;
      case '🚗 Valet parking':
        return <Iconify icon='fluent:vehicle-car-parking-48-filled' size={20} color='#70dad3' />;
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.featureChild}>
      {renderIcon(icon)}
      <Text style={styles.featureIconText}>{featureName(icon)}</Text>
    </View>
  );
};

export default FeatureIconData;

const styles = StyleSheet.create({
  featureChild: {
    alignItems: 'center',
    justifyContent: 'center', // Ensures the icon and text are centered within the child
    // width: 20, // Adjust the width as necessary
   marginHorizontal: 1, // This sets even spacing on left and right
  },
  featureIconText: {
    marginTop: 4, // Adjusted for alignment
    fontSize: FontSize.size_2xs,
    color: Color.placeholderColor,
    letterSpacing: 0.1,
    fontFamily: FontFamily.SFRegular,
  },
});