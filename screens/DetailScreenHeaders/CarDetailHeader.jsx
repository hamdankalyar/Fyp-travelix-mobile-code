import {
    StyleSheet,
    View,
    Text,
    Image,
} from "react-native";

import DetailHeader from "../../components/DetailHeader";
import CustomBackButton from "../../ui/CustomBackButton";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import SliderHeader from "../../components/SliderHeader";
import { Iconify } from "react-native-iconify";


import { FontSize } from "../../constants/GlobalStyles";
import { TouchableOpacity } from 'react-native';
import ReviewsModal from "../../components/Modal/ReviewModal";
import CarFeaturesModal from "../../components/Modal/CarFeaturesModal";


const CarDetailHeader = ({ place, handleBack, setModalVisible, modalVisible, reviewsModalVisible, setReviewsModalVisible }) => {
    return (
        <View style={styles.relativePosition}>
            <DetailHeader images={place.images} />
            <CustomBackButton onPress={handleBack} customStyle={styles.customStyle} />
            <View style={styles.contentPadding}>
                <View>
                    <View style={styles.titleRow}>
                        <Text style={styles.carModel}>{place.vehicleModel}</Text>
                        {/* <Ionicons name="heart-outline" size={30} color={Colors.bookMark} /> */}
                    </View>
                    <View style={styles.ratingRow}>
                        <View style={styles.ratingInnerRow}>
                            <AntDesign name="star" size={20} color={Colors.bookMark} />
                            <View style={styles.ratingText}>
                                
                                <Text style={styles.ratingNumber}>{parseFloat(place.rating).toFixed(1)}</Text>
                                <Text style={styles.reviewCount}>({place.noOfReviews} reviews)</Text>
                            </View>
                        </View>
                        <View style={styles.carTypeRow}>
                            <Text style={styles.vehicleType}>{place.vehicleType}</Text>
                            <Iconify icon='game-icons:race-car' size={40} color='#70dad3' />
                        </View>
                    </View>
                    <View style={styles.locationRow}>
                        <View style={styles.locationInnerRow}>
                            <Ionicons name="location" size={24} color={Colors.blueShadeColor} />
                            <Text style={styles.locationText}>{place.location}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceText}>{`${place.price}rs/per day`}</Text>
                            <Iconify icon='solar:tag-price-bold' size={20} color='#70dad3' />
                        </View>
                    </View>
                    <View style={styles.ownerRow}>
                        <View style={styles.ownerInnerRow}>
                            <Image source={{ uri: place.vehicleOwner.image }} style={styles.ownerImage} resizeMode="cover" />
                            <View>
                                <Text style={styles.ownerName}>{place.vehicleOwner.name}</Text>
                                <Text style={styles.ownerRole}>Car Owner</Text>
                            </View>
                        </View>
                        {/* <AntDesign name="message1" size={24} color={Colors.blueShadeColor} /> */}
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <SliderHeader leftText={"Car features"} rightText={"See all features"} />
                    </TouchableOpacity>

                    <CarFeaturesModal place={place} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                    <ReviewsModal
                        reviews={place.feedbacks}
                        modalVisible={reviewsModalVisible}
                        setModalVisible={setReviewsModalVisible}
                    />
                    <View>
                        {place.features.map((item, index) => (
                            <Text key={index} style={styles.featureText}>{item}</Text>
                        ))}
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>{place.description}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setReviewsModalVisible(true)}>
                        <SliderHeader leftText={"Reviews"} rightText={"See all reviews"} />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default CarDetailHeader


const styles = StyleSheet.create({
    relativePosition: {
        position: "relative",
    },
    customStyle: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        height: 50,
        width: 50,
        backgroundColor: "white",
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1,
    },
    contentPadding: {
        padding: 20,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",


    },
    carModel: {
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 20,
        letterSpacing: -0.6,
    },
    ratingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,

    },
    ratingInnerRow: {
        flexDirection: "row",
        width: "50%",
        gap: 5,
    },
    ratingText: {
        fontSize: FontSize.size_base,
        fontFamily: "SF-Pro-Text-Light",
        flexDirection: "row",
        alignItems: "center",

    },
    ratingNumber: {
        fontSize: 18,
        fontFamily: "SF-Pro-Text-Medium",
        alignItems: "center",
    },
    reviewCount: {
        fontSize: 14,
        fontFamily: "SF-Pro-Text-Light",
        alignItems: "center",
        marginLeft: 4,
    },
    carTypeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    carType: {
        fontSize: 16,
        fontFamily: "SF-Pro-Text-Light",
    },
    locationRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
    },
    locationInnerRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "50%",
        gap: 5,
    },
    locationText: {
        fontSize: 16,
        fontFamily: "SF-Pro-Text-Light",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    priceText: {
        fontSize: 16,
        fontFamily: "SF-Pro-Text-Light",
    },
    ownerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
    },
    ownerInnerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    ownerImage: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "lightgray",
    },
    ownerName: {
        fontFamily: "SF-Pro-Text-Medium",
        color: Colors.textColor,
    },
    ownerRole: {
        fontFamily: "SF-Pro-Text-Light",
        color: Colors.placeholderColor,
    },
    featureText: {
        paddingVertical: 5,
        fontSize: 14,
        fontFamily: "SF-Pro-Text-Light",
        color: Colors.textColor,
    },
    descriptionContainer: {
        flex: 1,
    },
    descriptionTitle: {
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 18,
        color: Colors.textColor,
        letterSpacing: -0.5,
        marginTop: 20,
        marginBottom: 10,
    },
    descriptionText: {
        paddingVertical: 5,
        fontSize: 14,
        fontFamily: "SF-Pro-Text-Light",
        color: Colors.textColor,
    },

});



