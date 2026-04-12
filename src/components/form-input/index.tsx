
import type { ReactNode } from 'react';
import { ErrorMessageWrapper, ErrorMessage, InputWrapper, StyledInput, InputIconWrapper } from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FormInputProps {
  value: string
  mode?: 'flat' | 'outlined'
  label?: string
  placeholder?: string
  icon?: ReactNode
  errorMessage?: string,
  onPress?: () => void
  onChangeText: (value: string) => void
}

const FormInput = ({
  value,
  mode = 'outlined',
  label,
  placeholder,
  icon,
  errorMessage,
  onPress,
  onChangeText,
}: FormInputProps) => {
  return (
    <InputWrapper>
      <InputIconWrapper>
        {icon}
        <StyledInput
          mode={mode}
          value={value}
          label={label}
          placeholder={placeholder}
          onPress={onPress}
          onChangeText={onChangeText}
          errorMessage={errorMessage}
        />
      </InputIconWrapper>
      {errorMessage && (
        <ErrorMessageWrapper>
          <MaterialCommunityIcons
            name='close-circle'
            size={14}
            color='red'
          />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </ErrorMessageWrapper>
      )}
    </InputWrapper>
  )
}

export default FormInput