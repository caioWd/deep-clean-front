import {styled} from "styled-components/native";

export const ClientCardWrapper = styled.Pressable`
  display: flex;
  flex-direction: row;
  padding: 16px;
  gap: 12px;
  align-items: center;
  width: 100%;
  height: 55px;
  background-color: #ffff;
  border-color: #979797;
  border-width: 1px;
  border-radius: 8px;
`

export const ClientName = styled.Text`
  color: #414141;
  font-size: 16px;
`