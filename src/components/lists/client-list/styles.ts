import { ScrollView } from "react-native";
import {styled} from "styled-components/native";

export const ClientsListWrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`

export const SectionHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 16px;
  background-color: #f5f5f5;
`