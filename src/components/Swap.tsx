"use client"
import { FC } from 'react';
import { TokenSelect } from './TokenSelect';
import { SwapDetails } from './SwapDetails';
import { SwapButton } from './SwapButton';
import { useSwapStore } from '@/hooks/useSwapStore';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from 'lucide-react';

export const Swap: FC = () => {
    const {
        payToken,
        receiveToken,
        payAmount,
        receiveAmount,
        setPayToken,
        setReceiveToken,
        setPayAmount,
        setReceiveAmount,
    } = useSwapStore();

    const handleSwitch = () => {
        setPayToken(receiveToken);
        setReceiveToken(payToken);
        setPayAmount(receiveAmount);
        setReceiveAmount(payAmount);
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="space-y-4">
                <TokenSelect
                    label="You Pay"
                    token={payToken}
                    amount={payAmount}
                    onTokenSelect={setPayToken}
                    onAmountChange={setPayAmount}
                />

                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                            onClick={handleSwitch}
                        >
                            <ArrowDownIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TokenSelect
                    label="You Receive"
                    token={receiveToken}
                    amount={receiveAmount}
                    onTokenSelect={setReceiveToken}
                    onAmountChange={setReceiveAmount}
                />

                <SwapDetails />
                <SwapButton />
            </div>
        </div>
    );
};