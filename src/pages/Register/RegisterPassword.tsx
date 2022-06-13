import React, { useState } from "react";
import { StatusBar } from "react-native";
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
  } = useRegister();
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterPassword = async () => {
    setLoading(true);
    setError("");

    console.log("userPersonalData: ", userPersonalData);
    console.log("ongPersonalData: ", ongPersonalData);

    if (userPersonalData.password !== confirmPassword) {
      setError("Senhas não conferem");
      setLoading(false);
      return alert("Senhas não conferem");
    }

    if (params.type === "donation") {
      if (
        userPersonalData.password.length < 6 ||
        userPersonalData.password.length > 20
      ) {
        setError("Senha deve ter no mínimo 6 caracteres");
        setLoading(false);
        return alert("Senha deve ter no mínimo 6 caracteres");
      }
    } else {
      if (
        ongPersonalData.password.length < 6 ||
        ongPersonalData.password.length > 20
      ) {
        setError("Senha deve ter no mínimo 6 caracteres");
        setLoading(false);
        return alert("Senha deve ter no mínimo 6 caracteres");
      }
    }

    // try {
    //   const { data } = await api({
    //     entity: "authentication",
    //     action: params.type === "donation" ? "registerUser" : "registerOng",
    //     payload: {

    //     },
    //   } as any);

    //   if (data.error) {
    //     console.log("data.error: ", data.error);
    //     setError(data.error.response.data.message);
    //     setLoading(false);
    //     return alert(data.error.response.data.message);
    //   }

    //   if (data) {
    //     navigate("Index", {
    //       type: params.type,
    //       userName: data.user.firstName,
    //       token: data.token,
    //     });
    //   }
    // } catch (error: any) {
    //   console.log("error na page password: ", error);
    //   setError(
    //     error.response?.data?.message ||
    //       "Erro no servidor, tente novamente mais tarde."
    //   );
    //   setLoading(false);
    //   return alert(
    //     error.response?.data?.message ||
    //       "Erro no servidor, tente novamente mais tarde."
    //   );
    // }
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
          placeholder="Repitada a senha"
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
