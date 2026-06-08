import Button from "@/src/components/button"
import ConfirmationModal from "@/src/components/confirmation-modal"
import FormInput from "@/src/components/form-input"
import TextArea from "../components/form-text-area"
import IconButton from "@/src/components/icon-button"

import { useUser } from "@/src/database/useUsers"
import { useSession } from "@/src/database/useSession"

import {
  ButtonsWrapper,
  CreateClientForm,
  CreateClientsWrapper,
  Header,
  InputsWrapper,
  InputWrapper,
  Title
} from "@/src/styles/pages/CreateClient"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"

import {
  Keyboard,
  TouchableWithoutFeedback,
  Vibration,
  View
} from "react-native"

import { toast } from "../utils/toast"

const CreateClient = () => {
  const userTable = useUser()
  const { getCurrentSession } = useSession()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")

  const [nameErrorMessage, setNameErrorMessage] =
    useState("")

  const [emailErrorMessage, setEmailErrorMessage] =
    useState("")

  const [phoneErrorMessage, setPhoneErrorMessage] =
    useState("")

  const [
    openConfirmCreationModal,
    setOpenConfirmCreationModal
  ] = useState(false)

  const validateName = async () => {
    if (name.length < 2 || !name.trim()) {
      setNameErrorMessage(
        "O nome precisa conter dois caracteres ou mais."
      )

      return false
    }

    const isAlreadyAdded =
      await userTable.getByName(name)

    if (isAlreadyAdded.length > 0) {
      setNameErrorMessage(
        "Nome já cadastrado."
      )

      return false
    }

    return true
  }

  const validateEmail = async () => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      email.trim() &&
      !emailRegex.test(email)
    ) {
      setEmailErrorMessage("Email inválido.")

      return false
    }

    if (email.trim()) {
      const isAlreadyAdded =
        await userTable.getByEmail(email)

      if (isAlreadyAdded.length > 0) {
        setEmailErrorMessage(
          "Email já cadastrado."
        )

        return false
      }
    }

    return true
  }

  const validatePhone = async () => {
    if (phone.length < 9) {
      setPhoneErrorMessage(
        "Telefone inválido"
      )

      return false
    }

    const isAlreadyAdded =
      await userTable.getByPhone(phone)

    if (isAlreadyAdded.length > 0) {
      setPhoneErrorMessage(
        "Telefone já cadastrado."
      )

      return false
    }

    return true
  }

  const handleSubmit = async () => {
    try {
      const session =
        await getCurrentSession()

      if (!session) {
        toast.error(
          "Sessão inválida",
          "Faça login novamente."
        )

        return
      }

      await userTable.create({
        name,
        email,
        password: null,
        phone,
        description,
        role: "client",
        created_by: session.user_id
      })

      toast.success(
        "Cadastro concluído!",
        "Todos os dados foram salvos com sucesso."
      )

      router.back()
    } catch (error) {
      console.log(error)

      toast.error(
        "Erro ao cadastrar!",
        "Tente novamente em breve."
      )
    }
  }

  const validateFields = async () => {
    const isNameValid =
      await validateName()

    const isEmailValid =
      await validateEmail()

    const isPhoneValid =
      await validatePhone()

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPhoneValid
    ) {
      Vibration.vibrate(200)
      return
    }

    setOpenConfirmCreationModal(true)
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={{ flex: 1 }}>
        <CreateClientsWrapper>
          <Header>
            <IconButton
              icon="arrow-left"
              onPress={() => router.back()}
              iconColor="#495E7A"
            />

            <Title>
              Novo cliente
            </Title>
          </Header>

          <CreateClientForm>
            <InputsWrapper>

              <InputWrapper>
                <FormInput
                  label="Nome"
                  value={name}
                  onChangeText={setName}
                  onPress={() =>
                    setNameErrorMessage("")
                  }
                  errorMessage={
                    nameErrorMessage
                  }
                  icon={
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={24}
                      color="#495E7A"
                    />
                  }
                />
              </InputWrapper>

              <InputWrapper>
                <FormInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  onPress={() =>
                    setEmailErrorMessage("")
                  }
                  errorMessage={
                    emailErrorMessage
                  }
                  icon={
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={24}
                      color="#495E7A"
                    />
                  }
                />
              </InputWrapper>

              <InputWrapper>
                <FormInput
                  value="+55"
                  label=""
                  icon={
                    <MaterialCommunityIcons
                      name="phone-outline"
                      size={24}
                      color="#495E7A"
                    />
                  }
                  style={{
                    width: 100
                  }}
                />

                <FormInput
                  label="Telefone"
                  value={phone}
                  onChangeText={(value) => {
                    if (
                      /^\d*$/.test(value)
                    ) {
                      setPhone(value)
                    }
                  }}
                  onPress={() =>
                    setPhoneErrorMessage("")
                  }
                  errorMessage={
                    phoneErrorMessage
                  }
                  style={{
                    width: 230
                  }}
                  keyboardType="numeric"
                />
              </InputWrapper>

              <InputWrapper>
                <TextArea
                  label="Descrição"
                  value={description}
                  onChangeText={
                    setDescription
                  }
                />
              </InputWrapper>

            </InputsWrapper>

            <ButtonsWrapper>
              <Button
                mode="outlined"
                onPress={() =>
                  router.back()
                }
              >
                Cancelar
              </Button>

              <Button
                mode="elevated"
                onPress={
                  validateFields
                }
                disabled={
                  !(name && phone)
                }
              >
                Salvar
              </Button>
            </ButtonsWrapper>
          </CreateClientForm>
        </CreateClientsWrapper>

        <ConfirmationModal
          open={
            openConfirmCreationModal
          }
          title="Confirmar cadastro?"
          description={
            "Deseja salvar os dados preenchidos?\n(Você poderá editar depois)"
          }
          firstButtonLabel="Cancelar"
          secondButtonLabel="Salvar"
          onClose={() =>
            setOpenConfirmCreationModal(
              false
            )
          }
          onFirstButtonClick={() =>
            setOpenConfirmCreationModal(
              false
            )
          }
          onSecondButtonClick={
            handleSubmit
          }
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CreateClient