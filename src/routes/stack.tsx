import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatingSale } from "../features/pages";
import { Bottom } from "./bottom";
import { IDatabaseProps } from "../core/database/model/IDatabase";
import { View } from "react-native";
import { lightTheme } from "../core/theme/theme";

type RootStackParamList = {
    Bottom: undefined;
    CreatingSale: { data: IDatabaseProps };
};
const stack = createNativeStackNavigator<RootStackParamList>();
export function MainStack() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: lightTheme.background,
            }}
        >
            <stack.Navigator
                initialRouteName="Bottom"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <stack.Screen name="Bottom" component={Bottom} />
                <stack.Screen name="CreatingSale" component={CreatingSale} />
            </stack.Navigator>
        </View>
    );
}
