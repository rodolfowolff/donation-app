import styled from "styled-components/native";
import { IButtonProps } from "./";

export const ButtonContent = styled.TouchableOpacity<IButtonProps>`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({ outline, bgColor, theme }) =>
    outline ? "transparent" : bgColor && theme.colors[bgColor]};
  border: ${({ outline, theme, bgColor }) =>
    outline ? `1px solid ${bgColor && theme.colors[bgColor]}` : "none"};
  border-radius: 5px;
  margin: ${({ margin }) => (margin && margin) || 0}px 0;
`;

export const ButtonText = styled.Text<IButtonProps>`
  color: ${({ theme, txtColor }) => txtColor && theme.colors[txtColor]};
  font-size: ${({ size, theme }) => (size && theme.fonts.sizes[size]) || 14}px;
  font-weight: ${({ weight, theme }) =>
    (weight && theme.fonts.weights[weight]) || theme.fonts.weights.regular};
`;
