import Button from "@/src/components/button"
import FormInput from "@/src/components/form-input"
import TextArea from "@/src/components/form-text-area"
import IconButton from "@/src/components/icon-button"
import { useClient } from "@/src/database/useClient"
import { ButtonsWrapper, EditClientForm, EditClientsWrapper, Header, InputsWrapper, InputWrapper, Title } from "@/src/styles/pages/EditClient"
import type { Client } from "@/src/types/clients"
import { toast } from "@/src/utils/toast"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback, Vibration, View } from "react-native"

const EditClient = () => {
  const { id } = useLocalSearchParams()
  const { update, getById, getByName, getByEmail, getByPhone } = useClient()
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState('')
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newDescription, setNewDescription] = useState('')
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')


  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await getById(Number(id))
        if (data) {
          setName(data.name ?? "")
          setEmail(data.email ?? "")
          setPhone(data.phone ?? "")
          setDescription(data.description ?? "")
          setNewName(data.name ?? "")
          setNewEmail(data.email ?? "")
          setNewPhone(data.phone ?? "")
          setNewDescription(data.description ?? "")

          setLoading(false)
        }
      } catch (error) {
        console.error(`Get client to edit error: ${error}`)
      }
    }
    load()
  }, [id])

  const validateName = async () => {
    if (newName === name) return true
    if (newName.length < 2 || !newName.trim()) {
      setNameErrorMessage('O nome precisa conter dois caracteres ou mais.')
      return false
    }

    const isAlreadyAdded = await getByName(newName)
    if (isAlreadyAdded.length > 0) {
      setNameErrorMessage('Nome já cadastrado.')
      return false
    }

    return true
  }
  const validateEmail = async () => {
    if (newEmail === newEmail) return true
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (newEmail.trim() && !emailRegex.test(newEmail)) {
      setEmailErrorMessage('inválido.')
      return false
    }

    const isAlreadyAdded = await getByEmail(newEmail)
    if (isAlreadyAdded.length > 0) {
      setEmailErrorMessage('Email já cadastrado.')
      return false
    }
    return true
  }

  const validatePhone = async () => {
    if (newPhone === newPhone) return true
    if (newPhone.length < 9) {
      setPhoneErrorMessage('Telefone inválido')
      return false
    }
    const isAlreadyAdded = await getByPhone(newPhone)
    if (isAlreadyAdded.length > 0) {
      setPhoneErrorMessage('Telefone já cadastrado.')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    try {
      await update(Number(id), {
        name: newName,
        email: newEmail,
        phone: newPhone,
        description: newDescription
      })

      router.replace('/clients')
      toast.success('Alterações salvas!', 'Alterações de cliente salvas!');
    } catch {
      toast.error('Erro ao editar cliente!', 'Tente novamente em breve.');
    }
  }

  const validateFields = async () => {
    const isNameValid = await validateName()
    const isEmailValid = await validateEmail()
    const isPhoneValid = await validatePhone()

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      Vibration.vibrate(200)
      return
    }
    handleSubmit()
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <EditClientsWrapper>
          <Header>
            <IconButton icon='arrow-left' onPress={() => router.replace(`/client-details/${id}`)} iconColor="#495E7A" />
            <Title>Editar cliente</Title>
          </Header>
          {loading ? (
            <ActivityIndicator animating={true} color='#1F6F8B' size='large' style={{ marginTop: 250 }} />) : (
            <EditClientForm>
              <InputsWrapper>
                <InputWrapper>
                  <FormInput
                    label='Nome'
                    value={newName}
                    onChangeText={(newName) => { setNewName(newName) }}
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
                    value={newEmail}
                    onChangeText={(newEmail) => { setNewEmail(newEmail) }}
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
                    icon={<MaterialCommunityIcons name="phone-outline" size={24} color="#495E7A" />}
                    style={{
                      width: 100,
                    }}
                  />
                  <FormInput
                    label='Telefone'
                    value={newPhone}
                    onChangeText={(newPhone) => {
                      if (/^\d*$/.test(newPhone)) {
                        setNewPhone(newPhone)
                      }
                    }}
                    onPress={() => { setPhoneErrorMessage('') }}
                    errorMessage={phoneErrorMessage}
                    style={{
                      width: 230
                    }}
                    keyboardType='numeric'
                  />
                </InputWrapper>
                <InputWrapper>
                  <TextArea
                    label="Descrição"
                    value={newDescription}
                    onChangeText={(newDescription) => setNewDescription(newDescription)}
                  />
                </InputWrapper>
              </InputsWrapper>
              <ButtonsWrapper>
                <Button mode="outlined" onPress={() => router.replace('/clients')}>Cancelar</Button>
                <Button
                  mode="elevated"
                  onPress={validateFields}
                  disabled={
                    name === newName &&
                    email === newEmail &&
                    phone === newPhone &&
                    description === newDescription
                  }
                >
                  Salvar
                </Button>
              </ButtonsWrapper>
            </EditClientForm>
          )}
        </EditClientsWrapper>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EditClient