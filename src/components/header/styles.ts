import { styled } from "styled-components/native";

export const StyledHeader = styled.View`
  background-color: #f4f4f4;
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  border-bottom-width: 0.5 ;
  border-bottom-color:rgba(0,0,0,0.08);
`

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 600;
  color: #1F6F8B;
`