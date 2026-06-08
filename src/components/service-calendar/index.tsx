import { useState } from "react"
import Timeline from "react-native-timeline-flatlist"

import {
  CalendarItensWrapper,
  CalendarWrapper,
  DateTitle,
  DayItem,
  DayNumber,
  DaysScroll,
  DayText,
  ServiceCard,
  ServiceTitle,
  WeekWrapper,
} from "./styles"

import { MaterialCommunityIcons } from "@expo/vector-icons"

interface CalendarService {
  id: number
  title: string
  date: Date
}

interface ServiceCalendarProps {
  services: CalendarService[]
}

const ServiceCalendar = ({
  services,
}: ServiceCalendarProps) => {
  const [selectedDate, setSelectedDate] =
    useState(new Date())

  const [currentWeekDate, setCurrentWeekDate] =
    useState(new Date())

  const formatFullDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  const generateWeek = () => {
    const days = []

    for (let i = -3; i <= 3; i++) {
      const day = new Date(currentWeekDate)

      day.setDate(
        currentWeekDate.getDate() + i
      )

      days.push(day)
    }

    return days
  }

  const isSameDay = (
    firstDay: Date,
    secondDay: Date
  ) =>
    firstDay.toDateString() ===
    secondDay.toDateString()

  const formatDay = (date: Date) =>
    date
      .toLocaleDateString("pt-BR", {
        weekday: "narrow",
      })
      .toUpperCase()

  const filteredServices = services.filter(
    (service) =>
      isSameDay(
        service.date,
        selectedDate
      )
  )

  const timelineData = filteredServices
    .sort(
      (a, b) =>
        a.date.getTime() -
        b.date.getTime()
    )
    .map((service) => ({
      time: service.date.toLocaleTimeString(
        "pt-BR",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
      title: service.title,
    }))

  const renderDetail = (
    rowData: any
  ) => {
    return (
      <ServiceCard>
        <ServiceTitle>
          {rowData.title}
        </ServiceTitle>
      </ServiceCard>
    )
  }

  return (
    <CalendarWrapper>
      <DateTitle>
        {formatFullDate(selectedDate)}
      </DateTitle>

      <WeekWrapper>
        <MaterialCommunityIcons
          name="chevron-left"
          size={24}
          color="#495E7A"
          onPress={() => {
            const date =
              new Date(currentWeekDate)

            date.setDate(
              date.getDate() - 7
            )

            setCurrentWeekDate(date)
          }}
        />

        <DaysScroll
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >
          {generateWeek().map(
            (date, index) => {
              const selected =
                isSameDay(
                  date,
                  selectedDate
                )

              return (
                <DayItem
                  key={index}
                  selected={selected}
                  onPress={() =>
                    setSelectedDate(date)
                  }
                >
                  <DayText
                    selected={selected}
                  >
                    {formatDay(date)}
                  </DayText>

                  <DayNumber
                    selected={selected}
                  >
                    {date.getDate()}
                  </DayNumber>
                </DayItem>
              )
            }
          )}
        </DaysScroll>

        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="#495E7A"
          onPress={() => {
            const date =
              new Date(currentWeekDate)

            date.setDate(
              date.getDate() + 7
            )

            setCurrentWeekDate(date)
          }}
        />
      </WeekWrapper>

      <CalendarItensWrapper>
        {timelineData.length > 0 ? (
          <Timeline
            data={timelineData}
            renderDetail={renderDetail}
            circleSize={16}
            circleColor="#E1EAF6"
            lineColor="#E1EAF6"
            timeStyle={{
              color: "#495E7A",
            }}
            detailContainerStyle={{
              marginTop: -10,
            }}
            options={{
              removeClippedSubviews:
                false,
            }}
          />
        ) : (
          <ServiceTitle>
            Sem serviços nesse dia
          </ServiceTitle>
        )}
      </CalendarItensWrapper>
    </CalendarWrapper>
  )
}

export default ServiceCalendar