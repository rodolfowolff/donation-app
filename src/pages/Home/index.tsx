import React, { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../../context/auth";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "styled-components";

import {
  Header,
  Typography,
  Input,
  CardOng,
  Skeleton,
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

  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    setIsAuth(false);
    await AsyncStorage.clear();
  };

  if (error) {
    Alert.alert("Erro", "Não foi possível carregar os dados", [
      { text: "OK", onPress: () => handleLogout() },
    ]);
  }

  useEffect(() => {
    setLoading(true);

    if (!error && !!data) {
      setOngs(data);
      setLoading(false);
    }
  }, [data]);

  const renderOngs = ({ item }: any) => <CardOng ong={item} />;

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
                {personalData?.firstName ? personalData?.firstName : "Usuário"}
              </Typography>
              <Typography color="gray" size="medium" weight="regular">
                {personalData?.firstName
                  ? "Encontre ONGs que precisam de sua ajuda."
                  : "Seja bem-vindo(a) ao app."}
              </Typography>
            </View>
          }
          rightComponent={<Icon name="bell" size={24} color={colors.black} />}
        />

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

          {loading ? (
            <>
              <Typography
                color="gray"
                size="medium"
                weight="bold"
                style={{ marginVertical: 7 }}
              >
                Carregando...
              </Typography>
              {[0, 1].map((item) => (
                <View key={item}>
                  <Skeleton
                    key={item}
                    width={"100%"}
                    height={230}
                    color="gray"
                    variant="card"
                    borderRadius={10}
                    marginTop={2}
                    marginLeft={0}
                    marginRight={0}
                  />
                </View>
              ))}
            </>
          ) : (
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
          )}
        </S.ContentHeaderHome>
      </S.ContentHome>
    </Container>
  );
};

export default Home;
