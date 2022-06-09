import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Button, Typography } from '../../components/common';
import { Container, Content } from '../../styles/global.style';
import * as S from './styles';
import bgImage from '../../assets/images/onboarding-bg.png';

const Onboarding = () => {
  const { colors } = useTheme();

  return (
    <Container style={{ backgroundColor: colors.primary}}>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <S.BgImage source={bgImage} resizeMode="cover" />
      <Content style={{flex: 1, justifyContent: 'flex-end'}}>
        <Typography color='white' size='xxlarge' weight='bold'>
          {`Todos nós podemos\nser solidários`}
        </Typography>
        <Typography color='white' size='medium' weight='regular' style={{marginTop:10, marginBottom:15}}>
          Selecione abaixo se você deseja entrar como doador ou como ONG
        </Typography>
        <Button title='Entrar como ONG' bgColor='white' txtColor='white' size="large"  weight='bold' outline />
        <Button title='Entrar como Doador' bgColor='white' txtColor='primary' size="large"  weight='bold' margin={20}/>
      </Content>
    </Container>
  );
}

export default Onboarding;