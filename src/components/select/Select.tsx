import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import { lightTheme } from "../../core/theme/theme";
interface InputProps {
    error?: string;
    label: string;
    dataItens: { label: string; value: string }[];
    formProps: UseControllerProps;
    restInput: TextInputProps;
}
export function Select({
    label,
    dataItens,
    restInput,
    formProps,
    error = "",
}: InputProps) {
    const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
    return (
        <Controller
            render={({ field }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>{label}</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            styles.containerInput,
                            {
                                borderColor:
                                    error.length > 0
                                        ? lightTheme.iconRemove
                                        : lightTheme.iconDisabled,
                            },
                        ]}
                        onPress={() => {
                            setIsOpenSelect((prevState) => !prevState);
                        }}
                    >
                        <TextInput
                            style={styles.input}
                            value={field.value}
                            {...restInput}
                            editable={false}
                        />
                        <AntDesign
                            name="caretdown"
                            size={18}
                            color={lightTheme.iconDisabled}
                        />
                    </TouchableOpacity>
                    <>
                        {error.length > 0 && (
                            <Text style={styles.error}>{error}</Text>
                        )}
                    </>
                    {isOpenSelect && (
                        <View style={styles.listSelect}>
                            <ScrollView
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    padding: lightTheme.size["8"],
                                    gap: lightTheme.size["8"],
                                }}
                            >
                                {dataItens.map((item) => (
                                    <TouchableOpacity
                                        style={styles.itemSelect}
                                        key={item.label}
                                        onPress={() => {
                                            field.onChange(item.value);
                                            setIsOpenSelect(
                                                (prevState) => !prevState
                                            );
                                        }}
                                    >
                                        <Text>{item.value}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            )}
            {...formProps}
        />
    );
}
const styles = StyleSheet.create({
    container: {
        gap: lightTheme.size["8"],
    },
    title: {
        fontWeight: "600",
        fontSize: lightTheme.size["16"],
    },
    containerInput: {
        flexDirection: "row",
        width: "100%",
        height: lightTheme.size["60"],
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: lightTheme.iconDisabled,
        paddingHorizontal: lightTheme.size["16"],
        borderRadius: lightTheme.size["8"],
        alignItems: "center",
    },
    listSelect: {
        width: "100%",
        minHeight: lightTheme.size["60"],
        backgroundColor: "white",
        borderRadius: lightTheme.size["8"],
        position: "absolute",
        top: 98,
        zIndex: 99,
    },
    itemSelect: {
        padding: lightTheme.size["8"],
    },
    input: {
        width: "90%",
    },
    error: {
        color: lightTheme.iconRemove,
        fontSize: lightTheme.size["14"],
        fontWeight: "bold",
    },
});
