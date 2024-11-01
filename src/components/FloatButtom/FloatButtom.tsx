import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
interface FloatButtomProps {
    onPress: () => void;
}
export function FloatButtom({ onPress }: FloatButtomProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <AntDesign name="pluscircleo" color={"white"} size={20} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "orange",
        position: "absolute",
        bottom: 12,
        right: 12,
        justifyContent: "center",
        alignItems: "center",
    },
});
