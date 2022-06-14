import React, { useEffect, useState } from "react";
import { Alert, Pressable, StatusBar, View } from "react-native";

import useFetch from "../../hooks/useFetch";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { Header, Typography, Loading, Button } from "../../components/common";
import { AntDesign } from "@expo/vector-icons";
import {
  Container,
  ScrollContent,
  Divider,
  BottomButton,
} from "../../styles/global.style";
import * as S from "./styles";
import ImageTeste from "../../assets/images/onboarding-bg.png";

const OngDetails = () => {
  const { params }: any = useRoute();
  const { data, error } = useFetch(`/ongs/${params.id}`);
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);

  if (error) {
    Alert.alert("Erro", "Não foi possível carregar os dados da ONG", [
      { text: "OK", onPress: () => goBack() },
    ]);
  }

  if (!data) return <Loading />;

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        back
        leftComponent={
          <View style={{ alignItems: "center" }}>
            <Typography color="black" size="xlarge" weight="bold">
              Informações
            </Typography>
            <Typography color="gray" size="medium" weight="regular">
              Ajude e faça o bem ao próximo
            </Typography>
          </View>
        }
        rightComponent={
          <Pressable onPress={() => setIsFavorite(!isFavorite)}>
            {/* @ts-ignore */}
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={28}
              color={isFavorite ? colors.danger : colors.black}
            />
          </Pressable>
        }
      />

      <ScrollContent
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <S.BannerContentImg>
          <S.BannerImg source={ImageTeste} resizeMode="cover" />
        </S.BannerContentImg>

        <Typography
          color="gray"
          size="medium"
          weight="bold"
          style={{ marginTop: 10 }}
        >
          NOME
        </Typography>
        <Typography
          color="black"
          size="large"
          weight="regular"
          style={{ marginTop: 5 }}
        >
          {data?.name || "Nome da ONG"}
        </Typography>

        <Divider />

        <Typography color="gray" size="medium" weight="bold">
          EMAIL
        </Typography>
        <Typography
          color="black"
          size="large"
          weight="regular"
          style={{ marginTop: 5 }}
        >
          {data?.ongPersonalData?.email || "Não informado"}
        </Typography>

        <Divider />

        <S.DescriptionContainer>
          <Typography color="gray" size="medium" weight="bold">
            DESCRIÇÃO
          </Typography>
          <Typography color="gray" size="medium" weight="regular">
            Comentários (58)
          </Typography>
        </S.DescriptionContainer>

        <Typography
          color="black"
          size="large"
          weight="regular"
          style={{ marginBottom: 20 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          ipsum perferendis, aut quasi assumenda dolorem recusandae
          reprehenderit quas exercitationem quis. Officiis laudantium veritatis,
          doloremque odit animi eius saepe dolorem ipsam? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Dignissimos ipsum perferendis, aut
          quasi assumenda dolorem recusandae reprehenderit quas exercitationem
          quis. Officiis laudantium veritatis, doloremque odit animi eius saepe
          dolorem ipsam? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dignissimos ipsum perferendis, aut quasi assumenda dolorem
          recusandae reprehenderit quas exercitationem quis. Officiis laudantium
          veritatis, doloremque odit animi eius saepe dolorem ipsam? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Dignissimos ipsum
          perferendis, aut quasi assumenda dolorem recusandae reprehenderit quas
          exercitationem quis. Officiis laudantium veritatis, doloremque odit
          animi eius saepe dolorem ipsam?
        </Typography>
      </ScrollContent>

      <BottomButton>
        <Button
          title="Doar agora"
          txtColor="white"
          size="large"
          onPress={() => Alert.alert("doar", "chamar função doar")}
        />
      </BottomButton>
    </Container>
  );
};

export default OngDetails;
