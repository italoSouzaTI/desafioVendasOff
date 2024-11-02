import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { MainStack } from "./src/routes/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite";
import { initialDatabase } from "./src/database/initialDatabase";

export default function App() {
    return (
        <>
            <SQLiteProvider databaseName="desafio.db" onInit={initialDatabase}>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <MainStack />
                    </SafeAreaProvider>
                </NavigationContainer>
            </SQLiteProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
