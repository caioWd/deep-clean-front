import SearchBar from "@/src/components/search-bar"
import { ActionWrapper, ClientsWrapper, CreateClientBtn, NoClientsCard, NoClientsCardDescription, NoClientsCardTitle, NoClientsTextWrapper } from "../../styles/pages/ClientsStyles"
import React, { useEffect, useState } from "react"
import IconButton from "@/src/components/icon-button"
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native"
import { router } from "expo-router"
import type { Client } from "@/src/types/clients"
import ClientList from "@/src/components/lists/client-list"
import NoItem from '@/src/assets/no-item.svg'
import Button from "@/src/components/button"
import { useClient } from "@/src/database/useClient"

const Clients = () => {

  const clientTable = useClient()

  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    async function loadClients() {
      try {
        setLoading(true)
        const data = await clientTable.get()
        setClients(data)
      } finally {
        setLoading(false)
      }
    }

    loadClients()
  }, [])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchValue)
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchValue])

  const handleSearch = async (value: string) => {
    try {
      setLoading(true)

      if (!value) {
        const data = await clientTable.get()
        setClients(data)
      } else {
        const data = await clientTable.searchByName(value)
        setClients(data)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ClientsWrapper>
        <ActionWrapper>
          <SearchBar
            value={searchValue}
            onChangeValue={(value) => setSearchValue(value)}
            placeholder="Buscar cliente(s)"
            hasClearIcon
          />
          <IconButton
            icon='plus'
            mode="contained"
            iconColor="#f4f4f4"
            onPress={() => {
              router.push('/create-client')
            }}
          />
        </ActionWrapper>

        {loading ? (
          <ActivityIndicator
            animating={true}
            color="#1F6F8B"
            size='large'
            style={{ marginTop: 250 }}
          />
        ) : clients?.length > 0 ? (
          <ClientList clients={clients} />
        ) : (
          <NoClientsCard>
            <NoItem width={246} height={210} />
            <NoClientsTextWrapper>
              <NoClientsCardTitle>Nenhum cliente cadastrado</NoClientsCardTitle>
              <NoClientsCardDescription>
                Deseja cadastrar um novo cliente?
              </NoClientsCardDescription>
            </NoClientsTextWrapper>
            <Button
              mode="elevated"
              onPress={() => {
                router.push('/create-client')
              }}
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