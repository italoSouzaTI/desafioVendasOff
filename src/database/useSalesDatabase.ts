import { useSQLiteContext } from "expo-sqlite";
import { IDatabaseProps } from "./model/IDatabase";

export function useSalesDatabase() {
    const database = useSQLiteContext();
    async function create(data: Omit<IDatabaseProps, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO sales (fornecedor,tipo,pagamento,vencimento,valor,at_create,SYNC_STATUS,sync_update,sync_delete) VALUES ($fornecedor,$tipo,$pagamento,$vencimento,$valor,$at_create,$SYNC_STATUS,$sync_update,$sync_delete)"
        );
        try {
            const result = await statement.executeAsync({
                $fornecedor: data.fornecedor,
                $tipo: data.tipo,
                $pagamento: data.pagamento,
                $vencimento: data.vencimento,
                $valor: data.valor,
                $at_create: data.at_create,
                $SYNC_STATUS: data.SYNC_STATUS,
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
            "UPDATE sales SET fornecedor=$fornecedor,tipo=$tipo,pagamento=$pagamento,vencimento=$vencimento,valor=$valor,at_create=$at_create,SYNC_STATUS=$SYNC_STATUS,sync_update=$sync_update,sync_delete=$sync_delete WHERE id=$id"
        );
        try {
            await statement.executeAsync({
                $id: data.id,
                $fornecedor: data.fornecedor,
                $tipo: data.tipo,
                $pagamento: data.pagamento,
                $vencimento: data.vencimento,
                $valor: data.valor,
                $at_create: data.at_create,
                $SYNC_STATUS: data.SYNC_STATUS,
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
    return { create, getAll, update, remove };
}
