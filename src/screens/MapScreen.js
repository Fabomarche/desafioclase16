import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView,{ Marker } from "react-native-maps";
import IonicIcons from '@expo/vector-icons/Ionicons'
import colors from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MapScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState()

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const handlePickeLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  const handleSaveLocation = () => {
    if(selectedLocation) {
      navigation.navigate('NewPlace', { mapLocation: selectedLocation })
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveLocation}>
          <IonicIcons 
            name='md-save-sharp'
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      )
    })
  }, [navigation, selectedLocation])

  return (
    <MapView 
      initialRegion={initialRegion} 
      style={styles.container} 
      onPress={handlePickeLocation}
    >
      {selectedLocation && (
        <Marker 
          title="ubicación selecionada"
          coordinate={{
          ...selectedLocation,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        }}
        />
      )}
    </MapView>
  );
};

export default MapScreen;
