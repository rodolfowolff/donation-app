import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { cepMask } from "js-essentials-functions";

import { useGeneralContext } from "../../context/general";
import { useRegister } from "../../context/register";

import { useTheme } from "styled-components";
import { Header, Typography, Input, Button } from "../../components/common";
import { Container, ScrollContent } from "../../styles/global.style";
import * as S from "./styles";

const RegisterPassword = () => {
  const { params }: any = useRoute();
  const { api } = useGeneralContext();
  const {
    userPersonalData,
    setUserPersonalData,
    ongPersonalData,
    setOngPersonalData,
    addressData,
  } = useRegister();
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegisterPassword = async () => {
    setLoading(true);

    if (params.type === "donation") {
      if (
        userPersonalData.password.length < 8 ||
        userPersonalData.password.length > 20 ||
        confirmPassword.length < 8 ||
        confirmPassword.length > 16
      ) {
        setLoading(false);
        Alert.alert(
          "Senha inválida",
          "A senha e confirmação deve ter entre 8 e 20 caracteres"
        );
        return;
      }

      if (userPersonalData.password !== confirmPassword) {
        setLoading(false);
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
        setLoading(false);
        Alert.alert(
          "Senha inválida",
          "A senha e confirmação deve ter entre 8 e 20 caracteres"
        );
        return;
      }

      if (ongPersonalData.password !== confirmPassword) {
        setLoading(false);
        Alert.alert(
          "Senha e confirmação diferentes",
          "A senha e confirmação deve ser iguais!"
        );
        return;
      }
    } else {
      setLoading(false);
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
        setLoading(false);
        return Alert.alert(data.error.response.data.message);
      }

      if (data && data.token) {
        setLoading(false);
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");

        navigate("Index", {
          type: params.type,
          name: params.type === "donation" ? data.user : data.ong,
          token: data.token,
        });
      }
    } catch (error: any) {
      console.log("error na page password: ", error.response);
      setLoading(false);
      return Alert.alert(
        "ERRO: ",
        error.response?.data?.message || "Erro no servidor"
      );
    }
  };

  return (
    <Container style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back type={params.type} title="Senha de acesso" />

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
