import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./src/routes/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite";
import NetInfoProvider from "./src/provider/NetInfoContext";
import { initialDatabase } from "./src/core/database/initialDatabase";
import { ModalSync } from "./src/components/modalSync/ModalSync";
import { StatusBar } from "expo-status-bar";
import { lightTheme } from "./src/core/theme/theme";

export default function App() {
    return (
        <>
            <StatusBar backgroundColor={lightTheme.background} style={"dark"} />
            <SQLiteProvider databaseName="desafio.db" onInit={initialDatabase}>
                <NetInfoProvider>
                    <NavigationContainer>
                        <SafeAreaProvider>
                            <MainStack />
                            <ModalSync />
                        </SafeAreaProvider>
                    </NavigationContainer>
                </NetInfoProvider>
            </SQLiteProvider>
        </>
    );
}
