import React, { useState } from "react";
import { StatusBar, View, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { Button, Typography, Input } from "../../components/common";
import { Container, Content, BgImage } from "../../styles/global.style";
import imageOnboard from "../../assets/images/onboarding-bg.png";
import Icon from "@expo/vector-icons/FontAwesome5";

const LoginPassword = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container style={{ backgroundColor: colors.primary }}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <BgImage source={imageOnboard} resizeMode="cover" />
      <Content withHeader>
        <Pressable onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color="white" />
        </Pressable>

        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
          <Typography color="white" size="xxlarge" weight="bold">
            {params.type === "donation"
              ? `Sua doação ajudará\nmuitas pessoas`
              : "É um prazer ajudar"}
          </Typography>

          <Typography
            color="white"
            size="medium"
            weight="regular"
            style={{ marginTop: 10, marginBottom: 15 }}
          >
            Informe sua senha para continuar
          </Typography>

          <Input
            rightIcon
            rightIconName={showPassword ? "eye-slash" : "eye"}
            placeholder="Informe sua senha"
            secureTextEntry={showPassword}
            rightIconPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <Button
          title="Continuar"
          bgColor="white"
          txtColor="primary"
          size="large"
          weight="bold"
          margin={30}
        />
      </Content>
    </Container>
  );
};

export default LoginPassword;
