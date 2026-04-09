import SearchBar from "@/src/components/search-bar"
import { ActionWrapper, ClientsTitle, ClientsWrapper } from "../../../styles/pages/ClientsStyles"
import { useState } from "react"
import IconButton from "@/src/components/icon-button"

const Clients = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
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
        />
      </ActionWrapper>
    </ClientsWrapper>
  )
}

export default Clients