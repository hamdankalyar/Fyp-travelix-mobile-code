// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// const BookingCard = ({ booking }) => {
//   const { bookedItem, paymentType, bookingAt, isStatus } = booking;
//   const { bookingDate, item, price } = bookedItem;

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const bookingStatus = isStatus ? "Confirmed" : "Pending";

//   const getItemDetails = () => {
//     if (!item) {
//       return <Text style={styles.detail}>Price: ${price} (No additional details available)</Text>;
//     }

//     // Determine what type of item it is and render accordingly
//     let title, description;
//     if (item.title) {
//       title = item.title; // Tour
//       description = item.description;
//     } else if (item.vehicleModel) {
//       title = item.vehicleModel; // Vehicle
//       description = `A superb ${item.vehicleModel} for your journey.`;
//     } else if (item.hotelName) {
//       title = item.hotelName; // Hotel
//       description = `Enjoy your stay at ${item.hotelName}.`;
//     }

//     return (
//       <>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.description}>{description}</Text>
//         {item.images && item.images[0] && (
//           <Image source={{ uri: item.images[0] }} style={styles.image} />
//         )}
//         {item.duration && <Text style={styles.detail}>Duration: {item.duration} days</Text>}
//         <Text style={styles.detail}>Price: ${price}</Text>
//       </>
//     );
//   };

//   return (
//     <View style={styles.cardContainer}>
//       <Text style={styles.dateText}>{formatDate(bookingAt)} - {bookingStatus}</Text>
//       {getItemDetails()}
//       <Text style={styles.paymentType}>Payment Method: {paymentType}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 5,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 14,
//     color: '#444',
//     marginBottom: 5,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   detail: {
//     fontSize: 14,
//     color: '#444',
//   },
//   paymentType: {
//     fontSize: 14,
//     color: '#444',
//     marginTop: 5,
//   }
// });

// export default BookingCard;


import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BookingCard = ({ booking }) => {
    const { bookedItem, paymentType, bookingAt, isStatus } = booking;
    const { bookingDate, item, price } = bookedItem;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const bookingStatus = isStatus ? "Confirmed" : "Pending";

    const getItemDetails = () => {
        if (!item) {
            return <Text style={styles.detail}>Price: ${price} (No additional details available)</Text>;
        }

        let title, description;
        if (item.title) {
            title = item.title;
            description = item.description;
        } else if (item.vehicleModel) {
            title = item.vehicleModel;
            description = `A superb ${item.vehicleModel} for your journey.`;
        } else if (item.hotelName) {
            title = item.hotelName;
            description = `Enjoy your stay at ${item.hotelName}.`;
        }

        return (
            <>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                {item.images && item.images[0] && (
                    <Image source={{ uri: item.images[0] }} style={styles.image} />
                )}
                {item.duration && <Text style={styles.detail}>Duration: {item.duration} days</Text>}
                <Text style={styles.detail}>Price: ${price}</Text>
            </>
        );
    };

    return (
        <LinearGradient
            locations={[0, 1]}
            colors={["#d9dddd", "rgb(240, 240, 240)"]}
            style={styles.cardContainer}
        >
            <Text style={styles.dateText}>{formatDate(bookingAt)} - {bookingStatus}</Text>
            {getItemDetails()}
            <Text style={styles.paymentType}>Payment Method: {paymentType}</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    dateText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 150,  // Adjusted for a smaller size
        borderRadius: 5,
        marginBottom: 5,
    },
    detail: {
        fontSize: 14,
        color: '#444',
    },
    paymentType: {
        fontSize: 14,
        color: '#444',
        marginTop: 5,
    }
});

export default BookingCard;
