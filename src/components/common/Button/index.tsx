import React from 'react';
import * as S from './styles';

interface IButtonProps {
  title: string;
  bgColor?: 'primary' | 'black' | 'white' | 'gray' | 'danger' | 'success' | 'warning' | 'info' | 'bg'; 
  txtColor?: 'primary' | 'black' | 'white' | 'gray' | 'danger' | 'success' | 'warning' | 'info' | 'bg';
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
