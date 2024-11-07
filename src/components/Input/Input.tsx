import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import {
    Controller,
    ControllerRenderProps,
    FieldValues,
    UseControllerProps,
} from "react-hook-form";
import { price } from "../../hooks/usePrice";
import { formatarData } from "../../hooks/formatData";
interface InputProps {
    error?: string;
    label: string;
    formProps: UseControllerProps;
    restInput: TextInputProps;
}
export function Input({ label, restInput, formProps, error = "" }: InputProps) {
    function handleOnChange(
        field: ControllerRenderProps<FieldValues, string>,
        value: string
    ) {
        if (field.name == "value_price") {
            return price(value);
        }
        if (field.name == "maturity") {
            return formatarData(value);
        }
        return value;
    }
    return (
        <Controller
            render={({ field }) => (
                <>
                    <View style={styles.container}>
                        <Text style={styles.title}>{label}</Text>
                        <View
                            style={[
                                styles.containerInput,
                                {
                                    borderColor:
                                        error.length > 0
                                            ? "#DC1637"
                                            : "#E6E6E6",
                                },
                            ]}
                        >
                            <TextInput
                                style={styles.input}
                                value={field.value}
                                onChangeText={(value) =>
                                    field.onChange(handleOnChange(field, value))
                                }
                                {...restInput}
                            />
                        </View>
                    </View>
                    {error.length > 0 && (
                        <Text style={styles.error}>{error}</Text>
                    )}
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
