import { List } from "react-native-paper"
import ClientCard from "../../cards/client-card"
import { Client } from "@/src/types/clients"
import { ClientsListWrapper } from "./styles"
import { router } from "expo-router"

interface ClientsListProps {
  clients: Client[]
}

const ClientList = ({ clients }: ClientsListProps) => {
  const groupedClients = Object.values(
    clients.reduce((acc, client) => {
      const firstLetter = client.name[0].toUpperCase()

      if (!acc[firstLetter]) {
        acc[firstLetter] = {
          title: firstLetter,
          data: []
        }
      }

      acc[firstLetter].data.push(client)

      return acc
    }, {} as Record<string, { title: string; data: Client[] }>)
  )

  return (
    <ClientsListWrapper>
      {groupedClients.map((section) => (
        <List.Section key={section.title}>
          <List.Subheader>{section.title}</List.Subheader>

          {section.data.map((client, index) => (
            <ClientCard
              key={client.name + index}
              label={client.name}
              style={{marginBottom: 10}}
              onPress={() => router.push(`/client-details/${client.id}`)}
            />
          ))}
        </List.Section>
      ))}
    </ClientsListWrapper>
  )
}

export default ClientList