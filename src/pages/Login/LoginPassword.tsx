import React, { useState } from "react";
import { StatusBar, View, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { useGeneralContext } from "../../context/general";
import { useRegister } from "../../context/register";

import { Button, Typography, Input } from "../../components/common";
import { Container, Content, BgImage } from "../../styles/global.style";
import imageOnboard from "../../assets/images/onboarding-bg.png";
import Icon from "@expo/vector-icons/FontAwesome5";

const LoginPassword = () => {
  const { api } = useGeneralContext();
  const { userPersonalData, ongPersonalData } = useRegister();
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { params }: any = useRoute();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Senha deve ter no mínimo 8 caracteres");
      setLoading(false);
      return alert("Senha deve ter no mínimo 8 caracteres");
    }

    try {
      const { data } = await api({
        entity: "authentication",
        action: params.type === "donation" ? "loginUser" : "loginOng",
        payload: {
          document:
            params.type === "donation"
              ? userPersonalData.document
              : ongPersonalData.document,
          password: `${password}`,
        },
      } as any);

      if (data.error) {
        console.log("data.error: ", data.error);
        setError(data.error.response.data.message);
        setLoading(false);
        return alert(data.error.response.data.message);
      }

      if (data) {
        navigate("Index", {
          type: params.type,
          name:
            params.type === "donation" ? data.user.firstName : data.ong.name,
          token: data.token,
        });
      }
    } catch (error: any) {
      console.log("error na page password: ", error);
      setError(
        error.response?.data?.message ||
          "Erro no servidor, tente novamente mais tarde."
      );
      setLoading(false);
      return alert(
        error.response?.data?.message ||
          "Erro no servidor, tente novamente mais tarde."
      );
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
            rightIconName={!showPassword ? "eye-slash" : "eye"}
            placeholder="Informe sua senha"
            secureTextEntry={!showPassword}
            rightIconPress={() => setShowPassword(!showPassword)}
            value={password}
            onChangeText={(pass) => setPassword(pass)}
            maxLength={20}
            autoCorrect={false}
          />
        </View>

        <Button
          title="Continuar"
          bgColor="white"
          txtColor="primary"
          size="large"
          weight="bold"
          margin={30}
          onPress={() => {
            handleLogin();
          }}
        />
      </Content>
    </Container>
  );
};

export default LoginPassword;
