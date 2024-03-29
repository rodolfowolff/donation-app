import styled from "styled-components/native";

export const InputContainer = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

export const InputComponent = styled.TextInput`
  flex: 1;
  padding-right: 10px;
  color: ${({ theme }) => theme.colors.black};
`;
