import ServiceCalendar from "@/src/components/service-calendar"
import { useService } from "@/src/database/useServices"
import { HomeWrapper } from "@/src/styles/pages/HomeStyles"
import { useCallback, useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

const Home = () => {
  const { get } = useService()
  const [services, setServices] = useState<any[]>([])

  async function loadServices() {
    const data = await get()

    const formatted = data.map((service) => {
      const date = new Date(service.service_date)

      const [hour, minute] = service.service_time.split(":")

      date.setHours(Number(hour))
      date.setMinutes(Number(minute))

      return { ...service, date }
    })

    setServices(formatted)
  }

  useFocusEffect(
    useCallback(() => {
      loadServices()
    }, [])
  )

  return (
    <HomeWrapper>
      <ServiceCalendar services={services} />
    </HomeWrapper>
  )
}

export default Home