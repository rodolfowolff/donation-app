import React from "react";
import { FlatList, Text, StatusBar } from "react-native";
import { useTheme } from "styled-components/native";
import { Header } from "../../components/common";

import { ScrollContent } from "../../styles/global.style";
import * as S from "./styles";
import Icon from "@expo/vector-icons/FontAwesome5";

const testeRender = () => <Text>teste</Text>;

const Home = () => {
  const { colors } = useTheme();
  return (
    <ScrollContent>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <S.ContentHome>
        <Header
          rightComponent={<Icon name="bell" size={24} color={colors.black} />}
        />
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => item.toString()}
          renderItem={testeRender}
        />
      </S.ContentHome>
    </ScrollContent>
  );
};

export default Home;
