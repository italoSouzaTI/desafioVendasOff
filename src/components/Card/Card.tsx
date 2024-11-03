import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
        borderRadius: 8,
        backgroundColor: "white",
        padding: 16,
        gap: 16,
    },
});
