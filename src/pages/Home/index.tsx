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
import useFetch from "../../hooks/useFetch";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

import { Header, Typography, Input, Loading } from "../../components/common";
import { Container } from "../../styles/global.style";
import * as S from "./styles";
import Icon from "@expo/vector-icons/FontAwesome5";
import CardOng from "../../components/common/CardOng";

const Home = () => {
  const { setIsAuth, personalData } = useAuth();
  const { data, error } = useFetch("/ongs/findall");
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);

  const renderOngs = ({ item }: any) => <CardOng ong={item} />;

  const handleLogout = async () => {
    setLoading(true);

    await AsyncStorage.clear();
    setIsAuth(false);

    Alert.alert("Sucesso", "Você saiu com sucesso!");
    setLoading(false);
  };

  if (error) {
    Alert.alert("Erro", "Não foi possível carregar as ONGs");
  }

  if (!data || loading) return <Loading />;

  return (
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
          <FlatList
            data={data || []}
            contentContainerStyle={{
              paddingHorizontal: 3,
              paddingVertical: 10,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Typography
                color="gray"
                size="medium"
                weight="bold"
                style={{ marginVertical: 7 }}
              >
                {data.length === 0
                  ? "Nenhuma ONG próximas foi encontrada"
                  : "Ongs próximas a você:"}
              </Typography>
            }
            renderItem={renderOngs}
          />
        </S.ContentHeaderHome>
      </S.ContentHome>
    </Container>
  );
};

export default Home;
