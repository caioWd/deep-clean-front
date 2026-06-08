import Button from "@/src/components/button"
import ConfirmationModal from "@/src/components/confirmation-modal"
import FormInput from "@/src/components/form-input"
import TextArea from "@/src/components/form-text-area"
import IconButton from "@/src/components/icon-button"

import { useService } from "@/src/database/useServices"
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

import { User } from "@/src/types/users"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useEffect, useState } from "react"

import {
  Keyboard,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { Picker } from "@react-native-picker/picker"
import { toast } from "../utils/toast"

const CreateService = () => {
  const { create } = useService()
  const { getClientsByOperator } = useUser()
  const { getCurrentSession } = useSession()

  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [serviceDate, setServiceDate] = useState("")
  const [serviceTime, setServiceTime] = useState("")
  const [description, setDescription] = useState("")

  const [clients, setClients] = useState<User[]>([])
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null)

  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    try {
      const session = await getCurrentSession()

      if (!session) {
        router.replace("/home")
        return
      }

      const data = await getClientsByOperator(session.user_id)
      setClients(data ?? [])
    } catch (error) {
      console.error("loadClients error:", error)
    }
  }

  function formatDateToDatabase(date: string) {
    const [day, month, year] = date.split("/")

    if (!day || !month || !year) return ""

    return `${year}-${month}-${day}`
  }

  const validateFields = () => {
    if (
      !title.trim() ||
      !address.trim() ||
      !serviceDate.trim() ||
      !serviceTime.trim() ||
      selectedClientId == null
    ) {
      toast.error("Campos obrigatórios", "Preencha todos os campos.")
      return
    }

    setOpenConfirmModal(true)
  }

  const handleSubmit = async () => {
    try {
      const session = await getCurrentSession()

      if (!session) {
        router.replace("/home")
        return
      }

      const formattedDate = formatDateToDatabase(serviceDate)

      if (!formattedDate) {
        toast.error("Data inválida", "Use o formato DD/MM/AAAA")
        return
      }

      await create({
        title,
        description,
        address,
        service_date: formattedDate,
        service_time: serviceTime,
        status: "pending",

        created_by: session.user_id,
        operator_id: session.user_id,

        client_id: selectedClientId!
      })

      setOpenConfirmModal(false)

      toast.success("Serviço criado!", "Salvo com sucesso.")

      router.back()
    } catch (error) {
      console.error("create service error:", error)
      toast.error("Erro ao criar serviço", "Tente novamente.")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <CreateClientsWrapper>

          <Header>
            <IconButton
              icon="arrow-left"
              onPress={() => router.back()}
              iconColor="#495E7A"
            />
            <Title>Novo serviço</Title>
          </Header>

          <CreateClientForm>
            <InputsWrapper>

              {/* TÍTULO */}
              <InputWrapper>
                <FormInput
                  label="Nome do serviço"
                  value={title}
                  onChangeText={setTitle}
                  icon={
                    <MaterialCommunityIcons
                      name="clipboard-outline"
                      size={24}
                      color="#495E7A"
                    />
                  }
                />
              </InputWrapper>

              {/* CLIENTE */}
              <InputWrapper>
                <View
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#495E7A",
                    borderRadius: 8
                  }}
                >
                  <Picker
                    selectedValue={selectedClientId}
                    onValueChange={(value) => {
                      if (value === null || value === -1) {
                        setSelectedClientId(null)
                        return
                      }

                      setSelectedClientId(Number(value))
                    }}
                  >
                    <Picker.Item label="Selecione um cliente" value={-1} />

                    {clients.map((client) => (
                      <Picker.Item
                        key={client.id}
                        label={client.name}
                        value={client.id}
                      />
                    ))}
                  </Picker>
                </View>
              </InputWrapper>

              {/* ENDEREÇO */}
              <InputWrapper>
                <FormInput
                  label="Endereço"
                  value={address}
                  onChangeText={setAddress}
                  icon={
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={24}
                      color="#495E7A"
                    />
                  }
                />
              </InputWrapper>

              {/* DATA + HORA */}
              <InputWrapper>
                <FormInput
                  label="Data (DD/MM/AAAA)"
                  value={serviceDate}
                  onChangeText={setServiceDate}
                  icon={
                    <MaterialCommunityIcons
                      name="calendar-outline"
                      size={24}
                      color="#495E7A"
                    />
                  }
                  style={{
                    width: '45%'
                  }}
                />

                <FormInput
                  label="Hora (HH:mm)"
                  value={serviceTime}
                  onChangeText={setServiceTime}
                  icon={
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={24}
                      color="#495E7A"
                    />
                  }
                   style={{
                    width: '45%'
                  }}
                />
              </InputWrapper>

              {/* DESCRIÇÃO */}
              <InputWrapper>
                <TextArea
                  label="Descrição"
                  value={description}
                  onChangeText={setDescription}
                />
              </InputWrapper>

            </InputsWrapper>

            <ButtonsWrapper>
              <Button mode="outlined" onPress={() => router.back()}>
                Cancelar
              </Button>

              <Button mode="elevated" onPress={validateFields}>
                Salvar
              </Button>
            </ButtonsWrapper>

          </CreateClientForm>
        </CreateClientsWrapper>

        <ConfirmationModal
          open={openConfirmModal}
          title="Confirmar cadastro?"
          description="Deseja salvar o serviço?"
          firstButtonLabel="Cancelar"
          secondButtonLabel="Salvar"
          onClose={() => setOpenConfirmModal(false)}
          onFirstButtonClick={() => setOpenConfirmModal(false)}
          onSecondButtonClick={handleSubmit}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CreateService