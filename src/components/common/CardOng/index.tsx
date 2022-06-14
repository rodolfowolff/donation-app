import React from "react";
import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import ImageTeste from "../../../assets/images/onboarding-bg.png";
import { Typography } from "../Text";
import { Button } from "../Button";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "styled-components";

const CardOng = ({ ong }: any) => {
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
        style={{ marginTop: 1 }}
      >
        {ong?.name}
      </Typography>
      <Typography
        color="gray"
        size="small"
        weight="regular"
        style={{ marginBottom: 3 }}
      >
        Descrição da ONG, descrição da ONG, descrição da ONG, descrição da ONG
        descrição da ONG descrição da ONG...
      </Typography>
      <Button
        title="Ver mais"
        bgColor="primary"
        txtColor="white"
        size="medium"
        weight="regular"
        onPress={() => navigate("OngDetails", { id: ong.id })}
      />
    </S.ContainerCard>
  );
};

export default CardOng;
