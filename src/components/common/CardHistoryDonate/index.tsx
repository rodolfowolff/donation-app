import React from "react";
import dateFormat from "../../../utils/formatDate";

import { Typography } from "../Text";
import * as S from "./styles";

interface IDonationHistoryProps {
  data: {
    status: string;
    value: string;
    createdAt: string;
    type: string;
    ong: {
      name: string;
    };
  };
}

const CardHistoryDonate: React.FC<IDonationHistoryProps> = ({ data }) => {
  const dateFormatted = dateFormat(data?.createdAt);

  return (
    <S.ContainerCard>
      <S.Left>
        <Typography size="xlarge" weight="bold">
          {data?.ong?.name || "ONG"}
        </Typography>
        <Typography
          size="medium"
          weight="bold"
          color="gray"
          style={{ marginTop: 5 }}
        >
          {dateFormatted || "Não informado"}
        </Typography>
      </S.Left>
      <S.Right>
        <Typography
          size="xlarge"
          weight="bold"
          color={
            data?.status === "PENDING"
              ? "gray"
              : data?.status === "CONFIRMED"
              ? "success"
              : "danger"
          }
        >
          {data?.value || "R$ 0,00"}
        </Typography>
        <Typography
          size="medium"
          color={
            data?.status === "PENDING"
              ? "gray"
              : data?.status === "CONFIRMED"
              ? "success"
              : "danger"
          }
          weight="bold"
          style={{ marginTop: 5 }}
        >
          {data?.status === "PENDING"
            ? "Aguardando confirmação"
            : data?.status === "CONFIRMED"
            ? "Confirmado"
            : "Cancelado"}
        </Typography>
        <Typography
          size="medium"
          color="primary"
          weight="bold"
          style={{ marginTop: 5 }}
        >
          {data?.type || "Não informado"}
        </Typography>
      </S.Right>
    </S.ContainerCard>
  );
};

export { CardHistoryDonate };
