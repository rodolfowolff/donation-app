import React from "react";
import { View, Text, StatusBar } from "react-native";

const Profile = () => {
  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
