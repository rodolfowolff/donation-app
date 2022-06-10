import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { Button, Typography  } from '../../components/common';
import { Container, Content, BgImage } from '../../styles/global.style';
import imageOnboard from '../../assets/images/onboarding-bg.png';

const Onboarding = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  return (
    <Container style={{ backgroundColor: colors.primary}}>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <BgImage source={imageOnboard} resizeMode="cover" />
      <Content style={{flex: 1, justifyContent: 'flex-end'}}>
        <Typography color='white' size='xxlarge' weight='bold'>
          {`Todos nós podemos\nser solidários`}
        </Typography>
        <Typography color='white' size='medium' weight='regular' style={{marginTop:10, marginBottom:15}}>
          Selecione abaixo se você deseja entrar como doador ou como ONG
        </Typography>
        <Button 
          title='Entrar como ONG'
          bgColor='white'
          txtColor='white'
          size="large"
          weight='bold'
          outline 
          onPress={() => navigate("LoginVerifyEmail", { type: "ong" })}
        />
        <Button 
          title='Entrar como Doador'
          bgColor='white'
          txtColor='primary'
          size="large"
          weight='bold'
          margin={20}
          onPress={() => navigate("LoginVerifyEmail", { type: "donation" })}
        />
      </Content>
    </Container>
  );
}

export default Onboarding;