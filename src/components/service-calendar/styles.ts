import { TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { styled } from "styled-components/native";

export const CalendarWrapper = styled.View`
  width: 100%;
  flex: 1;
  gap: 20px;
`

export const WeekWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const DaysScroll = styled.ScrollView`
  flex-grow: 0;
`
export const DayItem = styled(TouchableOpacity)<{ selected: boolean }>`
  width: 50px;
  height: 70px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin: 0 6px;
  background-color: ${({ selected }) =>
    selected ? "#6FA9B8" : "transparent"};
`

export const DayText = styled.Text<{ selected: boolean }>`
  font-size: 12px;
  color: ${({ selected }) => (selected ? "#FFF" : "#495E7A")};
`

export const DayNumber = styled.Text<{ selected: boolean }>`
  font-size: 18px;
  color: ${({ selected }) => (selected ? "#FFF" : "#495E7A")};
`

export const CalendarItensWrapper = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 10px;
`
export const CalendarItem = styled.View`
   flex-direction: row;
   align-items: flex-start;
   background-color: blue;
`

export const DateTitle = styled.Text`
  font-size: 16px;
  color: #495E7A;
  font-weight: bold;
`

export const StyledRadio = styled(RadioButton)`
  color: #495E7A;
`

export const TimeLineRow = styled.View`
  flex-direction: column;
  align-items: center;

`

export const Separator = styled.View`
  width: 2px;
  height: 60px;
  flex: 1;
  background-color: #495E7A;
`

export const Hour = styled.Text`
  color: #495E7A;
  margin-top: 8px;
`

export const ServiceCard = styled.View`
  width: 270px;
  height: 80px;
  background-color: #DEEDF4;
  padding: 8px 10px;
  border-radius: 8px;
`

export const ServiceTitle = styled.Text`
  font-size: 14px;

`