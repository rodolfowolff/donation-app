import React from "react";
import { StatusBar, View, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { useGeneralContext } from "../../context/general";

import Icon from "@expo/vector-icons/FontAwesome5";
import { Button, Typography, Input } from "../../components/common";
import { Container, Content, BgImage } from "../../styles/global.style";
import imageOnboard from "../../assets/images/onboarding-bg.png";

const LoginVerifyEmail = () => {
  const { api } = useGeneralContext();
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { params }: any = useRoute();

  const teste = async () => {
    console.log("teste");
    try {
      const { data } = await api({
        entity: "authentication",
        action: "userLogin",
        payload: {
          document: "021.630.330-32",
          password: "12345678",
        },
      });

      console.log("data: ", data);
    } catch (error) {
      console.log(error);
    }
  };

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
            {`Sua doação ajudará\nmuitas pessoas`}
          </Typography>

          <Typography
            color="white"
            size="medium"
            weight="regular"
            style={{ marginTop: 10, marginBottom: 15 }}
          >
            {params.type === "donation"
              ? "Informe seu email que iremos verificar se você já possui cadastro"
              : "Informe o cnpj da sua ONG que iremos verificar se já possui cadastro"}
          </Typography>

          <Input
            placeholder={`Informe ${
              params.type === "donation" ? "seu CPF" : "o CNPJ"
            }`}
          />
        </View>

        <Button
          title="Continuar"
          bgColor="white"
          txtColor="primary"
          size="large"
          weight="bold"
          margin={30}
          onPress={() => teste()}
        />
      </Content>
    </Container>
  );
};

export default LoginVerifyEmail;
