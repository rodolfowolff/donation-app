import React from "react";
import { Text } from "react-native";
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
  const dateComment: any = new Date(data?.createdAt);
  const dateFormatted = `${dateComment.getDate()}/${
    dateComment.getMonth() + 1
  }/${dateComment.getFullYear()}`;

  return (
    <S.CardCommentsContent>
      <S.CardCommentsHeader>
        <Typography color="gray" size="medium" weight="regular">
          {data?.user?.firstName}
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
