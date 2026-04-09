import { StyledSearchBar } from "./styles"
import type { SearchbarProps } from "react-native-paper";

export interface StyledSearchBarProps extends SearchbarProps {
  value: string
  placeholder?: string
  hasClearIcon?: boolean
  onChangeValue: (value: string) => void
}
const SearchBar = ({
  value,
  placeholder,
  hasClearIcon,
  onChangeValue,
}: StyledSearchBarProps) => {

  return (
    <StyledSearchBar
      value={value}
      placeholder={placeholder}
      clearIcon={hasClearIcon ? 'close' : undefined}
      onChangeText={onChangeValue}
      elevation={1}
    />
  )
}

export default SearchBar