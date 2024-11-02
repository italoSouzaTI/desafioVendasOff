import { type SQLiteDatabase } from "expo-sqlite";
export async function initialDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS sales(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fornecedor TEXT NOT NULL,
        tipo TEXT NOT NULL,
        pagamento TEXT NOT NULL,
        vencimento DATETIME NOT NULL,
        valor DOUBLE NOT NULL,
        at_create DATETIME NOT NULL,
        SYNC_STATUS BOOLEAN NOT NULL,
        sync_update BOOLEAN NOT NULL,
        sync_delete BOOLEAN NOT NULL
        );
        `);
}
