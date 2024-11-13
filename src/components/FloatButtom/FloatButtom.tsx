import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { lightTheme } from "../../core/theme/theme";
interface FloatButtomProps {
    onPress: () => void;
}
export function FloatButtom({ onPress }: FloatButtomProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <AntDesign
                name="plus"
                color={lightTheme.labelButton}
                size={lightTheme.size[20]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: lightTheme.activeButton,
        position: "absolute",
        bottom: lightTheme.size["12"],
        right: lightTheme.size["12"],
        justifyContent: "center",
        alignItems: "center",
    },
});
