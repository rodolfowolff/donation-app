import React from 'react';
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

const Button: React.FC<IButtonProps> = ({ 
  title, 
  bgColor="primary", 
  txtColor="black", 
  size="medium", 
  weight="regular", 
  outline=false, 
  margin 
}) => {
  return (
    <S.Button bgColor={bgColor} outline={outline} margin={margin}>
      <S.ButtonText txtColor={txtColor} size={size} weight={weight}>{title}</S.ButtonText>
    </S.Button>
  )
}

export { Button };
