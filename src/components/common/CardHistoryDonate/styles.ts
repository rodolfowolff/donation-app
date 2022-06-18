import styled from "styled-components/native";

export const ContainerCard = styled.View`
  width: 100%;
  min-height: 130px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  margin-bottom: 10px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Left = styled.View`
  width: 60%;
  justify-content: center;
  align-items: flex-start;
`;

export const Right = styled.View`
  width: 40%;
  /* justify-content: flex-end; */
  align-items: center;
`;
