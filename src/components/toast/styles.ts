import { styled } from "styled-components/native";


export const SuccessToast = styled.View`
  flex: 1;
  background-color: #3EAF52;
  width: 80%;
  padding: 12px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const ErrorToast = styled.View`
  flex: 1;
  background-color: #F15642;
  width: 80%;
  padding: 12px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const WarningToast = styled.View`
  flex: 1;
  background-color: #F3B500;
  width: 80%;
  padding: 12px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const TextWrapper = styled.View`
flex: 1;
  width: 100%;
  gap: 4px;
`

export const Title = styled.Text`
  font-size: 14px;
  color: #fff;
  font-weight: bold
`

export const Description = styled.Text`
  font-size: 12px;
  color: #fff;
`