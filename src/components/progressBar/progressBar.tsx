import { StyleSheet, Text, View } from "react-native";
interface Props {
    total: number;
    current: number;
}
export function ProgressBar({ current, total }: Props) {
    const percentage = Math.round((current / total) * 100);
    return (
        <View style={styles.track}>
            <View style={[styles.progress, { width: `${percentage}%` }]} />
        </View>
    );
}
const styles = StyleSheet.create({
    track: {
        height: 8,
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#505059",
    },
    progress: {
        height: 8,
        backgroundColor: "#00B37E",
        borderRadius: 8,
    },
});
