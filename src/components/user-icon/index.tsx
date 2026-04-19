import { Avatar } from "react-native-paper"
import { UserIconWrapper } from "./styles"

interface UserIconProps {
  type?: 'image' | 'text'
  size: number
  label: string
  src?: string
  bgColor?: string
}

const UserIcon = ({
  type,
  size,
  label,
  src,
  bgColor,
}: UserIconProps) => {
  return (
    <UserIconWrapper>
      <Avatar.Text
        size={size}
        label={label}
        color='#005C7ADF'
        style={{
          backgroundColor: bgColor ? bgColor : '#90BFD3'
        }} />
    </UserIconWrapper>

  )

}

export default UserIcon