import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../components/common';

const Onboarding = () => {
  return (
    <View>
      <Text>index</Text>
      <Button title='teste' bgColor='primary' txtColor='white' />
      <Button title='teste' bgColor='bg' txtColor='primary' outline />
    </View>
  );
}

export default Onboarding;