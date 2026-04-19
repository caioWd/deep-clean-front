import { styled, css } from "styled-components/native";
import { IconButton } from 'react-native-paper';
import { StyledIconButtonProps } from "."

export const StyledIconButton = styled(IconButton).attrs<StyledIconButtonProps>(() => ({}))<StyledIconButtonProps>`
  ${({ mode }) => {
    if (mode === 'contained') {
      return css`
        background-color: #1F6F8B;
      `
    }
    if (mode === 'outlined') {
      return css`
        background-color: transparent;
        border-color: #117474;
      `
    }
  }}
`