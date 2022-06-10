import React from "react";
import { FlatList, Text, StatusBar } from "react-native";
import { ScrollContent } from "../../styles/global.style";

const Home = () => {
  return (
    <ScrollContent>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <Text>Home</Text>}
      />
      <Text>Home</Text>
    </ScrollContent>
  );
};

export default Home;
