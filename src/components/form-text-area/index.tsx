import type { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native"
import { ErrorMessage, ErrorMessageWrapper, InputWrapper, StyledInput } from "./styles"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface TextAreaProps {
  value: string
  mode?: 'flat' | 'outlined'
  label?: string
  placeholder?: string
  errorMessage?: string,
  disabled?: boolean,
  style?: StyleProp<ViewStyle>
  keyboardType?: KeyboardTypeOptions
  onPress?: () => void
  onChangeText?: (value: string) => void
}

const TextArea = ({
  value,
  mode = 'outlined',
  label,
  placeholder,
  errorMessage,
  disabled,
  style,
  keyboardType,
  onPress,
  onChangeText,
}: TextAreaProps) => {
  return (
    <InputWrapper style={style}>
        <StyledInput
          mode={mode}
          value={value}
          label={label}
          placeholder={placeholder}
          onPress={onPress}
          onChangeText={onChangeText}
          errorMessage={errorMessage}
          keyboardType={keyboardType}
          multiline
          numberOfLines={4}
          disabled={disabled}
        />
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

export default TextArea