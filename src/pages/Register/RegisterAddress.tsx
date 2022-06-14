import React, { useEffect, useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { cepMask, cepUnmask } from "js-essentials-functions";

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
import useFetch from "../../hooks/useFetch";

const RegisterAddress = () => {
  const { params }: any = useRoute();
  const { addressData, setAddressData } = useRegister();
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const { data, error } = useFetch(
    addressData.zipCode && addressData.zipCode.length === 9
      ? `/zipcode/${cepUnmask(addressData.zipCode)}`
      : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (data) {
      setAddressData({
        ...addressData,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      });
      setLoading(false);
    } else {
      console.log("error no cep: ", error);
      setAddressData({
        ...addressData,
        zipCode: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      });
      setLoading(false);
      Alert.alert("Erro", "Ocorreu um erro ao buscar o CEP, tente novamente");
    }
  }, [data]);

  const verifyFields = () => {
    //
    // fazer verificação de campos
    //
    if (
      addressData.zipCode.length === 9 &&
      addressData.street.length > 3 &&
      addressData.number.length > 0 &&
      addressData.neighborhood.length > 3 &&
      addressData.city.length > 3 &&
      addressData.state.length === 2
    ) {
      return true;
    }
    Alert.alert("Preencha todos os campos corretamente");
    return false;
  };

  const handleRegisterAddress = () => {
    setLoading(true);
    const verify = verifyFields();
    if (!verify) {
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("RegisterPassword", {
      type: params.type,
    });
  };

  return loading ? (
    <Loading />
  ) : (
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
