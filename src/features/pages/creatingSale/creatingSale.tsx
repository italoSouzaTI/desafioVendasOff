import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Input, Select } from "../../../components";
import { useSafeInsets } from "../../../hooks/useSafeInsets";
import { useForm } from "react-hook-form";
export function CreatingSale() {
    const { goBack } = useNavigation();
    const { top } = useSafeInsets();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
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
    function handleSave(data: any) {
        console.log("data", data);
    }
    return (
        <>
            <View style={[styles.header, { paddingTop: top }]}>
                <TouchableOpacity
                    onPress={() => {
                        goBack();
                    }}
                >
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Criando venda</Text>
            </View>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    top: 8,
                    padding: 16,
                    gap: 16,
                }}
            >
                <Select
                    label="Fornecedor"
                    error={errors.fornecedor?.message}
                    formProps={{
                        name: "fornecedor",
                        control,
                        rules: {
                            required: "A seleção de um item é obrigatorio.",
                        },
                    }}
                    restInput={{
                        placeholder: "Selecionar",
                    }}
                    dataItens={fornecedorData}
                />
                <Select
                    label="Tipo"
                    error={errors.tipoConta?.message}
                    formProps={{
                        name: "tipoConta",
                        control,
                        rules: {
                            required: "A seleção de um item é obrigatorio.",
                        },
                    }}
                    restInput={{
                        placeholder: "Selecionar",
                    }}
                    dataItens={contasData}
                />
                <Select
                    label="Meio de pagamento"
                    error={errors.pagamento?.message}
                    formProps={{
                        name: "pagamento",
                        control,
                        rules: {
                            required: "A seleção de um item é obrigatorio.",
                        },
                    }}
                    restInput={{
                        placeholder: "Selecionar",
                    }}
                    dataItens={pagamentoData}
                />
                <Input
                    label="Data de vencimento"
                    error={errors.vencimento?.message}
                    formProps={{
                        name: "vencimento",
                        control,
                        rules: {
                            required: "Campo data é obrigatorio.",
                        },
                    }}
                    restInput={{
                        keyboardType: "numeric",
                        placeholder: "Selecionar",
                    }}
                />
                <Input
                    label="Valor"
                    error={errors.valor?.message}
                    formProps={{
                        name: "valor",
                        control,
                        rules: {
                            required: "Campo valor é obrigatorio.",
                        },
                    }}
                    restInput={{
                        keyboardType: "numeric",
                        placeholder: "Selecionar",
                    }}
                />
            </ScrollView>
            <TouchableOpacity style={styles.save} onPress={handleSubmit(handleSave)}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Salvar</Text>
            </TouchableOpacity>
        </>
    );
}
const styles = StyleSheet.create({
    header: {
        width: "100%",
        minHeight: 50,
        backgroundColor: "white",
        padding: 16,
        alignItems: "center",
        gap: 16,
        flexDirection: "row",
    },
    title: {
        fontWeight: "600",
        fontSize: 16,
    },
    save: {
        width: "100%",
        height: 60,
        backgroundColor: "#2A983A",
        justifyContent: "center",
        alignItems: "center",
    },
});
