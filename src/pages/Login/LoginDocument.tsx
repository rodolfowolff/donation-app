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
import { verifyDocument } from "../../utils/verifyInput";

import { useGeneralContext } from "../../context/general";
import { useRegister } from "../../context/register";

import { useTheme } from "styled-components";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Button, Typography, Input, Loading } from "../../components/common";
import { Container, Content, BgImage } from "../../styles/global.style";
import imageOnboard from "../../assets/images/onboarding-bg.png";

const LoginDocument = () => {
  const { params }: any = useRoute();
  const { api, loading } = useGeneralContext();
  const {
    userPersonalData,
    setUserPersonalData,
    ongPersonalData,
    setOngPersonalData,
    resetState,
  } = useRegister();
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();

  const [document, setDocument] = useState("");
  const [validDocument, setValidDocument] = useState(false);

  const handleCheckDocument = async () => {
    if (params.type === "donation") {
      if (!verifyDocument(document, 14, "donation")) {
        Alert.alert("CPF inválido", "CPF não está no formato correto");
        return false;
      }

      setUserPersonalData({ ...userPersonalData, document: document });
    } else if (params.type === "ong") {
      if (!verifyDocument(document, 17, "ong")) {
        Alert.alert("CNPJ inválido", "CNPJ não está no formato correto");
        return false;
      }

      setOngPersonalData({ ...ongPersonalData, document: document });
    } else {
      resetState();
      Alert.alert("Usuário inválido", "Tipo de usuário inválido");
      return;
    }

    const documentUnMasked = cpfCnpjUnmask(document || "");
    if (!documentUnMasked) {
      Alert.alert(
        "Documento inválido",
        "CPF/CNPJ inválido para tirar os caracteres especiais"
      );
      resetState();
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

        setDocument("");
        navigate("LoginPassword", {
          type: params.type,
        });
        return;
      }
      if (data.status === false) {
        console.log("data.error false: ", data);
        setDocument("");
        navigate("RegisterPersonalData", {
          type: params.type,
        });
        return;
      }

      console.log("data.error: ", data);
      setDocument("");
      resetState();
      Alert.alert("Erro", "Erro ao verificar documento");
      return;
    } catch (error: any) {
      console.log("error no check document: ", error);
      setDocument("");
      resetState();
      Alert.alert("ERRO", "Erro no servidor, tente novamente mais tarde.");
      return;
    }
  };

  if (loading) return <Loading />;

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
              onChangeText={(document) => {
                setDocument(document);
                const isValid = verifyDocument(
                  document,
                  params.type && params.type === "donation" ? 14 : 18,
                  params.type
                );
                isValid ? setValidDocument(true) : setValidDocument(false);
              }}
              maxLength={params.type && params.type === "donation" ? 14 : 18}
              keyboardType="numeric"
              autoCorrect={false}
            />
            {/* {!validDocument ? (
              <Typography color="danger" size="medium" weight="regular">
                {params.type === "donation" ? "CPF inválido" : "CNPJ inválido"}
              </Typography>
            ) : null} */}
          </View>

          <Button
            title="Continuar"
            txtColor={!validDocument ? "white" : "primary"}
            bgColor={!validDocument ? "white" : "white"}
            outline={!validDocument}
            size="large"
            weight="bold"
            margin={30}
            disabled={!validDocument}
            onPress={() => handleCheckDocument()}
          />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default LoginDocument;
