import { styled } from "styled-components/native";

export const StyledModal = styled.View`
  background-color: #F3F7F8;
  gap: 10px;
  border-radius: 8px;
`

export const Header = styled.View`
  display: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 0px 20px;
`

export const Main = styled.View`
  display: 1;
    padding: 0px 20px;
`

export const Title = styled.Text`
  font-size: 18px;
  color: #495E7A;
  font-weight: bold;
`

export const Description = styled.Text`
  font-size: 14px;
  color: #495E7A;
`

export const Bottom = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
  padding: 0px 20px 20px 10px;
`

export const FirstButtonText  = styled.Text`
  color: #495E7A;
`