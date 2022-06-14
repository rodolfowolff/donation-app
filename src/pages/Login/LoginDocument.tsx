import React, { useState } from "react";
import {
  StatusBar,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { cpfCnpjUnmask, cpfCnpjMask } from "js-essentials-functions";

import { useGeneralContext } from "../../context/general";
import { useRegister } from "../../context/register";

import { useTheme } from "styled-components";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Button, Typography, Input } from "../../components/common";
import { Container, Content, BgImage } from "../../styles/global.style";
import imageOnboard from "../../assets/images/onboarding-bg.png";

const LoginDocument = () => {
  const { params }: any = useRoute();
  const { api } = useGeneralContext();
  const {
    userPersonalData,
    setUserPersonalData,
    ongPersonalData,
    setOngPersonalData,
  } = useRegister();
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();

  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckDocument = async () => {
    setLoading(true);

    if (document === "" || document === undefined || document === null) {
      setLoading(false);
      Alert.alert("CPF/CNPJ inválido", "CPF/CNPJ não pode ser vazio");
      return;
    }

    if (params.type === "donation") {
      if (document.length !== 14) {
        setLoading(false);
        Alert.alert("CPF inválido", "CPF deve ter 11 caracteres");
        return;
      } else {
        setUserPersonalData({
          ...userPersonalData,
          document: document,
        });
      }
    } else if (params.type === "ong") {
      if (document.length !== 17) {
        setLoading(false);
        Alert.alert("CNPJ inválido", "CNPJ deve ter 14 caracteres");
        return;
      } else {
        setOngPersonalData({
          ...ongPersonalData,
          document: document,
        });
      }
    } else {
      setLoading(false);
      Alert.alert("Usuário inválido", "Tipo de usuário inválido");
      return;
    }

    const documentUnMasked = cpfCnpjUnmask(document);

    if (!documentUnMasked) {
      setLoading(false);
      Alert.alert(
        "Documento inválido",
        "CPF/CNPJ inválido para tirar os caracteres especiais"
      );
      return;
    }

    try {
      const { data } = await api({
        entity: "authentication",
        action:
          params.type === "donation" ? "checkDocumentUser" : "checkDocumentOng",
        payload: {
          document: `${documentUnMasked}`,
        },
      } as any);

      if (data.status === true) {
        setLoading(false);

        params.type === "donation"
          ? setUserPersonalData({
              ...userPersonalData,
              firstName: data.name,
              document: documentUnMasked,
            })
          : setOngPersonalData({
              ...ongPersonalData,
              name: data.name,
              document: documentUnMasked,
            });

        navigate("LoginPassword", {
          type: params.type,
        });

        return;
      }

      if (data.status === false) {
        console.log("data.error false: ", data);
        setLoading(false);
        navigate("RegisterPersonalData", {
          type: params.type,
        });
        return;
      } else {
        console.log("data.error: ", data);
        setLoading(false);
        Alert.alert("Erro", "Erro ao verificar documento");
        return;
      }
    } catch (error: any) {
      console.log("error no check document: ", error);
      Alert.alert("ERRO", "Erro no servidor, tente novamente mais tarde.");
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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

          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}
          >
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
                ? "Informe seu CPF que iremos verificar se você já possui cadastro"
                : "Informe o CNPJ da sua ONG que iremos verificar se já possui cadastro"}
            </Typography>

            <Input
              placeholder={`Informe ${
                params.type === "donation" ? "seu CPF" : "o CNPJ"
              }`}
              value={cpfCnpjMask(document || "")}
              onChangeText={(document) => setDocument(document)}
              maxLength={params.type && params.type === "donation" ? 14 : 18}
              keyboardType="numeric"
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
            onPress={() => handleCheckDocument()}
          />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default LoginDocument;
