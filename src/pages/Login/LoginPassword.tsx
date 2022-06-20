import React, { useState } from "react";
import { StatusBar, View, Pressable, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGeneralContext } from "../../context/general";
import { useRegister } from "../../context/register";
import { useAuth } from "../../context/auth";

import { verifyGeneralText } from "../../utils/verifyInput";
import { useTheme } from "styled-components";
import { Button, Typography, Input, Loading } from "../../components/common";
import { Container, Content, BgImage } from "../../styles/global.style";
import imageOnboard from "../../assets/images/onboarding-bg.png";
import Icon from "@expo/vector-icons/FontAwesome5";

const LoginPassword = () => {
  const { api, loading } = useGeneralContext();
  const { userPersonalData, ongPersonalData, resetState } = useRegister();
  const { setIsAuth, setPersonalData } = useAuth();
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { params }: any = useRoute();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const handleLogin = async () => {
    if (password === "" || password.length < 8 || password.length > 20) {
      Alert.alert(
        "Senha inválida",
        "Senha deve ter no mínimo 8 e no máximo 20 caracteres"
      );
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
        Alert.alert(
          "Erro",
          data.error.response.data.message || "Erro desconhecido"
        );
        return;
      } else if (data && data.token) {
        await AsyncStorage.setItem("@token_donation_app", data.token);
        await AsyncStorage.setItem(
          "@personal_donation_app",
          params.type === "donation"
            ? JSON.stringify(data.user)
            : JSON.stringify(data.ong)
        );

        setIsAuth(true);

        resetState();
        setPersonalData(params.type === "donation" ? data.user : data.ong);

        return;
      } else {
        Alert.alert("Erro", "Erro desconhecido");
        return;
      }
    } catch (error: any) {
      console.log("error na page password: ", error.response.data || error);
      if (
        error.response.data.message === "Ong or password invalid" ||
        error.response.data.message === "User or password invalid"
      ) {
        Alert.alert("Erro", "Documento ou senha inválidos");
        return;
      }
      Alert.alert(
        "Erro no servidor",
        "Erro ao conectar com nosso servidor, tente novamente mais tarde."
      );
      return;
    }
  };

  if (loading) return <Loading />;

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
            onChangeText={(pass) => {
              setPassword(pass);
              const isValid = verifyGeneralText(pass, 8, 20);
              isValid ? setValidPassword(true) : setValidPassword(false);
            }}
            maxLength={20}
            autoCorrect={false}
          />
        </View>

        <Button
          title="Continuar"
          bgColor={!validPassword ? "gray" : "white"}
          txtColor="primary"
          size="large"
          weight="bold"
          margin={30}
          disabled={!validPassword}
          onPress={() => {
            handleLogin();
          }}
        />
      </Content>
    </Container>
  );
};

export default LoginPassword;
