import styled from "styled-components/native";

interface IButton {
  bgColor?: 'primary' | 'black' | 'white' | 'gray' | 'danger' | 'success' | 'warning' | 'info' | 'bg'; 
  txtColor?: 'primary' | 'black' | 'white' | 'gray' | 'danger' | 'success' | 'warning' | 'info' | 'bg';
  outline?: boolean;
}


export const Container = styled.TouchableOpacity<IButton>`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({outline, bgColor, theme}) => outline ? "transparent" : bgColor && theme.colors[bgColor]};
  border: ${({outline, theme, bgColor}) => outline ? `1px solid ${(bgColor && theme.colors[bgColor])}` : "none"};
  border-radius: 5px;
`;

export const ButtonText = styled.Text<IButton>`
  color: ${({theme, txtColor}) => txtColor && theme.colors[txtColor]};
  font-size: ${props => props.theme.fonts.sizes.medium}px;
  font-weight: ${props => props.theme.fonts.weights.bold};
`;
