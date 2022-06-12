import React from "react";
import Icon from "@expo/vector-icons/FontAwesome5";
import * as S from "./styles";
import { Typography } from "../Text";

const Header = ({
  back,
  title,
  leftComponent,
  rightComponent,
}: {
  back?: boolean;
  title?: string;
  leftComponent?: any;
  rightComponent?: any;
}) => {
  return (
    <S.Container>
      {back && (
        <S.Left>
          <Icon name="chevron-left" size={22} color="#000" />
        </S.Left>
      )}
      <S.Left>{leftComponent}</S.Left>

      <S.Center>
        <Typography color="black" size="medium" weight="regular">
          {title}
        </Typography>
      </S.Center>

      <S.Right>{rightComponent}</S.Right>
    </S.Container>
  );
};

export { Header };
