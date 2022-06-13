import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { cepMask } from "js-essentials-functions";

import { useRegister } from "../../context/register";

import { useTheme } from "styled-components";
import { Header, Typography, Input, Button } from "../../components/common";
import { Container, ScrollContent } from "../../styles/global.style";
import * as S from "./styles";

const RegisterAddress = () => {
  const { params }: any = useRoute();
  const { addressData, setAddressData } = useRegister();
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterAddress = () => {
    setLoading(true);
    setError("");

    navigate("RegisterPassword", {
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
      <Header back type={params.type} title="Cadastro de endereço" />

      <ScrollContent style={{ marginHorizontal: 16 }}>
        <Typography size="xlarge" weight="bold" style={{ textAlign: "center" }}>
          {`Agora precisamos do ${
            params.type === "donation" ? "seu endereço" : "endereço da ONG"
          }`}
        </Typography>

        <Typography
          color="gray"
          style={{ textAlign: "center", marginTop: 6, marginBottom: 15 }}
        >
          Preencha os dados abaixo para continuar
        </Typography>

        <Input
          placeholder="CEP"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          autoCorrect={false}
          maxLength={9}
          keyboardType="numeric"
          onChangeText={(zipCode) =>
            setAddressData({ ...addressData, zipCode: cepMask(zipCode) })
          }
          value={cepMask(addressData?.zipCode || "")}
        />

        <Input
          placeholder="Rua"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          autoCorrect={false}
          maxLength={40}
          onChangeText={(street) => setAddressData({ ...addressData, street })}
          value={addressData?.street || ""}
        />

        <S.InputContent>
          <Input
            placeholder="Numero"
            containerStyle={{
              width: "30%",
              borderWidth: 1,
              borderColor: colors.stroke,
              marginBottom: 9,
            }}
            maxLength={8}
            keyboardType="numeric"
            onChangeText={(number) =>
              setAddressData({ ...addressData, number })
            }
            value={addressData?.number || ""}
          />

          <Input
            placeholder="Complemento"
            containerStyle={{
              width: "65%",
              borderWidth: 1,
              borderColor: colors.stroke,
              marginBottom: 9,
            }}
            autoCorrect={false}
            maxLength={25}
            onChangeText={(complement) =>
              setAddressData({ ...addressData, complement })
            }
            value={addressData?.complement || ""}
          />
        </S.InputContent>

        <Input
          placeholder="Bairro"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginBottom: 9,
          }}
          autoCorrect={false}
          maxLength={20}
          onChangeText={(neighborhood) =>
            setAddressData({ ...addressData, neighborhood })
          }
          value={addressData?.neighborhood || ""}
        />

        <S.InputContent>
          <Input
            placeholder="Cidade"
            containerStyle={{
              width: "75%",
              borderWidth: 1,
              borderColor: colors.stroke,
              marginBottom: 9,
            }}
            autoCorrect={false}
            maxLength={27}
            onChangeText={(city) => setAddressData({ ...addressData, city })}
            value={addressData?.city || ""}
          />

          <Input
            placeholder="UF"
            containerStyle={{
              width: "20%",
              borderWidth: 1,
              borderColor: colors.stroke,
              marginBottom: 9,
            }}
            autoCorrect={false}
            maxLength={2}
            onChangeText={(state) => setAddressData({ ...addressData, state })}
            value={addressData?.state || ""}
          />
        </S.InputContent>

        <S.ButtonContent>
          <Button
            title="Continuar"
            txtColor="white"
            margin={5}
            onPress={() => {
              handleRegisterAddress();
            }}
          />
        </S.ButtonContent>
      </ScrollContent>
    </Container>
  );
};

export default RegisterAddress;
