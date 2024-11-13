import { IDatabaseProps } from "../../core/database/model/IDatabase";
import { useSalesDatabase } from "../../core/database/useSalesDatabase";
import { suparbaseConnetion } from "../../core/service/suparbase";

export function useEditRequest() {
    const { update } = useSalesDatabase();
    async function editOff(data: IDatabaseProps, params: IDatabaseProps) {
        try {
            await update({
                id: Number(params.id),
                supplier: data.supplier,
                id_api: params.id_api ?? "",
                id_device: params.id_device,
                account_type: data.account_type,
                payment: data.payment,
                value_price: String(data.value_price),
                maturity: data.maturity,
                at_create: params.at_create,
                sync_delete: params.sync_delete,
                sync_status: true,
                sync_update: true,
                is_sync: false,
            });
        } catch (error) {}
    }
    async function updataOn(sale: IDatabaseProps, params: IDatabaseProps) {
        try {
            const response = await suparbaseConnetion
                .from("sale")
                .update({
                    id_device: String(params.id_device),
                    supplier: sale.supplier,
                    account_type: sale.account_type,
                    payment: sale.payment,
                    maturity: sale.maturity,
                    value_price: sale.value_price,
                    sync_status: false,
                    sync_update: false,
                    sync_delete: false,
                    is_sync: true,
                })
                .eq("id_api", Number(params.id_api))
                .select();
            if (response.status == 200) {
                await update({
                    id: Number(params.id),
                    supplier: sale.supplier,
                    id_api: params.id_api ?? "",
                    id_device: params.id_device,
                    account_type: sale.account_type,
                    payment: sale.payment,
                    value_price: String(sale.value_price),
                    maturity: sale.maturity,
                    at_create: params.at_create,
                    sync_delete: params.sync_delete,
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
        updataOn,
        editOff,
    };
}
