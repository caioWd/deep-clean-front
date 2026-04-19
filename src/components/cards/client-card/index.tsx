import { getInitials } from "@/src/utils/getInitials"
import UserIcon from "../../user-icon"
import { ClientCardWrapper, ClientName } from "./styles"
import type { StyleProp, ViewStyle } from "react-native"

interface ClientCardProps {
  label: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const ClientCard = ({label, style, onPress}: ClientCardProps) => {
  return (
    <ClientCardWrapper style={style} onPress={onPress}>
      <UserIcon size={40} label={getInitials(label)} />
      <ClientName>{label}</ClientName>
    </ClientCardWrapper>
  )
}

export default ClientCard