import React from "react";
import { View, StatusBar } from "react-native";
import Header from "../../components/common/Header";

const History = () => {
  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back title="History" />
    </View>
  );
};

export default History;
