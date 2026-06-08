import Button from "@/src/components/button"
import FormInput from "@/src/components/form-input"
import { useUser } from "@/src/database/useUsers"
import { useSession } from "@/src/database/useSession"
import { router } from "expo-router"
import { useState } from "react"
import { View, Alert } from "react-native"

const Login = () => {
  const { login } = useUser()
  const { createSession } = useSession()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    try {
      setLoading(true)

      const user = await login(email, password)

      if (!user) {
        Alert.alert("Erro", "Email ou senha inválidos")
        return
      }

      await createSession(user.id)

      router.replace("/home")

    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Falha ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 16,
      }}
    >
      <FormInput
        label="Email"
        value={email}
        onChangeText={setEmail}
      />

      <FormInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
      />

      <Button
        mode="elevated"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </View>
  )
}

export default Login