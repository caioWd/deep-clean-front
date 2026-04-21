import { TextInput } from 'react-native-paper';
import { styled } from 'styled-components/native';

export const InputWrapper = styled.View`
  width: 100%;
`

export const StyledInput = styled(TextInput).attrs<{ errorMessage?: string }>((props) => ({
  outlineColor: props.errorMessage ? '#D32F2F' : '#495E7A',
  activeOutlineColor: '#1F6F8B',
  textColor: '#19191B',
  placeholderTextColor: 'pink',
  theme: {
    roundness: 8,
    colors: {
      background: '#F3F7F8',
      onSurfaceVariant: '#495E7A',
    }
  }
}))`
  background-color: transparent;
  min-height: 130px;
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
  color: #F15642;
  font-size: 12px;
`