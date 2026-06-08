import { type SQLiteDatabase } from 'expo-sqlite'

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execSync(`
    CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,

  phone TEXT UNIQUE NOT NULL,

  description TEXT,

  role TEXT NOT NULL
    CHECK(role IN (
      'client',
      'pool_operator'
    )),

  created_by INTEGER,

  FOREIGN KEY(created_by)
    REFERENCES users(id)
);
  `)

  async function seedUsers(database: SQLiteDatabase) {
    const usersCount = await database.getFirstAsync<{
      total: number
    }>("SELECT COUNT(*) as total FROM users")

    if ((usersCount?.total ?? 0) > 0) {
      return
    }

    await database.runAsync(
      `
    INSERT INTO users (
      name,
      email,
      password,
      phone,
      description,
      role
    )
    VALUES
    (?, ?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?, ?)
    `,
      [
        "Caio Wendel",
        "caio@gmail.com",
        "123456",
        "85999990001",
        "Administrador",
        "pool_operator",

        "Kauan Matos",
        "kauan@gmail.com",
        "123456",
        "85999990002",
        "Operador",
        "pool_operator",

        "Mario",
        "mario@gmail.com",
        "123456",
        "85999990003",
        "Operador",
        "pool_operator",

        "Elizio",
        "elizio@gmail.com",
        "123456",
        "85999990004",
        "Operador",
        "pool_operator",

        "Guimarães",
        "guimaraes@gmail.com",
        "123456",
        "85999990005",
        "Cliente",
        "client",
      ]
    )
  }

  await seedUsers(database)

  await database.execSync(`
  CREATE TABLE IF NOT EXISTS session (
    user_id INTEGER PRIMARY KEY,
    expires_at TEXT NOT NULL,

    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`)

  await database.execSync(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      title TEXT NOT NULL,
      description TEXT,

      address TEXT NOT NULL,

      service_date TEXT NOT NULL,
      service_time TEXT NOT NULL,

      status TEXT NOT NULL DEFAULT 'scheduled'
        CHECK(status IN (
          'pending',
          'scheduled',
          'finished',
          'canceled'
        )),

      created_by INTEGER NOT NULL,
      client_id INTEGER NOT NULL,
      operator_id INTEGER,

      created_at TEXT DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY(created_by) REFERENCES users(id),
      FOREIGN KEY(client_id) REFERENCES users(id),
      FOREIGN KEY(operator_id) REFERENCES users(id)
    );
  `);

  const users = await database.getAllAsync(
    "SELECT * FROM users"
  )

  console.log("user:" + users)
}