import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { lightTheme } from "../../../../../core/theme/theme";
interface StatusAction {
    actionEdit: () => void;
    actionDelete: () => void;
}
export function StatusAction({ actionEdit, actionDelete }: StatusAction) {
    return (
        <View style={styles.containerRow}>
            <TouchableOpacity
                onPress={actionEdit}
                style={[
                    styles.cardAction,
                    { backgroundColor: lightTheme.activeButton },
                ]}
            >
                <MaterialIcons
                    name="edit"
                    size={lightTheme.size[22]}
                    color={lightTheme.labelTitle}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={actionDelete}
                style={[
                    styles.cardAction,
                    { backgroundColor: lightTheme.iconRemove },
                ]}
            >
                <Entypo
                    name="trash"
                    size={lightTheme.size[22]}
                    color={lightTheme.labelButton}
                />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    containerRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-end",
        gap: lightTheme.size["8"],
    },
    cardAction: {
        width: 30,
        height: 30,
        borderRadius: lightTheme.size["8"],
        backgroundColor: lightTheme.card,
        justifyContent: "center",
        alignItems: "center",
    },
});
