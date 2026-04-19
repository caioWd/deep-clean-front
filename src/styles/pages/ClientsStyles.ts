import { styled } from 'styled-components/native'

export const ActionWrapper = styled.View`
 display: flex;
 flex-direction: row;
 width: 100%;
 align-items: center;
 gap: 4px;
 padding: 6px 12px;
`

export const ClientsWrapper = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #F3F7F8;
`

export const ClientsTitle = styled.Text`
  text-align: center;
  color: #414141;
`

export const NoClientsCard = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100%;
`

export const NoClientsTextWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`


export const NoClientsCardTitle = styled.Text`
  color: #495E7A;
`

export const NoClientsCardDescription = styled.Text`
  color: #647C9D;
`

export const CreateClientBtn = styled.Text`
  font-size: 16px;
`

export const TabBarIconWrapper = styled.View<{ focused: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 30px;
  border-radius: 50px;
  
  background-color: ${({ focused }) => focused ? '#BEDCEA' : ''};
`