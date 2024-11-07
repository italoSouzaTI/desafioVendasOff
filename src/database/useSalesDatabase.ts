import { useSQLiteContext } from "expo-sqlite";
import { IDatabaseProps } from "./model/IDatabase";

export function useSalesDatabase() {
    const database = useSQLiteContext();
    async function create(data: Omit<IDatabaseProps, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO sales (supplier,id_api,id_device,account_type,payment,maturity,value_price,at_create,sync_status,sync_update,sync_delete) VALUES ($supplier,$id_api,$id_device,$account_type,$payment,$maturity,$value_price,$at_create,$sync_status,$sync_update,$sync_delete)"
        );
        try {
            const result = await statement.executeAsync({
                $supplier: data.supplier,
                $id_api: data.id_api,
                $id_device: data.id_device,
                $account_type: data.account_type,
                $payment: data.payment,
                $maturity: data.maturity,
                $value_price: data.value_price,
                $at_create: data.at_create,
                $sync_status: data.sync_status,
                $sync_update: data.sync_update,
                $sync_delete: data.sync_delete,
            });
            const insertRowId = result.lastInsertRowId.toLocaleString();
            return { insertRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    async function update(data: IDatabaseProps) {
        const statement = await database.prepareAsync(
            "UPDATE sales SET supplier=$supplier,account_type=$account_type,payment=$payment,maturity=$maturity,value_price=$value_price,at_create=$at_create,sync_status=$sync_status,sync_update=$sync_update,sync_delete=$sync_delete WHERE id=$id"
        );
        try {
            await statement.executeAsync({
                $id: data.id,
                $id_api: data.id_api,
                $id_device: data.id_device,
                $supplier: data.supplier,
                $account_type: data.account_type,
                $payment: data.payment,
                $maturity: data.maturity,
                $value_price: data.value_price,
                $at_create: data.at_create,
                $sync_status: data.sync_status,
                $sync_update: data.sync_update,
                $sync_delete: data.sync_delete,
            });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    async function getAll() {
        try {
            const query = "SELECT * FROM sales";
            const response = await database.getAllAsync<IDatabaseProps>(query);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async function remove(id: number) {
        try {
            await database.execAsync("DELETE FROM sales WHERE id = " + id);
        } catch (error) {
            throw error;
        }
    }
    async function removeLogic(data: IDatabaseProps) {
        const statement = await database.prepareAsync(
            "UPDATE sales SET supplier=$supplier,account_type=$account_type,payment=$payment,maturity=$maturity,value_price=$value_price,at_create=$at_create,sync_status=$sync_status,sync_update=$sync_update,sync_delete=$sync_delete WHERE id=$id"
        );
        try {
            await statement.executeAsync({
                $id: data.id,
                $id_api: data.id_api,
                $id_device: data.id_device,
                $supplier: data.supplier,
                $account_type: data.account_type,
                $payment: data.payment,
                $maturity: data.maturity,
                $value_price: data.value_price,
                $at_create: data.at_create,
                $sync_status: data.sync_status,
                $sync_update: data.sync_update,
                $sync_delete: data.sync_delete,
            });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    return { create, getAll, update, remove, removeLogic };
}
