import React, { useState } from "react";
import { StatusBar, View, Pressable, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGeneralContext } from "../../context/general";
import { useRegister } from "../../context/register";

import { useTheme } from "styled-components";
import { Button, Typography, Input } from "../../components/common";
import { Container, Content, BgImage } from "../../styles/global.style";
import imageOnboard from "../../assets/images/onboarding-bg.png";
import Icon from "@expo/vector-icons/FontAwesome5";

const LoginPassword = () => {
  const { api } = useGeneralContext();
  const { userPersonalData, ongPersonalData, resetState } = useRegister();
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { params }: any = useRoute();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    if (password.length < 8) {
      setLoading(false);
      Alert.alert("Senha inválida", "Senha deve ter no mínimo 8 caracteres");
      return;
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
        setLoading(false);
        Alert.alert(
          "Erro",
          data.error.response.data.message || "Erro desconhecido"
        );
        return;
      }

      if (data && data.token) {
        setLoading(false);

        await AsyncStorage.setItem("@token_donation_app", data.token);
        await AsyncStorage.setItem(
          "@personal_donation_app",
          params.type === "donation"
            ? JSON.stringify(data.user)
            : JSON.stringify(data.ong)
        );

        resetState();

        navigate("Index", {
          type: params.type,
          name:
            params.type === "donation" ? data.user.firstName : data.ong.name,
          token: data.token,
        });

        return;
      } else {
        setLoading(false);
        Alert.alert("Erro", "Erro desconhecido");
        return;
      }
    } catch (error: any) {
      console.log("error na page password: ", error.response.data || error);
      setLoading(false);
      Alert.alert(
        error.response?.data?.message ||
          "Erro no servidor, tente novamente mais tarde."
      );
      return;
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
