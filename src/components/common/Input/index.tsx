import React from 'react'
import { TextInputProps, Pressable } from 'react-native';
import Icon from "@expo/vector-icons/FontAwesome5";
import { useTheme } from 'styled-components/native';

import {Container, InputComponent} from './styles'
import { IColorsTypes } from '../../../theme';

interface InputProps {
  rightIcon?: boolean;
  iconName?: string;
  iconSize?: number;
  iconColor?: IColorsTypes;
  iconPress?: () => void;
}

const Input: React.FC<InputProps & TextInputProps> = ({ 
  rightIcon,
  iconName,
  iconSize=18,
  iconColor,
  iconPress,
  ...props 
}) => {
  const { colors } = useTheme();

  return (
    <Container>
      <InputComponent {...props} />
      <Pressable onPress={() => iconPress ? iconPress() : null}>
        { rightIcon && (
          <Icon name={iconName} size={iconSize} color={iconColor || colors.gray} />
        )}
      </Pressable>
    </Container>
  )
}

export { Input };
