import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeInsets } from "../../../hooks/useSafeInsets";
import { useForm } from "react-hook-form";

import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useSalesDatabase } from "../../../core/database/useSalesDatabase";
import { IDatabaseProps } from "../../../core/database/model/IDatabase";
import { insertRequest } from "../../request";
import { NetInfoContext } from "../../../provider/NetInfoContext";
interface SCHEMA {
    supplier: string;
    account_type: string;
    payment: string;
    maturity: string;
    value_price: string;
}
export function useCreatingSaleModelView() {
    const { goBack } = useNavigation();
    const { top } = useSafeInsets();
    const { update, removeLogic } = useSalesDatabase();
    const { createSaleOff, createSaleOn } = insertRequest();
    const [isLoading, setIsLoading] = useState(false);
    const { isConnect } = useContext(NetInfoContext);
    const { params } = useRoute();
    const [isEdit, setIsEdit] = useState(false);
    const fornecedorData = [
        {
            label: "BMB OFFICE CONSULTORIA LTDA",
            value: "BMB OFFICE CONSULTORIA LTDA",
        },
        {
            label: "SMART NEW SISTEMAS E TECNOLOGIAS",
            value: "SMART NEW SISTEMAS E TECNOLOGIAS",
        },
        {
            label: "HAWAB TECNOLOGIAS E EQUIPAMENTOS",
            value: "HAWAB TECNOLOGIAS E EQUIPAMENTOS",
        },
    ];
    const contasData = [
        {
            label: "CONTAS A PAGAR",
            value: "CONTAS A PAGAR",
        },
        {
            label: "CONTAS A RECEBER",
            value: "CONTAS A RECEBER",
        },
    ];
    const pagamentoData = [
        {
            label: "CARTÃO CREDITO",
            value: "CARTÃO CREDITO",
        },
        {
            label: "BOLETO",
            value: "BOLETO",
        },
        {
            label: "PIX",
            value: "PIX",
        },
    ];
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<SCHEMA>({
        defaultValues: {
            supplier: params?.data?.supplier || "",
            account_type: params?.data?.account_type || "",
            payment: params?.data?.payment || "",
            maturity: params?.data?.maturity || "",
            value_price: params?.data?.value_price || "0",
        },
    });
    async function handleSave(data: any) {
        if (params && params.data.id) {
            handleEdit(data);
        } else {
            handleSabeDB(data);
        }
    }
    async function handleSabeDB(data: IDatabaseProps) {
        try {
            setIsLoading(true);
            if (isConnect) {
                await createSaleOn(data);
            } else {
                await createSaleOff(data);
            }
            Alert.alert(`Sucesso`, "registro inserido com sucesso.", [
                { text: "OK", onPress: () => goBack() },
            ]);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }
    async function handleEdit(data: IDatabaseProps) {
        console.log(data);
        try {
            const response = await update({
                id: Number(params.data.id),
                supplier: data.supplier,
                id_api: params.data.id_api ?? "",
                id_device: params.data.id_device,
                account_type: data.account_type,
                payment: data.payment,
                value_price: String(data.value_price),
                maturity: data.maturity,
                at_create: params.data.at_create,
                sync_delete: params.data.sync_delete,
                sync_status: true,
                sync_update: true,
                is_sync: false,
            });
            Alert.alert(`Sucesso`, "registro alterado com sucesso.", [
                { text: "OK", onPress: () => goBack() },
            ]);
        } catch (error) {
            console.log("handleEdit", error);
        }
    }
    async function handleRemove() {
        try {
            Alert.alert(`Atenção`, "Deseja realmente deletar esse recibo?", [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        await removeLogic({
                            id: Number(params.data.id),
                            supplier: params.data.supplier,
                            id_api: params.data.id_api ?? "",
                            id_device: params.data.id_device,
                            account_type: params.data.account_type,
                            payment: params.data.payment,
                            value_price: params.data.value_price,
                            maturity: params.data.maturity,
                            at_create: params.data.at_create,
                            sync_delete: true,
                            sync_status: true,
                            sync_update: params.data.sync_update,
                            is_sync: false,
                        });
                        goBack();
                    },
                },
            ]);
        } catch (error) {}
    }

    useEffect(() => {
        if (params?.data.value_price) {
            setValue("value_price", params.data.valor);
        }
    }, [params?.data.value_price]);

    return {
        params,
        top,
        control,
        errors,
        fornecedorData,
        contasData,
        pagamentoData,
        isEdit,
        isLoading,
        handleRemove,
        goBack,
        handleSubmit,
        handleSave,
        setIsEdit,
    };
}
