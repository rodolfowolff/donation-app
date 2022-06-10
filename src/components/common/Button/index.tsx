import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonContent, ButtonText } from "./styles";
import {
  IColorsTypes,
  IFontsSizesTypes,
  IFontsWeightsTypes,
} from "../../../theme/light";

export interface IButtonProps {
  title?: string;
  bgColor?: IColorsTypes;
  txtColor?: IColorsTypes;
  size?: IFontsSizesTypes;
  weight?: IFontsWeightsTypes;
  outline?: boolean;
  margin?: number;
}

const Button: React.FC<IButtonProps & TouchableOpacityProps> = ({
  title,
  bgColor = "primary",
  txtColor = "black",
  size = "medium",
  weight = "regular",
  outline = false,
  margin,
  ...props
}) => {
  return (
    <ButtonContent
      bgColor={bgColor}
      outline={outline}
      margin={margin}
      {...props}
    >
      <ButtonText txtColor={txtColor} size={size} weight={weight}>
        {title}
      </ButtonText>
    </ButtonContent>
  );
};

export { Button };
