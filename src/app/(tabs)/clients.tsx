import NoItem from "@/src/assets/no-item.svg"
import Button from "@/src/components/button"
import IconButton from "@/src/components/icon-button"
import ClientList from "@/src/components/lists/client-list"
import SearchBar from "@/src/components/search-bar"

import { useUser } from "@/src/database/useUsers"
import { useSession } from "@/src/database/useSession"

import type { User } from "@/src/types/users"

import { router } from "expo-router"
import React, { useCallback, useState } from "react"

import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native"

import { useFocusEffect } from "@react-navigation/native"

import {
  ActionWrapper,
  ClientsWrapper,
  CreateClientBtn,
  NoClientsCard,
  NoClientsCardDescription,
  NoClientsCardTitle,
  NoClientsTextWrapper
} from "../../styles/pages/ClientsStyles"

const Clients = () => {
  const userTable = useUser()
  const { getCurrentSession } = useSession()

  const [clients, setClients] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState("")

  async function loadClients() {
    try {
      setLoading(true)

      const session = await getCurrentSession()
      if (!session) {
        router.replace("../index")
        return
      }

      const data = await userTable.getClientsByOperator(
        session.user_id
      )

      setClients(data)
    } catch (error) {
      console.error("Load clients error:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(value: string) {
    try {
      setLoading(true)

      const session = await getCurrentSession()
      if (!session) {
        router.replace("../index")
        return
      }

      if (!value.trim()) {
        const data = await userTable.getClientsByOperator(
          session.user_id
        )

        setClients(data)
        return
      }

      const data = await userTable.searchClientsByOperator(
        value,
        session.user_id
      )

      setClients(data)
    } catch (error) {
      console.error("Search clients error:", error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadClients()
    }, [])
  )

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch(searchValue)
    }, 300)

    return () => clearTimeout(debounce)
  }, [searchValue])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ClientsWrapper>
        <ActionWrapper>
          <SearchBar
            value={searchValue}
            onChangeValue={setSearchValue}
            placeholder="Buscar cliente(s)"
            hasClearIcon
          />

          <IconButton
            icon="plus"
            mode="contained"
            iconColor="#f4f4f4"
            onPress={() => {
              requestAnimationFrame(() => {
                router.push("/create-client")
              })
            }}
          />
        </ActionWrapper>

        {loading ? (
          <ActivityIndicator
            animating
            color="#1F6F8B"
            size="large"
            style={{ marginTop: 250 }}
          />
        ) : clients.length > 0 ? (
          <ClientList clients={clients} />
        ) : (
          <NoClientsCard>
            <NoItem width={246} height={210} />

            <NoClientsTextWrapper>
              <NoClientsCardTitle>
                Nenhum cliente cadastrado
              </NoClientsCardTitle>

              <NoClientsCardDescription>
                Deseja cadastrar um novo cliente?
              </NoClientsCardDescription>
            </NoClientsTextWrapper>

            <Button
              mode="elevated"
              onPress={() => router.push("/create-client")}
            >
              <CreateClientBtn>
                Cadastrar cliente
              </CreateClientBtn>
            </Button>
          </NoClientsCard>
        )}
      </ClientsWrapper>
    </TouchableWithoutFeedback>
  )
}

export default Clients