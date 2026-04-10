import SearchBar from "@/src/components/search-bar"
import { ActionWrapper, ClientsWrapper, CreateClientBtn, NoClientsCard, NoClientsCardDescription, NoClientsCardTitle, NoClientsTextWrapper } from "../../../styles/pages/ClientsStyles"
import { useState } from "react"
import IconButton from "@/src/components/icon-button"
import Button from "@/src/components/button"
import NoItem from "../../../assets/no-item.svg"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { router } from "expo-router"


const Clients = () => {
  const [searchValue, setSearchValue] = useState('')
  
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
        <NoClientsCard>
          <NoItem width={246} height={210} />
          <NoClientsTextWrapper>
            <NoClientsCardTitle>Nenhum cliente cadastrado</NoClientsCardTitle>
            <NoClientsCardDescription>Deseja cadastrar um novo cliente?</NoClientsCardDescription>
          </NoClientsTextWrapper>
          <Button mode="elevated">
            <CreateClientBtn>
              Cadastrar cliente
            </CreateClientBtn>
          </Button>
        </NoClientsCard>
      </ClientsWrapper>
    </TouchableWithoutFeedback>

  )
}

export default Clients