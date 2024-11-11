import { FlatList, StyleSheet, Text, View } from "react-native";
import { Conection } from "../../../components";
import { useListSyncModelView } from "./useListSyncModelView";
import { CardList } from "../lists/components/card/CardList";

export function ListSync() {
    const { listSales } = useListSyncModelView();
    function rendetItem({ item }) {
        return <CardList item={item} />;
    }
    function ListEmptyComponent() {
        return (
            <View style={styles.containerEmpaty}>
                <Text style={styles.title}>
                    Nenhum item a ser sincronizado no momento.
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
            <Conection />
            <FlatList
                contentContainerStyle={{
                    top: 32,
                    padding: 16,
                    paddingBottom: 50,
                }}
                data={listSales}
                keyExtractor={(item) => String(item.id)}
                renderItem={rendetItem}
                ListEmptyComponent={ListEmptyComponent}
                ItemSeparatorComponent={ItemSeparatorComponent}
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
