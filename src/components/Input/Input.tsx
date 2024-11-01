import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { Controller, UseControllerProps } from "react-hook-form";
interface InputProps {
    error: string;
    label: string;
    formProps: UseControllerProps;
    restInput: TextInputProps;
}
export function Input({ label, restInput, formProps, error = "" }: InputProps) {
    return (
        <Controller
            render={({ field }) => (
                <>
                    <View style={styles.container}>
                        <Text style={styles.title}>{label}</Text>
                        <View
                            style={[styles.containerInput, { borderColor: error.length > 0 ? "#DC1637" : "#E6E6E6" }]}
                        >
                            <TextInput
                                style={styles.input}
                                value={field.value}
                                onChangeText={field.onChange}
                                {...restInput}
                            />
                        </View>
                    </View>
                    {error.length > 0 && <Text style={styles.error}>{error}</Text>}
                </>
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
        width: "100%",
        height: 60,
        backgroundColor: "white",
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: "center",
    },
    input: {
        width: "100%",
    },
    error: {
        color: "#DC1637",
        fontSize: 14,
        fontWeight: "bold",
    },
});
