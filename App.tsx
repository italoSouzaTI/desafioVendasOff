import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { MainStack } from "./src/routes/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite";
import NetInfoProvider from "./src/provider/NetInfoContext";
import { initialDatabase } from "./src/core/database/initialDatabase";
import { ModalSync } from "./src/components/modalSync/ModalSync";

export default function App() {
    return (
        <>
            <NetInfoProvider>
                <SQLiteProvider
                    databaseName="desafio.db"
                    onInit={initialDatabase}
                >
                    <NavigationContainer>
                        <SafeAreaProvider>
                            <MainStack />
                            <ModalSync />
                        </SafeAreaProvider>
                    </NavigationContainer>
                </SQLiteProvider>
            </NetInfoProvider>
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
