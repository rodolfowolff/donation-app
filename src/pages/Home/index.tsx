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

import {
  Header,
  Typography,
  Input,
  Loading,
  CardOng,
} from "../../components/common";
import { Container } from "../../styles/global.style";
import * as S from "./styles";
import Icon from "@expo/vector-icons/FontAwesome5";

const Home = () => {
  const { setIsAuth, personalData } = useAuth();
  const [search, setSearch] = useState("");
  const { data, error } = useFetch(
    search && search.length > 2
      ? `/ongs/findall?name=${search}`
      : "/ongs/findall"
  );
  const { colors } = useTheme();
  const { goBack } = useNavigation();

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
    Alert.alert("Erro", "Não foi possível carregar os dados", [
      { text: "OK", onPress: () => goBack() },
    ]);
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
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.stroke,
              marginBottom: 10,
            }}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <FlatList
            data={data || []}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Typography
                color="gray"
                size="medium"
                weight="bold"
                style={{ marginVertical: 7 }}
              >
                {data.length > 0
                  ? "Ongs próximas a você"
                  : data.length === 0 && search.length > 2
                  ? "Nenhuma ONG com esse nome foi encontrada"
                  : "Nenhuma ONG próxima foi encontrada"}
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
