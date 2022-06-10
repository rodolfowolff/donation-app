import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as S from './styles';
import { IColorsTypes, IFontsSizesTypes, IFontsWeightsTypes } from '../../../theme/light';

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
  bgColor="primary", 
  txtColor="black", 
  size="medium", 
  weight="regular", 
  outline=false, 
  margin,
  ...props
}) => {
  return (
    <S.Button bgColor={bgColor} outline={outline} margin={margin} {...props}>
      <S.ButtonText txtColor={txtColor} size={size} weight={weight}>{title}</S.ButtonText>
    </S.Button>
  )
}

export { Button };
