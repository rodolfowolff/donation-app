import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 16px;
  height: ${getStatusBarHeight(true) + 90}px;
  padding-top: ${getStatusBarHeight(true) + 20}px;
  padding-bottom: ${getBottomSpace() + 20}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Left = styled.View`
  /* flex: 4; */
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Center = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.View`
  /* flex: 4; */
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
