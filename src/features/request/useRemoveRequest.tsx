import { IDatabaseProps } from "../../core/database/model/IDatabase";
import { useSalesDatabase } from "../../core/database/useSalesDatabase";
import { suparbaseConnetion } from "../../core/service/suparbase";

export function useRemoveRequest() {
    const { removeLogic, update } = useSalesDatabase();

    async function removeOff(params: IDatabaseProps) {
        await removeLogic({
            id: Number(params.id),
            supplier: params.supplier,
            id_api: params.id_api ?? "",
            id_device: params.id_device,
            account_type: params.account_type,
            payment: params.payment,
            value_price: params.value_price,
            maturity: params.maturity,
            at_create: params.at_create,
            sync_delete: true,
            sync_status: true,
            sync_update: params.sync_update,
            is_sync: false,
        });
    }
    async function removeOn(params: IDatabaseProps) {
        try {
            const response = await suparbaseConnetion
                .from("sale")
                .update({
                    id_device: String(params.id_device),
                    supplier: params.supplier,
                    account_type: params.account_type,
                    payment: params.payment,
                    maturity: params.maturity,
                    value_price: params.value_price,
                    sync_status: false,
                    sync_update: false,
                    sync_delete: true,
                    is_sync: true,
                })
                .eq("id_api", Number(params.id_api))
                .select();
            if (response.status == 200) {
                await update({
                    id: Number(params.id),
                    supplier: params.supplier,
                    id_api: params.id_api ?? "",
                    id_device: params.id_device,
                    account_type: params.account_type,
                    payment: params.payment,
                    value_price: String(params.value_price),
                    maturity: params.maturity,
                    at_create: params.at_create,
                    sync_delete: true,
                    sync_status: false,
                    sync_update: false,
                    is_sync: true,
                });
            }
        } catch (error) {
            throw error;
        }
    }
    return {
        removeOff,
        removeOn,
    };
}
