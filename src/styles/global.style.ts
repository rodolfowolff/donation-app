import styled from "styled-components/native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

interface IContentProps {
  withHeader?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const Content = styled.View<IContentProps>`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: ${getStatusBarHeight(true) + 16}px;
  padding-bottom: ${getBottomSpace() + 10}px;
  justify-content: ${({ withHeader }) =>
    withHeader ? "space-between" : "flex-end"};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const BgImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const IconImage = styled.Image.attrs({
  resizeMode: "contain",
})``;
