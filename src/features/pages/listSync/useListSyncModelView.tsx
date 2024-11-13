import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IDatabaseProps } from "../../../core/database/model/IDatabase";
import { useSalesDatabase } from "../../../core/database/useSalesDatabase";
import { useRequestLists } from "../../request";

export function useListSyncModelView() {
    const { navigate } = useNavigation();
    const isFocused = useIsFocused();
    const [listSales, setListSales] = useState<IDatabaseProps[]>([]);
    const { getlistSalesSync } = useRequestLists();

    async function list() {
        try {
            const newData = await getlistSalesSync();
            setListSales(newData);
        } catch (error) {}
    }
    useEffect(() => {
        list();
    }, [isFocused]);
    return {
        navigate,
        listSales,
    };
}
