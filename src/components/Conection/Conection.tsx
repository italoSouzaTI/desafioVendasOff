import { Text, View, StyleSheet } from "react-native";
import { useSafeInsets } from "../../hooks/useSafeInsets";
import { useContext } from "react";
import { NetInfoContext } from "../../provider/NetInfoContext";

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
                            backgroundColor: isConnect ? "#46B156" : "#D6635F",
                        },
                    ]}
                >
                    <Text
                        style={{
                            color: isConnect ? "#0F5306" : "#8C0909",
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
        paddingBottom: 10,
    },
});
