import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 16px;
  height: ${getStatusBarHeight(true) + 100}px;
  padding-top: ${getStatusBarHeight(true) + 20}px;
  padding-bottom: ${getBottomSpace() + 30}px;
  flex-direction: row;
  align-items: center;
`;

export const Left = styled.View`
  flex: 4;
  /* margin: 16px 0;
  height: ${getStatusBarHeight(true) + 160}px;
  padding: ${getStatusBarHeight(true)}px; */
`;

export const Center = styled.View`
  flex: 1;
  padding-left: 16px;
`;

export const Right = styled.View``;
