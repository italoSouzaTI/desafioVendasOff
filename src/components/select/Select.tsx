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
                                    error.length > 0 ? "#DC1637" : "#E6E6E6",
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
                        <AntDesign name="caretdown" size={18} color="#CDCDCD" />
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
                                    padding: 8,
                                    gap: 8,
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
        gap: 8,
    },
    title: {
        fontWeight: "600",
        fontSize: 16,
    },
    containerInput: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E6E6E6",
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    listSelect: {
        width: "100%",
        minHeight: 60,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#E6E6E6",
        position: "absolute",
        top: 98,
        zIndex: 99,
    },
    itemSelect: {
        padding: 8,
    },
    input: {
        width: "90%",
    },
    error: {
        color: "#DC1637",
        fontSize: 14,
        fontWeight: "bold",
    },
});
