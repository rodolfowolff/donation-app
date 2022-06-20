import React from "react";
import { Text } from "react-native";
import dateFormat from "../../../utils/formatDate";
import { Typography } from "../Text";

import * as S from "./styles";

interface CardCommentsProps {
  data: {
    comment: string;
    createdAt: string;
    user: {
      firstName: string;
    };
  };
}

const CardComments: React.FC<CardCommentsProps> = ({ data }) => {
  const dateFormatted = dateFormat(data?.createdAt);

  return (
    <S.CardCommentsContent>
      <S.CardCommentsHeader>
        <Typography color="gray" size="medium" weight="regular">
          {data?.user?.firstName || "Usuário"}
        </Typography>
        <Typography color="gray" size="medium" weight="regular">
          {dateFormatted || "Não informado"}
        </Typography>
      </S.CardCommentsHeader>
      <Typography
        color="primary"
        size="medium"
        weight="regular"
        style={{ marginBottom: 10 }}
      >
        {data?.comment}
      </Typography>
    </S.CardCommentsContent>
  );
};

export { CardComments };
