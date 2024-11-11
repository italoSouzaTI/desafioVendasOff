import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../../../../components";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IDatabaseProps } from "../../../../../core/database/model/IDatabase";
interface CardListProps {
    item: IDatabaseProps;
}
export function CardList({ item }: CardListProps) {
    const { navigate } = useNavigation();
    return (
        <Card onPress={() => navigate("CreatingSale", { data: item })}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
                <View>
                    <Text style={styles.title}>Fornecedor</Text>
                    <Text style={styles.subTitle}>{item.supplier}</Text>
                </View>
                <View style={[styles.row, { gap: 8 }]}>
                    {item.sync_delete == true && (
                        <FontAwesome5 name="trash" size={16} color="red" />
                    )}

                    <FontAwesome5 name="database" size={16} color="green" />
                    {item.sync_status || item.sync_update ? (
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
                <Text style={styles.subTitle}>{item.account_type}</Text>
            </View>
            <View>
                <Text style={styles.title}>Tipo pagamento</Text>
                <Text style={styles.subTitle}>{item.payment}</Text>
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
                <View>
                    <Text style={styles.title}>Data vencimento</Text>
                    <Text style={styles.subTitle}>{item.maturity}</Text>
                </View>
                <View>
                    <Text style={[styles.title, { textAlign: "right" }]}>
                        Valor
                    </Text>
                    <Text style={styles.subTitle}> {item.value_price}</Text>
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
