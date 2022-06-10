import React from "react";
import { View, Text, StatusBar } from "react-native";

const Favorites = () => {
  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Text>Favorites</Text>
    </View>
  );
};

export default Favorites;
