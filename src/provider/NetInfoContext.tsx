import React, { useState, createContext, useEffect, ReactNode } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { useRequestLists } from "../features/request";
import { useModalStore } from "../store/useModalStore";
import { IDatabaseProps } from "../core/database/model/IDatabase";
import { suparbaseConnetion } from "../core/service/suparbase";
import { useSalesDatabase } from "../core/database/useSalesDatabase";

interface NetInfoProps {
    isConnect: boolean;
}

type ChildrenNetInfoProps = {
    children: ReactNode;
};

export const NetInfoContext = createContext<NetInfoProps>({} as NetInfoProps);

const NetInfoProvider: React.FC<ChildrenNetInfoProps> = ({ children }) => {
    const netInfo = useNetInfo();
    const [isConnect, setIsConnect] = useState(false);
    const { getlistSalesSync } = useRequestLists();
    const { update } = useSalesDatabase();
    const { handleActionModal, handleActionTotal, handleActionCurrent } =
        useModalStore((state) => state);

    async function contListSync() {
        try {
            const newData = await getlistSalesSync();
            if (newData?.length > 0) {
                handleActionTotal(Number(newData?.length));
                handleActionModal(true);
                sendData(newData);
            }
        } catch (error) {}
    }
    async function sendData(sale: IDatabaseProps[]) {
        try {
            sale.forEach(async (element: IDatabaseProps) => {
                if (!element.is_sync && element.id_api.length) {
                    const { data, error } = await suparbaseConnetion
                        .from("sale")
                        .update([
                            {
                                id_device: element.id_device,
                                supplier: element.supplier,
                                account_type: element.account_type,
                                payment: element.payment,
                                maturity: element.maturity,
                                value_price: element.value_price,
                                sync_status: false,
                                sync_update: false,
                                sync_delete: element.sync_delete,
                                is_sync: true,
                            },
                        ])
                        .eq("id_api", Number(element.id_api))
                        .select();
                    handleActionCurrent();
                    await updateSyncLocation(data[0], element);
                } else {
                    const { data, error } = await suparbaseConnetion
                        .from("sale")
                        .insert([
                            {
                                id_device: element.id_device,
                                supplier: element.supplier,
                                account_type: element.account_type,
                                payment: element.payment,
                                maturity: element.maturity,
                                value_price: element.value_price,
                                sync_status: 0,
                                sync_update: 0,
                                sync_delete: element.sync_delete,
                                is_sync: 1,
                            },
                        ])
                        .select();
                    handleActionCurrent();

                    await updateSyncLocation(data[0], element);
                }
            });
        } catch (error) {}
    }
    async function updateSyncLocation(
        data: IDatabaseProps,
        element: IDatabaseProps
    ) {
        try {
            const idCurernt = element.id > 0 ? element.id : data.id;
            const response = await update({
                id: Number(idCurernt),
                supplier: data.supplier,
                id_api: String(data.id_api),
                id_device: data.id_device,
                account_type: data.account_type,
                payment: data.payment,
                value_price: String(data.value_price),
                maturity: String(element.maturity),
                at_create: element.at_create,
                sync_delete: data.sync_delete,
                sync_status: false,
                sync_update: false,
                is_sync: true,
            });
        } catch (error) {
            console.log("response - error", error);
        }
    }
    useEffect(() => {
        if (netInfo.isConnected === true && netInfo.type != "vpn") {
            setIsConnect(true);
        } else {
            setIsConnect(false);
        }
    }, [netInfo.isConnected]);
    useEffect(() => {
        if (isConnect) {
            contListSync();
        }
    }, [isConnect]);

    return (
        <NetInfoContext.Provider value={{ isConnect }}>
            {children}
        </NetInfoContext.Provider>
    );
};

export default NetInfoProvider;
