import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { lightTheme } from "../../core/theme/theme";
interface CardProps {
    children: ReactNode;
    onPress: () => void;
}
export function Card({ children, onPress }: CardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.container}
        >
            {children}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 50,
        borderRadius: lightTheme.size["8"],
        backgroundColor: lightTheme.card,
        padding: lightTheme.size["16"],
        gap: lightTheme.size["16"],
    },
});
