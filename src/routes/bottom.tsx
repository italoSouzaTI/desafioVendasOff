import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListSync, Lists } from "../features/pages";
import { lightTheme } from "../core/theme/theme";

const stackBottom = createBottomTabNavigator();
export function Bottom() {
    return (
        <stackBottom.Navigator
            initialRouteName="Lists"
            screenOptions={{
                headerShown: false,
                tabBarIconStyle: { display: "none" },
                tabBarActiveTintColor: lightTheme.labelTitle,
                tabBarInactiveTintColor: lightTheme.labelSubTitle,
                tabBarStyle: {
                    backgroundColor: lightTheme.background,
                },
                tabBarLabelStyle: {
                    fontWeight: "7500",
                    fontSize: 15,
                    paddingBottom: 15,
                },
            }}
        >
            <stackBottom.Screen
                options={{
                    tabBarLabel: "Home",
                }}
                name="Lists"
                component={Lists}
            />
            <stackBottom.Screen
                options={{
                    tabBarLabel: "Lista de sincronização",
                }}
                name="ListSync"
                component={ListSync}
            />
        </stackBottom.Navigator>
    );
}
