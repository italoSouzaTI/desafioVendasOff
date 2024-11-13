import { FlatList, StyleSheet, View } from "react-native";
import { Conection, Lottie } from "../../../components";
import { useListSyncModelView } from "./useListSyncModelView";
import { CardList } from "../lists/components/card/CardList";
import SyncEmpty from "../../../assets/svg/syncEmpty.json";
import { lightTheme } from "../../../core/theme/theme";
export function ListSync() {
    const { listSales } = useListSyncModelView();
    function rendetItem({ item }) {
        return <CardList item={item} />;
    }
    function ListEmptyComponent() {
        return (
            <Lottie
                url={SyncEmpty}
                label=" Nenhum item a ser sincronizado no momento."
            />
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
        <View style={styles.container}>
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
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.background,
    },
});
