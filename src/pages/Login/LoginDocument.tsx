import React, { useState } from "react";
import {
  StatusBar,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { cpfCnpjUnmask, cpfCnpjMask } from "js-essentials-functions";
import { useGeneralContext } from "../../context/general";

import Icon from "@expo/vector-icons/FontAwesome5";
import { Button, Typography, Input } from "../../components/common";
import { Container, Content, BgImage } from "../../styles/global.style";
import imageOnboard from "../../assets/images/onboarding-bg.png";

const LoginDocument = () => {
  const { api } = useGeneralContext();
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { params }: any = useRoute();

  const [document, setDocument] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckDocument = async () => {
    setLoading(true);
    setError("");
    if (document.length < 14) {
      setError("CPF/CNPJ deve ter no mínimo 11 caracteres");
      setLoading(false);
      return alert("CPF/CNPJ deve ter no mínimo 11 caracteres");
    }
    const documentUnMasked = cpfCnpjUnmask(document);

    if (!documentUnMasked) {
      setError("Por favor, informe um documento válido.");
      setLoading(false);
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
      });

      if (data.error) {
        setError(data.error.response.data.message);
        setLoading(false);
        return alert(data.error.response.data.message);
      }

      console.log("data: ", data);
      setLoading(false);
      navigate("LoginPassword", {
        type: params.type,
        document: documentUnMasked,
      });
    } catch (error: any) {
      console.log("error na page document: ", error);
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
              value={cpfCnpjMask(document)}
              onChangeText={(text) => setDocument(text)}
              maxLength={params.type === "donation" ? 14 : 18}
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
