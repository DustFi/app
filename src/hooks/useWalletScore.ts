import { create } from 'zustand';

interface WalletState {
    wallet: WalletStatus | null;
    isConnecting: boolean;
    setWallet: (wallet: WalletStatus | null) => void;
    disconnect: () => void;
    connect: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
    wallet: null,
    isConnecting: false,
    setWallet: (wallet) => set({ wallet }),
    disconnect: () => set({ wallet: null }),
    connect: async () => {
        set({ isConnecting: true });
        try {
            // Implement your wallet connection logic here
            const wallet = { address: '0x...', isConnected: true, balance: '0' };
            set({ wallet, isConnecting: false });
        } catch (error) {
            set({ isConnecting: false });
            throw error;
        }
    },
}));
