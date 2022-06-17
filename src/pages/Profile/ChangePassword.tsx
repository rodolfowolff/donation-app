import React from "react";
import { Alert, StatusBar, TouchableOpacity } from "react-native";

import { useTheme } from "styled-components/native";
import { Button, Header, Input, Typography } from "../../components/common";
import { BottomButton, Container } from "../../styles/global.style";
import * as S from "./styles";

const ChangePassword = () => {
  const { colors } = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back title="ALTERAR SENHA" />

      <S.ChangePasswordContent>
        <Typography
          size="xxlarge"
          weight="bold"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          RODOLFO DE SOUZA
        </Typography>

        <Input
          placeholder="digite sua senha atual"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          autoCorrect={false}
          maxLength={50}
          keyboardType="email-address"
          onChangeText={() => {}}
        />

        <Input
          placeholder="digite sua nova senha"
          rightIcon
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          rightIconName="lock"
          rightIconColor={colors.primary}
          editable={false}
        />

        <Input
          placeholder="confirme sua nova senha"
          rightIcon
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          rightIconName="lock"
          rightIconColor={colors.primary}
          editable={false}
        />
      </S.ChangePasswordContent>

      <BottomButton>
        <Button
          title="Salvar"
          txtColor="white"
          size="large"
          onPress={() => Alert.alert("doar", "chamar função doar")}
        />
      </BottomButton>
    </Container>
  );
};

export default ChangePassword;
