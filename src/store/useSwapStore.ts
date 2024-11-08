import { create } from 'zustand';
import { Token, ModalState, BestRoute } from '@/constants/types';
import { toNano, fromNano } from '@/lib/format';

interface SwapState {
    payToken: Token | null;
    receiveToken: Token | null;
    payAmount: bigint;
    bestRoute: BestRoute | null;
    onePayRoute: {
        pool_data?: {
            route_view: string[];
            receive_show: number;
        };
    } | null;
    isFindingBestRoute: boolean;
    swapModal: ModalState;
    slippage: string | number;
    isSelectingToken: boolean;
    setPayToken: (token: Token | null) => void;
    setReceiveToken: (token: Token | null) => void;
    setPayAmount: (amount: bigint) => void;
    setBestRoute: (route: BestRoute | null) => void;
    setModalState: (state: ModalState) => void;
    changeDirection: () => void;
    resetState: () => void;
    refetchBestRoute: () => Promise<void>;
}

export const useSwapStore = create<SwapState>((set, get) => ({
    payToken: null,
    receiveToken: null,
    payAmount: 0n,
    bestRoute: null,
    onePayRoute: null,
    isFindingBestRoute: false,
    swapModal: ModalState.NONE,
    slippage: 'auto',
    isSelectingToken: false,

    setPayToken: (token) => set({ payToken: token }),
    setReceiveToken: (token) => set({ receiveToken: token }),
    setPayAmount: (amount) => {
        set({ payAmount: amount });
        // Trigger route recalculation
        get().refetchBestRoute();
    },
    setBestRoute: (route) => set({ bestRoute: route }),
    setModalState: (state) => set({ swapModal: state }),

    changeDirection: () => {
        const { payToken, receiveToken, payAmount, bestRoute } = get();
        set({
            payToken: receiveToken,
            receiveToken: payToken,
            payAmount: bestRoute?.pool_data.receive_show
                ? BigInt(Math.floor(bestRoute.pool_data.receive_show))
                : 0n
        });
    },

    resetState: () => set({
        payToken: null,
        receiveToken: null,
        payAmount: 0n,
        bestRoute: null,
        swapModal: ModalState.NONE
    }),

    refetchBestRoute: async () => {
        const { payToken, receiveToken, payAmount } = get();
        if (!payToken || !receiveToken || !payAmount) {
            set({ bestRoute: null });
            return;
        }

        set({ isFindingBestRoute: true });
        try {
            // Implement your route finding logic here
            // const route = await findBestRoute(payToken, receiveToken, payAmount);
            // set({ bestRoute: route });
        } catch (error) {
            console.error('Error finding best route:', error);
            set({ bestRoute: null });
        } finally {
            set({ isFindingBestRoute: false });
        }
    }
}));
