import SearchBar from "@/src/components/search-bar"
import { ActionWrapper, ClientsWrapper, CreateClientBtn, NoClientsCard, NoClientsCardDescription, NoClientsCardTitle, NoClientsTextWrapper } from "../../../styles/pages/ClientsStyles"
import React, { useState } from "react"
import IconButton from "@/src/components/icon-button"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { router } from "expo-router"
import type { ClientsList } from "@/src/types/clients"
import ClientList from "@/src/components/lists/client-list"
import NoItem from '@/src/assets/no-item.svg'
import Button from "@/src/components/button"


const Clients = () => {

  const [searchValue, setSearchValue] = useState('')
  const mockClients: ClientsList = {
    clients: [

    ]
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ClientsWrapper>
        <ActionWrapper>
          <SearchBar
            value={searchValue}
            onChangeValue={(value) => setSearchValue(value)}
            placeholder="Cadastrar cliente"
            hasClearIcon
          />
          <IconButton
            icon='plus'
            mode="contained"
            onPress={() => { 
              router.push('/create-client')
            }}
          />
        </ActionWrapper>
        {mockClients.clients.length > 0 ? (
          <ClientList clients={mockClients} />
        ) : (
          <NoClientsCard>
            <NoItem width={246} height={210} />
            <NoClientsTextWrapper>
              <NoClientsCardTitle>Nenhum cliente cadastrado</NoClientsCardTitle>
              <NoClientsCardDescription>Deseja cadastrar um novo cliente?</NoClientsCardDescription>
            </NoClientsTextWrapper>
            <Button mode="elevated"
            onPress={() => {
              router.push('/create-client')
            } }
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