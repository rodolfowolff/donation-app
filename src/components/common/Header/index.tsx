import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "@expo/vector-icons/FontAwesome5";
import * as S from "./styles";
import { Typography } from "../Text";

interface IHeaderProps {
  back?: boolean;
  leftComponent?: any;
  title?: string;
  rightComponent?: any;
  onPress?: () => void;
}

const Header = ({
  back,
  leftComponent,
  title,
  rightComponent,
}: IHeaderProps) => {
  const { goBack } = useNavigation();

  return (
    <S.Container>
      {back && (
        <S.Left>
          <Pressable onPress={() => goBack()}>
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
