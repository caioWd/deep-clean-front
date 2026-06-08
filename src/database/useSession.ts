import { useSQLiteContext } from "expo-sqlite"

export function useSession() {
  const database = useSQLiteContext()

  async function createSession(userId: number) {
    const expiresAt = new Date(
      Date.now() + 60 * 1000
    ).toISOString()

    await database.runAsync(
      `
      INSERT OR REPLACE INTO session (
        user_id,
        expires_at
      )
      VALUES (?, ?)
      `,
      [userId, expiresAt]
    )
  }

  async function getCurrentSession() {
    const session = await database.getFirstAsync<{
      user_id: number
      expires_at: string
    }>(
      `
      SELECT *
      FROM session
      LIMIT 1
      `
    )

    if (!session) {
      return null
    }

    const expired =
      new Date(session.expires_at) < new Date()

    if (expired) {
      await logout()
      return null
    }

    return session
  }

  async function logout() {
    await database.runAsync(
      "DELETE FROM session"
    )
  }

  return {
    createSession,
    getCurrentSession,
    logout,
  }
}