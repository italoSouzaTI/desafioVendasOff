import { useNavigation } from "@react-navigation/native";
import { useSafeInsets } from "../../../hooks/useSafeInsets";
import { useForm } from "react-hook-form";
import { useSalesDatabase } from "../../../database/useSalesDatabase";
import { IDatabaseProps } from "../../../database/model/IDatabase";
import { Alert } from "react-native";

export function useCreatingSaleModelView() {
    const { goBack } = useNavigation();
    const { top } = useSafeInsets();
    const { create } = useSalesDatabase();
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
    async function handleSave(
        data: Omit<
            IDatabaseProps,
            "id" | "at_create" | "SYNC_STATUS" | "sync_update" | "sync_delete"
        >
    ) {
        console.log(data);
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
    }
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return {
        goBack,
        top,
        control,
        handleSubmit,
        errors,
        fornecedorData,
        contasData,
        pagamentoData,
        handleSave,
    };
}
