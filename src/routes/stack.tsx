import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatingSale } from "../features/pages";
import { Bottom } from "./bottom";

const stack = createNativeStackNavigator();
export function MainStack() {
    return (
        <stack.Navigator
            initialRouteName="Bottom"
            screenOptions={{
                headerShown: false,
            }}
        >
            <stack.Screen name="Bottom" component={Bottom} />
            <stack.Screen name="CreatingSale" component={CreatingSale} />
        </stack.Navigator>
    );
}
