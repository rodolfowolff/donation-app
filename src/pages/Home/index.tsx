import React from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { Header } from "../../components/common";

import { Container } from "../../styles/global.style";
import * as S from "./styles";
import Icon from "@expo/vector-icons/FontAwesome5";
import CardOng from "../../components/common/CardOng";

const Home = () => {
  const { colors } = useTheme();
  const testeRender = () => <CardOng />;

  return (
    <Container>
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
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={testeRender}
        />
      </S.ContentHome>
    </Container>
  );
};

export default Home;
