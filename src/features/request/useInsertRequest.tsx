import { useSalesDatabase } from "../../core/database/useSalesDatabase";
import { deviceName, manufacturer } from "expo-device";
import { IDatabaseProps } from "../../core/database/model/IDatabase";
import { suparbaseConnetion } from "../../core/service/suparbase";

export function useInsertRequest() {
    const { create } = useSalesDatabase();
    async function createSaleOff(
        data: Omit<
            IDatabaseProps,
            "id" | "at_create" | "sync_status" | "sync_update" | "sync_delete"
        >
    ) {
        try {
            await create({
                supplier: data.supplier,
                id_api: "",
                id_device: `${deviceName} - ${manufacturer}`,
                account_type: data.account_type,
                payment: data.payment,
                maturity: data.maturity,
                value_price: String(data.value_price),
                at_create: String(new Date()),
                sync_delete: false,
                sync_status: true,
                sync_update: false,
                is_sync: false,
            });
        } catch (error) {
            throw error;
        }
    }
    async function createSaleOn(sale: IDatabaseProps) {
        try {
            const { data, error } = await suparbaseConnetion
                .from("sale")
                .insert([
                    {
                        id_device: `${deviceName} - ${manufacturer}`,
                        supplier: sale.supplier,
                        account_type: sale.account_type,
                        payment: sale.payment,
                        maturity: sale.maturity,
                        value_price: String(sale.value_price),
                        sync_status: false,
                        sync_update: false,
                        sync_delete: false,
                        is_sync: true,
                    },
                ])
                .select();
            await creteSyncLocation(data[0]);
        } catch (error) {
            throw error;
        }
    }
    async function creteSyncLocation(data: Omit<IDatabaseProps, "id">) {
        try {
            await create({
                supplier: data.supplier,
                id_api: data.id_api,
                id_device: data.id_device,
                account_type: data.account_type,
                payment: data.payment,
                maturity: data.maturity,
                value_price: data.value_price,
                at_create: String(new Date()),
                sync_delete: false,
                sync_status: false,
                sync_update: false,
                is_sync: true,
            });
        } catch (error) {
            console.log("response - error", error);
        }
    }
    return {
        createSaleOff,
        createSaleOn,
    };
}
