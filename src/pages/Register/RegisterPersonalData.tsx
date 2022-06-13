import React, { useState } from "react";
import { StatusBar } from "react-native";
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

  const handleRegisterPersonalData = () => {
    setLoading(true);
    setError("");
    console.log("userPersonalData: ", userPersonalData);
    console.log("ongPersonalData: ", ongPersonalData);
    navigate("RegisterAddress", {
      type: params.type,
    });

    // if (firstName.length < 3 || firstName.length > 20) {
    //   setError("Nome deve ter no mínimo 3 caracteres");
    //   setLoading(false);
    //   return alert("Nome deve ter no mínimo 3 caracteres");
    // }
    // if (
    //   email.length < 3 ||
    //   email.length > 50 ||
    //   !email.includes("@") ||
    //   !email.includes(".")
    // ) {
    //   setError(
    //     "Email deve ter no mínimo 3 caracteres e no máximo 50 caracteres"
    //   );
    //   setLoading(false);
    //   return alert(
    //     "Email deve ter no mínimo 3 caracteres e no máximo 50 caracteres"
    //   );
    // }
    // if (telephone.length < 10 || telephone.length > 11) {
    //   setError("Telefone deve ter no mínimo 10 caracteres");
    //   setLoading(false);
    //   return alert("Telefone deve ter no mínimo 10 caracteres");
    // }
    // if (params.type === "donation") {
    //   if (lastName.length < 3 || lastName.length > 20) {
    //     setError("Sobrenome deve ter no mínimo 3 caracteres e no máximo 20");
    //     setLoading(false);
    //     return alert(
    //       "Sobrenome deve ter no mínimo 3 caracteres e no máximo 20"
    //     );
    //   }
    //   if (birthDate.length < 10) {
    //     setError("Data de nascimento deve ter no mínimo 10 caracteres");
    //     setLoading(false);
    //     return alert("Data de nascimento deve ter no mínimo 10 caracteres");
    //   }
    // } else {
    //   if (description.length < 10) {
    //     setError("Descrição deve ter no mínimo 10 caracteres");
    //     setLoading(false);
    //     return alert("Descrição deve ter no mínimo 10 caracteres");
    //   }
    // }
    // setLoading(false);
    // navigate("RegisterAddress", {
    //   type: params.type,
    // });
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
          placeholder="Celular com DDD Ex: 11 99999-9999"
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
            placeholder="Data de nascimento (Dia/Mes/Ano)"
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
