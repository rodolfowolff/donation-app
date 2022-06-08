import styled from "styled-components/native";
import { IColorsTypes, IFontsSizesTypes, IFontsWeightsTypes } from '../../../theme/light';

interface ITextProps {
  color?: IColorsTypes;
  size?: IFontsSizesTypes;
  weight?: IFontsWeightsTypes;
}

export const Typography = styled.Text<ITextProps>`
  color: ${({ color, theme }) => color && theme.colors[color] || theme.colors.black};
  font-size: ${({ size, theme }) => size && theme.fonts.sizes[size] || 14}px;
  font-weight: ${({ weight, theme }) => weight && theme.fonts.weights[weight] || theme.fonts.weights.regular};
`;
