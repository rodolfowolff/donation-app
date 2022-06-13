import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "@expo/vector-icons/FontAwesome5";
import * as S from "./styles";
import { Typography } from "../Text";

interface IHeaderProps {
  back?: boolean;
  type?: "donation" | "ong";
  leftComponent?: any;
  title?: string;
  rightComponent?: any;
  onPress?: () => void;
}

const Header = ({
  back,
  type = "donation",
  leftComponent,
  title,
  rightComponent,
}: IHeaderProps) => {
  const { navigate } = useNavigation();

  return (
    <S.Container>
      {back && (
        <S.Left>
          <Pressable onPress={() => navigate("LoginDocument", { type })}>
            <Icon name="chevron-left" size={22} color="#000" />
          </Pressable>
        </S.Left>
      )}

      {leftComponent && <S.Left>{leftComponent}</S.Left>}

      {title && (
        <S.Center>
          <Typography color="black" size="medium" weight="regular">
            {title}
          </Typography>
        </S.Center>
      )}

      {rightComponent && <S.Right>{rightComponent}</S.Right>}
    </S.Container>
  );
};

export { Header };
