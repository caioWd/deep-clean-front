import Modal from "react-native-modal"
import { Bottom, Description, Header, Main, StyledModal, Title, FirstButtonText } from "./styles"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Button from "../button"
import { IconButton } from "react-native-paper"

interface ModalProps {
  open: boolean
  title: string
  description: string
  firstButtonLabel: string
  secondButtonLabel: string
  onClose: () => void
  onFirstButtonClick: () => void
  onSecondButtonClick: () => void
}


const ConfirmationModal = ({
  open,
  title,
  description,
  firstButtonLabel,
  secondButtonLabel,
  onClose,
  onFirstButtonClick,
  onSecondButtonClick
}: ModalProps) => {
  return (
    <Modal isVisible={open} onBackdropPress={onClose}>
      <StyledModal>
        <Header>
          <Title>{title}</Title>
          <IconButton icon="close" iconColor="#495E7A" onPress={onClose}/>
        </Header>
        <Main>
          <Description>{description}</Description>
        </Main>
        <Bottom>
          <Button onPress={onFirstButtonClick}>
            <FirstButtonText>{firstButtonLabel}</FirstButtonText>
          </Button>
          <Button mode='elevated' onPress={onSecondButtonClick}>{secondButtonLabel}</Button>
        </Bottom>
      </StyledModal>
    </Modal>
  )
}

export default ConfirmationModal