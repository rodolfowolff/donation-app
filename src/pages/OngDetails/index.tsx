import React, { useState } from "react";
import { Alert, FlatList, Pressable, StatusBar, View } from "react-native";

import useFetch, { useSWRConfig } from "../../hooks/useFetch";
import { useGeneralContext } from "../../context/general";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { verifyGeneralText } from "../../utils/verifyInput";

import {
  Header,
  Typography,
  Button,
  CardComments,
  Input,
  Skeleton,
} from "../../components/common";
import { AntDesign } from "@expo/vector-icons";
import { Container, Divider, BottomButton } from "../../styles/global.style";
import * as S from "./styles";
import ImageTeste from "../../assets/images/onboarding-bg.png";

const OngDetails = () => {
  const { params }: any = useRoute();
  const { data: ongData, error, loading } = useFetch(`/ongs/${params.id}`);
  const { api } = useGeneralContext();
  const { mutate } = useSWRConfig();
  const { colors } = useTheme();
  const { reset, navigate } = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [validComment, setValidComment] = useState(false);

  if (error) {
    Alert.alert("Erro", "Erro ao carregar os detalhes da ong", [
      {
        text: "OK",
        onPress: () => reset({ index: 0, routes: [{ name: "Index" }] }),
      },
    ]);
    return null;
  }

  const renderComments = ({ item }: any) => <CardComments data={item} />;

  const handleCreateComment = async () => {
    if (!verifyGeneralText(comment, 3, 50)) {
      Alert.alert(
        "Comentário inválido",
        "Comentário deve ter no mínimo 10 caracteres e no máximo 50"
      );
      return;
    }

    try {
      setLoadingComment(true);
      const { data: commentsData } = await api({
        entity: "comment",
        action: "createComment",
        payload: {
          comment,
          ongId: params.id,
        },
      } as any);

      if (commentsData.message === "Comment created successfully") {
        setComment("");
        mutate(`/ongs/${params.id}`);
        Alert.alert("Sucesso", "Comentário criado com sucesso");
        return;
      } else {
        setComment("");
        Alert.alert("Erro", "Não foi possível criar o comentário");
        return;
      }
    } catch (error: any) {
      console.log("error no create comment: ", error);
      setComment("");
      Alert.alert("ERRO", "Erro no servidor, tente novamente mais tarde.");
      return;
    } finally {
      setLoadingComment(false);
    }
  };

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        back
        leftComponent={
          <View style={{ alignItems: "center" }}>
            <Typography color="black" size="xlarge" weight="bold">
              Informações
            </Typography>
            <Typography color="gray" size="medium" weight="regular">
              ONG
            </Typography>
          </View>
        }
        rightComponent={
          <Pressable onPress={() => setIsFavorite(!isFavorite)}>
            {/* @ts-ignore */}
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={28}
              color={isFavorite ? colors.danger : colors.black}
            />
          </Pressable>
        }
      />

      {loading || loadingComment ? (
        <>
          <Skeleton
            width="90%"
            height={200}
            color="gray"
            variant="card"
            borderRadius={5}
            marginBottom={20}
          />

          {[0, 1, 2].map((item) => (
            <View key={item}>
              <Skeleton
                width="90%"
                height={20}
                color="gray"
                variant="card"
                borderRadius={10}
                marginTop={10}
              />
            </View>
          ))}
        </>
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 16 }}
            data={ongData.comments || []}
            renderItem={renderComments as any}
            keyExtractor={(item) => item.createdAt}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <S.BannerContentImg>
                  <S.BannerImg
                    source={
                      ongData?.ongPersonalData?.banner
                        ? { uri: ongData?.ongPersonalData?.banner }
                        : ImageTeste
                    }
                    resizeMode="cover"
                  />
                </S.BannerContentImg>
                <Typography
                  color="black"
                  size="large"
                  weight="regular"
                  style={{ marginTop: 10 }}
                >
                  {ongData?.name || "Nome da ONG"}
                </Typography>
                <Typography
                  color="gray"
                  size="medium"
                  weight="bold"
                  style={{ marginTop: 5 }}
                >
                  {ongData?.donations.length}{" "}
                  {ongData?.donations.length > 1
                    ? "doações recebidas"
                    : "doação recebida"}
                </Typography>
                <Divider />
                <Typography color="gray" size="medium" weight="bold">
                  Email
                </Typography>
                <Typography
                  color="black"
                  size="large"
                  weight="regular"
                  style={{ marginTop: 5 }}
                >
                  {ongData?.ongPersonalData?.email || "Não informado"}
                </Typography>

                <Divider />

                <S.DescriptionContainer>
                  <Typography color="gray" size="medium" weight="bold">
                    Descrição
                  </Typography>
                </S.DescriptionContainer>

                <Typography
                  color="black"
                  size="large"
                  weight="regular"
                  style={{ marginBottom: 15 }}
                >
                  {ongData?.ongPersonalData?.description || "Não informado"}
                </Typography>

                <Divider />

                <S.CommentsContainer>
                  <Input
                    placeholder="Insira seu comentário"
                    containerStyle={{
                      width: "80%",
                      borderWidth: 1,
                      borderColor: colors.stroke,
                    }}
                    onChangeText={(comment) => {
                      setComment(comment);
                      const isValid = verifyGeneralText(comment, 3, 100);
                      isValid ? setValidComment(true) : setValidComment(false);
                    }}
                    value={comment}
                    editable={!loading}
                  />
                  <Button
                    title="Enviar"
                    txtColor={!validComment || loading ? "gray" : "white"}
                    bgColor={!validComment || loading ? "gray" : "primary"}
                    outline={!validComment || loading}
                    size="medium"
                    weight="regular"
                    style={{ width: "18%" }}
                    disabled={!validComment || loading}
                    onPress={() => handleCreateComment()}
                  />
                </S.CommentsContainer>

                <S.DescriptionContainer>
                  <Typography color="gray" size="medium" weight="regular">
                    Comentários
                  </Typography>
                  <Typography color="gray" size="medium" weight="regular">
                    ({ongData?.comments?.length || 0})
                  </Typography>
                </S.DescriptionContainer>
              </>
            }
          />

          <BottomButton>
            <Button
              title="Doar agora"
              txtColor="white"
              size="large"
              onPress={() => navigate("OngDonation", { ongId: params.id })}
            />
          </BottomButton>
        </>
      )}
    </Container>
  );
};

export default OngDetails;
