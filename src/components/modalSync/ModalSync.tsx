import Modal from "react-native-modal";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "../progressBar/progressBar";
import { useModalStore } from "../../store/useModalStore";
import { lightTheme } from "../../core/theme/theme";

export function ModalSync() {
    const { current, open, total, handleActionModal } = useModalStore(
        (state) => state
    );

    return (
        <Modal isVisible={open}>
            <View style={styles.container}>
                <Text style={styles.title}>Sincronizando vendas pendentes</Text>
                <ProgressBar current={current} total={total} />
                <Text style={styles.subtitle}>{`${
                    current < 9 ? "0" + current : current
                }/${total < 9 ? "0" + total : total}`}</Text>
                {current == total && (
                    <View
                        style={{
                            width: "100%",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: lightTheme.size["60"],
                                backgroundColor: lightTheme.buttonSave,
                                borderRadius: lightTheme.size["4"],
                                padding: lightTheme.size["4"],
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                handleActionModal(false);
                            }}
                        >
                            <Text
                                style={[
                                    styles.subtitle,
                                    { color: lightTheme.labelButton },
                                ]}
                            >
                                Ok
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 50,
        borderRadius: lightTheme.size["8"],
        backgroundColor: "white",
        padding: lightTheme.size["16"],
        gap: lightTheme.size["16"],
    },
    title: {
        fontWeight: "600",
        fontSize: lightTheme.size["18"],
    },
    subtitle: {
        fontWeight: "400",
        fontSize: lightTheme.size["18"],
        textAlign: "right",
        color: lightTheme.iconDisabled,
    },
});
