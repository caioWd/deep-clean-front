import { ReactNode } from "react"
import { StyledButton } from "./styles"
import { type GestureResponderEvent} from "react-native"
import type { ButtonProps } from "react-native-paper"
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon"

export interface StyledButtonProps extends ButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
  icon?: IconSource | undefined
  disabled?: boolean
  children: ReactNode
  onPress?: (e: GestureResponderEvent) => void
}

const Button = ({
  mode,
  icon,
  disabled,
  children,
  onPress,
}: ButtonProps) => {
  return (
    <StyledButton
      mode={mode}
      disabled={disabled}
      icon={icon}
      onPress={onPress}
    >
      {children}
    </StyledButton>
  )
}

export default Button