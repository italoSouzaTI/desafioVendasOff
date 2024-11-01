import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListSync, Lists } from "../features/pages";

const stackBottom = createBottomTabNavigator();
export function Bottom() {
    return (
        <stackBottom.Navigator
            initialRouteName="Lists"
            screenOptions={{
                headerShown: false,
            }}
        >
            <stackBottom.Screen name="Lists" component={Lists} />
            <stackBottom.Screen name="ListSync" component={ListSync} />
        </stackBottom.Navigator>
    );
}
