import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeInsets } from "../../../hooks/useSafeInsets";
import { useForm } from "react-hook-form";
import { useSalesDatabase } from "../../../database/useSalesDatabase";
import { IDatabaseProps } from "../../../database/model/IDatabase";
import { Alert } from "react-native";
import { useState } from "react";
interface SCHEMA {
    fornecedor: string;
    tipoConta: string;
    pagamento: string;
    vencimento: string;
    valor: number;
}
export function useCreatingSaleModelView() {
    const { goBack } = useNavigation();
    const { top } = useSafeInsets();
    const { create, update, remove } = useSalesDatabase();
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
    } = useForm<SCHEMA>({
        defaultValues: {
            fornecedor: params && params.data ? params.data.fornecedor : "",
            tipoConta: params && params.data ? params.data.tipo : "",
            pagamento: params && params.data ? params.data.pagamento : "",
            vencimento: params && params.data ? params.data.vencimento : "",
            valor: params && params.data ? params.data.valor : 0,
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
            "id" | "at_create" | "SYNC_STATUS" | "sync_update" | "sync_delete"
        >
    ) {
        try {
            const response = await create({
                fornecedor: data.fornecedor,
                tipo: data.tipoConta,
                pagamento: data.pagamento,
                valor: data.valor,
                vencimento: data.vencimento,
                at_create: String(new Date()),
                sync_delete: false,
                SYNC_STATUS: true,
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
        console.log(data);
        const response = await update({
            id: Number(params.data.id),
            fornecedor: data.fornecedor,
            tipo: data.tipoConta,
            pagamento: data.pagamento,
            valor: data.valor,
            vencimento: data.vencimento,
            at_create: String(new Date()),
            sync_delete: params.data.sync_delete,
            SYNC_STATUS: params.data.SYNC_STATUS,
            sync_update: true,
        });
        Alert.alert(`Sucesso`, "registro alterado com sucesso.", [
            { text: "OK", onPress: () => goBack() },
        ]);
    }
    async function handleRemove() {
        try {
            Alert.alert(`Atenção`, "Deseja realmente deletar esse recibo?", [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        await remove(Number(params.data.id));
                        goBack();
                    },
                },
            ]);
        } catch (error) {}
    }

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
