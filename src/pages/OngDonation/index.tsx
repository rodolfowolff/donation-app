import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";

import { useGeneralContext } from "../../context/general";

import { useTheme } from "styled-components/native";
import {
  Button,
  Header,
  Input,
  Loading,
  Typography,
} from "../../components/common";
import {
  BottomButton,
  Container,
  ScrollContent,
} from "../../styles/global.style";
import * as S from "./styles";

const OngDonation = () => {
  const { params }: any = useRoute();
  const { api, loading } = useGeneralContext();
  const { colors } = useTheme();
  const { goBack, reset } = useNavigation();

  const [value, setValue] = useState("0");
  const [outherValue, setOutherValue] = useState(false);

  const handleDonate = async () => {
    if (value === "0" && !outherValue) {
      Alert.alert("Erro", "Por favor, informe o valor a ser doado");
      return;
    }

    if (value === "0" && outherValue) {
      Alert.alert("Erro", "Por favor, informe o valor a ser doado");
      return;
    }

    try {
      const { data } = await api({
        entity: "donation",
        action: "createDonaiton",
        payload: {
          ongId: params.ongId,
          value: value !== "0" ? value : outherValue,
          type: "PIX",
        },
      } as any);

      if (data.message === "Donation created successfully") {
        Alert.alert("Sucesso", "Doação realizada com sucesso");
        reset({ index: 0, routes: [{ name: "Index" }] });
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao realizar a doação");
      }
    } catch (error: any) {
      console.log("erro create donate", error);
      if (
        error.response?.data?.message ===
        "You already have a two pending donation"
      ) {
        Alert.alert(
          "Erro",
          "Você já tem duas doações pendentes, aguarde serem aprovadas",
          [{ text: "OK", onPress: () => goBack() }]
        );
        return;
      }

      Alert.alert(
        "Erro",
        "Erro ao realizar doação, tente novamente mais tarde",
        [{ text: "OK", onPress: () => goBack() }]
      );
      return;
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Header back title="Fazer uma doação" />
      <ScrollContent contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Typography>
          Clique no valor em que você deseja doar, ou escolha outro valor
        </Typography>

        <S.ContainerDonation>
          <Button
            title="R$: 10,00"
            txtColor={value !== "10" ? "primary" : "white"}
            size="large"
            outline={value !== "10"}
            margin={10}
            style={{ width: "48%" }}
            onPress={() => {
              setValue("10"), setOutherValue(false);
            }}
          />

          <Button
            title="R$: 30,00"
            txtColor={value !== "30" ? "primary" : "white"}
            size="large"
            outline={value !== "30"}
            margin={10}
            style={{ width: "48%" }}
            onPress={() => {
              setValue("30"), setOutherValue(false);
            }}
          />

          <Button
            title="R$: 50,00"
            txtColor={value !== "50" ? "primary" : "white"}
            size="large"
            outline={value !== "50"}
            margin={10}
            style={{ width: "48%" }}
            onPress={() => {
              setValue("50"), setOutherValue(false);
            }}
          />

          <Button
            title="R$: 100,00"
            txtColor={value !== "100" ? "primary" : "white"}
            size="large"
            outline={value !== "100"}
            margin={10}
            style={{ width: "48%" }}
            onPress={() => {
              setValue("100");
              setOutherValue(false);
            }}
          />

          <Button
            title="Outro valor"
            txtColor={!outherValue ? "primary" : "white"}
            size="large"
            outline={!outherValue}
            margin={15}
            onPress={() => {
              setOutherValue(!outherValue), setValue("0");
            }}
          />

          {outherValue && (
            <Input
              placeholder="R$: 0,00"
              containerStyle={{
                borderWidth: 1,
                borderColor: colors.stroke,
                marginBottom: 9,
              }}
              autoCorrect={false}
              maxLength={10}
              keyboardType="numeric"
              style={{ textAlign: "center", fontSize: 18 }}
              value={value}
              onChangeText={(value) => setValue(value)}
            />
          )}
        </S.ContainerDonation>
      </ScrollContent>

      <BottomButton>
        <Button
          title="Doar agora"
          txtColor="white"
          size="large"
          onPress={() => handleDonate()}
        />
      </BottomButton>
    </Container>
  );
};

export default OngDonation;
