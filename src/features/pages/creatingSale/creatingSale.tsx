import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Conection, Input, Select } from "../../../components";
import { useCreatingSaleModelView } from "./useCreatingSaleModelView";
import { StatusAction } from "./components/StatusAction/StatusAction";
import { price } from "../../../hooks/usePrice";
import { formatDateGenerate } from "../../../hooks/formatData";
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
    return (
        <>
            <Conection />
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
                    {!params.data.sync_delete && (
                        <StatusAction
                            actionEdit={() =>
                                setIsEdit((prevState) => !prevState)
                            }
                            actionDelete={handleRemove}
                        />
                    )}

                    <Text style={[styles.title, { textAlign: "center" }]}>
                        -------------- RECIBO --------------
                    </Text>
                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: 16,
                            color: "#dc143c",
                            textAlign: "center",
                            backgroundColor: "#e897a6",
                            padding: 2,
                            borderRadius: 4,
                        }}
                    >
                        Nota removida do sistema
                    </Text>
                    <View>
                        <Text style={styles.title}>Fornecedor</Text>
                        <Text>{params.data.supplier}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Tipo da conta</Text>
                        <Text>{params.data.account_type}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Tipo do pagamento</Text>
                        <Text>{params.data.payment}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Valor</Text>
                        <Text>{price(params.data.value_price)}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Vencimento</Text>
                        <Text>{params.data.maturity}</Text>
                    </View>
                    <Text style={[styles.title, { textAlign: "center" }]}>
                        -----------------------------------------------------------
                    </Text>
                    <View>
                        <Text
                            style={[{ textAlign: "right", paddingRight: 16 }]}
                        >
                            <Text>
                                Gerado em :{" "}
                                <Text
                                    style={{
                                        color: "#808080",
                                        fontWeight: "700",
                                    }}
                                >
                                    {formatDateGenerate(
                                        new Date(params.data.at_create)
                                    )}
                                </Text>
                            </Text>
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
                            error={errors.supplier?.message}
                            formProps={{
                                name: "supplier",
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
                            error={errors.account_type?.message}
                            formProps={{
                                name: "account_type",
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
                            error={errors.payment?.message}
                            formProps={{
                                name: "payment",
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
                            error={errors.maturity?.message}
                            formProps={{
                                name: "maturity",
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
                            error={errors.value_price?.message}
                            formProps={{
                                name: "value_price",
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
        paddingHorizontal: 16,
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
