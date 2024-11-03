import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Input, Select } from "../../../components";
import { useCreatingSaleModelView } from "./useCreatingSaleModelView";
import { StatusAction } from "./components/StatusAction/StatusAction";
export function CreatingSale() {
    const {
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
    } = useCreatingSaleModelView();
    console.log(params);
    return (
        <>
            {params && !isEdit ? (
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 16,
                        paddingTop: top,
                        gap: 16,
                    }}
                >
                    <View>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 8,
                            }}
                            onPress={() => {
                                goBack();
                            }}
                        >
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <StatusAction
                        actionEdit={() => setIsEdit((prevState) => !prevState)}
                        actionDelete={handleRemove}
                    />
                    <Text style={[styles.title, { textAlign: "center" }]}>
                        -------------- RECIBO --------------
                    </Text>
                    <View>
                        <Text style={styles.title}>Fornecedor</Text>
                        <Text>{params.data.fornecedor}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Tipo da conta</Text>
                        <Text>{params.data.tipo}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Tipo do pagamento</Text>
                        <Text>{params.data.pagamento}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Valor</Text>
                        <Text>{params.data.valor}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Vencimento</Text>
                        <Text>{params.data.vencimento}</Text>
                    </View>
                    <Text style={[styles.title, { textAlign: "center" }]}>
                        -----------------------------------------------------------
                    </Text>
                    <View>
                        <Text
                            style={[{ textAlign: "right", paddingRight: 16 }]}
                        >
                            <Text>Gerado em : {params.data.at_create}</Text>
                        </Text>
                    </View>
                </View>
            ) : (
                <>
                    <View style={[styles.header, { paddingTop: top }]}>
                        <TouchableOpacity
                            onPress={() => {
                                goBack();
                            }}
                        >
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="black"
                            />
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
                                    required:
                                        "A seleção de um item é obrigatorio.",
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
                                    required:
                                        "A seleção de um item é obrigatorio.",
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
                                    required:
                                        "A seleção de um item é obrigatorio.",
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
                                    required:
                                        "Campo data de vencimento é obrigatorio.",
                                },
                            }}
                            restInput={{
                                keyboardType: "numeric",
                                placeholder: "Digite a data de vencimento",
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
                                placeholder: "Digite o valor",
                            }}
                        />
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.save}
                        onPress={handleSubmit(handleSave)}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            Salvar
                        </Text>
                    </TouchableOpacity>
                </>
            )}
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
