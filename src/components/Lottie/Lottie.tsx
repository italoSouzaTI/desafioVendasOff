import LottieView from "lottie-react-native";
import { ReactNode, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
interface LottieViewProps {
    url: ReactNode;
    label: string;
}
export function Lottie({ url, label }: LottieViewProps) {
    const animation = useRef<LottieView>(null);
    useEffect(() => {
        animation.current?.play();
    }, []);
    return (
        <View style={styles.animationContainer}>
            <LottieView
                ref={animation}
                style={{
                    width: 400,
                    height: 400,
                }}
                source={url}
            />
            <Text style={styles.title}>{label}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    animationContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    title: {
        fontWeight: "300",
    },
});
