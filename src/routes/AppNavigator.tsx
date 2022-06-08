import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../pages/Onboarding'

  const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  )
}

export default AppNavigator
