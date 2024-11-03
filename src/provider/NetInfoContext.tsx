import React, { useState, createContext, useEffect, ReactNode } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

interface NetInfoProps {
    isConnect: boolean;
}

type ChildrenNetInfoProps = {
    children: ReactNode;
};

export const NetInfoContext = createContext<NetInfoProps>({} as NetInfoProps);

const NetInfoProvider: React.FC<ChildrenNetInfoProps> = ({ children }) => {
    const netInfo = useNetInfo();
    const [isConnect, setIsConnect] = useState(false);

    useEffect(() => {
        if (netInfo.isConnected === true && netInfo.type != "vpn") {
            setIsConnect(true);
        } else {
            setIsConnect(false);
        }
    }, [netInfo.isConnected]);

    return (
        <NetInfoContext.Provider value={{ isConnect }}>
            {children}
        </NetInfoContext.Provider>
    );
};

export default NetInfoProvider;
