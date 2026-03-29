import { styled, css } from "styled-components/native";
import { Button } from 'react-native-paper';
import { StyledButtonProps } from "."

export const StyledButton = styled(Button).attrs<StyledButtonProps>(({ mode, disabled }) => ({
  labelStyle: {
    color:
      disabled ? '#11747441' : ['elevated', 'contained'].includes(mode || '') ? '#f4f4f4' : mode === 'outlined' ? '#117474' : '#414141',
  },
  rippleColor: "#FFFFFF4D",
  disabled: disabled
})) <StyledButtonProps>`

  ${({ mode, disabled }) => {
    if (mode === 'elevated') {
      return css`
        background-color: ${disabled ? '#1f6e8b42' : '#1F6F8B'};
      `
    }
    if (mode === 'outlined') {
      return css`
        background-color: ${disabled ? '#1f6e8b42' : 'transparent'};
        border-color: ${disabled ? '#11747439' : '#117474'} ;
      `
    }
  }}
`
