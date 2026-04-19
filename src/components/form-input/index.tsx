
import type { ReactNode } from 'react';
import { ErrorMessageWrapper, ErrorMessage, InputWrapper, StyledInput, InputIconWrapper } from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { KeyboardTypeOptions, StyleProp, ViewStyle } from 'react-native';

interface FormInputProps {
  value: string
  mode?: 'flat' | 'outlined'
  label?: string
  placeholder?: string
  icon?: ReactNode
  errorMessage?: string,
  style?: StyleProp<ViewStyle>
  keyboardType?: KeyboardTypeOptions 
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
  style,
  keyboardType,
  onPress,
  onChangeText,
}: FormInputProps) => {
  return (
    <InputWrapper style={style}>
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
          keyboardType={keyboardType}
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