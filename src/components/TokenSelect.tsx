import { FC } from 'react';
import Image from 'next/image';

interface Token {
    symbol: string;
    balance: string;
    icon?: string;
}

interface TokenSelectProps {
    token: Token | null;
    amount: string;
    onTokenSelect: (token: Token) => void;
    onAmountChange: (amount: string) => void;
    label: string;
}

export const TokenSelect: FC<TokenSelectProps> = ({
    token,
    amount,
    onTokenSelect,
    onAmountChange,
    label,
}) => {
    return (
        <div className="w-full bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{label}</span>
                    {token && (
                        <span className="text-sm text-gray-500">
                            Balance: {token.balance} {token.symbol}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => onAmountChange(e.target.value)}
                        placeholder="0.0"
                        className="w-full text-lg p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="min-w-[120px] flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => {/* Implement token selection modal */ }}
                    >
                        {token ? (
                            <>
                                {token.icon && (
                                    <Image
                                        src={token.icon}
                                        alt={token.symbol}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                )}
                                <span>{token.symbol}</span>
                            </>
                        ) : (
                            'Select Token'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

