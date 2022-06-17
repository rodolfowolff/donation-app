import React, { useEffect, useState } from "react";
import { Alert, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { useAuth } from "../../context/auth";
import useFetch, { useSWRConfig } from "../../hooks/useFetch";
import { useGeneralContext } from "../../context/general";
import {
  cpfCnpjMask,
  telephoneMask,
  telephoneUnmask,
} from "js-essentials-functions";

import {
  Button,
  Header,
  Input,
  Loading,
  Typography,
} from "../../components/common";
import { BottomButton, Container } from "../../styles/global.style";
import * as S from "./styles";

const Profile = () => {
  const { personalData, setPersonalData } = useAuth();
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { data, error } = useFetch(`/users/${personalData.id}`);
  const { api, loading } = useGeneralContext();
  const { mutate } = useSWRConfig();

  const [loadingLocal, setLoadingLocal] = useState(false);

  if (error) {
    Alert.alert("Erro", "Não foi possível carregar os dados", [
      { text: "OK", onPress: () => goBack() },
    ]);
  }

  useEffect(() => {
    if (data) {
      setLoadingLocal(true);
      setPersonalData({ ...personalData, ...data });
      setLoadingLocal(false);
    }
  }, [data]);

  const handleEditUser = async () => {
    setLoadingLocal(true);

    if (personalData.userPersonalData.email.length === 0) {
      Alert.alert("Erro", "O campo e-mail não pode estar vazio");
      setLoadingLocal(false);
      return;
    }

    if (
      personalData.userPersonalData.email.length < 5 ||
      personalData.userPersonalData.email.length > 40
    ) {
      Alert.alert("Erro", "O campo e-mail deve ter entre 5 e 40 caracteres");
      setLoadingLocal(false);
      return;
    }

    if (personalData.userPersonalData.telephone.length === 0) {
      Alert.alert("Erro", "O campo e-mail não pode estar vazio");
      setLoadingLocal(false);
      return;
    }

    if (
      personalData.userPersonalData.telephone.length < 14 ||
      personalData.userPersonalData.telephone.length > 15 ||
      !telephoneMask(personalData.userPersonalData.telephone || "")
    ) {
      Alert.alert("Erro", "O campo nome não pode estar vazio");
      setLoadingLocal(false);
      return;
    }

    try {
      setLoadingLocal(true);
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
      setLoadingLocal(false);
      Alert.alert("Erro", "Não foi possível atualizar os dados", [
        { text: "OK", onPress: () => goBack() },
      ]);
      return;
    } finally {
      setLoadingLocal(false);
    }
  };

  if (!data || loading || loadingLocal) return <Loading />;

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back title="PERFIL DO USUARIO" />

      <S.ChangePasswordContent>
        <Typography
          size="xxlarge"
          weight="bold"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          {personalData?.firstName && personalData?.lastName
            ? `${personalData?.firstName} ${personalData?.lastName}`
            : ""}
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
            telephoneMask(personalData?.userPersonalData?.telephone || "") || ""
          }
          onChangeText={(telephone) =>
            setPersonalData({
              ...personalData,
              userPersonalData: { ...personalData.userPersonalData, telephone },
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
    </Container>
  );
};

export default Profile;
