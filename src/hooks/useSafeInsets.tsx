import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useSafeInsets() {
    const { top, bottom, left, right } = useSafeAreaInsets();
    return { top, bottom, left, right };
}
