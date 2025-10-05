export async function initDB(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS propiedades (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT NOT NULL,
          direccion TEXT,
          precio REAL,
          dormitorios INTEGER,
          banos INTEGER,
          metros REAL,
          descripcion TEXT
    );`);
}