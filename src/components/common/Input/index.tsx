import React from "react";
import { TextInputProps, Pressable, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "styled-components";

import { InputContainer, InputComponent } from "./styles";
import { IColorsTypes } from "../../../theme";

interface InputProps {
  leftIcon?: boolean;
  leftIconName?: string;
  lefticonSize?: number;
  leftIconColor?: IColorsTypes | string;
  leftIconPress?: () => void;
  rightIcon?: boolean;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: IColorsTypes | string;
  rightIconPress?: () => void;
  containerStyle?: any;
}

const Input: React.FC<InputProps & TextInputProps> = ({
  leftIcon,
  leftIconName,
  lefticonSize = 18,
  leftIconColor,
  leftIconPress,
  rightIcon,
  rightIconName,
  rightIconSize = 18,
  rightIconColor,
  rightIconPress,
  containerStyle,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <InputContainer style={containerStyle}>
      {leftIcon && (
        <View style={{ paddingRight: 15 }}>
          <Icon name={leftIconName} size={lefticonSize} color={leftIconColor} />
        </View>
      )}
      <InputComponent {...props} />
      <Pressable onPress={() => (rightIconPress ? rightIconPress() : null)}>
        {rightIcon && (
          <Icon
            name={rightIconName}
            size={rightIconSize}
            color={rightIconColor}
          />
        )}
      </Pressable>
    </InputContainer>
  );
};

export { Input };
