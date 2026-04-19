import { TextInput } from 'react-native-paper';
import { styled } from 'styled-components/native';

export const InputWrapper = styled.View`
  width: 100%;
`

export const InputIconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 4px;
`

export const StyledInput = styled(TextInput).attrs<{ errorMessage?: string }>((props) => ({
  outlineColor: props.errorMessage ? '#D32F2F' : '#414141',
  activeOutlineColor: '#1F6F8B',
  textColor: '#1E1E1E',
  theme: {
    roundness: 8,
  }
}))`
  width: 100%;
  background-color: transparent;
`

export const ErrorMessageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 4px 10px;
  gap: 3px;
`

export const ErrorMessage = styled.Text`
  color: #F15642;
  font-size: 12px;
`