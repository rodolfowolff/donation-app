import styled from "styled-components/native";

export const CardCommentsContent = styled.View`
  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.stroke};
  border-top-width: 2px;
  border-top-color: ${({ theme }) => theme.colors.stroke};
  margin-bottom: 15px;
`;

export const CardCommentsHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;
