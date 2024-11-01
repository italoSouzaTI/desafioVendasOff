import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { MainStack } from "./src/routes/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <>
            <NavigationContainer>
                <SafeAreaProvider>
                    <MainStack />
                </SafeAreaProvider>
            </NavigationContainer>
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
