import React, { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../context/auth";
import useFetch from "../../hooks/useFetch";

import {
  CardHistoryDonate,
  Header,
  Skeleton,
  Typography,
} from "../../components/common";
import { Container } from "../../styles/global.style";

const History = () => {
  const { personalData } = useAuth();
  const { data, error, isValidating } = useFetch(
    `/donations/user/${personalData.id}`
  );
  const { reset } = useNavigation();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  if (error) {
    Alert.alert("Erro", "Erro ao carregar histórico de doações", [
      {
        text: "OK",
        onPress: () => reset({ index: 0, routes: [{ name: "Index" }] }),
      },
    ]);
  }

  useEffect(() => {
    setLoading(true);
    if (!error && !!data) {
      setDonations(data);
      setLoading(false);
    }
  }, [data]);

  const renderCardHistoryDonate = ({ item }: any) => (
    <CardHistoryDonate data={item} />
  );

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back title="Histórico de doações" />

      {loading ? (
        [0, 1].map((item) => (
          <Skeleton
            key={item}
            width="90%"
            height={130}
            color="gray"
            variant="card"
            borderRadius={10}
            marginTop={10}
          />
        ))
      ) : (
        <FlatList
          data={data || []}
          keyExtractor={({ id }): string => id}
          renderItem={renderCardHistoryDonate}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ListHeaderComponent={
            donations.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 16,
                }}
              >
                <Typography
                  color="gray"
                  size="large"
                  weight="bold"
                  style={{ marginBottom: 10 }}
                >
                  Você não fez nenhuma doação ainda.
                </Typography>
                <Typography color="gray" size="xlarge" weight="bold">
                  Volte a pagina inicial e encontre uma ONG para doar :)
                </Typography>
              </View>
            ) : null
          }
        />
      )}
    </Container>
  );
};

export default History;
