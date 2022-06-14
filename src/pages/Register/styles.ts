import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const ButtonContent = styled.View`
  padding-bottom: ${getBottomSpace() + 10}px;
`;

export const InputContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
