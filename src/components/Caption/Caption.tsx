import { StyleSheet, Text, View } from "react-native";
import { lightTheme } from "../../core/theme/theme";

export function Caption() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Legenda das cores</Text>
            <View style={styles.row}>
                <View
                    style={{
                        gap: lightTheme.size["4"],
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={[
                            styles.circle,
                            { backgroundColor: lightTheme.iconSync },
                        ]}
                    />
                    <Text
                        style={{
                            color: lightTheme.iconSync,
                        }}
                    >
                        Sincronizado
                    </Text>
                </View>
                <View
                    style={{
                        gap: lightTheme.size["4"],
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={[
                            styles.circle,
                            { backgroundColor: lightTheme.iconRemove },
                        ]}
                    />
                    <Text
                        style={{
                            color: lightTheme.iconRemove,
                        }}
                    >
                        Deletado
                    </Text>
                </View>
                <View
                    style={{
                        gap: lightTheme.size["4"],
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={[
                            styles.circle,
                            { backgroundColor: lightTheme.iconDisabled },
                        ]}
                    />
                    <Text
                        style={{
                            color: lightTheme.iconDisabled,
                        }}
                    >
                        sincronização pendente
                    </Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: lightTheme.bottomTabs,
        padding: lightTheme.size["16"],
        marginBottom: lightTheme.size["16"],
        borderRadius: lightTheme.size["8"],
        gap: lightTheme.size["8"],
    },
    title: {
        color: lightTheme.labelSubTitle,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        gap: lightTheme.size["4"],
    },
    circle: {
        width: lightTheme.size["12"],
        height: lightTheme.size["12"],
        borderRadius: lightTheme.size["12"],
    },
});
