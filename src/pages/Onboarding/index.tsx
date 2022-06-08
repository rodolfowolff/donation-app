import React from 'react';
import { useTheme } from 'styled-components/native';

import { Button } from '../../components/common';
import { Container, Content } from '../../styles/global.style';
import * as S from './styles';
import bgImage from '../../assets/images/onboarding-bg.png';

const Onboarding = () => {
  const { colors } = useTheme();

  return (
    <Container style={{ backgroundColor: colors.primary}}>


      <Content>
      <S.BgImage source={bgImage} resizeMode="contain" />
        {/* <Typography color='white' size='xxlarge' weight='regular'>Texto</Typography> */}
        <Button title='Entrar como Doador' bgColor='white' txtColor='primary' margin={10} />
        <Button title='Entrar como ONG' bgColor='white' txtColor='white' outline />
      </Content>

    </Container>
  );
}

export default Onboarding;