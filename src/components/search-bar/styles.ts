import { Searchbar } from "react-native-paper";
import { styled } from "styled-components/native";

export const StyledSearchBar = styled(Searchbar).attrs(() => ({
  iconColor: '#414141',
  placeholderTextColor: '#414141',
  selectionColor: '#414141', 
  inputStyle: {
    color: '##414141',
  },
}))`
  background-color: #ffffff;
  flex:1;
`;