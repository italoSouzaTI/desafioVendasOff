import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IDatabaseProps } from "../../../database/model/IDatabase";
import { useSalesDatabase } from "../../../database/useSalesDatabase";
export function useListSyncModelView() {
    const { navigate } = useNavigation();
    const isFocused = useIsFocused();
    const [listSales, setListSales] = useState<IDatabaseProps[]>([]);
    const { getAll } = useSalesDatabase();

    async function list() {
        try {
            const response = await getAll();
            const newData = response.filter(
                (item) => item.SYNC_STATUS || item.sync_update
            );
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
