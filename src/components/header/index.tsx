import UserIcon from "../user-icon"
import { StyledHeader, Title } from "./styles"


const Header = () => {
  return (
    <StyledHeader>
      <Title>DeepClean</Title>
      <UserIcon label="CW" size={36} bgColor='#FF9500'/>
    </StyledHeader>
  )
}

export default Header