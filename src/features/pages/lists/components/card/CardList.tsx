import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../../../../components";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { IDatabaseProps } from "../../../../../database/model/IDatabase";
interface CardListProps {
    item: IDatabaseProps;
}
export function CardList({ item }: CardListProps) {
    return (
        <Card>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
                <View>
                    <Text style={styles.title}>Fornecedor</Text>
                    <Text style={styles.subTitle}>{item.fornecedor}</Text>
                </View>
                <View style={[styles.row, { gap: 8 }]}>
                    <FontAwesome5 name="database" size={16} color="green" />
                    {item.SYNC_STATUS ? (
                        <MaterialIcons
                            name="sync-disabled"
                            size={16}
                            color="gray"
                        />
                    ) : (
                        <MaterialIcons name="sync" size={16} color="green" />
                    )}
                </View>
            </View>
            <View>
                <Text style={styles.title}>Tipo da conta</Text>
                <Text style={styles.subTitle}>{item.tipo}</Text>
            </View>
            <View>
                <Text style={styles.title}>Tipo pagamento</Text>
                <Text style={styles.subTitle}>{item.pagamento}</Text>
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
                <View>
                    <Text style={styles.title}>Data vencimento</Text>
                    <Text style={styles.subTitle}>{item.vencimento}</Text>
                </View>
                <View>
                    <Text style={[styles.title, { textAlign: "right" }]}>
                        Valor
                    </Text>
                    <Text style={styles.subTitle}>R$ {item.valor}</Text>
                </View>
            </View>
        </Card>
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
