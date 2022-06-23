import styled from "styled-components/native";

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg};
  z-index: 999;
`;
