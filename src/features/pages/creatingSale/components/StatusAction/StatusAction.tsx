import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
interface StatusAction {
    actionEdit: () => void;
    actionDelete: () => void;
}
export function StatusAction({ actionEdit, actionDelete }: StatusAction) {
    return (
        <View style={styles.containerRow}>
            <TouchableOpacity
                onPress={actionEdit}
                style={[styles.cardAction, { backgroundColor: "#FBC104" }]}
            >
                <MaterialIcons name="edit" size={22} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={actionDelete}
                style={[styles.cardAction, { backgroundColor: "#fb9a98" }]}
            >
                <Entypo name="trash" size={22} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    containerRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-end",
        gap: 8,
    },
    cardAction: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
    },
});
