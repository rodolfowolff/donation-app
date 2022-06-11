import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const ContentHome = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight(true)}px;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const ContentHeaderHome = styled.View`
  padding: 0 16px;
  margin-bottom: 2px;
`;
