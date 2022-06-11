import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const ContentHome = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight(true)}px;
`;
