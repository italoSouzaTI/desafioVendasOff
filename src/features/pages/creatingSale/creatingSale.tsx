import {
    ActivityIndicator,
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
import { lightTheme } from "../../../core/theme/theme";
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
        isLoading,
        handleRemove,
        goBack,
        handleSubmit,
        handleSave,
        setIsEdit,
    } = useCreatingSaleModelView();
    return (
        <View style={styles.container}>
            <Conection />
            {params && !isEdit ? (
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: lightTheme.size[16],
                        paddingTop: top,
                        gap: lightTheme.size[16],
                    }}
                >
                    <View>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                backgroundColor: lightTheme.labelButton,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: lightTheme.size[8],
                            }}
                            onPress={() => {
                                goBack();
                            }}
                        >
                            <Feather
                                name="arrow-left"
                                size={lightTheme.size[24]}
                                color={lightTheme.labelTitle}
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
                    {params.data.async_delete == true && (
                        <Text
                            style={{
                                fontWeight: "600",
                                fontSize: lightTheme.size[16],
                                color: lightTheme.iconRemove,
                                textAlign: "center",
                                backgroundColor: lightTheme.labelButton,
                                padding: lightTheme.size[4],
                                borderRadius: lightTheme.size[4],
                            }}
                        >
                            Nota removida do sistema
                        </Text>
                    )}

                    <View>
                        <Text style={styles.title}>Fornecedor</Text>
                        <Text style={{ color: lightTheme.labelSubTitle }}>
                            {params.data.supplier}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Tipo da conta</Text>
                        <Text style={{ color: lightTheme.labelSubTitle }}>
                            {params.data.account_type}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Tipo do pagamento</Text>
                        <Text style={{ color: lightTheme.labelSubTitle }}>
                            {params.data.payment}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Valor</Text>
                        <Text style={{ color: lightTheme.labelSubTitle }}>
                            {price(params.data.value_price)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Vencimento</Text>
                        <Text style={{ color: lightTheme.labelSubTitle }}>
                            {params.data.maturity}
                        </Text>
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
                                        color: lightTheme.iconDisabled,
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
                        disabled={isLoading}
                        style={[
                            styles.save,
                            {
                                backgroundColor: params?.data?.id
                                    ? lightTheme.activeButton
                                    : lightTheme.buttonSave,
                            },
                        ]}
                        onPress={handleSubmit(handleSave)}
                    >
                        {isLoading ? (
                            <ActivityIndicator
                                size={"large"}
                                color={"white"}
                                animating={isLoading}
                            />
                        ) : (
                            <Text
                                style={{
                                    color: params?.data?.id
                                        ? lightTheme.labelTitle
                                        : lightTheme.labelButton,
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}
                            >
                                Salvar
                            </Text>
                        )}
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.background,
    },
    header: {
        width: "100%",
        minHeight: 50,
        backgroundColor: lightTheme.labelButton,
        paddingHorizontal: lightTheme.size[16],
        paddingBottom: lightTheme.size["12"],
        top: lightTheme.size["4"],
        alignItems: "center",
        gap: lightTheme.size[16],
        flexDirection: "row",
    },
    title: {
        fontWeight: "600",
        fontSize: lightTheme.size[16],
        color: lightTheme.labelTitle,
    },
    save: {
        width: "100%",
        height: lightTheme.size[60],
        justifyContent: "center",
        alignItems: "center",
    },
});
