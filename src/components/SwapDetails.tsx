import { FC } from 'react';
import { useSwapStore } from '@/hooks/useSwapStore';

export const SwapDetails: FC = () => {
    const { payToken, receiveToken, payAmount, receiveAmount, swapRate, slippageTolerance } = useSwapStore();

    if (!payToken || !receiveToken) return null;

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
                <span className="text-gray-500">Rate</span>
                <span>
                    1 {payToken.symbol} = {swapRate} {receiveToken.symbol}
                </span>
            </div>
            <div className="flex justify-between mb-2">
                <span className="text-gray-500">Slippage Tolerance</span>
                <span>{slippageTolerance}%</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Minimum Received</span>
                <span>
                    {Number(receiveAmount) * (1 - slippageTolerance / 100)} {receiveToken.symbol}
                </span>
            </div>
        </div>
    );
};
