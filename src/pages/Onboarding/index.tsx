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
      <S.BgImage source={bgImage} resizeMode="cover" />
      <Content style={{flex: 1, justifyContent: 'flex-end'}}>
        {/* <Typography color='white' size='xxlarge' weight='regular'>Texto</Typography> */}
        <Button title='Entrar como ONG' bgColor='white' txtColor='white' size="large"  weight='bold' outline />
        <Button title='Entrar como Doador' bgColor='white' txtColor='primary' size="large"  weight='bold' margin={40}/>
      </Content>
    </Container>
  );
}

export default Onboarding;