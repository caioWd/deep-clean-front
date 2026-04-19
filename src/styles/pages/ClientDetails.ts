import { styled } from "styled-components/native";

export const ClientDetailsWrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: #F3F7F8;
  padding: 0 8px;
`

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Details = styled.View`
align-items: center;
  gap: 10px;
`

export const Title = styled.Text`
  font-size: 16px;
  color: #495E7A;
`

export const ActionsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

export const Name = styled.Text`
  font-size: 18px;
  color: #495E7A;
`

export const ContactsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const LoadingPage = styled.View`
  flex: 1;
  height: 100%;
  background-color: pink;
  justify-content: center;
  align-items: center;
`