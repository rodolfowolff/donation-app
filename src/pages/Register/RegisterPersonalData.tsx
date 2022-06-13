import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { telephoneMask, dateMask } from "js-essentials-functions";

import { useRegister } from "../../context/register";

import { useTheme } from "styled-components";
import { Header, Typography, Input, Button } from "../../components/common";
import { Container, ScrollContent } from "../../styles/global.style";
import * as S from "./styles";

const RegisterPersonalData = () => {
  const { params }: any = useRoute();
  const {
    userPersonalData,
    setUserPersonalData,
    ongPersonalData,
    setOngPersonalData,
  } = useRegister();
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyFields = () => {
    if (params.type === "donation") {
      if (
        userPersonalData.firstName.length < 3 ||
        userPersonalData.firstName.length > 20
      ) {
        Alert.alert("Nome inválido", "O nome deve ter entre 3 e 20 caracteres");
        return false;
      }

      if (
        userPersonalData.lastName.length < 3 ||
        userPersonalData.lastName.length > 20
      ) {
        Alert.alert(
          "Sobrenome inválido",
          "O sobrenome deve ter entre 3 e 20 caracteres"
        );
        return false;
      }

      if (
        userPersonalData.email.length < 5 ||
        userPersonalData.email.length > 50 ||
        !userPersonalData.email.includes("@") ||
        !userPersonalData.email.includes(".")
      ) {
        Alert.alert(
          "Email inválido",
          "O email deve ter entre 5 e 50 caracteres e conter @ e ."
        );
        return false;
      }

      console.log(userPersonalData.telephone.length);
      if (
        userPersonalData.telephone.length < 14 ||
        userPersonalData.telephone.length > 15
      ) {
        Alert.alert(
          "Telefone inválido",
          "O Telefone deve ter entre 10 ou 11 caracteres, incluindo o DDD"
        );
        return false;
      }

      if (userPersonalData.birthDate.length !== 10) {
        Alert.alert(
          "Data de nascimento inválida",
          "A data de nascimento deve ter 10 caracteres, no formato dia/mes/ano"
        );
        return false;
      }
    } else if (params.type === "ong") {
      if (ongPersonalData.name.length < 3 || ongPersonalData.name.length > 20) {
        Alert.alert("Nome inválido", "O nome deve ter entre 3 e 20 caracteres");
        return false;
      }

      if (
        ongPersonalData.email.length < 5 ||
        ongPersonalData.email.length > 50 ||
        !ongPersonalData.email.includes("@") ||
        !ongPersonalData.email.includes(".")
      ) {
        Alert.alert(
          "Email inválido",
          "O email deve ter entre 5 e 50 caracteres e conter @ e ."
        );
        return false;
      }

      if (
        ongPersonalData.telephone.length < 14 ||
        ongPersonalData.telephone.length > 15
      ) {
        Alert.alert(
          "Telefone inválido",
          "O Telefone deve ter entre 10 ou 11 caracteres, incluindo o DDD"
        );
        return false;
      }

      if (ongPersonalData.description.length < 10) {
        Alert.alert(
          "Descrição inválida",
          "A descrição deve ter no mínimo 10 caracteres"
        );
        return false;
      }
    } else {
      Alert.alert("Tipo inválido", "Tipo deve ser doador ou ong");
      return false;
    }
    return true;
  };

  const handleRegisterPersonalData = () => {
    setLoading(true);
    setError("");

    const verify = verifyFields();
    if (!verify) {
      setLoading(false);
      return;
    }

    console.log("userPersonalData: ", userPersonalData);
    console.log("ongPersonalData: ", ongPersonalData);
    navigate("RegisterAddress", {
      type: params.type,
    });
  };

  return (
    <Container style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        back
        type={params.type}
        title={
          params.type === "donation"
            ? "Cadastro dados pessoais"
            : "Cadastro dados da ONG"
        }
      />

      <ScrollContent style={{ marginHorizontal: 16 }}>
        <Typography size="xlarge" weight="bold" style={{ textAlign: "center" }}>
          {`Não encontramos seu registro\n ${
            params.type === "donation"
              ? `CPF: ${userPersonalData.document}`
              : `CNPJ: ${ongPersonalData.document}`
          }`}
        </Typography>

        <Typography
          color="gray"
          style={{ textAlign: "center", marginTop: 6, marginBottom: 15 }}
        >
          Preencha os dados abaixo para continuar
        </Typography>

        <Input
          placeholder={params.type === "donation" ? "Nome" : "Nome da ONG"}
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          autoCorrect={false}
          maxLength={20}
          onChangeText={(name) =>
            params.type === "donation"
              ? setUserPersonalData({ ...userPersonalData, firstName: name })
              : setOngPersonalData({ ...ongPersonalData, name })
          }
          value={
            params.type === "donation"
              ? userPersonalData?.firstName
              : ongPersonalData?.name
          }
        />

        {params.type === "donation" && (
          <Input
            placeholder="Sobrenome"
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.stroke,
              marginBottom: 9,
            }}
            autoCorrect={false}
            maxLength={20}
            value={userPersonalData?.lastName}
            onChangeText={(lastName) =>
              setUserPersonalData({ ...userPersonalData, lastName })
            }
          />
        )}

        <Input
          placeholder="Email"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          maxLength={50}
          value={
            params.type === "donation"
              ? userPersonalData?.email
              : ongPersonalData?.email
          }
          onChangeText={(email) => {
            params.type === "donation"
              ? setUserPersonalData({ ...userPersonalData, email })
              : setOngPersonalData({ ...ongPersonalData, email });
          }}
        />

        <Input
          placeholder="Celular com DDD (Ex: (11) 99999-9999)"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          keyboardType="numeric"
          autoCorrect={false}
          maxLength={15}
          value={telephoneMask(
            params.type === "donation"
              ? userPersonalData?.telephone
              : ongPersonalData?.telephone || ""
          )}
          onChangeText={(telephone) => {
            params.type === "donation"
              ? setUserPersonalData({ ...userPersonalData, telephone })
              : setOngPersonalData({ ...ongPersonalData, telephone });
          }}
        />

        {params.type === "donation" && (
          <Input
            placeholder="Data de nascimento (Ex: 01/01/1900)"
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.stroke,
              marginBottom: 9,
            }}
            keyboardType="numeric"
            autoCorrect={false}
            maxLength={11}
            value={dateMask(userPersonalData?.birthDate || "")}
            onChangeText={(birthDate) =>
              setUserPersonalData({ ...userPersonalData, birthDate })
            }
          />
        )}

        {params.type === "ong" && (
          <Input
            placeholder="Descrição sobre a ONG"
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.stroke,
              marginBottom: 9,
            }}
            autoCorrect={false}
            maxLength={50}
            value={ongPersonalData?.description}
            onChangeText={(description) =>
              setOngPersonalData({ ...ongPersonalData, description })
            }
          />
        )}

        <S.ButtonContent>
          <Button
            title="Continuar"
            txtColor="white"
            margin={5}
            onPress={() => {
              handleRegisterPersonalData();
            }}
          />
        </S.ButtonContent>
      </ScrollContent>
    </Container>
  );
};

export default RegisterPersonalData;
