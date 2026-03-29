import { StyledIconButton } from "./styles"
import { type GestureResponderEvent } from "react-native"
import type { IconButtonProps } from "react-native-paper"
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon"

export interface StyledIconButtonProps extends IconButtonProps {
  mode?: 'outlined' | 'contained' | 'contained-tonal'
  icon: IconSource
  size?: number
  disabled?: boolean
  onPress?: (e: GestureResponderEvent) => void
}

const IconButton = ({
  mode,
  icon,
  size,
  disabled,
  onPress,
}: StyledIconButtonProps) => {
  return (
    <StyledIconButton
      mode={mode}
      size={size}
      disabled={disabled}
      icon={icon}
      onPress={onPress}
    />
  )
}

export default IconButton