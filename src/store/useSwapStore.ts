import { create } from 'zustand';
import { Token, ModalState, BestRoute } from '@/constants/types';
import { ZERO_BIGINT, toNano } from '@/lib/format';
import { useOptionsStore } from './useOptionsStore';

interface SwapState {
    payToken: Token | null;
    receiveToken: Token | null;
    payAmount: bigint;
    bestRoute: BestRoute | null;
    isFindingBestRoute: boolean;
    swapModal: ModalState;
    slippage: number;
    initializeApp: () => Promise<void>;
    refetchBestRoute: () => Promise<void>;
}

export const useSwapStore = create<SwapState>((set, get) => ({
    payToken: null,
    receiveToken: null,
    payAmount: ZERO_BIGINT,
    bestRoute: null,
    isFindingBestRoute: false,
    swapModal: ModalState.NONE,
    slippage: 0.5,

    initializeApp: async () => {
        // Your initialization logic here
    },

    refetchBestRoute: async () => {
        // Your logic to refetch the best route here
    },

    setPayToken: (token) => set({ payToken: token }),
    setReceiveToken: (token) => set({ receiveToken: token }),
    setPayAmount: (amount) => {
        set({ payAmount: amount });
        get().refetchBestRoute();
    },
    setBestRoute: (route) => set({ bestRoute: route }),
    setModalState: (state) => set({ swapModal: state }),

    resetState: () => set({
        payToken: null,
        receiveToken: null,
        payAmount: ZERO_BIGINT,
        bestRoute: null,
        swapModal: ModalState.NONE
    }),
}));