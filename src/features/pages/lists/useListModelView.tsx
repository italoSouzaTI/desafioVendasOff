import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IDatabaseProps } from "../../../database/model/IDatabase";
import { useSalesDatabase } from "../../../database/useSalesDatabase";
export function useListModelView() {
    const { navigate } = useNavigation();
    const isFocused = useIsFocused();
    const [listSales, setListSales] = useState<IDatabaseProps[]>([]);
    const { getAll } = useSalesDatabase();

    async function list() {
        try {
            const response = await getAll();
            const newItens = response.filter(
                (item) => item.sync_delete == false
            );
            setListSales(newItens);
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
