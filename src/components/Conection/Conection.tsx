import { Text, View, StyleSheet } from "react-native";
import { useSafeInsets } from "../../hooks/useSafeInsets";
import { useContext } from "react";
import { NetInfoContext } from "../../provider/NetInfoContext";
import { lightTheme } from "../../core/theme/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function Conection() {
    const { top } = useSafeInsets();
    const { isConnect } = useContext(NetInfoContext);
    return (
        <>
            {!isConnect && (
                <View
                    style={[
                        styles.container,
                        {
                            paddingTop: top,
                            backgroundColor: isConnect
                                ? lightTheme.buttonSave
                                : "#FA7E7E",
                            flexDirection: "row",
                            gap: lightTheme.size[8],
                        },
                    ]}
                >
                    {!isConnect && (
                        <MaterialCommunityIcons
                            name="wifi-remove"
                            size={lightTheme.size["18"]}
                            color="#7B0000"
                        />
                    )}

                    <Text
                        style={{
                            color: isConnect
                                ? lightTheme.labelButton
                                : "#7B0000",
                            fontWeight: "bold",
                            fontSize: 18,
                        }}
                    >
                        {isConnect ? "Conectado" : "Sem Conexão"}
                    </Text>
                </View>
            )}
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 60,
        justifyContent: "center",
        alignItems: "center",
    },
});
