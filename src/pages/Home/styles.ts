import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const ContentHome = styled.View`
  flex: 1;
  padding: 0 16px;
  padding-top: ${getStatusBarHeight(true)}px;
`;

export const ContentHeaderHome = styled.View`
  margin-bottom: ${getStatusBarHeight(true) + 200}px;
`;
