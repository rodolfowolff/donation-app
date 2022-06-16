import React, { useState } from "react";
import { Alert, FlatList, Pressable, StatusBar, View } from "react-native";

import useFetch, { useSWRConfig } from "../../hooks/useFetch";
import { useGeneralContext } from "../../context/general";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import {
  Header,
  Typography,
  Loading,
  Button,
  CardComments,
  Input,
} from "../../components/common";
import { AntDesign } from "@expo/vector-icons";
import { Container, Divider, BottomButton } from "../../styles/global.style";
import * as S from "./styles";
import ImageTeste from "../../assets/images/onboarding-bg.png";

const OngDetails = () => {
  const { params }: any = useRoute();
  const { data, error } = useFetch(`/ongs/${params.id}`);
  const { api, loading } = useGeneralContext();
  const { mutate } = useSWRConfig();
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState("");

  if (error) {
    Alert.alert("Erro", "Não foi possível carregar os dados da ONG", [
      { text: "OK", onPress: () => goBack() },
    ]);
  }

  const renderComments = ({ item }: any) => <CardComments data={item} />;

  const handleCreateComment = async () => {
    if (!comment || comment.length < 3) {
      Alert.alert("Erro", "O comentário deve ter no mínimo 3 caracteres");
      return;
    }

    try {
      const { data } = await api({
        entity: "comment",
        action: "createComment",
        payload: {
          comment,
          ongId: params.id,
        },
      } as any);

      if (data.message === "Comment created successfully") {
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
    }
  };

  if (!data || loading) return <Loading />;

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
              Ajude e faça o bem ao próximo
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

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={data.comments}
        renderItem={renderComments}
        keyExtractor={(item) => item.createdAt}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <S.BannerContentImg>
              <S.BannerImg
                source={
                  data?.ongPersonalData?.banner
                    ? { uri: data?.ongPersonalData?.banner }
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
              {data?.name || "Nome da ONG"}
            </Typography>
            <Typography
              color="gray"
              size="medium"
              weight="bold"
              style={{ marginTop: 5 }}
            >
              {data?.donations.length} doações
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
              {data?.ongPersonalData?.email || "Não informado"}
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
              {data?.ongPersonalData?.description || "Não informado"}
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
                onChangeText={(comment) => setComment(comment)}
                value={comment}
              />
              <S.CommentButton
                onPress={() => {
                  handleCreateComment();
                }}
              >
                <Typography color="white" size="medium" weight="regular">
                  Enviar
                </Typography>
              </S.CommentButton>
            </S.CommentsContainer>

            <S.DescriptionContainer>
              <Typography color="gray" size="medium" weight="regular">
                Comentários
              </Typography>
              <Typography color="gray" size="medium" weight="regular">
                ({data?.comments?.length || 0})
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
          onPress={() => Alert.alert("doar", "chamar função doar")}
        />
      </BottomButton>
    </Container>
  );
};

export default OngDetails;
