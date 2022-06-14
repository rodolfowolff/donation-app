import React from "react";
import { Typography } from "../../components/common";
import { Container } from "../../styles/global.style";

import * as S from "./styles";

const Loading = () => {
  return (
    <Container>
      <S.ContentLoading>
        <Typography color="black" size="xxlarge" weight="bold">
          Carregando, aguarde...
        </Typography>
      </S.ContentLoading>
    </Container>
  );
};

export default Loading;
