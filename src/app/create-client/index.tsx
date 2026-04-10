import IconButton from "@/src/components/icon-button"
import { Header, Title } from "@/src/styles/pages/CreateClient"
import { router } from "expo-router"

const CreateClient = () => {
  return (
    <Header><IconButton icon='arrow-left' onPress={() => router.replace('/clients')}/><Title>Novo cliente</Title></Header>
  )
}
export default CreateClient