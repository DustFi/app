import { FC, ChangeEvent, useState, useEffect, CSSProperties } from 'react';
import Image from 'next/image';
import { Card as UICard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSwapStore } from '@/store/useSwapStore';
import { useWalletStore } from '@/store/useWalletStore';
import { useOptionsStore } from '@/store/useOptionsStore';
import { formatNumber, toNano, fromNano } from '@/lib/format';

interface CardProps {
    type: 'pay' | 'receive';
}

export const Card: FC<CardProps> = ({ type }) => {
    const [userInput, setUserInput] = useState('');
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

    const {
        payToken,
        receiveToken,
        payAmount,
        bestRoute,
        isFindingBestRoute,
        setPayAmount,
    } = useSwapStore();

    const { balance } = useWalletStore();
    const { options } = useOptionsStore();

    const token = type === 'pay' ? payToken : receiveToken;
    const tokenBalance = token ? balance.get(token.address) : null;

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const decimalRegexp = /^\d*(?:\.\d{0,18})?$/;
        let value = e.target.value.replace(/,/g, '.');

        if (value === '') {
            setUserInput('');
            setPayAmount(0n);
            return;
        }

        if (decimalRegexp.test(value)) {
            value = value.replace(/^0+(?=\d)/, '');

            if (value === '.' || value === '0.') {
                setUserInput('0.');
            } else {
                setUserInput(value);
            }

            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }

            setTypingTimeout(setTimeout(() => {
                if (Number(value) > 0) {
                    setPayAmount(toNano(value, token?.decimal || 9));
                } else {
                    setPayAmount(0n);
                }
            }, 300));
        }
    };

    const handleMaxClick = () => {
        if (!tokenBalance || !payToken) return;

        let maxAmount = tokenBalance.balance;
        if (payToken.address === 'TON_ADDRESS') { // Replace with actual TON address
            if (maxAmount <= toNano(0.2)) return;
            maxAmount = maxAmount - toNano(0.2);
        }

        setUserInput(fromNano(maxAmount, payToken.decimal));
        setPayAmount(maxAmount);
    };

    useEffect(() => {
        if (type === 'pay') {
            setUserInput(fromNano(payAmount, payToken?.decimal));
        }
    }, [payAmount, payToken?.decimal]);

    const isDisabled = type === 'pay' ? options.lock_pay_token : options.lock_receive_token;

    return (
        <UICard className="w-full">
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {type === 'pay' ? 'You Pay' : 'You Receive'}
                    </span>
                    {type === 'pay' && tokenBalance && (
                        <button
                            onClick={handleMaxClick}
                            className="text-sm text-blue-500 hover:text-blue-600"
                        >
                            Max: {formatNumber(
                                Number(fromNano(tokenBalance.balance, token?.decimal || 9)),
                                4
                            )} {token?.symbol}
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {((type === 'receive' && !isFindingBestRoute) || type === 'pay') && (
                        <Input
                            type="text"
                            inputMode="decimal"
                            value={type === 'pay' ? userInput : bestRoute?.pool_data.receive_show || ''}
                            onChange={handleAmountChange}
                            disabled={type === 'receive' || options.lock_input}
                            placeholder="0.0"
                            className="w-full text-lg"
                        />
                    )}

                    {type === 'receive' && isFindingBestRoute && (
                        <div
                            className="h-10 w-full rounded animate-pulse"
                            style={{ '--skeleton-color': 'rgb(229 231 235)' } as CSSProperties}
                        />
                    )}

                    <Button
                        variant="outline"
                        className="min-w-[140px] flex items-center gap-2"
                        disabled={isDisabled}
                        onClick={() => {/* Implement token selection */ }}
                    >
                        {token ? (
                            <>
                                {token.image && (
                                    <Image
                                        src={token.image}
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
                    </Button>
                </div>

                {type === 'receive' && isFindingBestRoute && (
                    <div className="text-sm text-gray-500">Finding best route...</div>
                )}
            </div>
        </UICard>
    );
};
