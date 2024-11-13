import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../../../../components";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IDatabaseProps } from "../../../../../core/database/model/IDatabase";
import { lightTheme } from "../../../../../core/theme/theme";
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
                <View style={[styles.row, { gap: lightTheme.size["8"] }]}>
                    {item.sync_delete == true && (
                        <FontAwesome5
                            name="trash"
                            size={lightTheme.size["16"]}
                            color={lightTheme.iconRemove}
                        />
                    )}

                    <FontAwesome5
                        name="database"
                        size={lightTheme.size["16"]}
                        color={lightTheme.buttonSave}
                    />
                    {item.sync_status || item.sync_update ? (
                        <MaterialIcons
                            name="sync-disabled"
                            size={lightTheme.size["16"]}
                            color={lightTheme.iconDisabled}
                        />
                    ) : (
                        <MaterialIcons
                            name="sync"
                            size={lightTheme.size["16"]}
                            color={lightTheme.buttonSave}
                        />
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
        color: lightTheme.labelSubTitle,
        fontWeight: "300",
    },
    subTitle: {
        color: lightTheme.labelTitle,
        fontWeight: "600",
    },
    row: {
        flexDirection: "row",
    },
});
