import styled from "styled-components/native";

export const BannerContentImg = styled.View`
  width: 100%;
  height: 200px;
`;

export const BannerImg = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const DescriptionContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const CommentsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CommentButton = styled.TouchableOpacity`
  width: 18%;
  height: 50px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;
