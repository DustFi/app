import { create } from 'zustand';

interface SwapState {
    payToken: Token | null;
    receiveToken: Token | null;
    payAmount: string;
    receiveAmount: string;
    swapRate: number;
    slippageTolerance: number;
    isLoading: boolean;
    setPayToken: (token: Token | null) => void;
    setReceiveToken: (token: Token | null) => void;
    setPayAmount: (amount: string) => void;
    setReceiveAmount: (amount: string) => void;
    setSwapRate: (rate: number) => void;
    setSlippageTolerance: (tolerance: number) => void;
    resetState: () => void;
}

export const useSwapStore = create<SwapState>((set) => ({
    payToken: null,
    receiveToken: null,
    payAmount: '',
    receiveAmount: '',
    swapRate: 0,
    slippageTolerance: 0.5,
    isLoading: false,
    setPayToken: (token) => set({ payToken: token }),
    setReceiveToken: (token) => set({ receiveToken: token }),
    setPayAmount: (amount) => set({ payAmount: amount }),
    setReceiveAmount: (amount) => set({ receiveAmount: amount }),
    setSwapRate: (rate) => set({ swapRate: rate }),
    setSlippageTolerance: (tolerance) => set({ slippageTolerance: tolerance }),
    resetState: () => set({
        payToken: null,
        receiveToken: null,
        payAmount: '',
        receiveAmount: '',
        swapRate: 0,
    }),
}));
