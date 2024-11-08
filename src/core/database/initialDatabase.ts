import { type SQLiteDatabase } from "expo-sqlite";
export async function initialDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS sales(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_api TEXT NOT NULL,
        id_device TEXT NOT NULL,
        supplier TEXT NOT NULL,
        account_type TEXT NOT NULL,
        payment TEXT NOT NULL,
        maturity DATETIME NOT NULL,
        value_price TEXT NOT NULL,
        at_create DATETIME NOT NULL,
        SYNC_STATUS BOOLEAN NOT NULL,
        sync_update BOOLEAN NOT NULL,
        sync_delete BOOLEAN NOT NULL
        );
        `);
}
