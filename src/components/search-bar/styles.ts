import { Searchbar } from "react-native-paper";
import { styled } from "styled-components/native";

export const StyledSearchBar = styled(Searchbar).attrs(() => ({
  iconColor: '#414141',
  placeholderTextColor: '#414141',
  selectionColor: '#1E1E1E', 
  inputStyle: {
    color: '#1E1E1E',
  },
}))`
  background-color: #ffffff;
  flex:1;
`;