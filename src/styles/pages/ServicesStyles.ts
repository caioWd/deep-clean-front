import {styled} from "styled-components/native";

export const ServicesWrapper = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #F3F7F8;
`


export const ActionWrapper = styled.View`
 display: flex;
 flex-direction: row;
 width: 100%;
 align-items: center;
 gap: 4px;
 padding: 6px 12px;
`


export const TabsContainer = styled.View`
  flex-direction: row;
  background-color: #F3F7F8;
`

export const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  border-bottom-width: 2px;
  border-bottom-color: ${({ active }) =>
    active ? "#1F6F8B" : "transparent"};
`

export const TabText = styled.Text<{ active: boolean }>`
  color: ${({ active }) => (active ? "#1F6F8B" : "#667085")};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "600" : "400")};
`

export const FilterContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 16px;
`;

export const FilterButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 8px 14px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ active }) =>
    active ? "#1F6F8B" : "#A0A0A0"};
  background-color: ${({ active }) =>
    active ? "#D9F0F8" : "transparent"};
`;

export const FilterText = styled.Text<{ active: boolean }>`
  font-size: 12px;
  color: ${({ active }) =>
    active ? "#1F6F8B" : "#666666"};
`;