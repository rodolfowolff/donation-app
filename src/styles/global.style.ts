import styled from "styled-components/native";
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: ${getStatusBarHeight(true) + 16}px;
  padding-bottom: ${getBottomSpace() + 10}px;
`;

export const BgImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
