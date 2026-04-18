import { SectionList } from "react-native"
import { ClientsListWrapper, SectionHeader } from "./styles"
import ClientCard from "../../cards/client-card"
import { List } from "react-native-paper"
import { ClientsList, type Client } from '@/src/types/clients'

interface ClientsListProps {
  clients: ClientsList
}

const ClientList = ({ clients }: ClientsListProps) => {
  const groupedClients = Object.values(
    clients.clients.reduce((acc, client) => {
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
            />
          ))}
        </List.Section>
      ))}
    </ClientsListWrapper>
  )
}

export default ClientList