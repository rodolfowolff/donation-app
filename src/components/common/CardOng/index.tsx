import React from "react";
import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import ImageTeste from "../../../assets/images/onboarding-bg.png";
import { Typography } from "../Text";
import { Button } from "../Button";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "styled-components";

const CardOng = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  return (
    <S.ContainerCard>
      <S.ButtonFavorite onPress={() => {}}>
        <Icon name="heart" size={22} color={colors.black} />
      </S.ButtonFavorite>
      <S.ImageCard source={ImageTeste} resizeMode="cover" />
      <Typography
        color="black"
        size="medium"
        weight="bold"
        style={{ marginBottom: 1, marginTop: 2 }}
      >
        Nome da ONG
      </Typography>
      <Typography
        color="gray"
        size="small"
        weight="regular"
        style={{ marginBottom: 4 }}
      >
        Descrição da ONG, descrição da ONG, descrição da ONG, descrição da ONG
        descrição da ONG descrição da ONG descrição da ONG descrição da ONG
      </Typography>
      <Button
        title="Ver mais"
        bgColor="primary"
        txtColor="white"
        size="medium"
        weight="regular"
        onPress={() => navigate("LoginPassword", { type: "donation" })}
      />
    </S.ContainerCard>
  );
};

export default CardOng;
