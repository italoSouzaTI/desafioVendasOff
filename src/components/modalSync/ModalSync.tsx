import Modal from "react-native-modal";
import { StyleSheet, Text, View, AppState } from "react-native";
import { useRequestLists } from "../../features/request";
import { useEffect, useState } from "react";
import { ProgressBar } from "../progressBar/progressBar";
export function ModalSync() {
    const { getlistSalesSync } = useRequestLists();
    const [countItens, setCountItens] = useState<number>(0);
    useEffect(() => {
        const refresh = async () => {
            const aux = await getlistSalesSync();
            setCountItens((state) => (state = aux?.length));
        };
        refresh();
    }, []);

    return (
        <Modal isVisible={true}>
            <View style={styles.container}>
                <Text style={styles.title}>Sincronizando vendas pendentes</Text>

                <ProgressBar current={0} total={countItens} />
                <Text style={styles.subtitle}>{`${0}/ ${
                    countItens < 9 ? "0" + countItens : countItens
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
