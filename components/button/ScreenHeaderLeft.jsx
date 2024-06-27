import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'
import { Iconify } from 'react-native-iconify';
import { useNavigation } from "@react-navigation/native";
const HeaderLeft = () => {
    const navigation = useNavigation();
  return (
    <Pressable
    
    onPress={() => navigation.goBack()}>
      <Text>
      <Iconify icon="ion:chevron-back" size={24} color="black" />
      </Text>

    </Pressable>
  )
}

export default HeaderLeft

const styles = StyleSheet.create({})