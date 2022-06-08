import React from 'react';
import * as S from './styles';
import { IColorsTypes } from '../../../theme/light';

interface IButtonProps {
  title: string;
  bgColor?: IColorsTypes;
  txtColor?: IColorsTypes;
  outline?: boolean;
}

const Button: React.FC<IButtonProps> = ({ title, bgColor="primary", txtColor="black", outline= false }) => {
  return (
    <S.Container bgColor={bgColor} outline={outline}>
      <S.ButtonText txtColor={txtColor}>{title}</S.ButtonText>
    </S.Container>
  )
}

export { Button };
