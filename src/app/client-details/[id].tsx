import IconButton from "@/src/components/icon-button"
import UserIcon from "@/src/components/user-icon"
import { useClient } from "@/src/database/useClient"
import { ActionsWrapper, ClientDetailsWrapper, ContactsWrapper, Details, Header, Name, Title } from "@/src/styles/pages/ClientDetails"
import type { Client } from "@/src/types/clients"
import { getInitials } from "@/src/utils/getInitials"
import { toast } from "@/src/utils/toast"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

const ClientDetails = () => {
  const { id } = useLocalSearchParams()
  const { getById, remove } = useClient()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)

        const data = await getById(Number(id))
        setClient(data)
      }
      finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  const handleDelete = async () => {
    try{
      await remove(Number(id))
      router.replace('/clients')
      toast.success('Cliente deletado!', 'Todos os dados foram removidos com sucesso.')
    } catch {
      toast.error('Erro ao deletar!', 'Tente novamente em breve.')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <ClientDetailsWrapper>
          <Header>
            <IconButton icon='arrow-left' onPress={() => router.replace('/clients')} iconColor="#495E7A" />
          </Header>

          {loading ? (
            <ActivityIndicator animating={true} color='#1F6F8B' size='large' style={{marginTop: 250}}/>
          ) : (
            <>
              <ActionsWrapper>
                <IconButton icon='delete-outline' iconColor='#495E7A' onPress={handleDelete} />
                <IconButton icon='pencil-outline' iconColor='#495E7A' onPress={() => router.replace(`/edit-client/${id}`)} />
              </ActionsWrapper>
              <Details>
                <UserIcon size={120} label={getInitials(client?.name ?? '')} bgColor="#90BFD3" />
                <Name>{client?.name}</Name>
                <ContactsWrapper>
                  <IconButton mode='contained' icon='phone-outline' iconColor='#ffff' onPress={() => console.log('Não implementado')} size={32} />
                  <IconButton mode='contained' icon='email-outline' iconColor='#ffff' onPress={() => console.log('Não implementado')} size={32} />
                </ContactsWrapper>
              </Details>
            </>
          )}
        </ClientDetailsWrapper>
      </View>
    </TouchableWithoutFeedback >
  )
}

export default ClientDetails 