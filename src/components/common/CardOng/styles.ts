import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const ContainerCard = styled.View`
  width: 100%;
  min-height: 100px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  margin-bottom: 10px;
  padding: 7px;
  justify-content: center;
`;

export const ImageCard = styled.Image`
  width: 100%;
  height: 108px;
  border-radius: 10px;
`;

export const ButtonFavorite = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 10px;
  z-index: 1;
`;
