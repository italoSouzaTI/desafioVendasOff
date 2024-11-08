import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeInsets } from "../../../hooks/useSafeInsets";
import { useForm } from "react-hook-form";

import { deviceName, manufacturer } from "expo-device";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { useSalesDatabase } from "../../../core/database/useSalesDatabase";
import { IDatabaseProps } from "../../../core/database/model/IDatabase";
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
    const { create, update, remove, removeLogic } = useSalesDatabase();
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
    async function handleSabeDB(
        data: Omit<
            IDatabaseProps,
            "id" | "at_create" | "sync_status" | "sync_update" | "sync_delete"
        >
    ) {
        console.log("entrei");
        try {
            const response = await create({
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
            });
            Alert.alert(
                `Sucesso ${response?.insertRowId}`,
                "registro inserido com sucesso.",
                [{ text: "OK", onPress: () => goBack() }]
            );
        } catch (error) {}
    }
    async function handleEdit(data: IDatabaseProps) {
        const response = await update({
            id: Number(params.data.id),
            supplier: data.supplier,
            id_api: data.id_api ?? "",
            id_device: data.id_device,
            account_type: data.account_type,
            payment: data.payment,
            value_price: String(data.value_price),
            maturity: data.maturity,
            at_create: String(new Date()),
            sync_delete: params.data.sync_delete,
            sync_status: true,
            sync_update: true,
        });
        Alert.alert(`Sucesso`, "registro alterado com sucesso.", [
            { text: "OK", onPress: () => goBack() },
        ]);
    }
    async function handleRemove() {
        try {
            console.log(params.data);
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
        handleRemove,
        goBack,
        handleSubmit,
        handleSave,
        setIsEdit,
    };
}
