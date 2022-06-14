import React from "react";
import { ActivityIndicator } from "react-native";
import { Typography } from "../Text";
import * as S from "./styles";

const Loading = () => {
  return (
    <S.LoadingContainer>
      <ActivityIndicator size="large" color="#fff" />
      <Typography
        size="large"
        weight="bold"
        color="black"
        style={{ marginTop: 10 }}
      >
        Carregando...
      </Typography>
    </S.LoadingContainer>
  );
};

export { Loading };
