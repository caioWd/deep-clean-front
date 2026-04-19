import Button from "@/src/components/button"
import ConfirmationModal from "@/src/components/confirmation-modal"
import FormInput from "@/src/components/form-input"
import IconButton from "@/src/components/icon-button"
import { useClient } from "@/src/database/useClient"
import { ButtonsWrapper, CreateClientForm, CreateClientsWrapper, Header, InputsWrapper, InputWrapper, Title } from "@/src/styles/pages/CreateClient"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"

const CreateClient = () => {

  const clientTable = useClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')

  const [openConfirmCreationModal, setOpenConfirmCreationModal] = useState(false)

  const validateName = async () => {
    if (name.length < 2 || !name.trim()) {
      setNameErrorMessage('O nome precisa conter dois caracteres ou mais.')
      return false
    }

    const isAlreadyAdded = await clientTable.getByName(name)
    if (isAlreadyAdded.length > 0) {
      setNameErrorMessage('Nome já cadastrado.')
      return false
    }

    return true
  }
  const validateEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email.trim() && !emailRegex.test(email)) {
      setEmailErrorMessage('inválido.')
      return false
    }

    const isAlreadyAdded = await clientTable.getByEmail(email)
    if (isAlreadyAdded.length > 0) {
      setEmailErrorMessage('Email já cadastrado.')
      return false
    }
    return true
  }

  const validatePhone = async () => {
    if (phone.length < 9) {
      setPhoneErrorMessage('Telefone inválido')
      return false
    }
    const isAlreadyAdded = await clientTable.getByPhone(phone)
    if (isAlreadyAdded.length > 0) {
      setPhoneErrorMessage('Telefone já cadastrado.')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    await clientTable.create({
      name,
      email,
      phone
    })

    router.replace({
      pathname: '/clients',
    })
  }

  const validateFields = async () => {
    const isNameValid = await validateName()
    const isEmailValid = await validateEmail()
    const isPhoneValid = await validatePhone()

    if (!isNameValid || !isEmailValid || !isPhoneValid) return

    setOpenConfirmCreationModal(true)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <CreateClientsWrapper>
          <Header>
            <IconButton icon='arrow-left' onPress={() => router.replace('/clients')} />
            <Title>Novo cliente</Title>
          </Header>
          <CreateClientForm>
            <InputsWrapper>
              <InputWrapper>
                <FormInput
                  label='Nome'
                  value={name}
                  onChangeText={(name) => { setName(name) }}
                  onPress={() => { setNameErrorMessage('') }}
                  errorMessage={nameErrorMessage}
                  icon={
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={24}
                      color="#495E7A"
                    />}
                />
              </InputWrapper>
              <InputWrapper>
                <FormInput
                  label='Email'
                  value={email}
                  onChangeText={(email) => { setEmail(email) }}
                  onPress={() => { setEmailErrorMessage('') }}
                  errorMessage={emailErrorMessage}
                  icon={
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={24}
                      color="#495E7A"
                    />}
                />
              </InputWrapper>
              <InputWrapper>
                <FormInput
                  value='+55'
                  onChangeText={(email) => { setName(email) }}
                  style={{
                    width: 80,
                  }}
                />
                <FormInput
                  label='Telefone'
                  value={phone}
                  onChangeText={(phone) => {
                    if (/^\d*$/.test(phone)) {
                      setPhone(phone)
                    }
                  }}
                  onPress={() => { setPhoneErrorMessage('') }}
                  errorMessage={phoneErrorMessage}
                  icon={<MaterialCommunityIcons name="phone-outline" size={24} color="#495E7A" />}
                  style={{
                    width: 250
                  }}
                  keyboardType='numeric'
                />
              </InputWrapper>
            </InputsWrapper>
            <ButtonsWrapper>
              <Button mode="outlined" onPress={() => router.replace('/clients')}>Cancelar</Button>
              <Button mode="elevated" onPress={validateFields} disabled={!(name && phone)}>Salvar</Button>
            </ButtonsWrapper>
          </CreateClientForm>
        </CreateClientsWrapper>
        <ConfirmationModal
          open={openConfirmCreationModal}
          title='Confirmar cadastro?'
          description={'Deseja salvar os dados preenchidos?\n(Você poderá editar depois)'}
          firstButtonLabel='Cancelar'
          secondButtonLabel='Salvar'
          onClose={() => setOpenConfirmCreationModal(false)}
          onFirstButtonClick={() => setOpenConfirmCreationModal(false)}
          onSecondButtonClick={handleSubmit}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
export default CreateClient