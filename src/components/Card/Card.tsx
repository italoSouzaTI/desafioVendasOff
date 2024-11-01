import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
interface CardProps {
    children: ReactNode;
}
export function Card({ children }: CardProps) {
    return <View style={styles.container}>{children}</View>;
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
