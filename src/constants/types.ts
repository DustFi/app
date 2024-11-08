// types/swap.ts
import { Address } from '@ton/core';

export interface Token {
    symbol: string;
    name: string;
    address: string;
    decimal: number;
    image?: string;
}

export interface Balance {
    balance: bigint;
    token: Token;
}

export interface SwapOptions {
    ui_preferences?: {
        show_swap_details?: boolean;
        show_change_direction?: boolean;
        disable_provided_text?: boolean;
    };
    lock_pay_token?: boolean;
    lock_receive_token?: boolean;
    lock_input?: boolean;
    slippage_tolerance?: number;
}

export interface Asset {
    type: string;
    data: any;
}

export enum ModalState {
    NONE = 'NONE',
    TOKEN_SELECT = 'TOKEN_SELECT',
    CONFIRM = 'CONFIRM',
    WAITING = 'WAITING',
    ERROR = 'ERROR',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface RouteData {
    route_view: string[];
    receive_show: number;
    blockchainFee: string;
    priceImpact: string;
    minimumReceive_show: string;
    status: boolean;
}

export interface BestRoute {
    pool_data: RouteData;
    selected_pool: {
        dex: 'dedust' | 'stonfi';
    };
}

type WalletStatus = {
    address: string;
    isConnected: boolean;
    balance: string;
}