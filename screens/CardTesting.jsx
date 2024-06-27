import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import useGeocoding from '../hook/useGeocoding';

const GeocodingExample = () => {
    const [input, setInput] = useState('');
    const { coordinates, error } = useGeocoding(input);

    return (
        <View>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Enter city and country"
            />
            <Button title="Get Coordinates" onPress={() => { }} />
            {coordinates && (
                <Text>
                    Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
                </Text>
            )}
            {error && <Text>{error}</Text>}
        </View>
    );
};

export default GeocodingExample;
