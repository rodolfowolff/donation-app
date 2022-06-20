import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGeneralContext } from "../../context/general";
import { useRegister } from "../../context/register";

import { useTheme } from "styled-components";
import {
  Header,
  Typography,
  Input,
  Button,
  Loading,
} from "../../components/common";
import { Container, ScrollContent } from "../../styles/global.style";
import * as S from "./styles";
import { useAuth } from "../../context/auth";

const RegisterPassword = () => {
  const { params }: any = useRoute();
  const { api, loading } = useGeneralContext();
  const {
    userPersonalData,
    setUserPersonalData,
    ongPersonalData,
    setOngPersonalData,
    addressData,
    resetState,
  } = useRegister();
  const { setIsAuth, setPersonalData } = useAuth();
  const { colors } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegisterPassword = async () => {
    if (params.type === "donation") {
      if (
        userPersonalData.password.length < 8 ||
        userPersonalData.password.length > 20 ||
        confirmPassword.length < 8 ||
        confirmPassword.length > 16
      ) {
        Alert.alert(
          "Senha inválida",
          "A senha e confirmação deve ter entre 8 e 20 caracteres"
        );
        return;
      }

      if (userPersonalData.password !== confirmPassword) {
        Alert.alert(
          "Senha e confirmação diferentes",
          "A senha e confirmação deve ser iguais!"
        );
        return;
      }
    } else if (params.type === "ong") {
      if (
        ongPersonalData.password.length < 8 ||
        ongPersonalData.password.length > 20
      ) {
        Alert.alert(
          "Senha inválida",
          "A senha e confirmação deve ter entre 8 e 20 caracteres"
        );
        return;
      }

      if (ongPersonalData.password !== confirmPassword) {
        Alert.alert(
          "Senha e confirmação diferentes",
          "A senha e confirmação deve ser iguais!"
        );
        return;
      }
    } else {
      Alert.alert("Erro", "Tipo de usuário inválido");
      return;
    }

    const payload =
      params.type === "donation"
        ? {
            ...userPersonalData,
            address: {
              ...addressData,
            },
          }
        : {
            ...ongPersonalData,
            address: {
              ...addressData,
            },
          };

    try {
      const { data } = await api({
        entity: "register",
        action: params.type === "donation" ? "registerUser" : "registerOng",
        payload,
      } as any);

      if (data.error) {
        console.log("data.error: ", data.error);
        Alert.alert(data.error.response.data.message);
        return;
      }

      if (data && data.token) {
        await AsyncStorage.setItem("@token_donation_app", data.token);
        await AsyncStorage.setItem(
          "@personal_donation_app",
          params.type === "donation"
            ? JSON.stringify(data.user)
            : JSON.stringify(data.ong)
        );

        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");

        setIsAuth(true);
        console.log(
          "verificar o que vem no data para passar para o setPersonalData: ",
          data
        );
        setPersonalData(params.type === "donation" ? data.user : data.ong);

        resetState();
        setConfirmPassword("");
      }
    } catch (error: any) {
      console.log("error na page password: ", error.response);
      Alert.alert(
        "ERRO: ",
        error.response?.data?.message || "Erro no servidor"
      );
      return;
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back title="Senha de acesso" />

      <ScrollContent style={{ marginHorizontal: 16 }}>
        <Typography size="xlarge" weight="bold" style={{ textAlign: "center" }}>
          Para finalizar o cadastro, informe sua senha de acesso e confirme.
        </Typography>

        <Typography
          color="gray"
          style={{ textAlign: "center", marginTop: 6, marginBottom: 15 }}
        >
          Preencha os dados abaixo para continuar
        </Typography>

        <Input
          rightIcon
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          rightIconName={!showPassword ? "eye-slash" : "eye"}
          placeholder="Informe a senha"
          secureTextEntry={!showPassword}
          rightIconPress={() => setShowPassword(!showPassword)}
          maxLength={20}
          autoCorrect={false}
          autoCapitalize="none"
          value={
            params.type === "donation"
              ? userPersonalData?.password
              : ongPersonalData?.password
          }
          onChangeText={(password) =>
            params.type === "donation"
              ? setUserPersonalData({ ...userPersonalData, password })
              : setOngPersonalData({ ...ongPersonalData, password })
          }
        />

        <Input
          rightIcon
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          rightIconName={!showConfirmPassword ? "eye-slash" : "eye"}
          placeholder="Confirme a senha"
          secureTextEntry={!showConfirmPassword}
          rightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          maxLength={20}
          autoCorrect={false}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(cpassword) => setConfirmPassword(cpassword)}
        />

        <S.ButtonContent>
          <Button
            title="Continuar"
            txtColor="white"
            margin={5}
            onPress={() => {
              handleRegisterPassword();
            }}
          />
        </S.ButtonContent>
      </ScrollContent>
    </Container>
  );
};

export default RegisterPassword;
