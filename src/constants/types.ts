type Token = {
    symbol: string;
    name: string;
    balance: string;
    decimals: number;
    address: string;
    icon?: string;
}

type SwapOptions = {
    ui_preferences?: {
        show_swap_details?: boolean;
        disable_provided_text?: boolean;
    };
    slippage_tolerance?: number;
}

type WalletStatus = {
    address: string;
    isConnected: boolean;
    balance: string;
}