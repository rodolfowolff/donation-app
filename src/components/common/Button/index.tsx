import React from 'react';
import * as S from './styles';
import { IColorsTypes } from '../../../theme/light';

export interface IButtonProps {
  title?: string;
  bgColor?: IColorsTypes;
  txtColor?: IColorsTypes;
  outline?: boolean;
  margin?: number;
}

const Button: React.FC<IButtonProps> = ({ title, bgColor="primary", txtColor="black", outline= false, margin }) => {
  return (
    <S.Button bgColor={bgColor} outline={outline} margin={margin}>
      <S.ButtonText txtColor={txtColor}>{title}</S.ButtonText>
    </S.Button>
  )
}

export { Button };
