import ServiceCard from "@/src/components/cards/service-card"
import IconButton from "@/src/components/icon-button"
import SearchBar from "@/src/components/search-bar"

import { useService } from "@/src/database/useServices"
import { useSession } from "@/src/database/useSession"

import {
  ActionWrapper,
  FilterButton,
  FilterContainer,
  FilterText,
  ServicesWrapper,
  TabButton,
  TabsContainer,
  TabText
} from "@/src/styles/pages/ServicesStyles"

import { Service } from "@/src/types/services"

import { router } from "expo-router"
import { useCallback, useEffect, useMemo, useState } from "react"

import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
} from "react-native"

import { useFocusEffect } from "@react-navigation/native"

type Tab = "orders" | "available"

const Services = () => {
  const { getByOperator, getPendingServices } = useService()
  const { getCurrentSession } = useSession()

  const [selectedTab, setSelectedTab] = useState<Tab>("orders")

  const [searchValue, setSearchValue] = useState("")
  const [status, setStatus] = useState("all")

  const [myServices, setMyServices] = useState<Service[]>([])
  const [availableServices, setAvailableServices] = useState<Service[]>([])

  const [loading, setLoading] = useState(true)

  async function loadData() {
    try {
      setLoading(true)

      const session = await getCurrentSession()
      if (!session) {
        router.replace("../index")
        return
      }

      const [operatorServices, pendingServices] =
        await Promise.all([
          getByOperator(session.user_id),
          getPendingServices()
        ])

      setMyServices(operatorServices)
      setAvailableServices(pendingServices)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [])
  )

  const filteredMyServices = useMemo(() => {
    return myServices.filter((service) => {
      const matchesStatus =
        status === "all" || service.status === status

      const matchesSearch =
        service.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        service.address.toLowerCase().includes(searchValue.toLowerCase())

      return matchesStatus && matchesSearch
    })
  }, [myServices, searchValue, status])

  const filteredAvailableServices = useMemo(() => {
    return availableServices.filter((service) => {
      return (
        service.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        service.address.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }, [availableServices, searchValue])

  const getStatusLabel = (status: Service["status"]) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "scheduled":
        return "Agendado"
      case "finished":
        return "Finalizado"
      case "canceled":
        return "Cancelado"
      default:
        return status
    }
  }

  const renderServiceList = (services: Service[]) => (
    <FlatList
      style={{
        width: "100%",
        paddingTop: 20,
        paddingHorizontal: 15
      }}
      data={services}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ServiceCard
          title={item.title}
          address={item.address}
          status={getStatusLabel(item.status)}
        />
      )}
      ListEmptyComponent={
        <Text style={{ marginTop: 20 }}>
          Nenhum serviço encontrado.
        </Text>
      }
    />
  )

  const renderOrders = () => (
    <>
      <ActionWrapper>
        <SearchBar
          value={searchValue}
          onChangeValue={setSearchValue}
          placeholder="Buscar serviço(s)"
          hasClearIcon
        />

        <IconButton
          icon="plus"
          mode="contained"
          iconColor="#f4f4f4"
          onPress={() => router.push("/create-service")}
        />
      </ActionWrapper>

      <FilterContainer>
        <FilterButton active={status === "all"} onPress={() => setStatus("all")}>
          <FilterText active={status === "all"}>Todos</FilterText>
        </FilterButton>

        <FilterButton active={status === "scheduled"} onPress={() => setStatus("scheduled")}>
          <FilterText active={status === "scheduled"}>Agendados</FilterText>
        </FilterButton>

        <FilterButton active={status === "finished"} onPress={() => setStatus("finished")}>
          <FilterText active={status === "finished"}>Finalizados</FilterText>
        </FilterButton>

        <FilterButton active={status === "canceled"} onPress={() => setStatus("canceled")}>
          <FilterText active={status === "canceled"}>Cancelados</FilterText>
        </FilterButton>
      </FilterContainer>

      {renderServiceList(filteredMyServices)}
    </>
  )

  const renderAvailable = () => (
    <>
      <ActionWrapper>
        <SearchBar
          value={searchValue}
          onChangeValue={setSearchValue}
          placeholder="Buscar serviço(s)"
          hasClearIcon
        />
      </ActionWrapper>

      {renderServiceList(filteredAvailableServices)}
    </>
  )

  if (loading) {
    return (
      <ServicesWrapper>
        <ActivityIndicator size="large" color="#1F6F8B" />
      </ServicesWrapper>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ServicesWrapper>
        <TabsContainer>
          <TabButton
            active={selectedTab === "orders"}
            onPress={() => setSelectedTab("orders")}
          >
            <TabText active={selectedTab === "orders"}>
              Meus serviços
            </TabText>
          </TabButton>

          <TabButton
            active={selectedTab === "available"}
            onPress={() => setSelectedTab("available")}
          >
            <TabText active={selectedTab === "available"}>
              Disponíveis
            </TabText>
          </TabButton>
        </TabsContainer>

        {selectedTab === "orders" ? renderOrders() : renderAvailable()}
      </ServicesWrapper>
    </TouchableWithoutFeedback>
  )
}

export default Services