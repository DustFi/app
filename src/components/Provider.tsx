"use client";
import type { PropsWithChildren } from 'react';
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TON_CONNECT_MANIFEST } from "@/constants/index";
import Navbar from "../components/navigation/navbar";

// Create a separate client component for the app content
const ClientLayout = ({ children }: PropsWithChildren) => {
    return (
        <TonConnectUIProvider manifestUrl={TON_CONNECT_MANIFEST}>
            <Navbar />
                {children}
        </TonConnectUIProvider>
    );
};

export default ClientLayout;