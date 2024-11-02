import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { FloatButtom } from "../../../components";

import { useListModelView } from "./useListModelView";
import { CardList } from "./components/card/CardList";
export function Lists() {
    const { navigate, listSales } = useListModelView();
    function rendetItem({ item }) {
        return <CardList item={item} />;
    }
    function ListEmptyComponent() {
        return (
            <View style={styles.containerEmpaty}>
                <Text style={styles.title}>
                    Nenhum item cadastrado até o momento.
                </Text>
            </View>
        );
    }
    function ItemSeparatorComponent() {
        return (
            <View
                style={{
                    width: "100%",
                    height: 15,
                }}
            />
        );
    }
    return (
        <>
            <FlatList
                contentContainerStyle={{
                    top: 32,
                    padding: 16,
                }}
                data={listSales}
                keyExtractor={(item) => String(item.id)}
                renderItem={rendetItem}
                ListEmptyComponent={ListEmptyComponent}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
            <FloatButtom
                onPress={() => {
                    navigate("CreatingSale");
                }}
            />
        </>
    );
}
const styles = StyleSheet.create({
    containerEmpaty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "300",
    },
});
