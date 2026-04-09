import { styled } from 'styled-components/native'

export const ActionWrapper = styled.View`
 display: flex;
 flex-direction: row;
 width: 100%;
 align-items: center;
 gap: 4px;
 padding: 0 12px;
`

export const ClientsWrapper = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  background-color: #f4f4f4;
`

export const ClientsTitle = styled.Text`
  text-align: center;
  color: #1E1E1E;
`

export const TabBarIconWrapper = styled.View<{ focused: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 30px;
  border-radius: 50px;
  
  background-color: ${({ focused }) => focused ? '#C0E9F1' : ''};
`