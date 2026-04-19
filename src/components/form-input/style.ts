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
  gap: 8px;
`

export const StyledInput = styled(TextInput).attrs<{ errorMessage?: string }>((props) => ({
  outlineColor: props.errorMessage ? '#D32F2F' : '#414141',
  activeOutlineColor: '#1F6F8B',
  textColor: '#1E1E1E',
  theme: {
    roundness: 8,
  }
}))`
  flex: 1;
  background-color: transparent;
`

export const ErrorMessageWrapper = styled.View<{error ?: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 4px 40px;
  gap: 3px;
`

export const ErrorMessage = styled.Text`
  color: #D32F2F;
  font-size: 12px;
`