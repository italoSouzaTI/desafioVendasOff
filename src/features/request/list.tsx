import { useSalesDatabase } from "../../core/database/useSalesDatabase";

export function useRequestLists() {
    const { getAll } = useSalesDatabase();
    async function getlistSales() {
        try {
            const response = await getAll();
            const newItens = response.filter(
                (item) => item.sync_delete == false
            );

            return newItens;
        } catch (error) {}
    }
    async function getlistSalesSync() {
        try {
            const response = await getAll();
            const newItens = response.filter(
                (item) =>
                    item.sync_status ||
                    item.sync_update ||
                    item.sync_delete ||
                    item.id_api?.length == 0
            );
            return newItens;
        } catch (error) {}
    }

    return {
        getlistSales,
        getlistSalesSync,
    };
}
