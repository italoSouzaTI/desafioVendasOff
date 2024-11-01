import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FloatButtom } from "../../../components";
import { Card } from "../../../components/Card/Card";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export function Lists({ navigation }) {
    const { navigate } = useNavigation();
    return (
        <>
            <ScrollView
                contentContainerStyle={{
                    top: 32,
                    padding: 16,
                }}
            >
                <Card>
                    <View style={[styles.row, { justifyContent: "space-between" }]}>
                        <View>
                            <Text style={styles.title}>Fornecedor</Text>
                            <Text style={styles.subTitle}>BMB OFFICE CONSULTORIA</Text>
                        </View>
                        <View style={[styles.row, { gap: 8 }]}>
                            <FontAwesome5 name="database" size={16} color="green" />
                            <MaterialIcons name="sync-disabled" size={16} color="gray" />
                            {/* <MaterialIcons name="sync" size={16} color="gray" /> */}
                        </View>
                    </View>
                    {/* <View>
                        <Text style={styles.title}>Tipo</Text>
                        <Text style={styles.subTitle}>CONTAS A PAGAR</Text>
                    </View> */}
                    <View style={[styles.row, { justifyContent: "space-between" }]}>
                        <View>
                            <Text style={styles.title}>Data vencimento</Text>
                            <Text style={styles.subTitle}>30/09/2024</Text>
                        </View>
                        <View>
                            <Text style={[styles.title, { textAlign: "right" }]}>Valor</Text>
                            <Text style={styles.subTitle}>R$ 1.360,00</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
            <FloatButtom
                onPress={() => {
                    navigate("CreatingSale");
                }}
            />
        </>
    );
}
const styles = StyleSheet.create({
    title: {
        fontWeight: "300",
    },
    subTitle: {
        fontWeight: "600",
    },
    row: {
        flexDirection: "row",
    },
});
