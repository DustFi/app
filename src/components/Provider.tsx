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
            <div className='bg-gradient-to-tl from-gray-900 via-[#ff7b24] to-black'>
                {children}
            </div>
        </TonConnectUIProvider>
    );
};

export default ClientLayout;