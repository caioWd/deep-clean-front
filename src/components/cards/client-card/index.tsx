import { getInitials } from "@/src/utils/getInitials"
import UserIcon from "../../user-icon"
import { ClientCardWrapper, ClientName } from "./styles"
import type { StyleProp, ViewStyle } from "react-native"

interface ClientCardProps {
  label: string
  style?: StyleProp<ViewStyle>
}

const ClientCard = ({label, style}: ClientCardProps) => {
  return (
    <ClientCardWrapper style={style}>
      <UserIcon size={40} label={getInitials(label)} />
      <ClientName>{label}</ClientName>
    </ClientCardWrapper>
  )
}

export default ClientCard