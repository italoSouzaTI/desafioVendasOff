import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IDatabaseProps } from "../../../core/database/model/IDatabase";
import { useRequestLists } from "../../request";

export function useListModelView() {
    const { navigate } = useNavigation();
    const isFocused = useIsFocused();
    const [listSales, setListSales] = useState<IDatabaseProps[]>([]);
    const { getlistSales } = useRequestLists();
    async function list() {
        try {
            const newItens = await getlistSales();
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
