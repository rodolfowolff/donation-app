import React from "react";
import { Alert, FlatList, StatusBar } from "react-native";

import { useAuth } from "../../context/auth";
import useFetch from "../../hooks/useFetch";

import { CardHistoryDonate, Header } from "../../components/common";
import { Container } from "../../styles/global.style";

const History = () => {
  const { personalData } = useAuth();
  const { data, error } = useFetch(`/donations/user/${personalData.id}`);

  if (error) {
    console.log(error);
    Alert.alert("Erro", "Erro ao carregar histórico de doações");
  }

  const renderItem = ({ item }: any) => <CardHistoryDonate data={item} />;

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back title="Histórico de doações" />

      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </Container>
  );
};

export default History;
