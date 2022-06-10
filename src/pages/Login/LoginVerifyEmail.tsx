import React from 'react';
import { StatusBar, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { Button, Typography  } from '../../components/common';
import { Container, Content, BgImage } from '../../styles/global.style';
import imageOnboard from '../../assets/images/onboarding-bg.png';
import Icon from '@expo/vector-icons/FontAwesome5';

const LoginVerifyEmail = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  return (
    <Container style={{ backgroundColor: colors.primary}}>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <BgImage source={imageOnboard} resizeMode="cover" />
      <Content withHeader>
        <Pressable onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color="white" />
        </Pressable>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom:20 }}>
          <Typography color='white' size='xxlarge' weight='bold'>
            {`Sua doação ajudará\nmuitas pessoas`}
          </Typography>
          <Typography color='white' size='medium' weight='regular' style={{ marginTop:10, marginBottom:15 }}>
            Informe seu email que iremos verificar se você já possui um cadastro
          </Typography>
        </View>
        <Button title='Continuar' bgColor='white' txtColor='primary' size="large"  weight='bold' margin={30}/>
      </Content>
    </Container>
  );
}

export default LoginVerifyEmail;