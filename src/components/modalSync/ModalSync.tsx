import Modal from "react-native-modal";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../progressBar/progressBar";
import { useModalStore } from "../../store/useModalStore";

export function ModalSync() {
    const { current, open, total } = useModalStore((state) => state);

    return (
        <Modal isVisible={open}>
            <View style={styles.container}>
                <Text style={styles.title}>Sincronizando vendas pendentes</Text>
                <ProgressBar current={current} total={total} />
                <Text style={styles.subtitle}>{`${current}/ ${
                    total < 9 ? "0" + total : total
                }`}</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 50,
        borderRadius: 8,
        backgroundColor: "white",
        padding: 16,
        gap: 16,
    },
    title: {
        fontWeight: "600",
        fontSize: 18,
    },
    subtitle: {
        fontWeight: "400",
        fontSize: 16,
        textAlign: "right",
    },
});
