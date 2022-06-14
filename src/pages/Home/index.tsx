import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../../context/auth";
import { useRegister } from "../../context/register";
import { useTheme } from "styled-components";

import { Header, Typography, Input, Loading } from "../../components/common";
import { Container } from "../../styles/global.style";
import * as S from "./styles";
import Icon from "@expo/vector-icons/FontAwesome5";
import CardOng from "../../components/common/CardOng";

const Home = () => {
  const { setIsAuth, personalData } = useAuth();
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);

  const testeRender = () => <CardOng />;

  console.log("personalData: ", personalData);

  const handleLogout = async () => {
    setLoading(true);

    await AsyncStorage.clear();
    setIsAuth(false);

    Alert.alert("Sucesso", "Você saiu com sucesso!");
    setLoading(false);

    return;
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <S.ContentHome>
        <Header
          leftComponent={
            <View>
              <Typography color="black" size="xlarge" weight="bold">
                Olá,{" "}
                {personalData.firstName
                  ? personalData.firstName
                  : personalData.name}
              </Typography>
              <Typography color="gray" size="medium" weight="regular">
                {personalData.firstName
                  ? "Encontre ONGs que precisam de sua ajuda."
                  : "Seja bem-vindo(a) ao app."}
              </Typography>
            </View>
          }
          rightComponent={<Icon name="bell" size={24} color={colors.black} />}
        />

        <TouchableOpacity onPress={() => handleLogout()}>
          <Typography color="black" size="xlarge" weight="bold">
            Deslogar teste
          </Typography>
        </TouchableOpacity>

        <S.ContentHeaderHome>
          <Input
            leftIcon
            leftIconName="search"
            lefticonSize={20}
            leftIconColor={colors.gray}
            placeholder="Buscar ONG"
            leftIconPress={() => {}}
            containerStyle={{ borderWidth: 1, borderColor: colors.stroke }}
          />

          <Typography
            color="primary"
            size="medium"
            weight="bold"
            style={{ marginTop: 10 }}
          >
            Ongs próximas a você:
          </Typography>
        </S.ContentHeaderHome>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={testeRender}
        />
      </S.ContentHome>
    </Container>
  );
};

export default Home;
