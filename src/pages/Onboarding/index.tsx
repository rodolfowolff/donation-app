import React from 'react';
import { View } from 'react-native';
import { Button, Typography } from '../../components/common';

const Onboarding = () => {
  return (
    <View>
      <Typography color='danger' size='xxlarge' weight='regular'>Texto</Typography>
      <Button title='teste' bgColor='primary' txtColor='white' />
      <Button title='teste' bgColor='primary' txtColor='primary' outline />
    </View>
  );
}

export default Onboarding;