import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeInsets } from "../../../hooks/useSafeInsets";
import { useForm } from "react-hook-form";

import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useSalesDatabase } from "../../../core/database/useSalesDatabase";
import { IDatabaseProps } from "../../../core/database/model/IDatabase";
import { useEditRequest, useInsertRequest } from "../../request";
import { NetInfoContext } from "../../../provider/NetInfoContext";
import { useRemoveRequest } from "../../request/useRemoveRequest";
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
    const { createSaleOff, createSaleOn } = useInsertRequest();
    const { editOff, updataOn } = useEditRequest();
    const { removeOff, removeOn } = useRemoveRequest();
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
            value_price: params?.data?.value_price || undefined,
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
        try {
            setIsLoading(true);
            if (
                isConnect &&
                params.data.hasOwnProperty("id_api") &&
                params.data.id_api.length
            ) {
                await updataOn(data, params.data);
            } else {
                await editOff(data, params.data);
            }
            Alert.alert(`Sucesso`, "registro alterado com sucesso.", [
                { text: "OK", onPress: () => goBack() },
            ]);
        } catch (error) {
            console.log("handleEdit", error);
        } finally {
            setIsLoading(false);
        }
    }
    async function handleRemove() {
        try {
            Alert.alert(`Atenção`, "Deseja realmente deletar esse recibo?", [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        if (isConnect) {
                            await removeOn(params.data);
                        } else {
                            await removeOff(params.data);
                        }
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
