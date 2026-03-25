import { styled } from 'styled-components/native'

export const HomeWrapper = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
`

export const HomeTitle = styled.Text`
  text-align: center;
  color: #1E1E1E;
`

export const TabBarIconWrapper = styled.View<{focused: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 30px;
  border-radius: 50px;
  
  background-color: ${({focused}) => focused ? '#C0E9F1' : ''};
`