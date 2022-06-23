import React, { useEffect, useState } from "react";
import { Alert, Pressable, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../../context/auth";
import useFetch, { useSWRConfig } from "../../hooks/useFetch";
import { useGeneralContext } from "../../context/general";
import { useRegister } from "../../context/register";
import { cpfCnpjMask, telephoneMask } from "js-essentials-functions";
import { verifyEmail, verifyPhoneNumber } from "../../utils/verifyInput";

import { useTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Header,
  Input,
  Loading,
  Skeleton,
  Typography,
} from "../../components/common";
import { BottomButton, Container } from "../../styles/global.style";
import * as S from "./styles";

const Profile = () => {
  const { personalData, setPersonalData, setIsAuth } = useAuth();
  const { resetState } = useRegister();
  const { colors } = useTheme();
  const { reset, goBack, navigate } = useNavigation();
  const { data, error, loading } = useFetch(`/users/${personalData.id}`);
  const { api } = useGeneralContext();
  const { mutate } = useSWRConfig();

  const [loadingLogout, setLoadingLogout] = useState(false);

  if (error) {
    console.log("error", error);
    Alert.alert("Erro", "Erro ao carregar seu perfil", [
      {
        text: "OK",
        onPress: () => reset({ index: 0, routes: [{ name: "Index" }] }),
      },
    ]);
    return null;
  }

  useEffect(() => {
    if (!loading) {
      setPersonalData({ ...personalData, ...data });
    }
  }, [loading]);

  useEffect(() => {
    if (loadingLogout) {
      setTimeout(async () => {
        setIsAuth(false);
      }, 1000);

      return () => {
        clearTimeout(1000);
      };
    }
  }, [loadingLogout]);

  const handleLogout = async () => {
    setLoadingLogout(true);
    await AsyncStorage.clear();
    resetState();

    setTimeout(() => {
      setLoadingLogout(false);
    }, 1000);
  };

  const handleEditUser = async () => {
    if (!verifyEmail(personalData.userPersonalData.email)) {
      Alert.alert("Email inválido", "Por favor, informe um email válido");
      return;
    }

    if (
      !verifyPhoneNumber(
        telephoneMask(personalData.userPersonalData.telephone || "")
      )
    ) {
      Alert.alert("Telefone inválido", "Por favor, informe um telefone válido");
      return;
    }

    const personalStorage = await AsyncStorage.getItem(
      "@personal_donation_app"
    );
    const personalDataParse = JSON.parse(personalStorage || "{}");

    if (
      personalDataParse.userPersonalData.email ===
        personalData.userPersonalData.email &&
      personalDataParse.userPersonalData.telephone ===
        personalData.userPersonalData.telephone
    ) {
      Alert.alert("ERRO:", "Nenhuma alteração foi realizada");
      return;
    }

    try {
      const { data: dataApi } = await api({
        entity: "user",
        action: "updateUser",
        params: {
          id: personalData.id,
        },
        payload: {
          email:
            personalData.userPersonalData.email !== data?.userPersonalData.email
              ? personalData.userPersonalData.email
              : null,
          telephone:
            personalData.userPersonalData.telephone !==
            data?.userPersonalData.telephone
              ? personalData.userPersonalData.telephone
              : null,
        },
      } as any);

      if (dataApi.message === "User updated successfully") {
        mutate(`/users/${personalData.id}`);
        Alert.alert("Sucesso", "Dados atualizados com sucesso");
        return;
      } else {
        console.log("Erro ao atualizar usuário: ", dataApi);
        Alert.alert("Erro", "Não foi possível atualizar os dados");
        return;
      }
    } catch (error: any) {
      console.log("error no update user: ", error);
      Alert.alert("Erro", "Não foi possível atualizar os dados", [
        { text: "OK", onPress: () => goBack() },
      ]);
      return;
    }
  };

  if (loadingLogout) return <Loading />;

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        back
        title="PERFIL DO USUÁRIO"
        rightComponent={
          <Pressable onPress={() => handleLogout()}>
            {/* @ts-ignore */}
            <AntDesign name="logout" size={31} color={colors.danger} />
          </Pressable>
        }
      />

      {loading ? (
        <>
          <Skeleton
            width="50%"
            height={30}
            color="gray"
            variant="card"
            marginLeft={100}
            borderRadius={5}
            marginBottom={20}
          />

          {[0, 1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              width="90%"
              height={50}
              color="gray"
              variant="card"
              borderRadius={10}
              marginTop={10}
            />
          ))}
        </>
      ) : (
        <>
          <S.ChangePasswordContent>
            <Typography
              size="xxlarge"
              weight="bold"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              {personalData?.firstName && personalData?.lastName
                ? `${personalData?.firstName} ${personalData?.lastName}`
                : "Usuário"}
            </Typography>

            <Input
              placeholder={"email@email.com"}
              containerStyle={{
                borderWidth: 1,
                borderColor: colors.stroke,
                marginBottom: 9,
              }}
              autoCorrect={false}
              maxLength={40}
              keyboardType="email-address"
              value={personalData?.userPersonalData?.email || ""}
              onChangeText={(email) =>
                setPersonalData({
                  ...personalData,
                  userPersonalData: { ...personalData.userPersonalData, email },
                })
              }
            />

            <Input
              rightIcon
              containerStyle={{
                borderWidth: 1,
                borderColor: colors.stroke,
                marginBottom: 9,
              }}
              rightIconName="lock"
              rightIconColor={colors.gray}
              editable={false}
              placeholderTextColor={colors.gray}
              placeholder={cpfCnpjMask(personalData?.document || "") || ""}
            />

            <Input
              rightIcon
              containerStyle={{
                borderWidth: 1,
                borderColor: colors.stroke,
                marginBottom: 9,
              }}
              placeholderTextColor={colors.gray}
              placeholder="(00) 00000-0000"
              autoCorrect={false}
              maxLength={15}
              keyboardType="phone-pad"
              value={
                telephoneMask(
                  personalData?.userPersonalData?.telephone || ""
                ) || ""
              }
              onChangeText={(telephone) =>
                setPersonalData({
                  ...personalData,
                  userPersonalData: {
                    ...personalData.userPersonalData,
                    telephone,
                  },
                })
              }
            />

            <Input
              rightIcon
              containerStyle={{
                borderWidth: 1,
                borderColor: colors.stroke,
                marginBottom: 9,
              }}
              rightIconName="lock"
              rightIconColor={colors.gray}
              editable={false}
              placeholderTextColor={colors.gray}
              placeholder={personalData?.userPersonalData?.birthDate || ""}
            />
          </S.ChangePasswordContent>

          <S.ChangePasswordContainer>
            <TouchableOpacity onPress={() => navigate("ChangePassword")}>
              <Typography size="small" weight="bold" color="gray">
                ALTERAR SENHA
              </Typography>
            </TouchableOpacity>
          </S.ChangePasswordContainer>

          <BottomButton>
            <Button
              title="Salvar"
              txtColor="white"
              size="large"
              onPress={() => handleEditUser()}
            />
          </BottomButton>
        </>
      )}
    </Container>
  );
};

export default Profile;
