import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const ImageCarousel = ({ images }) => {
  // This function renders each item in the carousel
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: Dimensions.get('window').width,
    height: 200, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});

export default ImageCarousel;
