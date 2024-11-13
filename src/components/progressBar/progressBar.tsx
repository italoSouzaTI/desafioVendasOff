import { StyleSheet, Text, View } from "react-native";
import { lightTheme } from "../../core/theme/theme";
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
        height: lightTheme.size["16"],
        width: "100%",
        borderRadius: lightTheme.size["8"],
        backgroundColor: lightTheme.iconDisabled,
    },
    progress: {
        height: lightTheme.size["16"],
        backgroundColor: lightTheme.buttonSave,
        borderRadius: lightTheme.size["8"],
    },
});
