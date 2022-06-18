import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { telephoneMask, dateMask } from "js-essentials-functions";
import {
  verifyName,
  verifyEmail,
  verifyPhoneNumber,
  verifyDate,
  verifyGeneralText,
} from "../../utils/verifyInput";

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
  const [loading, setLoading] = useState(false);

  const verifyFields = () => {
    if (params.type === "donation") {
      const { firstName, lastName, email, telephone, birthDate } =
        userPersonalData;
      if (
        firstName === undefined ||
        lastName === undefined ||
        email === undefined ||
        telephone === undefined ||
        birthDate === undefined
      ) {
        Alert.alert(
          "Campos vazios",
          "Preencha todos os campos antes de continuar."
        );
        return false;
      }

      if (!verifyName(firstName)) {
        Alert.alert("Nome inválido", "O nome deve ter entre 3 e 20 caracteres");
        return false;
      }

      if (!verifyName(lastName)) {
        Alert.alert(
          "Sobrenome inválido",
          "O sobrenome deve ter entre 3 e 20 caracteres"
        );
        return false;
      }

      if (!verifyEmail(email)) {
        Alert.alert("Email inválido", "Insira um email válido");
        return false;
      }

      if (!verifyPhoneNumber(telephone)) {
        Alert.alert(
          "Telefone inválido",
          "Insira um telefone válido, incluindo o DDD"
        );
        return false;
      }

      if (!verifyDate(birthDate)) {
        Alert.alert(
          "Data de nascimento inválida",
          "Informe uma data válida no formato dia/mes/ano"
        );
        return false;
      }
    } else if (params.type === "ong") {
      const { name, email, telephone, description } = ongPersonalData;
      if (!verifyName(name)) {
        Alert.alert("Nome inválido", "O nome deve ter entre 3 e 20 caracteres");
        return false;
      }

      if (!verifyEmail(email)) {
        Alert.alert("Email inválido", "Insira um email válido");
        return false;
      }

      if (!verifyPhoneNumber(telephone)) {
        Alert.alert(
          "Telefone inválido",
          "Insira um telefone válido, incluindo o DDD"
        );
        return false;
      }

      if (!verifyGeneralText(description, 10, 50)) {
        Alert.alert(
          "Descrição inválida",
          "A descrição deve ter no mínimo 10 caracteres e no máximo 50"
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
    const verify = verifyFields();

    if (verify === false) {
      setLoading(false);
      return;
    }

    setLoading(false);

    navigate("RegisterAddress", {
      type: params.type,
    });
    return;
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        back
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
              ? `CPF: ${userPersonalData?.document || ""}`
              : `CNPJ: ${ongPersonalData?.document || ""}`
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
          value={
            params.type === "donation"
              ? telephoneMask(userPersonalData?.telephone || "")
              : telephoneMask(ongPersonalData?.telephone || "")
          }
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
            maxLength={10}
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
