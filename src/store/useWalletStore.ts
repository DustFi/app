import { Balance } from '@/constants/types';
import { create } from 'zustand';

interface WalletState {
    wallet: any | null; // Replace with proper wallet type
    balance: Map<string, Balance>;
    isConnecting: boolean;
    setWallet: (wallet: any) => void;
    disconnect: () => void;
    setBalance: (address: string, balance: Balance) => void;
    refetch: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
    wallet: null,
    balance: new Map(),
    isConnecting: false,
    setWallet: (wallet) => set({ wallet }),
    disconnect: () => set({ wallet: null }),
    setBalance: (address, balance) => {
        const newBalance = new Map(get().balance);
        newBalance.set(address, balance);
        set({ balance: newBalance });
    },
    refetch: async () => {
        // Implement balance refetch logic
    },
}));