import { create } from 'zustand';
import { SwapOptions } from '@/constants/types';
import { TonConnectUI } from '@tonconnect/ui-react';

interface OptionsState {
    options: SwapOptions;
    tonConnectInstance: TonConnectUI | null;
    setOptions: (options: SwapOptions) => void;
    setTonConnectInstance: (instance: TonConnectUI) => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
    options: {
        ui_preferences: {
            show_swap_details: true,
            show_change_direction: true,
            disable_provided_text: false,
        },
        slippage_tolerance: 0.5,
    },
    tonConnectInstance: null,
    setOptions: (options) => set({ options }),
    setTonConnectInstance: (instance) => set({ tonConnectInstance: instance }),
}));