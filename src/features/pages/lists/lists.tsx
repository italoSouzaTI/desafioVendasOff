import { FlatList, StyleSheet, View } from "react-native";
import { Caption, Conection, FloatButtom, Lottie } from "../../../components";

import { useListModelView } from "./useListModelView";
import { CardList } from "./components/card/CardList";
import FileEmpty from "../../../assets/svg/empty.json";
import { lightTheme } from "../../../core/theme/theme";
export function Lists() {
    const { navigate, listSales } = useListModelView();
    function rendetItem({ item }) {
        return <CardList item={item} />;
    }
    function ListEmptyComponent() {
        return (
            <Lottie
                url={FileEmpty}
                label=" Nenhum item cadastrado até o momento."
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
                    paddingBottom: 80,
                }}
                data={listSales}
                keyExtractor={(item) => String(item.id)}
                renderItem={rendetItem}
                ListEmptyComponent={ListEmptyComponent}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListHeaderComponent={() => <Caption />}
            />
            <FloatButtom
                onPress={() => {
                    navigate("CreatingSale");
                }}
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
